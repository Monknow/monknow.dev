import * as React from "react";
import styled, { keyframes } from "styled-components";
import Boton from "./Boton";

const crecerImagen = keyframes`
from {
    background-size: 100%; 
}

to {
    background-size: 200%;
}
`;

const CuadroEstilizado = styled.li`
display: flex;
align-items: center;
justify-content: center;
flex-flow: column;

aspect-ratio: 16 / 9;
width: clamp(250px, 80vw, 400px); 

margin: 20px 30px;
border-radius: 12px;

font-size: clamp(16px, 2vw, 24px);

background-color: #141c3a;
background-image: url(${props => props.imagenURL});
background-size: 100%; 
background-position: center;

&:hover{
    animation: ${crecerImagen} 800ms linear;
}

&:hover .detalles{
    opacity: 1;
}
`;

const Detalles = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;

    aspect-ratio: 16 / 9;
    width: 100%; 

    box-sizing: border-box;
    border-radius: 12px;
    padding: 20px;

    font-family: "Open Sans Regular";

    color: #fff;
    background: #141c3a;
    opacity: 0;

    transition: opacity 800ms;
`;


const TituloCuadro = styled.h1`
    margin: clamp(0px, 0.5vw, 10px) 0px;

    font-size: 1em;
    
`;

const Subtitulo = styled.h2`
    margin: clamp(0px, 0.5vw, 10px) 0px;

    font-size: 0.9em;
`;

const Descripcion = styled.p`
    margin: clamp(0px, 0.5vw, 10px) 0px;

    font-size: 0.8em;
`;


function Cuadro(props){


    return(
        <CuadroEstilizado imagenURL={props.imagenURL}>
            <Detalles className="detalles">
                        <TituloCuadro>{props.titulo}</TituloCuadro>
                        <Subtitulo>{props.subtitulo}</Subtitulo>
                        <Descripcion>
                            {props.descripcion}
                        </Descripcion>
                        <a href={props.URL} target="_blank" rel="noreferrer"><Boton aria-label="Visitar Pagina" contenido="Visitar"></Boton></a>
            </Detalles>
        </CuadroEstilizado>
    )
}

export default Cuadro;