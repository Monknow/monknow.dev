import {HTMLAttributes} from "react";

export interface GranMensajeProps extends HTMLAttributes<HTMLDivElement> {
	titulo: string;
	subtitulo: string;
	Svg: any;
	contenidoBoton: string;
}
