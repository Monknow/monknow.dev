import * as React from "react";
import { createGlobalStyle } from 'styled-components';
import { Helmet } from "react-helmet";
import NavBar from "../components/NavBar";
import GranMensaje from "../components/GranMensaje";
import FooterPagina from "../components/FooterPagina"
import "../fonts/fonts.css";
import ilustracionError404 from "../svg/404-Error-rafiki.svg";
import iconoFavicon from "../images/favicon.ico";

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
const NotFoundPage = () => {
  return (
    <main>
      <Helmet>
        <meta charSet="utf-8" />
        <link rel="icon" href={iconoFavicon} />
        <title>Página no encontrada</title>
      </Helmet>
      <EstilosGlobal></EstilosGlobal>
      <NavBar></NavBar>
      <GranMensaje titulo="Página no encontrada 😬" subtitulo="Bueno, esto es incomodo" imagen={ilustracionError404} aspectRatio={1/1}></GranMensaje>
      <FooterPagina atribucion="Ilustracion por Storyset" atribucionURL="https://storyset.com/web"></FooterPagina>
    </main>
  )
}

export default NotFoundPage
