import * as React from "react";
import {Helmet} from "react-helmet";

const CompartirMetaTags = ({titulo, descripcion, urlImagen, url}) => {
	return (
		<Helmet>
			<meta property="og:title" content={titulo} />
			<meta property="og:description" content={descripcion} />
			<meta property="og:image" content={urlImagen} />
			<meta property="og:url" content={url} />

			<meta name="twitter:card" content="summary" />
			<meta name="twitter:creator" content="@CodeMonknow" />
			<meta property="twitter:title" content={titulo} />
			<meta property="twitter:description" content={descripcion} />
			<meta property="twitter:image" content={urlImagen} />
			<meta property="twitter:url" content={url} />
		</Helmet>
	);
};

export default CompartirMetaTags;
