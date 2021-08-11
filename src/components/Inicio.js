import * as React from "react";
import styled from "styled-components"
import InicioAnimacionSVG from "../svg/home-animation.svg";

import Titulo from "./Titulo";
import Boton from "./Boton";

const InicioEstilizado = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;

  margin: 0px 0px 20px 0px;
  padding: 30px 0px 0px 0px;

  min-height: 80vh;

  font-size: clamp(12px, 3vw, 20px);
`;

  const InicioHeader = styled.header`
      display: flex;
      align-items: center;
      justify-content: center;
      flex-flow: column;


      text-align: center;
  `

      const InicioHeaderSubtitulo = styled.h2`
          margin: 10px 0px 15px 0px;

          font-size: 0.8em;
          font-family: "Open Sans Light";

          color: #141c3a;
      `

  const InicioAnimacion = styled.div`
      display: flex;
      align-items: center;
      justify-content: center;

      aspect-ratio: 5 / 3;
      width: clamp(200px, 80vw, 600px);
      
      background-image: url(${InicioAnimacionSVG});
      background-repeat: no-repeat;
      background-size: cover;
      background-position: bottom;
  `

const Inicio = () =>{
    return(
        <InicioEstilizado id="inicio">
        <InicioHeader>
          <Titulo contenido="Monknow. Frontend Developer"></Titulo>
          <InicioHeaderSubtitulo>Mejorando cada día</InicioHeaderSubtitulo>
        </InicioHeader>
        <a href="#contactame"><Boton  aria-label="Contactarme" contenido="Contactame"></Boton></a>
        <InicioAnimacion></InicioAnimacion>
      </InicioEstilizado>
    ) 
}

export default Inicio;