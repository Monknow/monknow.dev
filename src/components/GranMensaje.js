import * as React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import Titulo from "./Titulo";
import Subtitulo from "./Subtitulo";
import Boton from "./Boton";

const GranMensajeEstilizado = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column nowrap;

    height: 90vh;

    font-size: clamp(16px, 4vw, 30px);
`;

const IlustracionMensaje = styled.img`
    display: flex;
    align-items: center;
    justify-content: center;

    margin-top: 20px;

    width: clamp(100px, 70vw, 300px);
    
    background-repeat: no-repeat;
    background-size: contain;
    background-position: bottom;
`;



const GranMensaje = ({titulo, subtitulo, imagen, alternativa}) =>{
    return(
        <GranMensajeEstilizado>
            <Titulo contenido={titulo}></Titulo>
            <Subtitulo contenido={subtitulo}></Subtitulo>
            <Link to="/"><Boton contenido="Regresar" aria-label="Regresar"></Boton></Link>
            <IlustracionMensaje src={imagen} alt={alternativa}></IlustracionMensaje>
        </GranMensajeEstilizado>
    )

}

export default GranMensaje;