import * as React from "react";
import { useContext } from "react";
import { graphql, useStaticQuery } from "gatsby";
import ContextoURL from "../context/ContextoURL";
import { useLocalization } from "gatsby-theme-i18n";
import ContenedorGaleria from "./ContenedorGaleria";
import BotonVerMas from "./BotonVerMas";

function GaleriaPortafolio(props) {
  const urlContexto = useContext(ContextoURL);
  const {locale} = useLocalization();

  const esVerMasNecesario = (url) => {
    const urlConPortafolio = url.match(/\/e(s|n)\/portafolio/);

    if (urlConPortafolio) {
      return false;
    } else {
      return true;
    }
  };

  const contenido = [
    ["es", { titulo: "Portafolio", subtitulo: "Donde la magia ocurre" }],
    ["en", { titulo: "Portfolio", subtitulo: "Where magic happens" }],
  ];
  const mapaContenido = new Map(contenido);

  const contenidoPorLenguaje = mapaContenido.get(locale);

  const data = useStaticQuery(graphql`
    query ProyectosQuery {
      allStrapiProyectos(limit: 6) {
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
  `);

  const proyectos = data.allStrapiProyectos.nodes;

  return (
    <div id="portafolio">
      <ContenedorGaleria
        titulo={contenidoPorLenguaje.titulo}
        subtitulo={contenidoPorLenguaje.subtitulo}
        cuadros={props.cuadros ? props.cuadros : proyectos}
        esBlogPost={false}
      >
        {esVerMasNecesario(urlContexto.pathname) ? (
          <BotonVerMas localizedLinkTo="/portafolio"></BotonVerMas>
        ) : (
          <div></div>
        )}
      </ContenedorGaleria>
    </div>
  );
}

export default GaleriaPortafolio;
