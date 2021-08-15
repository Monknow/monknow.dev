import * as React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import { StaticImage } from "gatsby-plugin-image";

const NavBarEstilizado = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;

    height: 6vh;

    margin-bottom: 4vh;
    padding: 20px;

    font-family: "Open Sans Regular";
    font-size: clamp(12px, 5vw, 20px);
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

const LinkEstilizado = styled(Link)`
    margin: 5px 0px;

    text-align: right;
    text-decoration: none;

    color: #141c3a;
`

const NavBar = () => {
return (
    <NavBarEstilizado>
    <Link to="/">
        <StaticImage
        src="../images/android-chrome-512x512.png"
        alt="logo de monknow"
        placeholder="blurred"
        layout="fixed"
        width={40}
        height={40}
        />
    </Link>
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
        <LinkEstilizado to="/#sobre-mi">Sobre mí</LinkEstilizado>
        <LinkEstilizado to="/#conocimientos">Conocimientos</LinkEstilizado>
        <LinkEstilizado to="/#portafolio">Portafolio</LinkEstilizado>
        <LinkEstilizado to="/#blog">Blog</LinkEstilizado>
        <LinkEstilizado to="/#contactame">Contactame</LinkEstilizado>
        </NavBarSeccionesLinks>
    </NavbarSecciones>
    </NavBarEstilizado>
);
};

export default NavBar;
