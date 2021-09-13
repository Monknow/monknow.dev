import * as React from "react";
import styled from "styled-components";
import BurgerSVG from "../../assets/svg/iconmonstr-menu-1.inline.svg";

const BurgerMenuEstilizado = styled.details``;

const IconoBurger = styled.summary`
	height: 24px;

	cursor: pointer;
	list-style: none; /* No quitar; la regla elimina el triangulo del summary */

	&::marker {
		display: none;
	}
`;

const ContenidoBurger = styled.ul`
	position: absolute;
	right: 20px;
	z-index: 100;

	display: flex;
	flex-flow: column wrap;

	text-align: right;

	background-color: #fff;
	list-style: none;
`;

const BurgerMenu = ({children}) => {
	return (
		<BurgerMenuEstilizado>
			<IconoBurger>
				<BurgerSVG />
			</IconoBurger>
			<ContenidoBurger>{children}</ContenidoBurger>
		</BurgerMenuEstilizado>
	);
};

export default BurgerMenu;
