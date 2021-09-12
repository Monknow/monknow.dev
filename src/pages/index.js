import * as React from "react";
import {Helmet} from "react-helmet";
import {graphql} from "gatsby";
import {useLocalization} from "gatsby-theme-i18n";
import NavBar from "../components/organisms/NavBar";
import Inicio from "../components/organisms/Inicio";
import SobreMi from "../components/molecules/SobreMi";
import Habilidades from "../components/organisms/Habilidades";

import Galeria from "../components/organisms/Galeria";
import Contactame from "../components/molecules/Contactame";
import FooterPagina from "../components/organisms/FooterPagina";
import iconoFavicon from "../assets/images/favicon.ico";

// markup
const IndexPage = ({data}) => {
	const {locale} = useLocalization();

	const contenido = [
		[
			"es",
			{
				atribucion: "Ilustración por StorySet",
			},
		],
		[
			"en",
			{
				atribucion: "Illustration by StorySet",
			},
		],
	];
	const mapaContenido = new Map(contenido);

	const {atribucion} = mapaContenido.get(locale);

	return (
		<div>
			<Helmet>
				<meta charSet="utf-8" />
				<meta name="referrer" content="origin" />
				<title>Monknow.dev</title>
				<link rel="icon" href={iconoFavicon} />
			</Helmet>
			<NavBar></NavBar>
			<Inicio></Inicio>
			<SobreMi></SobreMi>
			<Habilidades></Habilidades>
			<Galeria cuadros={data.allStrapiProyectos.nodes}></Galeria>
			<Galeria esBlog cuadros={data.allStrapiPosts.nodes}></Galeria>
			<Contactame></Contactame>
			<FooterPagina atribucion={atribucion} atribucionURL="https://storyset.com/"></FooterPagina>
		</div>
	);
};

export default IndexPage;

export const query = graphql`
	query AllStrapiCollectionTypesForIndexPageQuery($locale: String!) {
		allStrapiPosts(limit: 4, filter: {locale: {eq: $locale}}) {
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
		allStrapiProyectos(limit: 4, filter: {locale: {eq: $locale}}) {
			nodes {
				id
				titulo
				stack
				portada {
					url
				}
				url
				locale
			}
		}
	}
`;
