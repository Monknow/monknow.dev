import * as React from "react";
import {Helmet} from "react-helmet";
import {useLocalization} from "gatsby-theme-i18n";
import NavBar from "../components/organisms/NavBar";
import GranMensaje from "../components/molecules/GranMensaje";
import FooterPagina from "../components/organisms/FooterPagina";
import ilustracionError404 from "../assets/svg/404-Error-rafiki.svg";
import iconoFavicon from "../assets/images/favicon.ico";

const NotFoundPage = (props) => {
	const {locale} = useLocalization();

	const contenido = [
		[
			"es",
			{
				titulo: "Página no encontrada 😬",
				subtitulo: "Bueno, esto es incomodo",
				contenidoBoton: "Volver",
				atribucion: "Ilustración por StorySet",
			},
		],
		[
			"en",
			{
				titulo: "Page not found 😬",
				subtitulo: "Well, this is akward",
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
				imagen={ilustracionError404}
				aspectRatio={1 / 1}
				contenidoBoton={contenidoPorLenguaje.contenidoBoton}></GranMensaje>
			<FooterPagina
				atribucion={contenidoPorLenguaje.atribucion}
				atribucionURL="https://storyset.com/"></FooterPagina>
		</main>
	);
};

export default NotFoundPage;
