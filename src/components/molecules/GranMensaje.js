import * as React from "react";
import {navigate} from "gatsby-link";
import styled from "styled-components";
import Titulo from "../atoms/Titulo";
import Subtitulo from "../atoms/Subtitulo";
import Boton from "../atoms/Boton";

const GranMensajeEstilizado = styled.section`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-flow: column nowrap;

	height: 90vh;

	font-size: clamp(16px, 4vw, 30px);
`;

const IlustracionMensaje = styled.img`
	display: flex;
	align-items: center;
	justify-content: center;

	margin-top: 20px;

	width: clamp(100px, 70vw, 300px);

	background-repeat: no-repeat;
	background-size: contain;
	background-position: bottom;
`;

const GranMensaje = ({titulo, subtitulo, imagen, alternativa, contenidoBoton}) => {
	return (
		<GranMensajeEstilizado>
			<Titulo> {titulo}</Titulo>
			<Subtitulo> {subtitulo}</Subtitulo>
			<Boton aria-label={contenidoBoton} onClick={() => navigate(-1)}>
				{contenidoBoton}
			</Boton>

			<IlustracionMensaje src={imagen} alt={alternativa}></IlustracionMensaje>
		</GranMensajeEstilizado>
	);
};

export default GranMensaje;
