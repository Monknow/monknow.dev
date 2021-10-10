import * as React from "react";
import {FC} from "react";
import {TituloEstilizadoProps, TituloProps} from "@interfaces/TituloTypes";
import styled from "styled-components";

const TituloEstilizado = styled.h1<TituloEstilizadoProps>`
	font-size: 2em;
	font-family: "Open Sans Bold", sans-serif;

	text-align: ${(props) => (props.align ? props.align : "center")};

	color: ${(props) => (props.claro ? "#fff" : "#141c3a")};
`;

const SubtituloEstilizado = styled.h2<TituloEstilizadoProps>`
	font-size: 1.2em;
	font-family: "Open Sans Semibold", sans-serif;

	text-align: ${(props) => (props.align ? props.align : "center")};

	color: ${(props) => (props.claro ? "#fff" : "#141c3a")};
`;

export const Titulo: FC<TituloProps> = ({subtitulo, claro, align, color, ...props}) => {
	return !subtitulo ? (
		<TituloEstilizado claro={!!claro} align={align} color={color} {...props}></TituloEstilizado>
	) : (
		<SubtituloEstilizado claro={!!claro} align={align} color={color} {...props}></SubtituloEstilizado>
	);
};
