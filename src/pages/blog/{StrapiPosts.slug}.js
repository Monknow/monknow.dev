import * as React from "react";
import {useEffect, useState, useContext} from "react";
import ContextoURL from "../../context/ContextoURL";
import ReactMarkdown from "react-markdown";
import {graphql, Link} from "gatsby";
import {GatsbyImage, getImage} from "gatsby-plugin-image";
import {Helmet} from "react-helmet";
import styled, {createGlobalStyle} from "styled-components";
import {useLocalization} from "gatsby-theme-i18n";
import slugify from "@sindresorhus/slugify";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {dark} from "react-syntax-highlighter/dist/esm/styles/prism";

import Titulo from "../../components/Titulo";
import Subtitulo from "../../components/Subtitulo";
import NavBar from "../../components/NavBar";
import Compartir from "../../components/Compartir";
import GaleriaBlog from "../../components/GaleriaBlog";
import FooterPagina from "../../components/FooterPagina";

import iconoFavicon from "../../images/favicon.ico";
import "../../fonts/fonts.css";

const EstilosGlobal = createGlobalStyle`
    * {
        margin: 0px;
        padding: 0px;
    }

    html{
        scroll-behavior: smooth;
        font-family: "Open Sans Regular";
    }
`;

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

const ContenidoBlogPostEstilizado = styled.section`
	font-size: clamp(12px, 3vw, 20px);
`;

const TextoPost = styled.div`
	width: clamp(100px, 80vw, 700px);
	margin: 0px auto;

	font-family: "Open Sans Light";

	line-height: clamp(25px, 5vw, 35px);
	text-align: justify;
`;

const Markdown = styled(ReactMarkdown)`
	& {
		p {
			margin: clamp(12px, 3vw, 20px) 0px;
		}

		h1 {
			font-size: 2rem;
		}

		h2 {
			font-size: 1.5rem;
		}

		h1,
		h2,
		h3,
		h4,
		h5,
		h6 {
			margin: clamp(24px, 3vw, 40px) 0px;

			font-family: "Open Sans Semibold";
		}

		img {
			width: 100%;
			margin: 40px 0px;
			box-shadow: 0px 9px 14px -5px rgba(0, 0, 0, 0.75);
		}
	}
`;

const codeStyles = {
	display: "block",

	margin: "30px 0px",
	padding: "8px",
	border: "none",
	borderRadius: "4px",

	width: "100%",

	fontWeight: "500",
	fontSize: "clamp(12px, 3vw, 15px)",

	backgroundColor: "#201c29",
	color: "#ddd",
	textShadow: "#fff0",
};

const PostPage = ({data}) => {
	const {locale} = useLocalization();
	const {href} = useContext(ContextoURL);

	const [tiempoDeLectura, setTiempoDeLectura] = useState(0);

	const post = data.infoPosts;
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

				{/* share meta tags */}
				<meta property="og:title" content={post.titulo} />
				<meta property="og:description" content={post.subtitulo} />
				<meta property="og:image" content={post.imagenPrincipal.url} />
				<meta property="og:url" content={href} />

				<meta property="twitter:title" content={post.titulo} />
				<meta property="twitter:description" content={post.subtitulo} />
				<meta property="twitter:image" content={post.imagenPrincipal.url} />
				<meta property="twitter:url" content={href} />
			</Helmet>
			<EstilosGlobal></EstilosGlobal>
			<NavBar quitarSeleccionarLenguajes>
				<Link to={`/${idiomaOpuesto}/blog/${slugTransformado}`}>{textoDeLeerEnOtroIdioma}</Link>
			</NavBar>
			<Compartir></Compartir>
			<InicioBlogPostEstilizado>
				<HeaderEstilizado>
					<Titulo contenido={post.titulo}></Titulo>
					<Subtitulo contenido={post.subtitulo}></Subtitulo>
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
			<ContenidoBlogPostEstilizado>
				<TextoPost>
					<Markdown
						children={post.texto}
						components={{
							code({node, inline, className, children, ...props}) {
								const match = /language-(\w+)/.exec(className || "");
								return !inline && match ? (
									<SyntaxHighlighter
										children={String(children).replace(/\n$/, "")}
										language={match[1]}
										style={dark}
										showLineNumbers
										customStyle={codeStyles}
										PreTag="div"
										{...props}
									/>
								) : (
									<code {...props}>{children}</code>
								);
							},
						}}
					/>
				</TextoPost>
			</ContenidoBlogPostEstilizado>
			<GaleriaBlog cuadros={posts}></GaleriaBlog>
			<FooterPagina
				atribucion={post?.atribucionImagen ? `${atribucionPrefijo} ${post.atribucionImagen}` : null}
				atribucionURL={post?.urlAtribucionImagen}></FooterPagina>
		</div>
	);
};

export default PostPage;

export const query = graphql`
	query PostEnQueryPostPage($slug: String!, $locale: String!) {
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
				}
			}
		}
	}
`;
