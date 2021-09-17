import * as React from "react";
import {createElement} from "react";
import {unified} from "unified";
import rehypeParse from "rehype-parse";
import rehypeReact from "rehype-react";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {dark} from "react-syntax-highlighter/dist/esm/styles/prism";

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

const procesadorHTMLaJSX = unified()
	.use(rehypeParse, {emitParseErrors: true})
	.use(rehypeReact, {
		createElement: createElement,
		components: {
			code({node, inline, className, children}) {
				const match = /language-(\w+)/.exec(className || "");
				return !inline && match ? (
					<SyntaxHighlighter
						children={String(children).replace(/\n$/, "")}
						customStyle={estilosCodigo}
						style={dark}
						language={match[1]}
						PreTag="div"
					/>
				) : (
					<code className={className}>{children}</code>
				);
			},
		},
	});

export default procesadorHTMLaJSX;
