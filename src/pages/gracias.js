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
const GraciasPage = (props) => {
  return (
    <main>
        <Helmet>
          <meta charSet="utf-8" />
          <link rel="icon" href={iconoFavicon} />
          <title>Thank you!</title>
        </Helmet>
      <EstilosGlobal></EstilosGlobal>
      <NavBar location={props.location}></NavBar>
      <GranMensaje titulo="Thank you!" subtitulo="I will read your message soon" imagen={ilustracionGracias} contenidoBoton="Go back" aspectRatio={1/1}></GranMensaje>
      <FooterPagina></FooterPagina>
    </main>
  )
}

export default GraciasPage;
