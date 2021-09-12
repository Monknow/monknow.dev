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

		font-size: 1.3rem;
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
