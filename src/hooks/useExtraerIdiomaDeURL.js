import { useState, useEffect } from "react";

const useExtraerIdiomaDeURL = (url) =>{
    const [lenguaje, setLenguaje] = useState("es");

    const regexUbicacionNombrePaginaConLenguaje = /localhost:8000\/e(s|n)/;
    const regexUbicacionLenguajes = /e(s|n)/;

    useEffect(()=>{
        const nombrePaginaConLenguajeArray = url.match(regexUbicacionNombrePaginaConLenguaje);

        const nombrePaginaConLenguajeString = nombrePaginaConLenguajeArray? nombrePaginaConLenguajeArray[0] : "en"; 
        //Si la url no tiene idioma se cambia por defecto al inglés
        // match() devuelve un array con el resultado, de ahí el [0]
        // Se busca seleccionar todo el inicio de la página, por ejemplo "monknow.dev/es" o "monknow.dev/en", 
        // para después poder seleccionar el idioma 

        const lenguajeDeDireccion = nombrePaginaConLenguajeString.match(regexUbicacionLenguajes)[0];
        // Resultado esperado: "es" o "en"

        setLenguaje(lenguajeDeDireccion);
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]);

    return lenguaje;
};

export default useExtraerIdiomaDeURL;
