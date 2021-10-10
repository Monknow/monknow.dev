import {PageProps} from "gatsby";
import {IGatsbyImageData} from "gatsby-plugin-image";

export interface PortfolioFrontmatter {
	frontmatter: {
		titulo: string;
		subtitulo: string;
		url: string;
		portada: {
			childImageSharp: {
				gatsbyImageData: IGatsbyImageData;
			};
		};
		descripcionImagen: string;
	};
}

export interface PortfolioPageQueryTypes {
	allMarkdownRemark: {
		nodes: PortfolioFrontmatter[];
	};
}

export interface PortfolioPageProps extends PageProps {
	data: PortfolioPageQueryTypes;
}

export interface PortfolioPageContent {
	titulo: string;
	descripcion: string;
}
