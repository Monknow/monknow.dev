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
						resolve: "gatsby-remark-relative-images",
						options: {
							name: "assets",
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
