import * as React from "react";
import styled from "styled-components";
import {LocalizedLink} from "gatsby-theme-i18n";
import {Link} from "gatsby";

const LinkInternoEstilizado = styled.div`
	& a {
		margin: 5px;

		text-align: right;
		text-decoration: none;

		color: #141c3a;

		font-family: "Open Sans Regular";
		font-size: 1.3rem;
	}
`;

const LinkInterno = ({noLocalizado, ...props}) => {
	return (
		<LinkInternoEstilizado>
			{noLocalizado ? <Link {...props}></Link> : <LocalizedLink {...props}></LocalizedLink>}
		</LinkInternoEstilizado>
	);
};

export default LinkInterno;
