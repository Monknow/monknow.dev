import * as React from "react";
import { useLocalization } from "gatsby-theme-i18n";
import logoPositivo from "../images/logo-2.png";
import styled from "styled-components";

const FooterEstilizado = styled.footer`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;

    height: 100vh;
    
    text-align: center;

    background-color: #fca311;
    color: #Fff;
`;

    const FooterLogo = styled.img`
        width: 50px;

        margin: 100px 0px 40px 0px;
    `;

    const FooterFrase = styled.p`
        margin-bottom: 15px;

        font-family: "Open Sans Semibold";
        font-size: 0.9em;   
    `;

    const FooterRedesSociales = styled.ul`
        display: flex;
        align-items: center;
        justify-content: center;
        flex-flow: row wrap;
        
        padding: 0px;

        list-style: none;   
    `;

    const FooterRedesSocialesItem = styled.a`
        display: flex;
        align-items: center;
        justify-content: center;

        width: 50px;
        height: 50px;

        margin: 20px;
        border: 1px solid rgba(255, 255, 255, 0.541);
        border-radius: 50%;
        outline: none;

        transition: all 100ms;

        &:hover, &:focus{
            background: #fff;
        }

        &:hover svg, &:focus svg{
            fill: #fca311;
            
        }
    `;

        const FooterRedesSocialesItemLi = styled.li`
            width: 24px;
            height: 24px;   
        `;

    const DerechosAutor = styled.p`
        margin: 10px;

        font-family: "Open Sans Light";
        font-size: 0.8em;
    `;


    const Atribucion = styled.a`
        font-family: "Open Sans Light";
        font-size: 0.7em;

        text-decoration: none;

        color: rgb(255, 255, 255);
    `;  



const FooterPagina = () => {
    const {locale} = useLocalization();

    const contenido = [
        [
        "es",
        {
            frase: "Aprendiendo y mejorando cada vez más",
            derechosDeAutor: "Página programada por mí",
            atribucion: "Ilustraciones por Storyset",
        },
        ],
        [
        "en",
        {
            frase: "Learning and improving more and more",
            derechosDeAutor: "Page programmed by me",
            atribucion: "Illustrations by Storyset",
        },
        ],
    ];
    const mapaContenido = new Map(contenido);
    
    const contenidoPorLenguaje = mapaContenido.get(locale);

    return (
    <FooterEstilizado>
        <FooterLogo src={logoPositivo} alt="logo de monknow"/>
        <FooterFrase>{contenidoPorLenguaje.frase}</FooterFrase>
        <FooterRedesSociales>
        <FooterRedesSocialesItem
            href="https://twitter.com/CodeMonknow"
            target="_blank"
            rel="noreferrer"
        >
            <FooterRedesSocialesItemLi>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#FFf"
                width="24"
                height="24"
                viewBox="0 0 24 24"
            >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
            </svg>
            </FooterRedesSocialesItemLi>
        </FooterRedesSocialesItem>
        <FooterRedesSocialesItem
            href="https://www.linkedin.com/in/monknow"
            target="_blank"
            rel="noreferrer"
        >
            <FooterRedesSocialesItemLi>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#FFf"
                width="24"
                height="24"
                viewBox="0 0 24 24"
            >
                <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
            </svg>
            </FooterRedesSocialesItemLi>
        </FooterRedesSocialesItem>
        <FooterRedesSocialesItem
            href="https://www.instagram.com/monknow_dev/"
            target="_blank"
            rel="noreferrer"
        >
            <FooterRedesSocialesItemLi>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#FFf"
                width="24"
                height="24"
                viewBox="0 0 24 24"
            >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            </FooterRedesSocialesItemLi>
        </FooterRedesSocialesItem>
        <FooterRedesSocialesItem
            href="mailto:juanrodriguezcode@gmail.com?subject=Desde%20tu%20portafolio&body=%C2%A1Saludos!%20He%20visto%20tu%20portafolio%20y... "
            target="_blank"
            rel="noreferrer"
        >
            <FooterRedesSocialesItemLi>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#fff"
                width="24"
                height="24"
                viewBox="0 0 24 24"
            >
                <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" />
            </svg>
            </FooterRedesSocialesItemLi>
        </FooterRedesSocialesItem>
        </FooterRedesSociales>
        <DerechosAutor>{contenidoPorLenguaje.derechosDeAutor}</DerechosAutor>
        <Atribucion
        href="https://storyset.com/"
        target="_blank"
        rel="noreferrer"
        >
        {contenidoPorLenguaje.atribucion}
        </Atribucion>
    </FooterEstilizado>
    );
    }

export default FooterPagina;
