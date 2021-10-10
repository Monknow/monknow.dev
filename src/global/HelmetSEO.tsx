import * as React from "react";
import {Helmet} from "react-helmet";
import {useLocalization} from "gatsby-theme-i18n";
import iconoFavicon from "@assets/images/favicon.ico";

export const HelmetSEO = () => {
	const {locale} = useLocalization();

	return (
		<Helmet
			htmlAttributes={{
				lang: locale,
			}}>
			<meta charSet="utf-8" />
			<link rel="icon" href={iconoFavicon} />
			<meta name="referrer" content="origin" />
			<meta name="google" content="notranslate" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
		</Helmet>
	);
};
