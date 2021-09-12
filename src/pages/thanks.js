import * as React from "react";
import {Helmet} from "react-helmet";
import {useLocalization} from "gatsby-theme-i18n";
import NavBar from "../components/organisms/NavBar";
import GranMensaje from "../components/molecules/GranMensaje";
import FooterPagina from "../components/organisms/FooterPagina";
import iconoFavicon from "../assets/images/favicon.ico";
import ilustracionGracias from "../assets/svg/thank-you-rafiki.svg";

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
				<meta charSet="utf-8" />
				<link rel="icon" href={iconoFavicon} />
				<title>{contenidoPorLenguaje.titulo}</title>
				<meta name="referrer" content="origin" />
			</Helmet>
			<NavBar location={props.location}></NavBar>
			<GranMensaje
				titulo={contenidoPorLenguaje.titulo}
				subtitulo={contenidoPorLenguaje.subtitulo}
				imagen={ilustracionGracias}
				contenidoBoton={contenidoPorLenguaje.contenidoBoton}
				aspectRatio={1 / 1}></GranMensaje>
			<FooterPagina
				atribucion={contenidoPorLenguaje.atribucion}
				atribucionURL="https://storyset.com/"></FooterPagina>
		</main>
	);
};

export default GraciasPage;
