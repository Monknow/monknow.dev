import { useStaticQuery, graphql } from 'gatsby';

const useSiteMetadata = () => {
const { site } = useStaticQuery(
    graphql`
    query SiteMetadataQuery {
        site {
          siteMetadata {
            siteUrl
          }
        }
      }
      
    `,
);
return site.siteMetadata;
};

export default useSiteMetadata;