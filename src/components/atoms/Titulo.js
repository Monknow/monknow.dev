import * as React from "react";
import styled from "styled-components"


    const TituloEstilizado = styled.h1`
        margin: 10px 0px;
        padding: 0px 30px;

        font-size: 1.6em;
        font-family: "Open Sans Bold";

        text-align: center;

        color: ${props => props.claro? "#fff" : "#141c3a"};
    `

const Titulo = (props) =>{



    return(
        <TituloEstilizado {...props}></TituloEstilizado>
    )

}

export default Titulo;