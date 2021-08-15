module.exports = {
  siteMetadata: {
    siteUrl: "http://localhost:8000",
    title: "Monknow",
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    "gatsby-plugin-styled-components",
    "gatsby-plugin-gatsby-cloud",
    `gatsby-transformer-remark`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-strapi`,
      options: {
        apiURL: `https://monknow-cms.herokuapp.com`,
        queryLimit: 1000, // Defaults to 100
        collectionTypes: [`posts`, `proyectos`],
      },
    },
  ],
};
