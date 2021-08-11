import * as React from "react";
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
    return(
        <SobreMiEstilizado id="sobre-mi">
            <Titulo claro contenido="Me llamo Juan Rodriguez, mucho gusto">Me llamo Juan Rodriguez, mucho gusto</Titulo>
            <SobreMiTexto>
            Soy un desarrollador web especializado en el frontend. Uso
            princinpalmente React, pero me adapto bien y conozco las tecnologías
            usadas en el desarrollo web moderno. Me desempeño en trabajos remotos.
            </SobreMiTexto>
        </SobreMiEstilizado>
    )

}

export default SobreMi;

