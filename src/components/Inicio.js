import * as React from "react";
import {useLocalization} from "gatsby-theme-i18n";
import styled from "styled-components";
import InicioAnimacionSVG from "../svg/home-animation.svg";

import Titulo from "./Titulo";
import Boton from "./Boton";

const InicioEstilizado = styled.section`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-flow: column;

	margin: 0px 0px 20px 0px;
	padding: 30px 0px 0px 0px;

	min-height: 80vh;

	font-size: clamp(12px, 3vw, 20px);
`;

const InicioHeader = styled.header`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-flow: column;

	text-align: center;
`;

const InicioHeaderSubtitulo = styled.h2`
	margin: 10px 0px 15px 0px;

	font-size: 0.8em;
	font-family: "Open Sans Light";

	color: #141c3a;
`;

const InicioAnimacion = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	aspect-ratio: 5 / 3;
	width: clamp(200px, 80vw, 600px);

	background-image: url(${InicioAnimacionSVG});
	background-repeat: no-repeat;
	background-size: cover;
	background-position: bottom;
`;

const Inicio = () => {
	const {locale} = useLocalization();

	const contenido = [
		["es", {subtitulo: "Mejorando cada día", botonContenido: "Contactame"}],
		["en", {subtitulo: "Improving every day", botonContenido: "Contact me"}],
	];
	const mapaContenido = new Map(contenido);

	const contenidoPorLenguaje = mapaContenido.get(locale);

	return (
		<InicioEstilizado id="inicio">
			<InicioHeader>
				<Titulo>Monknow. Frontend Developer</Titulo>
				<InicioHeaderSubtitulo>{contenidoPorLenguaje.subtitulo}</InicioHeaderSubtitulo>
			</InicioHeader>
			<a href="#contact-me">
				<Boton aria-label={contenidoPorLenguaje.botonContenido}>{contenidoPorLenguaje.botonContenido}</Boton>
			</a>
			<InicioAnimacion></InicioAnimacion>
		</InicioEstilizado>
	);
};

export default Inicio;
