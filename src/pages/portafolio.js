import * as React from "react";
import { graphql } from "gatsby"
import styled, { createGlobalStyle } from 'styled-components';
import NavBar from "../components/NavBar";
import GaleriaPortafolio from "../components/GaleriaPortafolio";
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

const ContenedorGaleriaPortafolioEstilizado = styled.div`
    min-height: 100vh;
`;

const PortafolioPage = (props) => {

    const proyectos = props.data.allStrapiProyectos.nodes;


  return (
    <div>
        <EstilosGlobal></EstilosGlobal>
        <NavBar></NavBar>
        <ContenedorGaleriaPortafolioEstilizado>
            <GaleriaPortafolio titulo="Portafolio" subtitulo="Mis últimos proyectos" cuadros={proyectos}></GaleriaPortafolio>
        </ContenedorGaleriaPortafolioEstilizado>
        <Contactame></Contactame>
        <FooterPagina atribucion="" atribucionURL=""></FooterPagina>
        </div>
  )
}

export default PortafolioPage;

export const query = graphql`
    query AllProyectosQuery {
        allStrapiProyectos(limit: 30) {
        nodes {
            id
            titulo
            stack
            portada {
            url
            }
            url
        }
        }
    }
    
`

