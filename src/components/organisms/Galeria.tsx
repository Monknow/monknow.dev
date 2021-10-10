import * as React from "react";
import {FC} from "react";
import styled from "styled-components";
import slugify from "@sindresorhus/slugify";
import {LocalizedLink, useLocalization} from "gatsby-theme-i18n";
import {Cuadro} from "../molecules/Cuadro";
import {Titulo} from "../atoms/Titulo";
import {Boton} from "../atoms/Boton";
import {GaleriaContent, GaleriaProps} from "@interfaces/GaleriaTypes";

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

export const Galeria: FC<GaleriaProps> = ({esBlog, titulo, subtitulo, cuadros}) => {
	const {locale} = useLocalization();
	const localeFijado = locale === "en" ? "en" : "es";

	const recordContenido: Record<"es" | "en", GaleriaContent> = {
		es: {
			blog: {titulo: "Blog", subtitulo: "Mis últimas publicaciones"},
			portafolio: {titulo: "Portafolio", subtitulo: "Donde la magia ocurre"},
			verMas: "Ver más",
		},
		en: {
			blog: {titulo: "Blog", subtitulo: "My latest posts"},
			portafolio: {titulo: "Portfolio", subtitulo: "Where magic happens"},
			verMas: "See more",
		},
	};

	const {verMas, blog, portafolio} = recordContenido[localeFijado];

	return (
		<GaleriaEstilizada>
			<Titulo>{titulo ? titulo : esBlog ? blog.titulo : portafolio.titulo}</Titulo>
			<Titulo subtitulo>{subtitulo ? subtitulo : esBlog ? blog.subtitulo : portafolio.subtitulo}</Titulo>
			{/* Si hay un titulo o subtitulo custom, colocalo. Si no, coloca el default dependiendo si es una galeria del blog o portafolio */}
			<Cuadros>
				{cuadros.map(({frontmatter}) => {
					let url = "/";

					if (typeof frontmatter.slug === "string" && esBlog) {
						url = `/blog/${slugify(frontmatter.slug)}/`;
					} else if (typeof frontmatter.url === "string") {
						url = frontmatter.url;
					}

					return (
						<Cuadro
							key={frontmatter.titulo}
							titulo={frontmatter.titulo}
							subtitulo={frontmatter.subtitulo}
							url={url}
							imagen={frontmatter.portada.childImageSharp.gatsbyImageData}
							descripcionImagen={frontmatter.descripcionImagen}
							linkInterno={!!esBlog}></Cuadro>
					);
				})}
			</Cuadros>
			<LocalizedLink language={localeFijado} to={esBlog ? "/blog" : "/portfolio"}>
				<Boton>{verMas}</Boton>
			</LocalizedLink>
		</GaleriaEstilizada>
	);
};
