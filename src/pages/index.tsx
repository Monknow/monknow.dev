import * as React from "react";
import {FC} from "react";
import {Helmet} from "react-helmet";
import {graphql} from "gatsby";
import {useLocalization} from "gatsby-theme-i18n";
import styled, {createGlobalStyle} from "styled-components";
import {IndexPageContent, IndexPageProps} from "@interfaces/IndexPageTypes";
import {NavBar} from "../components/organisms/NavBar";
import {Inicio} from "../components/organisms/Inicio";
import {SobreMi} from "../components/molecules/SobreMi";
import {Habilidades} from "../components/organisms/Habilidades";
import {Galeria} from "../components/organisms/Galeria";
import {Contactame} from "../components/molecules/Contactame";
import {FooterPagina} from "../components/organisms/FooterPagina";

export const EstilosGlobalesDeIndex = createGlobalStyle`
        scroll-behavior: smooth;
`;


const Galerias = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-flow: column nowrap;
	gap: clamp(15px, 15vw, 40px);
`;

// markup
const IndexPage: FC<IndexPageProps> = ({data}) => {
	const {locale} = useLocalization();
	const localeFijado = locale === "en" ? "en" : "es";

	const recordContenido: Record<"es" | "en", IndexPageContent> = {
		es: {
			atribucion: "Ilustración por StorySet",
			descripcion:
				"Me llamo Juan Diego Rodriguez, mucho gusto. Soy un desarrollador web especializado en el frontend. Uso principalmente React, pero me adapto bien y conozco las tecnologías usadas en el desarrollo web moderno. Me desempeño en trabajos remotos.",
		},
		en: {
			atribucion: "Illustration by StorySet",
			descripcion:
				"My name is Juan Diego Rodriguez, nice to meet you. I am a web developer specialized in the frontend. I mainly use React, but I adapt well and I know the technologies used in modern web development. I work in remote jobs.",
		},
	};

	const {atribucion, descripcion} = recordContenido[localeFijado];

	return (
		<div>
			<EstilosGlobalesDeIndex/>
			<Helmet>
				<title>Monknow.dev</title>
				<meta name="description" content={descripcion} />
			</Helmet>
			<NavBar></NavBar>
			<Inicio></Inicio>
			<SobreMi></SobreMi>
			<Habilidades></Habilidades>
			<Galerias>
				<Galeria id="portfolio" cuadros={data.proyectos.nodes}></Galeria>
				<Galeria id="blog" esBlog cuadros={data.posts.nodes}></Galeria>
			</Galerias>
			<Contactame></Contactame>
			<FooterPagina atribucion={atribucion} atribucionURL="https://storyset.com/"></FooterPagina>
		</div>
	);
};

export default IndexPage;

export const query = graphql`
	query IndexPageQuery($locale: String!) {
		posts: allMarkdownRemark(
			filter: {frontmatter: {tipo: {eq: "blog"}}, fields: {locale: {eq: $locale}}}
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
			}
		}
		proyectos: allMarkdownRemark(
			filter: {frontmatter: {tipo: {eq: "portafolio"}}, fields: {locale: {eq: $locale}}}
			limit: 6
		) {
			nodes {
				frontmatter {
					subtitulo
					titulo
					url
					portada {
						childImageSharp {
							gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH)
						}
					}
					descripcionImagen
				}
			}
		}
	}
`;
