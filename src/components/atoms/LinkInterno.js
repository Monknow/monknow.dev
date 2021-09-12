import * as React from "react";
import styled from "styled-components";
import {LocalizedLink} from "gatsby-theme-i18n";

const LinkInternoEstilizado = styled(LocalizedLink)`
	margin: 3px 5px;

	text-align: right;
	text-decoration: none;

	color: #141c3a;

	font-size: 1.2rem;
`;

const LinkInterno = (props) => {
	return <LinkInternoEstilizado {...props}></LinkInternoEstilizado>;
};

export default LinkInterno;
