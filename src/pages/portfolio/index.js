import * as React from "react";
import {graphql} from "gatsby";
import styled from "styled-components";
import {useLocalization} from "gatsby-theme-i18n";
import {Helmet} from "react-helmet";
import NavBar from "../../components/organisms/NavBar";
import Contactame from "../../components/molecules/Contactame";
import FooterPagina from "../../components/organisms/FooterPagina";
import iconoFavicon from "../../assets/images/favicon.ico";
import Galeria from "../../components/organisms/Galeria";

const ContenedorGaleriaPortafolioEstilizado = styled.div`
	min-height: 100vh;
`;

const PortafolioPage = (props) => {
	const proyectos = props.data.allStrapiProyectos.nodes;

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
		allStrapiProyectos(limit: 30, filter: {locale: {eq: $locale}}) {
			nodes {
				id
				titulo
				stack
				portada {
					url
					localFile {
						childImageSharp {
							gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH)
						}
					}
				}
				url
				locale
			}
		}
	}
`;
