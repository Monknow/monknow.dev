import * as React from "react";
import {FC} from "react";
import {Helmet} from "react-helmet";
import {useLocalization} from "gatsby-theme-i18n";
import {NavBar} from "../components/organisms/NavBar";
import {GranMensaje} from "../components/molecules/GranMensaje";
import {FooterPagina} from "../components/organisms/FooterPagina";
import IlustracionError404 from "../assets/svg/error-rafiki.inline.svg";
import {PageProps} from "gatsby";
import {NotFoundPageContent} from "@interfaces/NotFoundPageTypes";

const NotFoundPage: FC<PageProps> = () => {
	const {locale} = useLocalization();
	const localeFijado = locale === "en" ? "en" : "es";

	const recordContenido: Record<"es" | "en", NotFoundPageContent> = {
		es: {
			titulo: "Página no encontrada 😬",
			subtitulo: "Bueno, esto es incomodo",
			contenidoBoton: "Volver",
			atribucion: "Ilustración por StorySet",
		},
		en: {
			titulo: "Page not found 😬",
			subtitulo: "Well, this is akward",
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
				Svg={IlustracionError404}
				contenidoBoton={contenidoPorLenguaje.contenidoBoton}></GranMensaje>
			<FooterPagina
				atribucion={contenidoPorLenguaje.atribucion}
				atribucionURL="https://storyset.com/"></FooterPagina>
		</main>
	);
};

export default NotFoundPage;
