import * as React from "react";
import { createGlobalStyle } from 'styled-components';
import { Helmet } from "react-helmet";
import { useContext } from "react";
import ContextoURL from "../context/ContextoURL";
import useExtraerIdiomaDeURL from "../hooks/useExtraerIdiomaDeURL";
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
const NotFoundPage = (props) => {
  const urlContexto = useContext(ContextoURL); 
  const lenguaje = useExtraerIdiomaDeURL(urlContexto);

  const contenido = [
    ["es", { titulo: "Página no encontrada 😬", subtitulo: "Bueno, esto es incomodo" }],
    ["en", { titulo: "Page not found 😬", subtitulo: "Well, this is akward" }],
    ];
    const mapaContenido = new Map(contenido);

    const contenidoPorLenguaje = mapaContenido.get(lenguaje);


  return (
    <main>
      <Helmet>
        <meta charSet="utf-8" />
        <link rel="icon" href={iconoFavicon} />
        <title>Página no encontrada</title>
      </Helmet>
      <EstilosGlobal></EstilosGlobal>
      <NavBar location={props.location}></NavBar>
      <GranMensaje titulo={contenidoPorLenguaje.titulo} subtitulo={contenidoPorLenguaje.subtitulo} imagen={ilustracionError404} aspectRatio={1/1} contenidoBoton="Volver"></GranMensaje>
      <FooterPagina></FooterPagina>
    </main>
  )
}

export default NotFoundPage
