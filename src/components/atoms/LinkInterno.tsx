import * as React from "react";
import {FC} from "react";
import styled from "styled-components";
import {LocalizedLink, useLocalization} from "gatsby-theme-i18n";
import {Link} from "gatsby";
import {LinkInternoProps} from "@interfaces/LinkInternoTypes";

const LinkInternoEstilizado = styled.div`
	& a {
		margin: 5px;

		text-align: right;
		text-decoration: none;

		color: #141c3a;

		font-size: 1.3rem;
	}
`;

export const LinkInterno: FC<LinkInternoProps> = ({noLocalizado, to, children}) => {
	const {locale} = useLocalization();
	const localeFijado = locale === "en" ? "en" : "es";

	return (
		<LinkInternoEstilizado>
			{noLocalizado ? (
				<Link to={to}>{children}</Link>
			) : (
				<LocalizedLink to={to} language={localeFijado}>
					{children}
				</LocalizedLink>
			)}
		</LinkInternoEstilizado>
	);
};
