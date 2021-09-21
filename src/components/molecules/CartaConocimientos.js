import * as React from "react";
import styled from "styled-components";
import Titulo from "../atoms/Titulo";

const CartaConocimientosEstilizada = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	flex-flow: column;

	margin: 20px 20px 0px 20px;

	& ul {
		list-style: none;

		text-align: center;
	}

	& li {
		margin-bottom: 7px;

		font-size: 0.8em;
		font-family: "Open Sans Light", sans-serif;

		text-align: center;
	}
`;

const DescripcionCarta = styled.p`
	display: block;

	margin: 10px 0px;

	font-size: 0.9em;
	font-family: "Open Sans Semibold", sans-serif;

	text-align: center;

	color: #fca311;
`;

const CartaConocimientos = ({Svg, titulo, descripcion, lista}) => {
	return (
		<CartaConocimientosEstilizada>
			<Svg />
			<Titulo>{titulo}</Titulo>
			<DescripcionCarta>{descripcion}</DescripcionCarta>
			<ul>
				{lista.map((elemento) => {
					return <li key={elemento}>{elemento}</li>;
				})}
			</ul>
		</CartaConocimientosEstilizada>
	);
};

export default CartaConocimientos;
