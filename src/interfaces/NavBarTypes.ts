import {HTMLAttributes} from "react";

export interface NavBarProps extends HTMLAttributes<HTMLDivElement> {
	quitarSeleccionarLenguajes?: boolean;
}

export interface NavBarContent {
	sobreMi: string;
	habilidades: string;
	portafolio: string;
	blog: string;
	contactame: string;
}
