import * as React from "react";
import { useLocalization } from "gatsby-theme-i18n";
import styled from "styled-components";
import Titulo from "./Titulo";
import codigoSVG from "../svg/iconmonstr-code-7.svg";
import herramientasSVG from "../svg/iconmonstr-tools-2.svg";

const ConocimientosEstilizados = styled.section`
    display: flex;
    justify-content: space-around;
    flex-flow: row wrap;

    position: relative;
    bottom: 150px;

    width: calc(95vw - 80px);

    margin: 0px auto -50px auto; /* Margén negativo para eliminar el espacio en blanco creado por el posicionamiento relativo*/
    border-radius: 12px;
    padding: 40px 20px;

    font-size: clamp(16px, 3vw, 22px);
    background-color: #fff;
    color: #141c3a;
    box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
    `;

    const CartaConocimientosEstilizada = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-flow: column;

    margin: 20px 20px 0px 20px;

    & ul {
        list-style: none;

        text-align: center;
    }

    & li {
        margin-bottom: 7px;

        font-size: 0.8em;
        font-family: "Open Sans Light";

        text-align: center;
    }
`;

const DescripcionCarta = styled.p`
display: block;

margin: 10px 0px;

font-size: 0.9em;
font-family: "Open Sans Semibold";

text-align: center;

color: #fca311;
`;

const CartaConocimientos = ({
imagen,
alternativaImagen,
titulo,
descripcion,
lista,
}) => {
return (
    <CartaConocimientosEstilizada>
    <img src={imagen} alt={alternativaImagen} />
    <Titulo contenido={titulo}></Titulo>
    <DescripcionCarta>{descripcion}</DescripcionCarta>
    <ul>
        {lista.map((elemento) => {
        return <li key={elemento}>{elemento}</li>;
        })}
    </ul>
    </CartaConocimientosEstilizada>
);
};

const Habilidades = () => {
    const {locale} = useLocalization();

    const contenido = [
        [
        "es",
        {
            lenguajes: {
            alternativaImagen: "icono de codigo",
            titulo: "Lenguajes",
            descripcion: "Lenguajes y librerías que disfruto usar:",
            },
            devTools: {
            alternativaImagen: "icono de herramientas",
            titulo: "Dev Tools",
            descripcion: "Herramientas que me facilitan la vida:",
            },
        },
        ],
        [
        "en",
        {
            lenguajes: {
            alternativaImagen: "code icon",
            titulo: "Languages",
            descripcion: "Languages and libraries that I enjoy using:",
            },
            devTools: {
            alternativaImagen: "tools icon",
            titulo: "Dev Tools",
            descripcion: "Tools that make my life easier:",
            },
        },
        ],
    ];
    const mapaContenido = new Map(contenido);

    const contenidoPorLenguaje = mapaContenido.get(locale);

    return (
        <ConocimientosEstilizados id="habilidades">
        <CartaConocimientos
            imagen={codigoSVG}
            alternativaImagen={contenidoPorLenguaje.lenguajes.alternativaImagen}
            titulo={contenidoPorLenguaje.lenguajes.titulo}
            descripcion={contenidoPorLenguaje.lenguajes.descripcion}
            lista={[
            "HTML",
            "CSS",
            "Sass",
            "Styled Components",
            "Gatsby",
            "JavaScript",
            "React",
            ]}
        ></CartaConocimientos>
        <CartaConocimientos
            imagen={herramientasSVG}
            alternativaImagen={contenidoPorLenguaje.devTools.alternativaImagen}
            titulo={contenidoPorLenguaje.devTools.titulo}
            descripcion={contenidoPorLenguaje.devTools.descripcion}
            lista={["Webpack", "NPM", "Git", "Github", "Codepen"]}
        ></CartaConocimientos>
        </ConocimientosEstilizados>
    );
};

export default Habilidades;
