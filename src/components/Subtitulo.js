import * as React from "react";
import styled from "styled-components"


    const SubtituloEstilizado = styled.h1`
        margin: 10px 0px;

        font-size: 0.8em;
        font-family: "Open Sans Regular";

        text-align: center;

        color: ${props => props.claro? "#fff" : "#141c3a"};
    `

const Subtitulo = ({contenido, claro}) =>{



    return(
        <SubtituloEstilizado claro={claro}>{contenido}</SubtituloEstilizado>
    )

}

export default Subtitulo;