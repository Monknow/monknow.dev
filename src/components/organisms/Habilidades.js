import * as React from "react";
import {useLocalization} from "gatsby-theme-i18n";
import styled from "styled-components";
import CartaConocimientos from "../molecules/CartaConocimientos";
import CodigoSVG from "../../assets/svg/iconmonstr-code-7.inline.svg";
import HerramientasSVG from "../../assets/svg/iconmonstr-tools-2.inline.svg";
import conocimientos from "../../data/conocimientos";

const ConocimientosEstilizados = styled.section`
	display: flex;
	justify-content: space-around;
	flex-flow: row wrap;

	position: relative;
	bottom: 150px;

	width: calc(95vw - 80px);

	margin: 0px auto -50px auto; /* Margén negativo para eliminar el espacio en blanco creado por el posicionamiento relativo*/
	border-radius: 12px;
	padding: 40px 20px;

	font-size: clamp(16px, 3vw, 22px);
	background-color: #fff;
	color: #141c3a;
	box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
`;

const Habilidades = () => {
	const {locale} = useLocalization();

	const contenido = [
		[
			"es",
			{
				lenguajes: {
					alternativaImagen: "icono de codigo",
					titulo: "Lenguajes",
					descripcion: "Lenguajes y librerías que disfruto usar:",
				},
				devTools: {
					alternativaImagen: "icono de herramientas",
					titulo: "Dev Tools",
					descripcion: "Herramientas que me facilitan la vida:",
				},
			},
		],
		[
			"en",
			{
				lenguajes: {
					alternativaImagen: "code icon",
					titulo: "Languages",
					descripcion: "Languages and libraries that I enjoy using:",
				},
				devTools: {
					alternativaImagen: "tools icon",
					titulo: "Dev Tools",
					descripcion: "Tools that make my life easier:",
				},
			},
		],
	];
	const mapaContenido = new Map(contenido);

	const contenidoPorLenguaje = mapaContenido.get(locale);

	return (
		<ConocimientosEstilizados id="skills">
			<CartaConocimientos
				Svg={CodigoSVG}
				alternativaImagen={contenidoPorLenguaje.lenguajes.alternativaImagen}
				titulo={contenidoPorLenguaje.lenguajes.titulo}
				descripcion={contenidoPorLenguaje.lenguajes.descripcion}
				lista={conocimientos.lenguajes}></CartaConocimientos>
			<CartaConocimientos
				Svg={HerramientasSVG}
				alternativaImagen={contenidoPorLenguaje.devTools.alternativaImagen}
				titulo={contenidoPorLenguaje.devTools.titulo}
				descripcion={contenidoPorLenguaje.devTools.descripcion}
				lista={conocimientos.devTools}></CartaConocimientos>
		</ConocimientosEstilizados>
	);
};

export default Habilidades;
