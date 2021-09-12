import * as React from "react";
import Boton from "./Boton";
import {LocalizedLink, useLocalization} from "gatsby-theme-i18n";

const BotonVerMas = (props) => {
	const {locale} = useLocalization();

	const contenido = [
		[
			"es",
			{
				verMas: "Ver más",
			},
		],
		[
			"en",
			{
				verMas: "See more",
			},
		],
	];
	const mapaContenido = new Map(contenido);

	const contenidoPorLenguaje = mapaContenido.get(locale);

	return (
		<LocalizedLink to={props.localizedLinkTo}>
			<Boton>{contenidoPorLenguaje.verMas}</Boton>
		</LocalizedLink>
	);
};

export default BotonVerMas;
