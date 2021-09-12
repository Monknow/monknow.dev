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
		font-family: "Open Sans Light";

		text-align: center;
	}
`;

const DescripcionCarta = styled.p`
	display: block;

	margin: 10px 0px;

	font-size: 0.9em;
	font-family: "Open Sans Semibold";

	text-align: center;

	color: #fca311;
`;

const CartaConocimientos = ({imagen, alternativaImagen, titulo, descripcion, lista}) => {
	return (
		<CartaConocimientosEstilizada>
			<img src={imagen} alt={alternativaImagen} />
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
