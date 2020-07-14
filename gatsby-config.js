require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

// gatsby-config.js
const myQuery = `{
  allMarkdownRemark(sort: {fields: [fields___date], order: DESC}, filter: {frontmatter: {layout: {eq: "post"}}}) {
    edges {
      node {
        objectID: id
        fields {
          slug
        }
        frontmatter {
          title
        }
        internal {
          type
          contentDigest
          owner
        }
      }
    }
  }
}
`

const queries = [
  {
    query: myQuery,
    transformer: ({ data }) =>
      data.allMarkdownRemark.edges.map(({ node }) => node),
    indexName: 'blog',
  },
]

module.exports = {
  siteMetadata: {
    title: `Guillaume Briday`,
    description: `Ce blog est à propos des nouvelles technologies, de mes humeurs, de développement Web, de photos... En bref, de tout ce dont j'ai envie de parler.`,
    siteUrl: `https://guillaumebriday.fr`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_API_KEY,
        indexName: process.env.ALGOLIA_INDEX_NAME,
        queries,
        chunkSize: 10000,
      },
    },
    'gatsby-transformer-yaml',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/images`,
        name: `images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/data`,
        name: 'comments',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/data`,
        name: 'talks',
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-copy-linked-files`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
              withWebp: true,
              quality: 100,
              showCaptions: true,
              linkImagesToOriginal: false,
              backgroundColor: 'transparent',
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: true,
            },
          },
        ],
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Guillaume Briday',
        short_name: 'Guillaume Briday',
        start_url: '/',
        background_color: '#6574CD',
        theme_color: '#6574CD',
        display: 'minimal-ui',
        icon: 'src/images/icon.png',
      },
    },
    'gatsby-plugin-remove-serviceworker',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-robots-txt',
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map((edge) => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.fields.date,
                  url: [site.siteMetadata.siteUrl, edge.node.fields.slug].join(
                    '/'
                  ),
                  guid: [site.siteMetadata.siteUrl, edge.node.fields.slug].join(
                    '/'
                  ),
                  custom_elements: [{ 'content:encoded': edge.node.html }],
                })
              })
            },
            query: `
            {
              allMarkdownRemark(
                limit: 1000,
                sort: { order: DESC, fields: [fields___date] },
                filter: {frontmatter: { layout: { eq: "post" } }}
              ) {
                edges {
                  node {
                    excerpt
                    html
                    fields {
                      slug
                      date
                    }
                    frontmatter {
                      layout
                      title
                    }
                  }
                }
              }
            }
          `,
            output: '/feed.xml',
            title: 'Guillaume Briday',
          },
          {
            serialize: ({ query: { site, allTalksYaml } }) => {
              return allTalksYaml.edges.map((edge) => {
                return Object.assign({}, edge.node, {
                  description: edge.node.description,
                  date: edge.node.date,
                  url: [site.siteMetadata.siteUrl, 'talks'].join('/'),
                  guid: [site.siteMetadata.siteUrl, 'talks'].join('/'),
                })
              })
            },
            query: `
            {
              allTalksYaml(
                limit: 1000,
                sort: { order: DESC, fields: [date] }
              ) {
                edges {
                  node {
                    title
                    description
                    date: date(formatString: "DD MMMM YYYY", locale: "fr")
                  }
                }
              }
            }
          `,
            output: '/talks.xml',
            title: "Guillaume Briday's talks",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/layouts/index.jsx`),
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-54003772-2`,
        anonymize: true,
        respectDNT: true,
      },
    },
    'gatsby-plugin-postcss',
    {
      resolve: 'gatsby-plugin-purgecss',
      options: {
        tailwind: true,
        ignore: ['src/styles/index.css'],
      },
    },
    {
      resolve: `gatsby-plugin-netlify`,
      options: {
        generateMatchPathRewrites: false,
      },
    },
  ],
}
