module.exports = {
	siteMetadata: {
		siteUrl: "https://monknow.dev",
		title: "Monknow",
	},
	plugins: [
		`gatsby-plugin-image`,
		{
			resolve: `gatsby-plugin-sharp`,
			options: {
				defaults: {
					quality: 50,
				},
			},
		},
		{
			// keep as first gatsby-source-filesystem plugin for gatsby image support
			resolve: "gatsby-source-filesystem",
			options: {
				path: `${__dirname}/static/assets`,
				name: "uploads",
			},
		},
		`gatsby-transformer-sharp`,
		"gatsby-plugin-styled-components",
		"gatsby-plugin-gatsby-cloud",
		{
			resolve: `gatsby-plugin-netlify`,
			options: {
				allPageHeaders: [
					"cache-control: public",
					"cache-control: max-age=31536000",
					"cache-control: immutable",
				],
			},
		},
		`gatsby-transformer-remark`,
		`gatsby-plugin-netlify-cms`,
		`gatsby-plugin-react-helmet`,
		{
			resolve: "gatsby-transformer-remark",
			options: {
				plugins: [
					{
						resolve: "gatsby-remark-relative-images",
						options: {
							name: "uploads",
						},
					},
					{
						resolve: "gatsby-remark-images",
						options: {
							// It's important to specify the maxWidth (in pixels) of
							// the content container as this plugin uses this as the
							// base for generating different widths of each image.
							maxWidth: 2048,
						},
					},
				],
			},
		},
		{
			resolve: `gatsby-theme-i18n`,
			options: {
				defaultLang: `en`,
				prefixDefault: true,
				configPath: require.resolve(`./i18n/config.json`),
			},
		},
		{
			resolve: "gatsby-plugin-react-svg",
			options: {
				rule: {
					include: /\.inline\.svg$/, // See below to configure properly
				},
			},
		},
		{
			resolve: `gatsby-source-strapi`,
			options: {
				apiURL: `https://monknow-cms.herokuapp.com`,
				queryLimit: 1000, // Defaults to 100
				collectionTypes: [
					{
						name: `posts`,
						api: {qs: {_locale: `all`}},
					},
					{
						name: `proyectos`,
						api: {qs: {_locale: `all`}},
					},
				],
				markdownImages: {
					typesToParse: {
						posts: ["texto"],
					},
				},
			},
		},
	],
};
