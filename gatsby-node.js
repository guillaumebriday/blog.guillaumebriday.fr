const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = ({ actions: { createPage }, graphql }) => {
  return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [fields___date] }
        limit: 1000
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              layout
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    const edges = result.data.allMarkdownRemark.edges
    const posts = edges.filter(
      ({ node: post }) => post.frontmatter.layout === 'post'
    )
    const pages = edges.filter(
      ({ node: page }) => page.frontmatter.layout === 'page'
    )

    posts.forEach(({ node: post }, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node

      createPage({
        path: post.fields.slug,
        component: path.resolve(`src/templates/blog-post.jsx`),
        context: {
          slug: post.fields.slug,
          previous,
          next,
          isBlog: true,
        },
      })
    })

    pages.forEach(({ node: page }) => {
      createPage({
        path: page.fields.slug,
        component: path.resolve(`src/templates/page.jsx`),
        context: {
          slug: page.fields.slug,
        },
      })
    })

    // Create blog post pages
    const postsPerPage = 30
    const numPages = Math.ceil(posts.length / postsPerPage)

    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/articles` : `/articles/page/${i + 1}`,
        component: path.resolve(`./src/templates/blog.jsx`),
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          currentPage: i + 1,
          numPages,
        },
      })
    })
  })
}

exports.onCreateNode = ({ node, getNode, actions: { createNodeField } }) => {
  if (node.internal.type === `MarkdownRemark`) {
    let filename = createFilePath({ node, getNode, basePath: `pages` })

    let matches = filename.match(/^\/([\d]{4}-[\d]{2}-[\d]{2})-{1}(.+)\/$/)
    let slug = filename.replace(/\//g, '')
    let date = null

    if (matches) {
      ;[, date, slug] = matches
    }

    createNodeField({
      node,
      name: `lang`,
      value: node.frontmatter.lang || 'fr',
    })

    createNodeField({
      node,
      name: `slug`,
      value: `/${slug}`,
    })

    if (date) {
      createNodeField({
        node,
        name: `date`,
        value: date,
      })
    }
  }
}

exports.onCreateWebpackConfig = ({ actions, stage, plugins }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        path: require.resolve('path-browserify'),
      },
    },
  })

  if (stage === 'build-javascript' || stage === 'develop') {
    actions.setWebpackConfig({
      plugins: [plugins.provide({ process: 'process/browser' })],
    })
  }
}
