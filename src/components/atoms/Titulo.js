import * as React from "react";
import styled from "styled-components";

const estilosConjuntos = {
	textAlign: (props) => (props.align ? props.align : "center"),
	color: (props) => (props.claro ? "#fff" : "#141c3a"),
};

const TituloEstilizado = styled.h1`
	font-size: 2em;
	font-family: "Open Sans Bold", sans-serif;

	text-align: ${estilosConjuntos.textAlign};

	color: ${(props) => (props.claro ? "#fff" : "#141c3a")};
`;

const SubtituloEstilizado = styled.h2`
	font-size: 1.4em;
	font-family: "Open Sans Semibold", sans-serif;

	text-align: ${estilosConjuntos.textAlign};

	color: ${(props) => (props.claro ? "#fff" : "#141c3a")};
`;

const Titulo = ({subtitulo, ...props}) => {
	return !subtitulo ? (
		<TituloEstilizado {...props}></TituloEstilizado>
	) : (
		<SubtituloEstilizado {...props}></SubtituloEstilizado>
	);
};

export default Titulo;
