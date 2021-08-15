import * as React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import GaleriaPortafolio from "../components/GaleriaPortafolio";
import GaleriaBlog from "../components/GaleriaBlog";
import Boton from "../components/Boton";

const BotonConMargen = (props) => (
    <div className={props.className} >
        <Boton contenido="Ver Más"></Boton>
    </div>
  );

const BotonConMargenEstilizado = styled(BotonConMargen)`
    margin-bottom: 40px;
`;

const GaleriasInicioEstilizadas = styled.div`
    display: flex; 
    align-items: center;
    justify-content: center;
    flex-flow: column nowrap;

    margin: 40px 0px;
`;

// markup
const GaleriasInicio = () => {
  return (
    <GaleriasInicioEstilizadas>
      <GaleriaPortafolio titulo="Portafolio" subtitulo="Donde la magia ocurre"></GaleriaPortafolio>
      <Link to="/portafolio"><BotonConMargenEstilizado contenido="Ver más"></BotonConMargenEstilizado></Link>
      <GaleriaBlog titulo="Blog" subtitulo="Mis últimas públicaciones"></GaleriaBlog>
      <Link to="/blog"><BotonConMargenEstilizado contenido="Ver más"></BotonConMargenEstilizado></Link>
    </GaleriasInicioEstilizadas>
  )
}

export default GaleriasInicio
