import * as React from "react";
import styled from "styled-components";
import {LocalizedLink, useLocalization} from "gatsby-theme-i18n";
import Cuadro from "../molecules/Cuadro";
import Titulo from "../atoms/Titulo";
import Subtitulo from "../atoms/Subtitulo";
import slugify from "@sindresorhus/slugify";
import Boton from "../atoms/Boton";

const GaleriaEstilizada = styled.section`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	flex-flow: column;

	font-size: clamp(12px, 5vw, 24px);
`;

const Cuadros = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-flow: row wrap;
`;

function Galeria({esBlog, titulo, subtitulo, cuadros, ...props}) {
	const {locale} = useLocalization();

	const contenido = [
		[
			"es",
			{
				blog: {titulo: "Blog", subtitulo: "Mis últimas publicaciones"},
				portafolio: {titulo: "Portafolio", subtitulo: "Donde la magia ocurre"},
				verMas: "Ver más",
			},
		],
		[
			"en",
			{
				blog: {titulo: "Blog", subtitulo: "My latest posts"},
				portafolio: {titulo: "Portafolio", subtitulo: "Where magic happens"},
				verMas: "See more",
			},
		],
	];
	const mapaContenido = new Map(contenido);

	const {verMas, blog, portafolio} = mapaContenido.get(locale);
	return (
		<GaleriaEstilizada {...props}>
			<Titulo>{titulo ? titulo : esBlog ? blog.titulo : portafolio.titulo}</Titulo>
			<Subtitulo>{subtitulo ? subtitulo : esBlog ? blog.subtitulo : portafolio.subtitulo}</Subtitulo>
			<Cuadros>
				{cuadros.map((cuadro) => {
					return (
						<div key={cuadro.titulo}>
							{esBlog ? (
								<Cuadro
									titulo={cuadro.titulo}
									subtitulo={cuadro.subtitulo}
									URL={`/blog/${slugify(cuadro.slug)}/`}
									imagenURL={cuadro.imagenPrincipal.url}
									linkInterno={esBlog}></Cuadro>
							) : (
								<Cuadro
									titulo={cuadro.titulo}
									subtitulo={cuadro.stack}
									URL={cuadro.url}
									imagenURL={cuadro.portada.url}
									linkInterno={esBlog}></Cuadro>
							)}
						</div>
					);
				})}
			</Cuadros>
			<LocalizedLink to={esBlog ? "/blog" : "/portfolio"}>
				<Boton>{verMas}</Boton>
			</LocalizedLink>
		</GaleriaEstilizada>
	);
}

export default Galeria;
