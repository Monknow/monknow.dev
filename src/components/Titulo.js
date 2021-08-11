import * as React from "react";
import styled from "styled-components"


    const TituloEstilizado = styled.h1`
        margin: 10px 0px;

        font-size: 1.6em;
        font-family: "Open Sans Bold";

        text-align: center;

        color: ${props => props.claro? "#fff" : "#141c3a"};
    `

const Titulo = ({contenido, claro}) =>{



    return(
        <TituloEstilizado claro={claro}>{contenido}</TituloEstilizado>
    )

}

export default Titulo;