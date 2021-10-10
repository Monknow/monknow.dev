import {RedSocialProps} from "@interfaces/RedSocialTypes";
import * as React from "react";
import {FC} from "react";
import styled from "styled-components";

const RedSocialEstilizada = styled.a`
	display: flex;
	align-items: center;
	justify-content: center;

	width: 50px;
	height: 50px;

	margin: 20px;
	border: 1px solid rgba(255, 255, 255, 0.541);
	border-radius: 50%;
	outline: none;

	transition: all 100ms;

	&:hover,
	&:focus {
		background: #fff;
	}

	&:hover svg,
	&:focus svg {
		fill: #fca311;
	}
`;

export const RedSocial: FC<RedSocialProps> = ({Svg, url, fill}) => {
	return (
		<RedSocialEstilizada href={url} target="_blank" rel="noreferrer">
			<Svg fill={fill} />
		</RedSocialEstilizada>
	);
};
