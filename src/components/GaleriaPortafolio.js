import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import ContenedorGaleria from "./ContenedorGaleria";

function GaleriaPortafolio(props) {

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
          titulo={props.titulo}
          subtitulo={props.subtitulo}
          cuadros={proyectos}
          esBlogPost={false}>
        </ContenedorGaleria>
    </div>

  );
}

export default GaleriaPortafolio;