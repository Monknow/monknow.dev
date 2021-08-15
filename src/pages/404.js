import * as React from "react";
import { createGlobalStyle } from 'styled-components'
import NavBar from "../components/NavBar";
import GranMensaje from "../components/GranMensaje";
import FooterPagina from "../components/FooterPagina"
import "../fonts/fonts.css";
import ilustracionError404 from "../svg/404-error-rafiki.svg";

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
      <EstilosGlobal></EstilosGlobal>
      <NavBar></NavBar>
      <GranMensaje titulo="Página no encontrada 😬" subtitulo="Bueno, esto es incomodo" imagen={ilustracionError404} aspectRatio={1/1}></GranMensaje>
      <FooterPagina atribucion="Ilustracion por Storyset" atribucionURL="https://storyset.com/web"></FooterPagina>
    </main>
  )
}

export default NotFoundPage
