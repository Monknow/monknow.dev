import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import Galeria from "./Galeria";

function GaleriaBlog({titulo, subtitulo}) {
  const data = useStaticQuery(graphql`
  query PostsQuery {
    allStrapiCuadro(filter: {proyecto: {eq: false}}) {
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
    <Galeria 
    id="blog"
    titulo={titulo}
    subtitulo={subtitulo}
    cuadros={cuadros}
    >
    </Galeria>
  );
}

export default GaleriaBlog;
