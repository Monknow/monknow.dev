import {HTMLAttributes} from "react";

export interface BotonCompartirEstilizadoProps extends HTMLAttributes<HTMLDivElement> {
	backgroundColor: string;
}

export interface BotonCompartirProps extends HTMLAttributes<HTMLDivElement> {
	Icono: any;
	url: string;
	backgroundColor: string;
}
