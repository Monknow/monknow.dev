import * as React from "react";
import styled, {keyframes} from "styled-components";
import {LocalizedLink, useLocalization} from "gatsby-theme-i18n";
import {BgImage} from "gbimage-bridge";
import Boton from "../atoms/Boton";
import Titulo from "../atoms/Titulo";
import Subtitulo from "../atoms/Subtitulo";

const crecerImagen = keyframes`
	from{
		background-size: 100%;

	}
	to {
		background-size: 200%;
	}
`;

const CuadroEstilizado = styled(BgImage)`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-flow: column;

	aspect-ratio: 16 / 9;
	width: clamp(150px, 80vw, 400px);

	border-radius: 12px;
	margin: 20px 30px;

	font-size: clamp(16px, 2vw, 24px);

	&::before,
	&::after {
		border-radius: 12px;

		background-color: #141c3a;
		background-size: 100%;
		background-position: center;
	}

	&:hover {
		& .detalles {
			opacity: 1;
		}

		&::before,
		&::after {
			animation: ${crecerImagen} 800ms linear;
		}
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

	padding: 20px;
	border-radius: 12px;

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

function Cuadro({imagen, titulo, subtitulo, url, linkInterno}) {
	const {locale} = useLocalization();

	const contenido = [
		["es", {visitar: "Visitar"}],
		["en", {visitar: "Visit"}],
	];
	const mapaContenido = new Map(contenido);

	const {visitar} = mapaContenido.get(locale);

	return (
		<CuadroEstilizado image={imagen}>
			<Detalles className="detalles">
				<TituloCuadro claro>{titulo}</TituloCuadro>
				<SubtituloCuadro claro>{subtitulo}</SubtituloCuadro>
				{linkInterno ? (
					<LocalizedLink to={url}>
						<Boton aria-label={visitar}>{visitar}</Boton>
					</LocalizedLink>
				) : (
					<a href={url} target="_blank" rel="noreferrer">
						<Boton aria-label={visitar}>{visitar}</Boton>
					</a>
				)}
			</Detalles>
		</CuadroEstilizado>
	);
}

export default Cuadro;
