import {IGatsbyImageData} from "gatsby-plugin-image";
import {HTMLAttributes} from "react";

interface Cuadro {
	frontmatter: {
		slug?: string;
		url?: string;
		titulo: string;
		subtitulo: string;
		portada: {
			childImageSharp: {
				gatsbyImageData: IGatsbyImageData;
			};
		};
		descripcionImagen: string;
	};
}

export interface GaleriaProps extends HTMLAttributes<HTMLDivElement> {
	esBlog?: boolean;
	cuadros: Cuadro[];
	titulo?: string;
	subtitulo?: string;
}

export interface GaleriaContent {
	blog: {titulo: string; subtitulo: string};
	portafolio: {titulo: string; subtitulo: string};
	verMas: string;
}
