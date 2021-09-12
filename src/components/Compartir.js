import * as React from "react";
import styled from "styled-components";
import ContextoURL from "../context/ContextoURL";
import {useContext} from "react";
import {useLocalization} from "gatsby-theme-i18n";
import BotonCompartir from "./BotonCompartir";
import iconoFacebook from "../svg/iconmonstr-facebook-1.svg";
import iconoLinkeIn from "../svg/iconmonstr-linkedin-1.svg";
import iconoTwitter from "../svg/iconmonstr-twitter-1.svg";
import iconoWhatsApp from "../svg/iconmonstr-whatsapp-1.svg";
import iconoEmail from "../svg/iconmonstr-email-2.svg";

const CompartirEstilizado = styled.aside`
	position: fixed;
	left: 0px;
	top: 50%;
	z-index: 99;

	display: flex;
	flex-flow: column;

	transform: translate(0%, -50%);

	@media (max-width: 500px) {
		left: 50%;
		top: initial;
		bottom: 0px;
		flex-flow: row;
		transform: translate(-50%, 0%);
	}
`;

const Compartir = () => {
	const {href} = useContext(ContextoURL);
	console.log(`https://twitter.com/intent/tweet?url=${href}&text=Chequen%20este%20articulo%20de%20Juan%20Rodriguez`);
	const {locale} = useLocalization();

	const contenido = [
		[
			"es",
			{
				url: {
					facebook: `https://www.facebook.com/sharer/sharer.php?u=${href}`,
					linkedIn: `https://www.linkedin.com/shareArticle?mini=true&url=${href}`,
					twitter: `https://twitter.com/intent/tweet?url=${href}&text=Chequen%20este%20articulo%20de%20Juan%20Rodriguez`,
					whatsApp: `https://api.whatsapp.com/send?text=${href}%20Chequen%20este%20articulo%20de%20Juan%20Rodriguez`,
					email: `mailto:info@example.com?&subject=&cc=&bcc=&body=${href}%0A%C2%Chequen%20este%20articulo%20de%20Juan%20Rodriguez`,
				},
			},
		],
		[
			"en",
			{
				url: {
					facebook: `https://www.facebook.com/sharer/sharer.php?u=${href}`,
					linkedIn: `https://www.linkedin.com/shareArticle?mini=true&url=${href}`,
					twitter: `https://twitter.com/intent/tweet?url=${href}&text=Check%20this%20article%20by%20Juan%20Rodr%C3%ADguez!`,
					whatsApp: `https://api.whatsapp.com/send?text=${href}%20Check%20this%20article%20by%20Juan%20Rodr%C3%ADguez!`,
					email: `mailto:info@example.com?&subject=&cc=&bcc=&body=${href}%0A%C2%Check%20this%20article%20by%20Juan%20Rodr%C3%ADguez!`,
				},
			},
		],
	];
	const mapaContenido = new Map(contenido);

	const contenidoPorLenguaje = mapaContenido.get(locale);

	return (
		<CompartirEstilizado>
			<BotonCompartir
				icono={iconoFacebook}
				iconoAlternativa="icono para compartir por Facebook"
				URL={contenidoPorLenguaje.url.facebook}
				backgroundColor="#3b5998"></BotonCompartir>
			<BotonCompartir
				icono={iconoLinkeIn}
				iconoAlternativa="icono para compartir por LinkedIn"
				URL={contenidoPorLenguaje.url.linkeIn}
				backgroundColor="#2867b2"></BotonCompartir>
			<BotonCompartir
				icono={iconoTwitter}
				iconoAlternativa="icono para compartir por Twitter"
				URL={contenidoPorLenguaje.url.twitter}
				backgroundColor="#1DA1F2"></BotonCompartir>
			<BotonCompartir
				icono={iconoWhatsApp}
				iconoAlternativa="icono para compartir por WhatsApp"
				URL={contenidoPorLenguaje.url.whatsApp}
				backgroundColor="#4ac959"></BotonCompartir>
			<BotonCompartir
				icono={iconoEmail}
				iconoAlternativa="icono para compartir por Email"
				URL={contenidoPorLenguaje.url.email}
				backgroundColor="#455a64"></BotonCompartir>
		</CompartirEstilizado>
	);
};

export default Compartir;
