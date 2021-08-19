import * as React from "react";
import { LocalizedLink } from "gatsby-theme-i18n"; 
import styled from "styled-components";
import { useContext } from "react";
import ContextoURL from "../context/ContextoURL";
import useExtraerIdiomaDeURL from "../hooks/useExtraerIdiomaDeURL";
import { StaticImage } from "gatsby-plugin-image";
import SeleccionarLenguaje from "./SeleccionarLenguaje";


const NavBarEstilizado = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;

    height: 6vh;

    margin-bottom: 4vh;
    padding: 20px;

    font-family: "Open Sans Regular";
    font-size: clamp(12px, 5vw, 20px);

    & a{
        margin: 3px 5px;

        text-align: right;
        text-decoration: none;

        color: #141c3a;
    }
`;

const NavbarSecciones = styled.details`
    font-size: 1em;
`;

const NavbarIconoMenu = styled.summary`
    height: 24px;

    list-style: none;
    text-align: right;

    cursor: pointer;

    &::marker {
        display: none;
    }
`;

const NavBarSeccionesLinks = styled.div`
    position: absolute;
    right: 20px;
    z-index: 100;

    display: flex;
    flex-flow: column wrap;

    background-color: #fff;


`;


const NavBar = (props) => {
    const urlContexto = useContext(ContextoURL); 
    const lenguaje = useExtraerIdiomaDeURL(urlContexto);

    const contenido = [
    ["es", { sobreMi: "Sobre mí", habilidades: "Habilidades", portafolio: "Portafolio", blog: "Blog", contactame: "Contactame" }],
    ["en", { sobreMi: "About me", habilidades: "Skills", portafolio: "Portfolio", blog: "Blog", contactame: "Contact me" }],
    ];
    const mapaContenido = new Map(contenido);

    const contenidoPorLenguaje = mapaContenido.get(lenguaje);

    return (
        <NavBarEstilizado>
        <LocalizedLink to="/">
            <StaticImage
            src="../images/android-chrome-512x512.png"
            alt="logo de monknow"
            placeholder="blurred"
            layout="fixed"
            width={40}
            height={40}
            />
        </LocalizedLink>
        {props.quitarSeleccionarLenguajes?(
            <div>
                {props.children}
            </div>
        ):(
            <SeleccionarLenguaje></SeleccionarLenguaje>
        )            
        }
        <NavbarSecciones>
            <NavbarIconoMenu>
            <StaticImage
                src="../svg/iconmonstr-menu-1.svg"
                alt="icono menu"
                placeholder="blurred"
                layout="fixed"
                width={24}
                height={24}
            ></StaticImage>
            </NavbarIconoMenu>
            
            <NavBarSeccionesLinks>
                <LocalizedLink to="/#sobre-mi">{contenidoPorLenguaje.sobreMi}</LocalizedLink>
                <LocalizedLink to="/#habilidades">{contenidoPorLenguaje.habilidades}</LocalizedLink>
                <LocalizedLink to="/#portafolio">{contenidoPorLenguaje.portafolio}</LocalizedLink>
                <LocalizedLink to="/#blog">{contenidoPorLenguaje.blog}</LocalizedLink>
                <LocalizedLink to="/#contactame">{contenidoPorLenguaje.contactame}</LocalizedLink>
            </NavBarSeccionesLinks>
        </NavbarSecciones>
        </NavBarEstilizado>
    );
};

export default NavBar;
