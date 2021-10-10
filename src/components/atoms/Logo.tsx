import * as React from "react";
import {StaticImage} from "gatsby-plugin-image";

export const Logo = () => {
	return (
		<StaticImage
			src="../../assets/images/android-chrome-512x512.png"
			alt="logo de monknow"
			placeholder="blurred"
			layout="fixed"
			width={40}
			height={40}
		/>
	);
};
