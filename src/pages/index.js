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
			<Galeria id="portfolio" cuadros={data.proyectos.nodes}></Galeria>
			<Galeria id="blog" esBlog cuadros={data.posts.nodes}></Galeria>
			<Contactame></Contactame>
			<FooterPagina atribucion={atribucion} atribucionURL="https://storyset.com/"></FooterPagina>
		</div>
	);
};

export default IndexPage;

export const query = graphql`
	query AllStrapiCollectionTypesForIndexPageQuery($locale: String!) {
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
				html
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
				}
			}
		}
	}
`;
