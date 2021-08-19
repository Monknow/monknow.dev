import * as React from "react";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import NavBar from "../components/NavBar";
import Inicio from "../components/Inicio";
import SobreMi from "../components/SobreMi";
import Habilidades from "../components/Habilidades";
import GaleriaBlog from "../components/GaleriaBlog";
import GaleriaPortafolio from "../components/GaleriaPortafolio";
import Contactame from "../components/Contactame";
import FooterPagina from "../components/FooterPagina";
import "../fonts/fonts.css";
import { createGlobalStyle } from "styled-components";
import iconoFavicon from "../images/favicon.ico";

const EstilosGlobal = createGlobalStyle`
    * {
        margin: 0px;
        padding: 0px;
    }

    html{
    scroll-behavior: smooth;
    }
`;

// markup
const IndexPage = ({ data }) => {
return (
    <div>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Monknow.dev</title>
        <link rel="icon" href={iconoFavicon} />
    </Helmet>
    <EstilosGlobal></EstilosGlobal>
    <NavBar></NavBar>
    <Inicio></Inicio>
    <SobreMi></SobreMi>
    <Habilidades></Habilidades>
    <GaleriaBlog cuadros={data.allStrapiPosts.nodes}></GaleriaBlog>
    <GaleriaPortafolio cuadros={data.allStrapiProyectos.nodes}></GaleriaPortafolio>
    <Contactame></Contactame>
    <FooterPagina></FooterPagina>
    </div>
);
};

export default IndexPage;

export const query = graphql`
query AllStrapiCollectionTypesForIndexPageQuery($locale : String!) {
    allStrapiPosts(limit: 4, filter: { locale: { eq: $locale } }) {
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
    allStrapiProyectos(limit: 4, filter: { locale: { eq: $locale } }) {
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
