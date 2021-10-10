import {HTMLAttributes} from "react";

export interface MarkdownProps extends HTMLAttributes<HTMLAnchorElement> {
	html: string;
}
