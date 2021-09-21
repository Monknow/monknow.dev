import * as React from "react";
import styled from "styled-components";
import {useState, useMemo} from "react";
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
			font-family: "Open Sans Regular", sans-serif;
		}

		h1 {
			margin: clamp(24px, 3vw, 40px) 0px;
		}

		h2,
		h3,
		h4,
		h5,
		h6 {
			margin: clamp(24px, 3vw, 40px) 0px;

			font-family: "Open Sans Semibold", sans-serif;
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

const Markdown = ({html}) => {
	const [contenido, setContenido] = useState(null);

	useMemo(() => {
		const esperarProcesarHTMLaJSX = async () => {
			const resultado = (await procesadorHTMLaJSX.process(html)).result;
			console.log(resultado);
			setContenido(resultado);
		};
		esperarProcesarHTMLaJSX();
	}, [html]);

	return <MarkdownEstilizado>{contenido && contenido}</MarkdownEstilizado>;
};

export default Markdown;
