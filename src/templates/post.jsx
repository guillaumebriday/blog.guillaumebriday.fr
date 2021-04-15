import React from 'react'
import PostHeader from '../components/Post/PostHeader'
import PostPagination from '../components/Post/PostPagination'
import CommentList from '../components/Comment/CommentList'
import Seo from '../components/Seo/Seo'
import { graphql } from 'gatsby'

const BlogPost = ({
  data: { markdownRemark: post, allCommentsYaml, site },
  pageContext,
}) => (
  <>
    <Seo site={site} page={post}></Seo>

    <article itemScope="" itemType="http://schema.org/BlogPosting">
      <div className="container pt-16 px-3 max-w-3xl">
        <PostHeader post={post} allCommentsYaml={allCommentsYaml} />

        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </div>

      <div className="container px-3 max-w-6xl">
        <PostPagination pageContext={pageContext} />
      </div>

      <div className="bg-gray-200">
        <div className="container px-3 max-w-3xl py-16">
          <CommentList allCommentsYaml={allCommentsYaml} post={post} />
        </div>
      </div>
    </article>
  </>
)

export default BlogPost
export const pageQuery = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
        author
        siteUrl
      }
    }

    markdownRemark(
      frontmatter: { layout: { eq: "post" } }
      fields: { slug: { eq: $slug } }
    ) {
      html
      timeToRead
      excerpt(pruneLength: 250)
      fields {
        slug
        lang
        datePublished: date(formatString: "YYYY-MM-DD")
        date: date(formatString: "DD MMMM YYYY", locale: "fr")
      }
      frontmatter {
        layout
        title
        description
        category
      }
    }

    allCommentsYaml(filter: { slug: { eq: $slug } }) {
      edges {
        node {
          id
          author
          datePublished: date(formatString: "YYYY-MM-DD HH:mm:ss")
          date: date(formatString: "dddd DD MMMM YYYY à HH:mm", locale: "fr")
          content
        }
      }
    }
  }
`
