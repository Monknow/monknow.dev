import * as React from "react";
import { createGlobalStyle } from 'styled-components';
import { Helmet } from "react-helmet";
import NavBar from "../components/NavBar";
import GranMensaje from "../components/GranMensaje";
import FooterPagina from "../components/FooterPagina"
import "../fonts/fonts.css";
import iconoFavicon from "../images/favicon.ico";
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
        <Helmet>
          <meta charSet="utf-8" />
          <link rel="icon" href={iconoFavicon} />
          <title>¡Gracias!</title>
        </Helmet>
      <EstilosGlobal></EstilosGlobal>
      <NavBar></NavBar>
      <GranMensaje titulo="¡Gracias!" subtitulo="Leeré tu mensaje pronto" imagen={ilustracionGracias} aspectRatio={1/1}></GranMensaje>
      <FooterPagina atribucion="Ilustracion por Storyset" atribucionURL="https://storyset.com/web"></FooterPagina>
    </main>
  )
}

export default GraciasPage;
