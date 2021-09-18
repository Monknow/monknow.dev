import * as React from "react";
import styled from "styled-components";
import {useEffect, useState} from "react";
import procesadorHTMLaJSX from "../../functions/procesadorHTMLaJSX";

const MarkdownEstilizado = styled.div`
	width: clamp(100px, 80vw, 700px);
	margin: 0px auto;

	line-height: clamp(25px, 5vw, 35px);
	text-align: justify;

	color: #141c3a;

	& {
		p {
			margin: clamp(12px, 3vw, 20px) 0px;
			font-size: clamp(12px, 4vw, 18px);
			font-family: "Open Sans Regular", Sans-Serif;
		}

		h1 {
			font-size: 2rem;
		}

		h2 {
			font-size: 1.5rem;
		}

		h1,
		h2,
		h3,
		h4,
		h5,
		h6 {
			margin: clamp(24px, 3vw, 40px) 0px;

			font-family: "Open Sans Semibold", Sans-Serif;
		}

		img {
			margin: 40px 0px;
			box-shadow: 0px 9px 14px -5px rgba(0, 0, 0, 0.75);
			display: flex;
			align-items: center;
			justify-content: center;
			flex-flow: column nowrap;

			color: #000000;
			background-color: rgba(255, 255, 255, 0.5);

			&:empty {
				color: #141c3a;
				background-color: rgba(255, 255, 255, 0);
				//Cuando la imagen no tiene hijos (::after y ::before) no se muestra el texto alternativo, y por lo tanto no hay un error.
				// Así que cuando está :empty está cargada
			}

			&::before {
				font-size: 1.3rem;
			}
		}
	}
`;

const FondoDeTextoSinProcesar = styled.p`
	// prettier-ignore
	background-image: 
		linear-gradient(to bottom, white 50%, #eee 50%), 
		linear-gradient(white 100%, transparent 0);

	// prettier-ignore
	background-size: 
		100% clamp(30px, 5vw, 50px), 
		100% 100%;

	// prettier-ignore
	background-position: 
		0 0, 
		0 0;

	max-width: 100%;
	text-overflow: ellipsis;
	overflow: hidden;
`;

const TextoSinProcesar = styled.div`
	background-position: 0 0;
	background-clip: text;
	color: transparent;
	line-height: 20px;
`;

const Markdown = ({html}) => {
	const [contenido, setContenido] = useState(null);

	useEffect(() => {
		const convertirHtmlAJsx = async () => {
			const resultado = (await procesadorHTMLaJSX.process(html)).result;
			setContenido(resultado);
		};

		convertirHtmlAJsx();
	}, [html]);

	return (
		<MarkdownEstilizado>
			{contenido ? (
				contenido
			) : (
				<FondoDeTextoSinProcesar>
					<TextoSinProcesar>{html}</TextoSinProcesar>
				</FondoDeTextoSinProcesar>
			)}
		</MarkdownEstilizado>
	);
};

export default Markdown;
