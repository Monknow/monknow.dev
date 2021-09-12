import * as React from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {dark} from "react-syntax-highlighter/dist/esm/styles/prism";

const MarkdownEstilizado = styled(ReactMarkdown)`
	width: clamp(100px, 80vw, 700px);
	margin: 0px auto;

	font-family: "Open Sans Light";

	line-height: clamp(25px, 5vw, 35px);
	text-align: justify;

	& {
		p {
			margin: clamp(12px, 3vw, 20px) 0px;
			font-size: clamp(12px, 4vw, 18px);
			font-family: "Open Sans Regular";
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

			font-family: "Open Sans Semibold";
		}

		img {
			width: 100%;
			margin: 40px 0px;
			box-shadow: 0px 9px 14px -5px rgba(0, 0, 0, 0.75);
		}
	}
`;

const estilosCodigo = {
	display: "block",

	margin: "30px 0px",
	padding: "8px",
	border: "none",
	borderRadius: "4px",

	width: "100%",

	fontWeight: "500",
	fontSize: "clamp(12px, 3vw, 15px)",

	backgroundColor: "#201c29",
	color: "#ddd",
	textShadow: "#fff0",
};

const Markdown = ({markdown}) => {
	return (
		<MarkdownEstilizado
			children={markdown}
			components={{
				code({node, inline, className, children, ...props}) {
					const match = /language-(\w+)/.exec(className || "");
					return !inline && match ? (
						<SyntaxHighlighter
							children={String(children).replace(/\n$/, "")}
							language={match[1]}
							style={dark}
							showLineNumbers
							customStyle={estilosCodigo}
							PreTag="div"
							{...props}
						/>
					) : (
						<code {...props}>{children}</code>
					);
				},
			}}
		/>
	);
};

export default Markdown;
