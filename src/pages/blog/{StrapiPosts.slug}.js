import * as React from "react";
import {useEffect, useState, useContext} from "react";
import ContextoURL from "../../context/ContextoURL";
import Markdown from "../../components/atoms/Markdown";
import {graphql} from "gatsby";
import {GatsbyImage, getImage} from "gatsby-plugin-image";
import {Helmet} from "react-helmet";
import styled from "styled-components";
import {useLocalization} from "gatsby-theme-i18n";
import slugify from "@sindresorhus/slugify";

import Titulo from "../../components/atoms/Titulo";
import Subtitulo from "../../components/atoms/Subtitulo";
import NavBar from "../../components/organisms/NavBar";
import Compartir from "../../components/molecules/Compartir";
import Galeria from "../../components/organisms/Galeria";
import FooterPagina from "../../components/organisms/FooterPagina";
import CompartirMetaTags from "../../components/atoms/CompartirMetaTags";

import iconoFavicon from "../../assets/images/favicon.ico";
import LinkInterno from "../../components/atoms/LinkInterno";

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

const PostPage = ({data}) => {
	const {locale} = useLocalization();
	const {pathname} = useContext(ContextoURL);

	const [tiempoDeLectura, setTiempoDeLectura] = useState(0);

	const post = data.infoPosts;
	const siteURL = data.site.siteMetadata.siteUrl;
	const numeroDePalabras = post.texto.split(" ").length;
	const slugTransformado = slugify(post.slug);
	const idiomaOpuesto = locale === "en" ? "es" : "en";

	const posts = data.allStrapiPosts.nodes;
	const imagenPrincipal = getImage(post.imagenPrincipal.localFile);

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
				<title>{post.titulo}</title>
				<link rel="icon" href={iconoFavicon} />
			</Helmet>
			<CompartirMetaTags
				titulo={post.titulo}
				subtitulo={post.subtitulo}
				urlImagen={post.imagenPrincipal.url}
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
					<Titulo> {post.titulo}</Titulo>
					<Subtitulo>{post.subtitulo}</Subtitulo>
				</HeaderEstilizado>

				<ContenedorImagenPrincipal>
					<MetaDatosBlogPost>
						<span>
							{post.published_at} ({post.updated_at})
						</span>
						<span>
							{tiempoDeLectura} {textoDetiempoDeLectura}
						</span>
					</MetaDatosBlogPost>
					<GatsbyImage image={imagenPrincipal} alt={post.descripcionImagen}></GatsbyImage>
				</ContenedorImagenPrincipal>
				<DescripcionImagenPrincipal>{post.descripcionImagen}</DescripcionImagenPrincipal>
			</InicioBlogPostEstilizado>

			<Markdown markdown={post.texto}></Markdown>

			<Galeria esBlog cuadros={posts}></Galeria>
			<FooterPagina
				atribucion={post?.atribucionImagen ? `${atribucionPrefijo} ${post.atribucionImagen}` : null}
				atribucionURL={post?.urlAtribucionImagen}></FooterPagina>
		</div>
	);
};

export default PostPage;

export const query = graphql`
	query PostEnQueryPostPage($slug: String!, $locale: String!) {
		site {
			siteMetadata {
				siteUrl
			}
		}
		infoPosts: strapiPosts(slug: {eq: $slug}, locale: {eq: $locale}) {
			id
			titulo
			subtitulo
			published_at(formatString: "DD MMM, YYYY")
			updated_at(formatString: "DD MMM, YYYY")
			texto
			slug
			imagenPrincipal {
				url
				localFile {
					childImageSharp {
						gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH)
					}
				}
			}
			descripcionImagen
			urlAtribucionImagen
			atribucionImagen
		}
		allStrapiPosts(limit: 4, filter: {slug: {ne: $slug}, locale: {eq: $locale}}) {
			nodes {
				id
				titulo
				subtitulo
				slug
				imagenPrincipal {
					url
					localFile {
						childImageSharp {
							gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH)
						}
					}
				}
			}
		}
	}
`;
