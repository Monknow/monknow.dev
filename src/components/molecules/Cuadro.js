import * as React from "react";
import styled, {keyframes} from "styled-components";
import {LocalizedLink, useLocalization} from "gatsby-theme-i18n";
import Boton from "../atoms/Boton";
import Titulo from "../atoms/Titulo";
import Subtitulo from "../atoms/Subtitulo";

const crecerImagen = keyframes`
from {
    background-size: 100%; 
}

to {
    background-size: 200%;
}
`;

const CuadroEstilizado = styled.li`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-flow: column;

	aspect-ratio: 16 / 9;
	width: clamp(250px, 80vw, 400px);

	margin: 20px 30px;
	border-radius: 12px;

	font-size: clamp(16px, 2vw, 24px);

	background-color: #141c3a;
	background-image: url(${(props) => props.imagenURL});
	background-size: 100%;
	background-position: center;

	&:hover {
		animation: ${crecerImagen} 800ms linear;
	}

	&:hover .detalles {
		opacity: 1;
	}
`;

const Detalles = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-flow: column;

	aspect-ratio: 16 / 9;
	width: 100%;

	box-sizing: border-box;
	border-radius: 12px;
	padding: 20px;

	font-family: "Open Sans Regular";
	font-size: clamp(14px, 5vw, 20px);

	color: #fff;
	background: #141c3a;
	opacity: 0;

	transition: opacity 800ms;
`;

const TituloCuadro = styled(Titulo)`
	margin: clamp(0px, 0.5vw, 10px) 0px;

	font-size: 1em;
	text-align: center;
`;

const SubtituloCuadro = styled(Subtitulo)`
	margin: clamp(0px, 0.5vw, 10px) 0px;

	font-family: "Open Sans Light";
	font-size: 0.7em;
	text-align: center;
`;

function Cuadro(props) {
	const {locale} = useLocalization();

	const contenido = [
		["es", {visitar: "Visitar"}],
		["en", {visitar: "Visit"}],
	];
	const mapaContenido = new Map(contenido);

	const contenidoPorLenguaje = mapaContenido.get(locale);

	return (
		<CuadroEstilizado imagenURL={props.imagenURL}>
			<Detalles className="detalles">
				<TituloCuadro claro>{props.titulo}</TituloCuadro>
				<SubtituloCuadro claro>{props.subtitulo}</SubtituloCuadro>
				{props.linkInterno ? (
					<LocalizedLink to={props.URL}>
						<Boton aria-label={contenidoPorLenguaje.visitar}>{contenidoPorLenguaje.visitar}</Boton>
					</LocalizedLink>
				) : (
					<a href={props.URL} target="_blank" rel="noreferrer">
						<Boton aria-label={contenidoPorLenguaje.visitar}>{contenidoPorLenguaje.visitar}</Boton>
					</a>
				)}
			</Detalles>
		</CuadroEstilizado>
	);
}

export default Cuadro;
