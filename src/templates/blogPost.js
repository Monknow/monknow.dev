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
import Subtitulo from "../components/atoms/Subtitulo";
import NavBar from "../components/organisms/NavBar";
import Compartir from "../components/molecules/Compartir";
import FooterPagina from "../components/organisms/FooterPagina";
import CompartirMetaTags from "../components/atoms/CompartirMetaTags";
import Galeria from "../components/organisms/Galeria";

import iconoFavicon from "../assets/images/favicon.ico";
import LinkInterno from "../components/atoms/LinkInterno";

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
	font-size: clamp(9px, 1.3vw, 16px);

	text-align: center;

	color: #333;
`;

const PostPage = ({data, ...props}) => {
	const {locale} = useLocalization();
	const {pathname} = useContext(ContextoURL);

	const [tiempoDeLectura, setTiempoDeLectura] = useState(0);

	const {frontmatter, wordCount, html} = data.markdownRemark;
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
		<div>
			<Helmet>
				<meta charSet="utf-8" />
				<meta name="referrer" content="origin" />
				<title>{frontmatter.titulo}</title>
				<link rel="icon" href={iconoFavicon} />
			</Helmet>
			<CompartirMetaTags
				titulo={frontmatter.titulo}
				subtitulo={frontmatter.subtitulo}
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
					<Titulo> {frontmatter.titulo}</Titulo>
					<Subtitulo>{frontmatter.subtitulo}</Subtitulo>
				</HeaderEstilizado>

				<ContenedorImagenPrincipal>
					<MetaDatosBlogPost>
						<span>{frontmatter.fecha}</span>
						<span>
							{tiempoDeLectura} {textoDetiempoDeLectura}
						</span>
					</MetaDatosBlogPost>
					<GatsbyImage image={portada} alt={frontmatter.descripcionImagen}></GatsbyImage>
				</ContenedorImagenPrincipal>
				<DescripcionImagenPrincipal>{frontmatter.descripcionImagen}</DescripcionImagenPrincipal>
			</InicioBlogPostEstilizado>

			<Markdown html={html}></Markdown>
			<Galeria cuadros={posts} esBlog></Galeria>

			<FooterPagina
				atribucion={
					frontmatter?.atribucionImagen ? `${atribucionPrefijo} ${frontmatter.atribucionImagen}` : null
				}
				atribucionURL={frontmatter?.urlAtribucionImagen}></FooterPagina>
		</div>
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
			}
		}
	}
`;
