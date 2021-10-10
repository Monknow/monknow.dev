const path = require("path");

module.exports = {
	siteMetadata: {
		siteUrl: "https://monknow.dev",
		title: "Monknow",
	},
	plugins: [
		`gatsby-transformer-sharp`,
		"gatsby-plugin-styled-components",
		`gatsby-plugin-image`,
		`gatsby-plugin-sharp`,
		`gatsby-plugin-react-helmet`,
		`gatsby-plugin-remove-fingerprints`,
		{
			resolve: `gatsby-plugin-alias-imports`,
			options: {
				alias: {
					"@assets": path.resolve(__dirname, "src/assets"),
					"@components": path.resolve(__dirname, "src/components"),
					"@context": path.resolve(__dirname, "src/context"),
					"@data": path.resolve(__dirname, "src/data"),
					"@functions": path.resolve(__dirname, "src/functions"),
					"@global": path.resolve(__dirname, "src/global"),
					"@hooks": path.resolve(__dirname, "src/hooks"),
					"@interfaces": path.resolve(__dirname, "src/interfaces"),
					"@pages": path.resolve(__dirname, "src/pages"),
				},
				extensions: [],
			},
		},
		{
			resolve: "gatsby-plugin-sitemap",
			options: {
				query: `
				{ 
					site {
						siteMetadata {
							siteUrl
						}
					}
					allSitePage {
						nodes {
							path
						}
					}
				}			
				`,
				resolveSiteUrl: ({site}) => site.siteMetadata.siteUrl,
				resolvePages: ({allSitePage: {nodes: allPages}}) => {
					return allPages;
				},
				serialize: ({path}) => {
					return {
						url: path,
					};
				},
			},
		},
		{
			resolve: "gatsby-transformer-remark",
			options: {
				plugins: [
					{
						resolve: "gatsby-remark-images",
						options: {
							// It's important to specify the maxWidth (in pixels) of
							// the content container as this plugin uses this as the
							// base for generating different widths of each image.
							maxWidth: 2048,
						},
					},
					{
						resolve: "gatsby-remark-copy-linked-files",
						options: {
							destinationDir: "static",
						},
					},
				],
			},
		},
		{
			resolve: "gatsby-source-filesystem",
			options: {
				path: `${__dirname}/src/pages`,
				name: "pages",
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
		`gatsby-plugin-netlify`,
		`gatsby-plugin-netlify-cms`,
	],
};
