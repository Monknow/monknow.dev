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

const Compartir = ({siteURL}) => {
	const {pathname} = useContext(ContextoURL);
	const {locale} = useLocalization();

	const href = `${siteURL}${pathname}`;

	const contenido = [
		[
			"es",

			[
				{
					url: `https://www.facebook.com/sharer/sharer.php?u=${href}`,
					backgroundColor: "#3b5998",
					icono: iconoFacebook,
					iconoAlternativa: "icono para compartir por Facebook",
				},
				{
					url: `https://www.linkedin.com/shareArticle?mini=true&url=${href}`,
					backgroundColor: "#2867b2",
					icono: iconoLinkeIn,
					iconoAlternativa: "icono para compartir por LinkedIn",
				},
				{
					url: `https://twitter.com/intent/tweet?url=${href}&text=Check%20this%20article%20by%20Juan%20Rodr%C3%ADguez!`,
					backgroundColor: "#1DA1F2",
					icono: iconoTwitter,
					iconoAlternativa: "icono para compartir por Twitter",
				},
				{
					url: `https://api.whatsapp.com/send?text=${href}%20Chequen%20este%20articulo%20de%20Juan%20Rodriguez`,
					backgroundColor: "#4ac959",
					icono: iconoWhatsApp,
					iconoAlternativa: "icono para compartir por WhatsApp",
				},
				{
					url: `mailto:info@example.com?&subject=&cc=&bcc=&body=${href}%0A%C2%Chequen%20este%20articulo%20de%20Juan%20Rodriguez`,
					backgroundColor: "#455a64",
					icono: iconoEmail,
					iconoAlternativa: "icono para compartir por Email",
				},
			],
		],
		[
			"en",
			[
				{
					url: `https://www.facebook.com/sharer/sharer.php?u=${href}`,
					backgroundColor: "#3b5998",
					icono: iconoFacebook,
					iconoAlternativa: "share through Facebook",
				},
				{
					url: `https://www.linkedin.com/shareArticle?mini=true&url=${href}`,
					backgroundColor: "#2867b2",
					icono: iconoLinkeIn,
					iconoAlternativa: "share through LinkedIn",
				},
				{
					url: `https://twitter.com/intent/tweet?url=${href}&text=Check%20this%20article%20by%20Juan%20Rodr%C3%ADguez!`,
					backgroundColor: "#1DA1F2",
					icono: iconoTwitter,
					iconoAlternativa: "share through Twitter",
				},
				{
					url: `https://api.whatsapp.com/send?text=${href}%20Check%20this%20article%20by%20Juan%20Rodr%C3%ADguez!`,
					backgroundColor: "#4ac959",
					icono: iconoWhatsApp,
					iconoAlternativa: "share through WhatsApp",
				},
				{
					url: `mailto:info@example.com?&subject=&cc=&bcc=&body=${href}%0A%C2%Check%20this%20article%20by%20Juan%20Rodr%C3%ADguez!`,
					backgroundColor: "#455a64",
					icono: iconoEmail,
					iconoAlternativa: "share through Email",
				},
			],
		],
	];

	const mapaContenido = new Map(contenido);

	const contenidoPorLenguaje = mapaContenido.get(locale);

	return (
		<CompartirEstilizado>
			{contenidoPorLenguaje.map((elementoCompartir) => {
				return (
					<BotonCompartir
						key={elementoCompartir.url}
						icono={elementoCompartir.icono}
						iconoAlternativa={elementoCompartir.iconoAlternativa}
						url={elementoCompartir.url}
						backgroundColor={elementoCompartir.backgroundColor}></BotonCompartir>
				);
			})}
		</CompartirEstilizado>
	);
};

export default Compartir;
