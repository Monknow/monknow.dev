import {PageProps} from "gatsby";
import {IGatsbyImageData} from "gatsby-plugin-image";

export interface BlogFrontmatter {
	frontmatter: {
		atribucionImagen: string;
		descripcionImagen: string;
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
}

export interface BlogPageQueryTypes {
	allMarkdownRemark: {
		nodes: BlogFrontmatter[];
	};
}

export interface BlogPageProps extends PageProps {
	data: BlogPageQueryTypes;
}

export interface BlogPageContent {
	descripcion: string;
}
