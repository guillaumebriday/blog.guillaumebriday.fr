import React from 'react'
import Helmet from 'react-helmet'
import PostList from '../components/Post/PostList'
import Pagination from '../components/Layout/Pagination'
import { graphql } from 'gatsby'

export default ({
  data: {
    allMarkdownRemark: { edges: posts },
    site,
  },
  pageContext,
}) => (
  <>
    <Helmet title={`Articles | ${site.siteMetadata.title}`} />

    <div className="container px-3 py-16 mx-auto max-w-3xl">
      <h1>Articles</h1>

      <p className="font-light text-gray-700 text-sm mb-12">
        Tu trouveras ici tous les articles que j'ai publié, bonne lecture !
      </p>

      <PostList posts={posts} />

      <Pagination pageContext={pageContext} />
    </div>
  </>
)

export const PostIndexQuery = graphql`
  query($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [fields___date], order: DESC }
      limit: $limit
      skip: $skip
      filter: { frontmatter: { layout: { eq: "post" } } }
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          fields {
            slug
            datePublished: date(formatString: "YYYY-MM-DD")
            date: date(formatString: "DD MMMM YYYY", locale: "fr")
          }
          frontmatter {
            layout
            title
            category
            lang
          }
        }
      }
    }
  }
`
