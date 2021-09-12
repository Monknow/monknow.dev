import * as React from "react";
import styled from "styled-components";

const SubtituloEstilizado = styled.h1`
	margin: 10px 0px;
	padding: 0px 30px;

	font-size: 0.8em;
	font-family: "Open Sans Regular";

	text-align: center;

	color: ${(props) => (props.claro ? "#fff" : "#141c3a")};
`;

const Subtitulo = (props) => {
	return <SubtituloEstilizado {...props}></SubtituloEstilizado>;
};

export default Subtitulo;
