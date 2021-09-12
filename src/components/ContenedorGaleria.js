import * as React from "react";
import styled from "styled-components";
import Cuadro from "./Cuadro";
import Titulo from "./Titulo";
import Subtitulo from "./Subtitulo";
import slugify from "@sindresorhus/slugify";

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

function ContenedorGaleria(props) {
	return (
		<GaleriaEstilizada>
			<Titulo>{props.titulo}</Titulo>
			<Subtitulo>{props.subtitulo}</Subtitulo>
			<Cuadros>
				{props.cuadros.map((cuadro) => {
					return (
						<div key={cuadro.titulo}>
							{props.esBlogPost ? (
								<Cuadro
									titulo={cuadro.titulo}
									subtitulo={cuadro.subtitulo}
									URL={`/blog/${slugify(cuadro.slug)}/`}
									imagenURL={cuadro.imagenPrincipal.url}
									linkInterno={props.esBlogPost}></Cuadro>
							) : (
								<Cuadro
									titulo={cuadro.titulo}
									subtitulo={cuadro.stack}
									URL={cuadro.url}
									imagenURL={cuadro.portada.url}
									linkInterno={props.esBlogPost}></Cuadro>
							)}
						</div>
					);
				})}
			</Cuadros>
			{props.children}
		</GaleriaEstilizada>
	);
}

export default ContenedorGaleria;
