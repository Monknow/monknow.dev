import * as React from "react";
import {graphql} from "gatsby";
import styled from "styled-components";
import {Helmet} from "react-helmet";
import NavBar from "../components/organisms/NavBar";
import Contactame from "../components/molecules/Contactame";
import FooterPagina from "../components/organisms/FooterPagina";
import iconoFavicon from "../assets/images/favicon.ico";
import Galeria from "../components/organisms/Galeria";

const ContenedorGaleriaBlogEstilizado = styled.div`
	min-height: 100vh;
`;

const BlogPostsPage = ({data}) => {
	const posts = data.allMarkdownRemark.nodes;

	return (
		<div>
			<Helmet>
				<meta charSet="utf-8" />
				<link rel="icon" href={iconoFavicon} />
				<title>Blog</title>
			</Helmet>
			<NavBar></NavBar>
			<ContenedorGaleriaBlogEstilizado>
				<Galeria esBlog cuadros={posts}></Galeria>
			</ContenedorGaleriaBlogEstilizado>
			<Contactame></Contactame>
			<FooterPagina></FooterPagina>
		</div>
	);
};

export default BlogPostsPage;

export const query = graphql`
	query AllPostEnQueryBlogPage($locale: String!) {
		allMarkdownRemark(filter: {frontmatter: {tipo: {eq: "blog"}}, fields: {locale: {eq: $locale}}}, limit: 10) {
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
