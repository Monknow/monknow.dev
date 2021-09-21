import * as React from "react";
import {Helmet} from "react-helmet";
import {useLocalization} from "gatsby-theme-i18n";
import NavBar from "../components/organisms/NavBar";
import GranMensaje from "../components/molecules/GranMensaje";
import FooterPagina from "../components/organisms/FooterPagina";
import IlustracionGracias from "../assets/svg/thank-you-rafiki.inline.svg";

// markup
const GraciasPage = (props) => {
	const {locale} = useLocalization();

	const contenido = [
		[
			"es",
			{
				titulo: "¡Gracias!",
				subtitulo: "Pronto leeré el mensaje",
				contenidoBoton: "Volver",
				atribucion: "Ilustración por StorySet",
			},
		],
		[
			"en",
			{
				titulo: "Thank you!",
				subtitulo: "I will read your message soon",
				contenidoBoton: "Go back",
				atribucion: "Illustration by StorySet",
			},
		],
	];
	const mapaContenido = new Map(contenido);

	const contenidoPorLenguaje = mapaContenido.get(locale);

	return (
		<main>
			<Helmet>
				<title>{contenidoPorLenguaje.titulo}</title>
			</Helmet>
			<NavBar location={props.location}></NavBar>
			<GranMensaje
				titulo={contenidoPorLenguaje.titulo}
				subtitulo={contenidoPorLenguaje.subtitulo}
				Svg={IlustracionGracias}
				contenidoBoton={contenidoPorLenguaje.contenidoBoton}
				aspectRatio={1 / 1}></GranMensaje>
			<FooterPagina
				atribucion={contenidoPorLenguaje.atribucion}
				atribucionURL="https://storyset.com/"></FooterPagina>
		</main>
	);
};

export default GraciasPage;
