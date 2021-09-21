import * as React from "react";
import {graphql} from "gatsby";
import styled from "styled-components";
import {useLocalization} from "gatsby-theme-i18n";
import {Helmet} from "react-helmet";
import NavBar from "../components/organisms/NavBar";
import Contactame from "../components/molecules/Contactame";
import FooterPagina from "../components/organisms/FooterPagina";
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
				descripcion: "Proyectos sobre progrmacion, principalmente Frontend por Juan Diego Rodriguez",
			},
		],
		[
			"en",
			{
				titulo: "Portfolio",
				descripcion: "Programming projects, mainly Frontend. By Juan Diego Rodriguez",
			},
		],
	];
	const mapaContenido = new Map(contenido);

	const {titulo, descripcion} = mapaContenido.get(locale);

	return (
		<div>
			<Helmet>
				<title>{titulo}</title>
				<meta name="description" content={descripcion} />
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
