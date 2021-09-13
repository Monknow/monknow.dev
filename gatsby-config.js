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
				], // option to add more headers. `Link` headers are transformed by the below criteria
			},
		},
		`gatsby-transformer-remark`,
		`gatsby-plugin-react-helmet`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `svg`,
				path: `${__dirname}/src/assets/svg/`,
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
			},
		},
	],
};
