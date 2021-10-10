import {PageProps} from "gatsby";
import {IGatsbyImageData} from "gatsby-plugin-image";
import {BlogFrontmatter} from "./BlogPageTypes";

interface PostPageQueryTypes {
	site: {
		siteMetadata: {
			siteUrl: string;
		};
	};
	markdownRemark: {
		frontmatter: {
			atribucionImagen: string;
			descripcion: string;
			descripcionImagen: string;
			fecha: string;
			slug: string;
			subtitulo: string;
			titulo: string;
			portada: {
				childImageSharp: {
					gatsbyImageData: IGatsbyImageData;
				};
				publicURL: string;
			};
			urlAtribucionImagen: string;
		};
		html: string;
		wordCount: {
			words: number;
		};
	};
	allMarkdownRemark: {
		nodes: BlogFrontmatter[];
	};
}

export interface PostPageProps extends PageProps {
	data: PostPageQueryTypes;
}

export interface PostPageContent {
	textoDeLeerEnOtroIdioma: string;
	textoDetiempoDeLectura: string;
	atribucionPrefijo: string;
}
