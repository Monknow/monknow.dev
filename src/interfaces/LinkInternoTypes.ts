import {HTMLAttributes} from "react";

export interface LinkInternoProps extends HTMLAttributes<HTMLDivElement> {
	noLocalizado?: boolean;
	to: string;
}
