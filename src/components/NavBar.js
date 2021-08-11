import * as React from "react";
import { Link } from "gatsby";
import styled from "styled-components"

import navBarLogo from "../images/android-chrome-512x512.png";
import iconoMenu from "../svg/iconmonstr-menu-1.svg";

const NavBarEstilizado = styled.nav`    
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    min-height: 6vh;

    padding: 20px;

    font-family: "Open Sans Regular";
    font-size: clamp(12px, 5vw, 20px);
`

    const NavBarLogoEstilizado = styled.img`
        width: 40px;
    `

    const NavbarSecciones = styled.details`
        font-size: 1em;

    `

        const NavbarIconoMenu = styled.summary`
            list-style: none;
            text-align: right;

            cursor: pointer;

            &::marker{
                display: none;

            }
        `

        const NavBarSeccionesLinks = styled.div`
            position: absolute;
            right: 20px;

            display: flex;
            flex-flow: column wrap;

            & a{
                text-align: right;
                text-decoration: none;

                color: #141c3a;
            }
        `

const NavBar = () =>{
    return(
        <NavBarEstilizado>
        <Link to="/">
            <NavBarLogoEstilizado
            src={navBarLogo}
            alt="logo de monknow"
            />
        </Link>
        <NavbarSecciones>
            <NavbarIconoMenu>
        <img src={iconoMenu} alt="icono menu"></img>
        </NavbarIconoMenu>
        <NavBarSeccionesLinks>
            <Link to="/#sobre-mi">Sobre mí</Link>
            <Link to="/#conocimientos">Conocimientos</Link>
            <Link to="/#portafolio">Portafolio</Link>
            <Link to="blog-post">Blog</Link>
            <Link to="/#contactame">Contactame</Link>
        </NavBarSeccionesLinks>
        </NavbarSecciones>
    </NavBarEstilizado>
    )

}

export default NavBar;