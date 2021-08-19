import * as React from "react";
import { graphql } from "gatsby"
import styled, { createGlobalStyle } from 'styled-components';
import { Helmet } from "react-helmet";
import NavBar from "../components/NavBar";
import GaleriaPortafolio from "../components/GaleriaPortafolio";
import Contactame from "../components/Contactame";
import FooterPagina from "../components/FooterPagina";
import iconoFavicon from "../images/favicon.ico";
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

const ContenedorGaleriaPortafolioEstilizado = styled.div`
    min-height: 100vh;
`;

const PortafolioPage = (props) => {

    const proyectos = props.data.allStrapiProyectos.nodes;


  return (
    <div>
        <Helmet>
            <meta charSet="utf-8" />
            <link rel="icon" href={iconoFavicon} />
            <title>Portfolio</title>
        </Helmet>
        <EstilosGlobal></EstilosGlobal>
        <NavBar location={props.location}></NavBar>
        <ContenedorGaleriaPortafolioEstilizado>
            <GaleriaPortafolio cuadros={proyectos}></GaleriaPortafolio>
        </ContenedorGaleriaPortafolioEstilizado>
        <Contactame></Contactame>
        <FooterPagina></FooterPagina>
        </div>
    )
}

export default PortafolioPage;

export const query = graphql`
    query AllProyectosEnQueryPortafolioPage($locale : String!) {
    allStrapiProyectos(limit: 30, filter: {locale: {eq: $locale}}) {
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

`

