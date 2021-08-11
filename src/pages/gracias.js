import * as React from "react";
import { createGlobalStyle } from 'styled-components'
import NavBar from "../components/NavBar";
import GranMensaje from "../components/GranMensaje";
import FooterPagina from "../components/FooterPagina"
import "../fonts/fonts.css";
import ilustracionGracias from "../svg/thank-you-rafiki.svg"

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
const GraciasPage = () => {
  return (
    <main>
      <EstilosGlobal></EstilosGlobal>
      <NavBar></NavBar>
      <GranMensaje titulo="¡Gracias!" subtitulo="Leeré tu mensaje pronto" imagen={ilustracionGracias} aspectRatio={1/1}></GranMensaje>
      <FooterPagina atribucion="Ilustracion por Storyset" atribucionURL="https://storyset.com/web"></FooterPagina>
    </main>
  )
}

export default GraciasPage;
