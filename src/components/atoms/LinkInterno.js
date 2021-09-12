import * as React from "react";
import styled from "styled-components";
import {LocalizedLink} from "gatsby-theme-i18n";
import {Link} from "gatsby";

const LinkInternoEstilizado = styled.div`
	& a {
		margin: 3px 5px;

		text-align: right;
		text-decoration: none;

		color: #141c3a;

		font-size: 1.2rem;
	}
`;

const LinkInterno = (props) => {
	return (
		<LinkInternoEstilizado>
			{props?.noLocalizado ? <Link {...props}></Link> : <LocalizedLink {...props}></LocalizedLink>}
		</LinkInternoEstilizado>
	);
};

export default LinkInterno;
