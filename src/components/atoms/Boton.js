import * as React from "react";
import styled from "styled-components";

const BotonEstilizado = styled.button`
	width: clamp(100px, 15vw, 150px);

	margin: 10px 0px;
	border: 2px solid #fca311;
	border-radius: 20px;
	padding: 6px 0px;

	font-family: "Open Sans Semibold";
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

const Boton = (props) => {
	return <BotonEstilizado {...props}></BotonEstilizado>;
};

export default Boton;
