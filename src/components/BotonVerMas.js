import * as React from "react";
import { useContext } from "react";
import ContextoURL from "../context/ContextoURL";
import Boton from "./Boton";
import { LocalizedLink } from "gatsby-theme-i18n"; 
import useExtraerIdiomaDeURL from "../hooks/useExtraerIdiomaDeURL";

const BotonVerMas = (props) => {
    const urlContexto = useContext(ContextoURL); 
    const lenguaje = useExtraerIdiomaDeURL(urlContexto);

    const contenido = [
    [
        "es",
        {
        verMas: "Ver más",
        },
    ],
    [
        "en",
        {
        verMas: "See more",
        },
    ],
    ];
    const mapaContenido = new Map(contenido);

    const contenidoPorLenguaje = mapaContenido.get(lenguaje);


    return (
        <LocalizedLink to={props.localizedLinkTo}>
            <Boton
                contenido={contenidoPorLenguaje.verMas}
            ></Boton>
        </LocalizedLink>
    );
};

export default BotonVerMas;
