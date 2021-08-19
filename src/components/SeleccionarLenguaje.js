import * as React from "react";
import { Link } from "gatsby";
import { useContext } from "react";
import ContextoURL from "../context/ContextoURL";
import styled from "styled-components";

const SeleccionarLenguajeEstilizado = styled.div`

`;

const Lenguajes = styled.div`
        & a{
            margin: 0px 10px;

            text-decoration: none;
            color: #141c3a;
        }
`;


 

const SeleccionarLenguaje = () =>{
    const ubicacionPagina = useContext(ContextoURL);

    const regexUbicacionLenguajes = /http:\/\/localhost:8000\/e(s|n)(\/|)/g;
    const ubicacionPaginaSinLenguaje = ubicacionPagina.replace(regexUbicacionLenguajes, "");

    return(
        <SeleccionarLenguajeEstilizado>
            {ubicacionPaginaSinLenguaje.length === 0?(
                <Lenguajes>
                    <Link to={`/es`}>Español</Link>
                    <Link to={`/en`}>English</Link>
                </Lenguajes>
            ):(
                <Lenguajes>
                    <Link to={`/es/${ubicacionPaginaSinLenguaje}`}>Español</Link>
                    <Link to={`/en/${ubicacionPaginaSinLenguaje}`}>English</Link>
                </Lenguajes>
            )}

        </SeleccionarLenguajeEstilizado>
    )

};

export default SeleccionarLenguaje;