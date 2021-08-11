import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import Galeria from "./Galeria";

function GaleriaPortafolio(props) {
  const data = useStaticQuery(graphql`
  query ProyectosQuery {
    allStrapiCuadro(filter: {proyecto: {eq: true}}) {
      nodes {
        descripcion
        id
        proyecto
        subtitulo
        titulo
        url
        portada {
          url
        }
      }
    }
  }
  `);

  const cuadros = data.allStrapiCuadro.nodes;

  return (
    <div>
      <Galeria 
      id="portafolio"
      titulo="Portafolio"
      subtitulo="Donde la magia ocurre"
      cuadros={cuadros}
      >
      </Galeria>
    </div>
  );
}

export default GaleriaPortafolio;
