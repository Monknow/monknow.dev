import * as React from "react";
import {FC} from "react";
import {LocalizedLink, useLocalization} from "gatsby-theme-i18n";
import styled from "styled-components";
import {NavBarContent, NavBarProps} from "@interfaces/NavBarTypes";
import {SeleccionarLenguaje} from "../molecules/SeleccionarLenguaje";
import {BurgerMenu} from "../atoms/BurgerMenu";
import {Logo} from "../atoms/Logo";
import {LinkInterno} from "../atoms/LinkInterno";

const NavBarEstilizado = styled.nav`
	display: flex;
	align-items: center;
	justify-content: space-between;

	height: 6vh;

	margin-bottom: 4vh;
	padding: 20px;

	font-size: clamp(12px, 5vw, 20px);
`;

export const NavBar: FC<NavBarProps> = ({quitarSeleccionarLenguajes, children}) => {
	const {locale} = useLocalization();
	const localeFijado = locale === "en" ? "en" : "es";

	const recordContenido: Record<"es" | "en", NavBarContent> = {
		es: {
			sobreMi: "Sobre mí",
			habilidades: "Habilidades",
			portafolio: "Portafolio",
			blog: "Blog",
			contactame: "Contactame",
		},
		en: {
			sobreMi: "About me",
			habilidades: "Skills",
			portafolio: "Portfolio",
			blog: "Blog",
			contactame: "Contact me",
		},
	};

	const contenidoPorLenguaje = recordContenido[localeFijado];

	return (
		<NavBarEstilizado>
			<LocalizedLink to="/" language={localeFijado}>
				<Logo />
			</LocalizedLink>
			{quitarSeleccionarLenguajes ? <div>{children}</div> : <SeleccionarLenguaje></SeleccionarLenguaje>}
			<BurgerMenu>
				<li>
					<LinkInterno to="/#about-me">{contenidoPorLenguaje.sobreMi}</LinkInterno>
				</li>
				<li>
					<LinkInterno to="/#skills">{contenidoPorLenguaje.habilidades}</LinkInterno>
				</li>
				<li>
					<LinkInterno to="/portfolio">{contenidoPorLenguaje.portafolio}</LinkInterno>
				</li>
				<li>
					<LinkInterno to="/blog">{contenidoPorLenguaje.blog}</LinkInterno>
				</li>
				<li>
					<LinkInterno to="/#contact-me">{contenidoPorLenguaje.contactame}</LinkInterno>
				</li>
			</BurgerMenu>
		</NavBarEstilizado>
	);
};
