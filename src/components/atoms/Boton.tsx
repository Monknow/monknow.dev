import {BotonProps} from "@interfaces/BotonTypes";
import * as React from "react";
import {FC} from "react";
import styled from "styled-components";

const BotonEstilizado = styled.button`
	width: clamp(100px, 15vw, 150px);

	margin: 10px 0px;
	border: 2px solid #fca311;
	border-radius: 20px;
	padding: clamp(2px, 1vw, 6px) 4px;

	font-family: "Open Sans Semibold", sans-serif;
	font-size: clamp(14px, 2vw, 20px);

	text-decoration: none;
	text-align: center;

	background-color: transparent;
	color: #fca311;

	cursor: pointer;

	transition: all 100ms;

	&:hover,
	&:focus {
		background-color: #fca311;
		color: #fff;
	}
`;

export const Boton: FC<BotonProps> = (props) => {
	return <BotonEstilizado {...props}></BotonEstilizado>;
};
