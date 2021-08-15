import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import ContenedorGaleria from "./ContenedorGaleria";

function GaleriaBlog(props) {
  const data = useStaticQuery(graphql`
  query MyQuery {
    allStrapiPosts(limit: 4) {
      nodes {
        id
        titulo
        subtitulo
        imagenPrincipal {
          url
        }
      }
    }
  }
  `);

  const posts = data.allStrapiPosts.nodes;

  return (
    <div id="blog">
      <ContenedorGaleria 
          titulo={props.titulo}
          subtitulo={props.subtitulo}
          cuadros={props.cuadros? props.cuadros : posts}
          esBlogPost={true}>
        </ContenedorGaleria>
    </div>

  );
}

export default GaleriaBlog;


