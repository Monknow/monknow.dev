import * as React from "react";
import { graphql, Link } from "gatsby"
import styled, { createGlobalStyle } from 'styled-components';
import Boton from "../components/Boton";
import NavBar from "../components/NavBar";
import GaleriaBlog from "../components/GaleriaBlog";
import Contactame from "../components/Contactame";
import FooterPagina from "../components/FooterPagina";
import "../fonts/fonts.css";

const EstilosGlobal = createGlobalStyle`
    * {
        margin: 0px;
        padding: 0px;
    }

    html{
      scroll-behavior: smooth;
    }
`

const ContenedorGaleriaBlogEstilizado = styled.div`
    min-height: 100vh;
`;

const BlogPostsPage = (props) => {

    const posts = props.data.allStrapiPosts.nodes;


  return (
    <div>
        <EstilosGlobal></EstilosGlobal>
        <NavBar></NavBar>
        <ContenedorGaleriaBlogEstilizado>
            <GaleriaBlog titulo="Blog" subtitulo="Mis últimas públicaciones" cuadros={posts}></GaleriaBlog>
        </ContenedorGaleriaBlogEstilizado>
        <Contactame></Contactame>
        <FooterPagina atribucion="" atribucionURL=""></FooterPagina>
        </div>
  )
}

export default BlogPostsPage;

export const query = graphql`
    query AllPostQuery  {
        allStrapiPosts(limit: 30) {
                nodes {
                id
                titulo
                subtitulo
                imagenPrincipal {
                url
                }
            }
        }
    }
    
`

