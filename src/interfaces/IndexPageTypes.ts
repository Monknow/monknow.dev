import {PageProps} from "gatsby";
import {PortfolioFrontmatter} from "./PortfolioPageTypes";
import {BlogFrontmatter} from "./BlogPageTypes";

export interface IndexPageQueryTypes {
	posts: {
		nodes: BlogFrontmatter[];
	};
	proyectos: {
		nodes: PortfolioFrontmatter[];
	};
}

export interface IndexPageProps extends PageProps {
	data: IndexPageQueryTypes;
}

export interface IndexPageContent {
	atribucion: string;
	descripcion: string;
}
