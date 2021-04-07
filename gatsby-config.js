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
    lang: 'fr',
    author: 'Guillaume Briday',
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
        path: `${__dirname}/src/posts`,
        name: 'posts',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/podcasts`,
        name: 'podcasts',
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
              return allMarkdownRemark.edges.map(({ node }) => {
                const url = [site.siteMetadata.siteUrl, node.fields.slug].join(
                  '/'
                )

                return Object.assign({}, node.frontmatter, {
                  description: node.description || node.excerpt,
                  date: node.fields.date,
                  url,
                  guid: url,
                  custom_elements: [{ 'content:encoded': node.html }],
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
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(({ node }) => {
                const url = [site.siteMetadata.siteUrl, node.fields.slug].join(
                  '/'
                )

                return Object.assign({}, node.frontmatter, {
                  description: node.description || node.excerpt,
                  date: node.fields.date,
                  url,
                  guid: url,
                  custom_elements: [{ 'content:encoded': node.html }],
                })
              })
            },
            query: `
            {
              allMarkdownRemark(
                limit: 1000,
                sort: { order: DESC, fields: [fields___date] },
                filter: {frontmatter: { layout: { eq: "podcast" } }}
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
            output: '/podcast.xml',
            title: "Guillaume Briday's Podcast",
          },
          {
            serialize: ({ query: { site, allTalksYaml } }) => {
              return allTalksYaml.edges.map(({ node }) => {
                const url = [site.siteMetadata.siteUrl, 'talks'].join('/')

                return Object.assign({}, node, {
                  description: node.description,
                  date: node.date,
                  url: url,
                  guid: url,
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
