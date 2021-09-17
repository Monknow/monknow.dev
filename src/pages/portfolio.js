import * as React from "react";
import {graphql} from "gatsby";
import styled from "styled-components";
import {useLocalization} from "gatsby-theme-i18n";
import {Helmet} from "react-helmet";
import NavBar from "../components/organisms/NavBar";
import Contactame from "../components/molecules/Contactame";
import FooterPagina from "../components/organisms/FooterPagina";
import iconoFavicon from "../assets/images/favicon.ico";
import Galeria from "../components/organisms/Galeria";

const ContenedorGaleriaPortafolioEstilizado = styled.div`
	min-height: 100vh;
`;

const PortafolioPage = ({data}) => {
	const proyectos = data.allMarkdownRemark.nodes;

	const {locale} = useLocalization();

	const contenido = [
		[
			"es",
			{
				titulo: "Portafolio",
			},
		],
		[
			"en",
			{
				titulo: "Portfolio",
			},
		],
	];
	const mapaContenido = new Map(contenido);

	const {titulo} = mapaContenido.get(locale);

	return (
		<div>
			<Helmet>
				<meta charSet="utf-8" />
				<link rel="icon" href={iconoFavicon} />
				<title>{titulo}</title>
				<meta name="referrer" content="origin" />
			</Helmet>
			<NavBar></NavBar>
			<ContenedorGaleriaPortafolioEstilizado>
				<Galeria cuadros={proyectos}></Galeria>
			</ContenedorGaleriaPortafolioEstilizado>
			<Contactame></Contactame>
			<FooterPagina></FooterPagina>
		</div>
	);
};

export default PortafolioPage;

export const query = graphql`
	query AllProyectosEnQueryPortafolioPage($locale: String!) {
		allMarkdownRemark(
			filter: {frontmatter: {tipo: {eq: "portafolio"}}, fields: {locale: {eq: $locale}}}
			limit: 10
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
