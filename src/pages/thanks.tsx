import * as React from "react";
import {FC} from "react";
import {Helmet} from "react-helmet";
import {PageProps} from "gatsby";
import {useLocalization} from "gatsby-theme-i18n";
import {ThanksPageContent} from "@interfaces/ThanksPageTypes";
import {NavBar} from "../components/organisms/NavBar";
import {GranMensaje} from "../components/molecules/GranMensaje";
import {FooterPagina} from "../components/organisms/FooterPagina";
import IlustracionGracias from "../assets/svg/thank-you-rafiki.inline.svg";

const ThanksPage: FC<PageProps> = () => {
	const {locale} = useLocalization();
	const localeFijado = locale === "en" ? "en" : "es";

	const recordContenido: Record<"es" | "en", ThanksPageContent> = {
		es: {
			titulo: "¡Gracias!",
			subtitulo: "Pronto leeré el mensaje",
			contenidoBoton: "Volver",
			atribucion: "Ilustración por StorySet",
		},
		en: {
			titulo: "Thank you!",
			subtitulo: "I will read your message soon",
			contenidoBoton: "Go back",
			atribucion: "Illustration by StorySet",
		},
	};
	const contenidoPorLenguaje = recordContenido[localeFijado];

	return (
		<main>
			<Helmet>
				<title>{contenidoPorLenguaje.titulo}</title>
			</Helmet>
			<NavBar></NavBar>
			<GranMensaje
				titulo={contenidoPorLenguaje.titulo}
				subtitulo={contenidoPorLenguaje.subtitulo}
				Svg={IlustracionGracias}
				contenidoBoton={contenidoPorLenguaje.contenidoBoton}></GranMensaje>
			<FooterPagina
				atribucion={contenidoPorLenguaje.atribucion}
				atribucionURL="https://storyset.com/"></FooterPagina>
		</main>
	);
};

export default ThanksPage;
