import * as React from "react";
import { useLocalization } from "gatsby-theme-i18n";
import styled from "styled-components"
import Titulo from "./Titulo";

const SobreMiEstilizado = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;

    padding: 0px 30px 150px 30px;

    height: 80vh;

    font-size: clamp(12px, 3vw, 20px);

    background-color: #fca311;  
`

    const SobreMiTexto = styled.p`
        width: clamp(100px, 90vw, 800px);
 
        font-family: "Open Sans Light";
        font-size: clamp(12px, 0.9em, 24px);

        text-align: center;
        line-height: 30px;

        color: #Fff;
    `

const SobreMi = () =>{
    const {locale} = useLocalization();

    const contenido = [
    ["es", { titulo: "Me llamo Juan Diego Rodriguez, mucho gusto", sobreMi: "Soy un desarrollador web especializado en el frontend. Uso principalmente React, pero me adapto bien y conozco las tecnologías usadas en el desarrollo web moderno. Me desempeño en trabajos remotos."}],
    ["en", { titulo: "My name is Juan Diego Rodriguez, nice to meet you", sobreMi: "I am a web developer specialized in the frontend. I mainly use React, but I adapt well and I know the technologies used in modern web development. I work in remote jobs."}],
    ];
    const mapaContenido = new Map(contenido);

    const contenidoPorLenguaje = mapaContenido.get(locale);


    return(
        <SobreMiEstilizado id="sobre-mi">
            <Titulo claro contenido={contenidoPorLenguaje.titulo}></Titulo>
            <SobreMiTexto>{contenidoPorLenguaje.sobreMi}</SobreMiTexto>
        </SobreMiEstilizado>
    )

}

export default SobreMi;

