import * as React from "react";
import NavBar from "../components/NavBar";
import Inicio from "../components/Inicio";
import SobreMi from "../components/SobreMi";
import Conocimientos from "../components/Conocimientos";
import GaleriaPortafolio from "../components/GaleriaPortafolio";
import GaleriaBlog from "../components/GaleriaBlog";
import Contactame from "../components/Contactame";
import FooterPagina from "../components/FooterPagina";
import "../fonts/fonts.css";
import { createGlobalStyle } from 'styled-components'

const EstilosGlobal = createGlobalStyle`
    * {
        margin: 0px;
        padding: 0px;
    }

    html{
      scroll-behavior: smooth;
    }
`



// markup
const IndexPage = () => {
  return (
    <div>
      <EstilosGlobal></EstilosGlobal>
      <NavBar></NavBar>
      <Inicio></Inicio>
      <SobreMi></SobreMi>
      <Conocimientos></Conocimientos>
      <GaleriaPortafolio></GaleriaPortafolio>
      <GaleriaBlog titulo="Blog" subtitulo="Mis últimas públicaciones"></GaleriaBlog>
      <Contactame></Contactame>
      <FooterPagina atribucion="Ilustracion por Storyset" atribucionURL="https://storyset.com/web"></FooterPagina>
    </div>
  )
}

export default IndexPage
