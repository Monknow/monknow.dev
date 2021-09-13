import * as React from "react";
import styled from "styled-components";

const BotonCompartirEstilizado = styled.a`
	display: block;

	padding: clamp(5px, 2vw, 14px);
	box-sizing: content-box;

	height: 24px;
	width: 24px;
	background-color: ${({backgroundColor}) => backgroundColor || "#000"};
`;

const BotonCompartir = ({Icono, iconoAlternativa, url, backgroundColor}) => {
	return (
		<BotonCompartirEstilizado href={url} target="_blank" rel="noreferrer" backgroundColor={backgroundColor}>
			<Icono />
		</BotonCompartirEstilizado>
	);
};

export default BotonCompartir;
