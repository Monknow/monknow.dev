import * as React from "react";
import styled from "styled-components";
import {LocalizedLink, useLocalization} from "gatsby-theme-i18n";
import {getImage} from "gatsby-plugin-image";
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
			{/* Si hay un titulo o subtitulo custom, colocalo. Si no, coloca el default dependiendo si es una galeria del blog o portafolio */}
			<Cuadros>
				{cuadros.map(({frontmatter}) => {
					const urlCuadro = esBlog ? `/blog/${slugify(frontmatter.slug)}/` : frontmatter.url;
					console.dir(frontmatter);
					return (
						<Cuadro
							key={frontmatter.titulo}
							titulo={frontmatter.titulo}
							subtitulo={frontmatter.subtitulo}
							url={urlCuadro}
							imagen={getImage(frontmatter.portada)}
							linkInterno={esBlog}></Cuadro>
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
