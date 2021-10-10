import {HTMLAttributes} from "react";

export interface CompartirProps extends HTMLAttributes<HTMLDivElement> {
	siteURL: string;
}

export interface CompartirContent {
	url: string;
	backgroundColor: string;
	Icono: any;
}
