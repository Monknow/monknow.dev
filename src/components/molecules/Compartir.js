import * as React from "react";
import styled from "styled-components";
import ContextoURL from "../../context/ContextoURL";
import {useContext} from "react";
import {useLocalization} from "gatsby-theme-i18n";
import BotonCompartir from "../atoms/BotonCompartir";
import IconoFacebook from "../../assets/svg/iconmonstr-facebook-1.inline.svg";
import IconoLinkedIn from "../../assets/svg/iconmonstr-linkedin-1.inline.svg";
import IconoTwitter from "../../assets/svg/iconmonstr-twitter-1.inline.svg";
import IconoWhatsApp from "../../assets/svg/iconmonstr-whatsapp-1.inline.svg";
import IconoEmail from "../../assets/svg/iconmonstr-email-2.inline.svg";

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
					Icono: IconoFacebook,
					iconoAlternativa: "Icono para compartir por Facebook",
				},
				{
					url: `https://www.linkedin.com/shareArticle?mini=true&url=${href}`,
					backgroundColor: "#2867b2",
					Icono: IconoLinkedIn,
					iconoAlternativa: "Icono para compartir por LinkedIn",
				},
				{
					url: `https://twitter.com/intent/tweet?url=${href}&text=Check%20this%20article%20by%20Juan%20Rodr%C3%ADguez!`,
					backgroundColor: "#1DA1F2",
					Icono: IconoTwitter,
					iconoAlternativa: "Icono para compartir por Twitter",
				},
				{
					url: `https://api.whatsapp.com/send?text=${href}%20Chequen%20este%20articulo%20de%20Juan%20Rodriguez`,
					backgroundColor: "#4ac959",
					Icono: IconoWhatsApp,
					iconoAlternativa: "Icono para compartir por WhatsApp",
				},
				{
					url: `mailto:info@example.com?&subject=&cc=&bcc=&body=${href}%0A%C2%Chequen%20este%20articulo%20de%20Juan%20Rodriguez`,
					backgroundColor: "#455a64",
					Icono: IconoEmail,
					iconoAlternativa: "Icono para compartir por Email",
				},
			],
		],
		[
			"en",
			[
				{
					url: `https://www.facebook.com/sharer/sharer.php?u=${href}`,
					backgroundColor: "#3b5998",
					Icono: IconoFacebook,
					iconoAlternativa: "share through Facebook",
				},
				{
					url: `https://www.linkedin.com/shareArticle?mini=true&url=${href}`,
					backgroundColor: "#2867b2",
					Icono: IconoLinkedIn,
					iconoAlternativa: "share through LinkedIn",
				},
				{
					url: `https://twitter.com/intent/tweet?url=${href}&text=Check%20this%20article%20by%20Juan%20Rodr%C3%ADguez!`,
					backgroundColor: "#1DA1F2",
					Icono: IconoTwitter,
					iconoAlternativa: "share through Twitter",
				},
				{
					url: `https://api.whatsapp.com/send?text=${href}%20Check%20this%20article%20by%20Juan%20Rodr%C3%ADguez!`,
					backgroundColor: "#4ac959",
					Icono: IconoWhatsApp,
					iconoAlternativa: "share through WhatsApp",
				},
				{
					url: `mailto:info@example.com?&subject=&cc=&bcc=&body=${href}%0A%C2%Check%20this%20article%20by%20Juan%20Rodr%C3%ADguez!`,
					backgroundColor: "#455a64",
					Icono: IconoEmail,
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
						Icono={elementoCompartir.Icono}
						iconoAlternativa={elementoCompartir.iconoAlternativa}
						url={elementoCompartir.url}
						backgroundColor={elementoCompartir.backgroundColor}></BotonCompartir>
				);
			})}
		</CompartirEstilizado>
	);
};

export default Compartir;
