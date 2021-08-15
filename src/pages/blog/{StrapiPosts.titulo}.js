import * as React from "react";
import ReactMarkdown from "react-markdown";
import { graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Helmet } from "react-helmet";
import styled, { createGlobalStyle } from "styled-components";
import Titulo from "../../components/Titulo";
import Subtitulo from "../../components/Subtitulo";
import NavBar from "../../components/NavBar";
import Compartir from "../../components/Compartir";
import GaleriaBlog from "../../components/GaleriaBlog";
import Boton from "../../components/Boton";
import FooterPagina from "../../components/FooterPagina";

import "../../fonts/fonts.css";

const EstilosGlobal = createGlobalStyle`
    * {
        margin: 0px;
        padding: 0px;
    }

    html{
        scroll-behavior: smooth;
        font-family: "Open Sans Regular";
    }
`;

const InicioBlogPostEstilizado = styled.section`
display: flex;
align-items: center;
justify-content: center;
flex-flow: column;

margin-bottom: clamp(20px, 5vw, 50px);

min-height: 90vh;
`;

const HeaderEstilizado = styled.header`
font-size: clamp(14px, 3vw, 24px);
`;

const MetaDatosBlogPost = styled.p`
display: flex;
align-items: center;
justify-content: space-between;

width: 90vw;

& span {
    display: block;
    font-size: clamp(9px, 2vw, 14px);
}
`;

const ContenedorImagenPrincipal = styled.div`
margin: 10px 0px;

width: clamp(150px, 90vw, 800px);
`;

const DescripcionImagenPrincipal = styled.p`
font-size: clamp(9px, 1.3vw, 16px);

text-align: center;

color: #333;
`;

const ContenidoBlogPostEstilizado = styled.section`
font-size: clamp(12px, 3vw, 20px);
`;

const TextoPost = styled.div`
width: clamp(100px, 80vw, 700px);
margin: 0px auto;

font-family: "Open Sans Light";

line-height: clamp(25px, 5vw, 35px);
text-align: justify;
`;

const Markdown = styled(ReactMarkdown)`
& img {
    width: 100%;
}

& p {
    margin: clamp(12px, 3vw, 20px) 0px;
}

& h1,
h2,
h3,
h4,
h5,
h6 {
    margin: clamp(12px, 3vw, 20px) 0px calc(clamp(12px, 3vw, 20px) * 2) 0px;

    font-family: "Open Sans Semibold";
}
`;

const ContenedorGaleriaBlog = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-flow: column nowrap;
`;

const BlogPost = (props) => {
const post = props.data.strapiPosts;
const posts = props.data.allStrapiPosts.nodes;
const imagenPrincipal = getImage(post.imagenPrincipal.localFile);

return (
    <div>
        <Helmet>
            <title>{post.titulo}</title>
        </Helmet>
    <EstilosGlobal></EstilosGlobal>
    <NavBar></NavBar>
    <Compartir location={props.location}></Compartir>
    <InicioBlogPostEstilizado>
        <HeaderEstilizado>
        <Titulo contenido={post.titulo}></Titulo>
        <Subtitulo contenido={post.subtitulo}></Subtitulo>
        </HeaderEstilizado>
        <MetaDatosBlogPost>
        <span>{post.published_at}</span>
        <span>{post.lectura} minutos de lectura</span>
        </MetaDatosBlogPost>
        <ContenedorImagenPrincipal>
        <GatsbyImage
            image={imagenPrincipal}
            alt={post.descripcionImagen}
        ></GatsbyImage>
        </ContenedorImagenPrincipal>
        <DescripcionImagenPrincipal>
        {post.descripcionImagen}
        </DescripcionImagenPrincipal>
    </InicioBlogPostEstilizado>
    <ContenidoBlogPostEstilizado>
        <TextoPost>
        <Markdown>{post.texto}</Markdown>
        </TextoPost>
    </ContenidoBlogPostEstilizado>
    <ContenedorGaleriaBlog>
        <GaleriaBlog
        titulo="Estas publicaciones te podrían gustar"
        subtitulo=""
        cuadros={posts}
        ></GaleriaBlog>
        <Link to="/blog">
            <Boton contenido="Ver más"></Boton>
        </Link>
    </ContenedorGaleriaBlog>
    <FooterPagina
        atribucion="Imagen por Pexel"
        atribucionURL="https://pexels.com"
    ></FooterPagina>
    </div>
);
};

export default BlogPost;

export const query = graphql`
query PostQuery($id: String!) {
    strapiPosts(id: { eq: $id }) {
    id
    titulo
    subtitulo
    published_at(formatString: "DD MMM, YYYY")
    lectura
    texto
    imagenPrincipal {
        localFile {
        childImageSharp {
            gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH)
        }
        }
    }
    descripcionImagen
    }
    allStrapiPosts(limit: 4, filter: { id: { ne: $id } }) {
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
`;
