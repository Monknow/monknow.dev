import {HTMLAttributes} from "react";

export interface CompartirMetaTagsProps extends HTMLAttributes<HTMLDivElement> {
	titulo: string;
	descripcion: string;
	urlImagen: string;
	url: string;
}
