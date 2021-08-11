import * as React from "react";
import styled from "styled-components";
import Cuadro from "./Cuadro";
import Titulo from "./Titulo";

const GaleriaEstilizada = styled.section`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-flow: column wrap;

  margin: 80px 0px;

  height: 100vh;
`;

const Cuadros = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: row wrap;
`;

const Subtitulo = styled.h2`
  margin: 10px 0px;

  font-family: "Open Sans Light";
  font-size: 1em;

  text-align: center;

  color: #141c3a;
`;

function Galeria(props) {
  let keyID = 0;

  return (
    <GaleriaEstilizada id={props.id}>
      <Titulo contenido={props.titulo}></Titulo>
      <Subtitulo>{props.subtitulo}</Subtitulo>
      <Cuadros>
        {props.cuadros.map((cuadro) => {
          keyID = keyID + 1;

          return (
            <Cuadro
              key={keyID}
              titulo={cuadro.titulo}
              subtitulo={cuadro.subtitulo}
              descripcion={cuadro.descripcion}
              URL={cuadro.url}
              imagenURL={cuadro.portada.url}
            ></Cuadro>
          );
        })}
      </Cuadros> 
    </GaleriaEstilizada>
  );
}

export default Galeria;
