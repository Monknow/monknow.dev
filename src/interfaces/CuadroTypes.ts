import {IGatsbyImageData} from "gatsby-plugin-image";
import {HTMLAttributes} from "react";

export interface CuadroProps extends HTMLAttributes<HTMLDivElement> {
	titulo: string;
	subtitulo: string;
	url: string;
	imagen: IGatsbyImageData;
	descripcionImagen: string;
	linkInterno: boolean;
}

export interface CuadroContent {
	visitar: string;
}
