import {MarkdownProps} from "@interfaces/MarkdownTypes";
import * as React from "react";
import {FC} from "react";
import styled from "styled-components";
import {procesadorHtmlAJsx} from "../../functions/procesadorHTMLaJSX";

const MarkdownEstilizado = styled.div`
	width: clamp(100px, 80vw, 700px);
	margin: 0px auto;

	line-height: clamp(30px, 5vw, 35px);
	text-align: justify;

	color: #141c3a;

	p {
		margin: 15px 0px;
		font-size: clamp(12px, 4vw, 18px);
		font-family: "Open Sans Regular", sans-serif;
	}

	blockquote {
		margin-left: clamp(10px, 4vw, 20px);
		padding-left: clamp(10px, 3vw, 15px);
		border-left: 3px solid grey;
	}

	h1,
	h2 {
		margin: clamp(20px, 4vw, 30px) 0px;
		font-family: "Open Sans Bold", sans-serif;
	}

	h3 {
		margin-top: clamp(20px, 4vw, 30px);
		font-family: "Open Sans Bold", sans-serif;
	}

	h2 {
		font-size: clamp(18px, 4vw, 24px);
	}

	img {
		width: 100%;
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
`;

export const Markdown: FC<MarkdownProps> = ({html}) => {
	return <MarkdownEstilizado>{procesadorHtmlAJsx.processSync(html).result}</MarkdownEstilizado>;
};
