import {useState, useEffect} from "react";
import traerDatos from "./traerDatos";

function useFetchCuadros () {
    const [cuadrosProyectos, setCuadrosProyectos] = useState([]);
    const [cuadrosBlog, setCuadrosBlog] = useState([]);
    const [cargando, setCargando] = useState(true);

    const [mensajeResultado, setMensajeResultado] = useState("Cargando");




    useEffect(() =>{
            const montarDatos = async () => {    
                setCargando(true);
                setMensajeResultado("Cargando");

                await traerDatos("https://monknow-cms.herokuapp.com/cuadros")
                .then((res) =>{
                    try{         
                        
                        let cuadrosProyectosArray = [];
                        let cuadrosBlogArray = [];

                        res.data.forEach((cuadro)=>{
                            cuadro.proyecto? 
                            cuadrosProyectosArray = [...cuadrosProyectosArray, cuadro] : 
                            cuadrosBlogArray = [...cuadrosBlogArray, cuadro];
                        });

                        setCuadrosProyectos(cuadrosProyectosArray);
                        setCuadrosBlog(cuadrosBlogArray);
                        
                        switch (true) {
                            case res.status === 200:
                                setCargando(false);
                                break;
                            case res.status === 404:
                                setCargando(true);
                                setMensajeResultado("Información no encontrada. Intenté más tarde");
                                break;
                            case res.status >= 500:
                                setCargando(true);
                                setMensajeResultado("Ha ocurrido un error en el servidor, Intenté más tarde por favor");
                                break;
                            default:
                                setCargando(true);
                                setMensajeResultado("Ha ocurrido un error desconocido. Intenté más tarde por favor");
                                break;
                        }


                    }
                    catch{
                        setCargando(true);
                        setMensajeResultado("Ha ocurrido un error desconocido. Intenté más tarde por favor");
                        console.error("Error al cargar la galeria")
                    }
                });


                
            }
            montarDatos()
        
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return {cuadrosProyectos, cuadrosBlog, cargando, mensajeResultado}
}

export default useFetchCuadros;