import * as React from "react";
import {useEffect, useState, useContext} from "react";
import ContextoURL from "../context/ContextoURL";
import Markdown from "../components/atoms/Markdown";
import {graphql} from "gatsby";
import {GatsbyImage, getImage} from "gatsby-plugin-image";
import {Helmet} from "react-helmet";
import styled from "styled-components";
import {useLocalization} from "gatsby-theme-i18n";
import slugify from "@sindresorhus/slugify";

import Titulo from "../components/atoms/Titulo";
import NavBar from "../components/organisms/NavBar";
import Compartir from "../components/molecules/Compartir";
import FooterPagina from "../components/organisms/FooterPagina";
import CompartirMetaTags from "../components/atoms/CompartirMetaTags";
import Galeria from "../components/organisms/Galeria";
import LinkInterno from "../components/atoms/LinkInterno";

const BlogPostEstilizado = styled.article``;

const InicioBlogPostEstilizado = styled.section`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-flow: column;

	margin-bottom: clamp(20px, 5vw, 50px);

	min-height: 90vh;
`;

const HeaderEstilizado = styled.header`
	font-size: clamp(14px, 3vw, 24px);
`;

const MetaDatosBlogPost = styled.p`
	display: flex;
	align-items: center;
	justify-content: space-between;

	margin: 10px 0px;

	& span {
		display: block;
		font-size: clamp(9px, 2vw, 14px);
	}
`;

const ContenedorImagenPrincipal = styled.div`
	margin: 10px 0px;

	width: clamp(150px, 90vw, 800px);
`;

const DescripcionImagenPrincipal = styled.p`
	font-size: 1.2rem;

	text-align: center;
`;

const PostPage = ({data, ...props}) => {
	const {locale} = useLocalization();
	const {pathname} = useContext(ContextoURL);

	const [tiempoDeLectura, setTiempoDeLectura] = useState(0);

	const {frontmatter, wordCount, html, htmlAst} = data.markdownRemark;
	const posts = data.allMarkdownRemark.nodes;
	const siteURL = data.site.siteMetadata.siteUrl;
	const numeroDePalabras = wordCount.words;
	const slugTransformado = slugify(frontmatter.slug);
	const idiomaOpuesto = locale === "en" ? "es" : "en";

	const portada = getImage(frontmatter.portada);

	const contenido = [
		[
			"es",
			{
				textoDeLeerEnOtroIdioma: "Leer en Inglés",
				textoDetiempoDeLectura: "min de lectura",
				atribucionPrefijo: "Imagen por",
			},
		],
		[
			"en",
			{
				textoDeLeerEnOtroIdioma: "Read in Spanish",
				textoDetiempoDeLectura: "min read",
				atribucionPrefijo: "Image by",
			},
		],
	];

	const mapaContenido = new Map(contenido);

	const {textoDeLeerEnOtroIdioma, textoDetiempoDeLectura, atribucionPrefijo} = mapaContenido.get(locale);

	useEffect(() => {
		const calcularTiempoDeLectura = (numPalabras) => {
			const palabrasPorMinuto = 130;

			return Math.round(numPalabras / palabrasPorMinuto);
		};
		setTiempoDeLectura(calcularTiempoDeLectura(numeroDePalabras));
	}, [numeroDePalabras]);

	return (
		<BlogPostEstilizado itemscope itemtype="https://schema.org/Article">
			<Helmet>
				<title>{frontmatter.titulo}</title>
				<meta name="description" content={frontmatter.descripcion} />
			</Helmet>
			<CompartirMetaTags
				titulo={frontmatter.titulo}
				descripcion={frontmatter.descripcion}
				urlImagen={`${siteURL}${frontmatter.portada.publicURL}`}
				url={`${siteURL}${pathname}`}
			/>

			<NavBar quitarSeleccionarLenguajes>
				<LinkInterno to={`/${idiomaOpuesto}/blog/${slugTransformado}`} noLocalizado>
					{textoDeLeerEnOtroIdioma}
				</LinkInterno>
			</NavBar>
			<Compartir siteURL={siteURL}></Compartir>
			<InicioBlogPostEstilizado>
				<HeaderEstilizado>
					<Titulo itemProp="headline"> {frontmatter.titulo}</Titulo>
					<Titulo subtitulo>{frontmatter.subtitulo}</Titulo>
				</HeaderEstilizado>

				<ContenedorImagenPrincipal>
					<MetaDatosBlogPost>
						<span itemProp="datePublished">{frontmatter.fecha}</span>
						<span>
							{tiempoDeLectura} {textoDetiempoDeLectura}
						</span>
					</MetaDatosBlogPost>
					<GatsbyImage image={portada} alt={frontmatter.descripcionImagen}></GatsbyImage>
				</ContenedorImagenPrincipal>
				<DescripcionImagenPrincipal>{frontmatter.descripcionImagen}</DescripcionImagenPrincipal>
			</InicioBlogPostEstilizado>

			<Markdown itemProp="articleBody text" html={html} htmlAst={htmlAst}></Markdown>
			<Galeria cuadros={posts} esBlog></Galeria>

			<FooterPagina
				atribucion={
					frontmatter?.atribucionImagen ? `${atribucionPrefijo} ${frontmatter.atribucionImagen}` : null
				}
				atribucionURL={frontmatter?.urlAtribucionImagen}></FooterPagina>
		</BlogPostEstilizado>
	);
};

export default PostPage;

export const PostPageQuery = graphql`
	query PostTemplateQuery($locale: String!, $slug: String!) {
		site {
			siteMetadata {
				siteUrl
			}
		}
		markdownRemark(frontmatter: {slug: {eq: $slug}}, fields: {locale: {eq: $locale}}) {
			frontmatter {
				atribucionImagen
				descripcion
				descripcionImagen
				fecha(formatString: "DD, MMM, YYYY")
				slug
				subtitulo
				titulo
				portada {
					childImageSharp {
						gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH)
					}
					publicURL
				}
				urlAtribucionImagen
			}
			html
			htmlAst
			wordCount {
				words
			}
		}
		allMarkdownRemark(
			filter: {frontmatter: {tipo: {eq: "blog"}, slug: {ne: $slug}}, fields: {locale: {eq: $locale}}}
			limit: 4
		) {
			nodes {
				frontmatter {
					atribucionImagen
					descripcion
					descripcionImagen
					fecha(formatString: "DD, MMM, YYYY")
					slug
					subtitulo
					titulo
					portada {
						childImageSharp {
							gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH)
						}
						publicURL
					}
					urlAtribucionImagen
				}
			}
		}
	}
`;
