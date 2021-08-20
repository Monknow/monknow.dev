module.exports = {
  siteMetadata: {
    siteUrl: "https://monknow.dev",
    title: "Monknow",
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    "gatsby-plugin-styled-components",
    "gatsby-plugin-gatsby-cloud",
    `gatsby-plugin-netlify`,
    `gatsby-transformer-remark`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-theme-i18n`,
      options: {
        defaultLang: `en`,
        prefixDefault: true,
        configPath: require.resolve(`./i18n/config.json`),
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
            api: { qs: { _locale: `all` } }
          },
          {
            name: `proyectos`,
            api: { qs: { _locale: `all` } }
          },
        ]
      },
    },
  ],
};
