import {HTMLAttributes} from "react";

export interface FooterProps extends HTMLAttributes<HTMLDivElement> {
	atribucion?: string;
	atribucionURL?: string;
}

export interface FooterContent {
	frase: string;
	derechosDeAutor: string;
	atribucion: string;
}
