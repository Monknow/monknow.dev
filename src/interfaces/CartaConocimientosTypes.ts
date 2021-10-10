import {HTMLAttributes} from "react";

export interface CartasConocimientosProps extends HTMLAttributes<HTMLDivElement> {
	Svg: any;
	alternativaImagen: string;
	titulo: string;
	descripcion: string;
	lista: string[];
}
