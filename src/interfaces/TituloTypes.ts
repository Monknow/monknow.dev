import {HTMLAttributes} from "react";

export interface TituloEstilizadoProps extends HTMLAttributes<HTMLParagraphElement> {
	align?: "start" | "end" | "left" | "right" | "center" | "justify" | "match-parent";
	color?: string;
	claro?: boolean;
}

export interface TituloProps extends HTMLAttributes<HTMLParagraphElement> {
	subtitulo?: boolean;
	align?: "start" | "end" | "left" | "right" | "center" | "justify" | "match-parent";
	color?: string;
	claro?: boolean;
}
