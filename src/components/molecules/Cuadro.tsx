import * as React from "react";
import {FC} from "react";
import {GatsbyImage} from "gatsby-plugin-image";
import styled from "styled-components";
import {LocalizedLink, useLocalization} from "gatsby-theme-i18n";
import {Boton} from "../atoms/Boton";
import {Titulo} from "../atoms/Titulo";
import {CuadroContent, CuadroProps} from "@interfaces/CuadroTypes";

const CuadroEstilizado = styled.div`
	flex-shrink: 2;
	flex-basis: 90vw;
	flex-grow: 2;
	max-width: 400px;

	display: grid;

	aspect-ratio: 16 / 9;

	border-radius: 12px;
	margin: 20px 30px;

	background-color: #141c3a;

	& > * {
		transition: all 800ms;
	}

	&:hover {
		.imagen-de-fondo {
			opacity: 0;

			img {
				transition: all 800ms ease;
				transform: scale(1.5);
			}
		}
		.detalles {
			user-select: auto;
			opacity: 1;
			pointer-events: auto;
		}
	}
`;

const ImagenDeFondo = styled(GatsbyImage)`
	grid-area: 1/1;

	border-radius: inherit;
`;

const Detalles = styled.div`
	grid-area: 1/1;

	position: relative;
	z-index: 3;
	user-select: none;

	display: flex;
	align-items: center;
	justify-content: center;
	flex-flow: column;

	aspect-ratio: 16 / 9;
	width: 100%;

	box-sizing: border-box;

	padding: 20px;
	border-radius: inherit;

	font-size: clamp(8px, 2vw, 10px);

	opacity: 0;
	pointer-events: none;
`;

const TituloCuadro = styled(Titulo)`
	margin: clamp(0px, 0.5vw, 10px) 0px;

	text-align: center;
`;

const SubtituloCuadro = styled(Titulo)`
	margin: clamp(0px, 0.5vw, 10px) 0px;

	font-family: "Open Sans Light", sans-serif;
	font-size: 1rem;
	text-align: center;
`;

export const Cuadro: FC<CuadroProps> = ({imagen, descripcionImagen, titulo, subtitulo, url, linkInterno}) => {
	const {locale} = useLocalization();
	const localeFijado = locale === "en" ? "en" : "es";

	const recordContenido: Record<"es" | "en", CuadroContent> = {
		es: {visitar: "Visitar"},
		en: {visitar: "Visit"},
	};

	const {visitar} = recordContenido[localeFijado];

	return (
		<CuadroEstilizado>
			<ImagenDeFondo className="imagen-de-fondo" image={imagen} alt={descripcionImagen} />
			<Detalles className="detalles">
				<TituloCuadro claro>{titulo}</TituloCuadro>
				<SubtituloCuadro subtitulo claro>
					{subtitulo}
				</SubtituloCuadro>
				{linkInterno ? (
					<LocalizedLink language={localeFijado} to={url}>
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
};
