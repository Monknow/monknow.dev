import * as React from "react";
import { useLocalization } from "gatsby-theme-i18n";
import { useContext } from "react";
import { graphql, useStaticQuery } from "gatsby";
import ContextoURL from "../context/ContextoURL";
import ContenedorGaleria from "./ContenedorGaleria";
import BotonVerMas from "./BotonVerMas";

const GaleriaBlog = (props) => {
  const urlContexto = useContext(ContextoURL);
  const {locale} = useLocalization();

  const esVerMasNecesario = (url) => {
    const urlConBlog = url.match(/\/e(s|n)\/blog(\/|)$/);

    if (urlConBlog) {
      return false;
    } else {
      return true;
    }
  };

  const contenido = [
    ["es", { titulo: "Blog", subtitulo: "Mis últimas publicaciones" }],
    ["en", { titulo: "Blog", subtitulo: "My latest posts" }],
  ];
  const mapaContenido = new Map(contenido);

  const contenidoPorLenguaje = mapaContenido.get(locale);

  const data = useStaticQuery(graphql`
    query MyQuery {
      allStrapiPosts(limit: 4) {
        nodes {
          id
          titulo
          subtitulo
          slug
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
        titulo={contenidoPorLenguaje.titulo}
        subtitulo={contenidoPorLenguaje.subtitulo}
        cuadros={props.cuadros ? props.cuadros : posts}
        esBlogPost={true}
      >
        {esVerMasNecesario(urlContexto.pathname) ? (
          <BotonVerMas localizedLinkTo="/blog"></BotonVerMas>
        ) : (
          <div></div>
        )}
      </ContenedorGaleria>
    </div>
  );
}

export default GaleriaBlog;
