import * as React from "react";
import styled from "styled-components";
import BotonCompartir from "./BotonCompartir";
import iconoFacebook from "../svg/iconmonstr-facebook-1.svg";
import iconoLinkeIn from "../svg/iconmonstr-linkedin-1.svg";
import iconoTwitter from "../svg/iconmonstr-twitter-1.svg";
import iconoWhatsApp from "../svg/iconmonstr-whatsapp-1.svg";
import iconoEmail from "../svg/iconmonstr-email-2.svg";
import useSiteMetadata from '../hooks/useSiteMetadata';

const CompartirEstilizado = styled.aside`
    position: fixed;
    left: 0px;
    top: 50%;
    z-index: 99;

    display: flex;
    flex-flow: column;

    transform: translate(0%, -50%);

    @media(max-width: 500px) {
    left: 50%;
    top: initial;
    bottom: 0px;
    flex-flow: row;
    transform: translate(-50%, 0%);

    }
`;


const Compartir = (props) => {
    const { siteUrl } = useSiteMetadata();

    const paginaActual = `${siteUrl}${props.location.pathname}`;

    return (
        <CompartirEstilizado>
            <BotonCompartir
                icono={iconoFacebook}
                iconoAlternativa="icono para compartir por Facebook"
                URL={`https://www.facebook.com/sharer/sharer.php?u=${paginaActual}`}
                backgroundColor="#3b5998">
            </BotonCompartir>
            <BotonCompartir
                icono={iconoLinkeIn}
                iconoAlternativa="icono para compartir por LinkedIn"
                URL={`https://www.linkedin.com/shareArticle?mini=true&url=${paginaActual}`}
                backgroundColor="#2867b2">
            </BotonCompartir>
            <BotonCompartir
                icono={iconoTwitter}
                iconoAlternativa="icono para compartir por Twitter"
                URL={`https://twitter.com/intent/tweet?url=${paginaActual}&text=Chequen%20este%20articulo%20de%20Juan%20Rodriguez`}
                backgroundColor="#1DA1F2">
            </BotonCompartir>
            <BotonCompartir
                icono={iconoWhatsApp}
                iconoAlternativa="icono para compartir por WhatsApp"
                URL={`https://api.whatsapp.com/send?text=${paginaActual}%20Chequen%20este%20articulo%20de%20Juan%20Rodriguez`}
                backgroundColor="#4ac959">
            </BotonCompartir>
            <BotonCompartir
                icono={iconoEmail}
                iconoAlternativa="icono para compartir por Email"
                URL={`mailto:info@example.com?&subject=&cc=&bcc=&body=${paginaActual}%0A%C2%Chequen%20este%20articulo%20de%20Juan%20Rodriguez`}
                backgroundColor="#455a64">
            </BotonCompartir>
        </CompartirEstilizado>
    );
};

export default Compartir;
