import * as React from "react";
import {useLocalization} from "gatsby-theme-i18n";
import logoPositivo from "../../assets/images/logo-2.png";
import styled from "styled-components";
import RedSocial from "../atoms/RedSocial";
import redesSociales from "../../data/redesSociales";

const FooterEstilizado = styled.footer`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-flow: column;

	height: 100vh;

	text-align: center;

	background-color: #fca311;
	color: #fff;
`;

const FooterLogo = styled.img`
	width: 50px;

	margin: 100px 0px 40px 0px;
`;

const FooterFrase = styled.p`
	margin-bottom: 15px;

	font-family: "Open Sans Semibold";
	font-size: 0.9em;
`;

const FooterRedesSociales = styled.ul`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-flow: row wrap;

	padding: 0px;

	list-style: none;
`;

const DerechosAutor = styled.p`
	margin: 10px;

	font-family: "Open Sans Light";
	font-size: 1em;
`;

const Atribucion = styled.a`
	font-family: "Open Sans Light";
	font-size: 0.9em;

	text-decoration: none;

	color: rgb(255, 255, 255);
`;

const FooterPagina = ({atribucion, atribucionURL}) => {
	const {locale} = useLocalization();

	const contenido = [
		[
			"es",
			{
				frase: "Aprendiendo y mejorando cada vez más",
				derechosDeAutor: "Página programada por mí",
				atribucion: "Ilustraciones por Storyset",
			},
		],
		[
			"en",
			{
				frase: "Learning and improving more and more",
				derechosDeAutor: "Page programmed by me",
				atribucion: "Illustrations by Storyset",
			},
		],
	];
	const mapaContenido = new Map(contenido);

	const contenidoPorLenguaje = mapaContenido.get(locale);

	return (
		<FooterEstilizado>
			<FooterLogo src={logoPositivo} alt="logo de monknow" />
			<FooterFrase>{contenidoPorLenguaje.frase}</FooterFrase>
			<FooterRedesSociales>
				{redesSociales.map(({url, Svg}) => {
					return <RedSocial key={url} Svg={Svg} url={url} fill="#fff"></RedSocial>;
				})}
			</FooterRedesSociales>
			<DerechosAutor>{contenidoPorLenguaje.derechosDeAutor}</DerechosAutor>
			{atribucion && atribucionURL && (
				<Atribucion href={atribucionURL} target="_blank" rel="noreferrer">
					{atribucion}
				</Atribucion>
			)}
		</FooterEstilizado>
	);
};

export default FooterPagina;
