import * as React from "react";
import {navigate} from "gatsby-link";
import styled from "styled-components";
import Titulo from "../atoms/Titulo";
import Boton from "../atoms/Boton";

const GranMensajeEstilizado = styled.section`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-flow: column nowrap;

	height: 90vh;

	font-size: clamp(16px, 4vw, 30px);
`;

const GranMensaje = ({titulo, subtitulo, Svg, contenidoBoton}) => {
	return (
		<GranMensajeEstilizado>
			<Titulo> {titulo}</Titulo>
			<Titulo subtitulo> {subtitulo}</Titulo>
			<Boton aria-label={contenidoBoton} onClick={() => navigate(-1)}>
				{contenidoBoton}
			</Boton>

			<Svg />
		</GranMensajeEstilizado>
	);
};

export default GranMensaje;
