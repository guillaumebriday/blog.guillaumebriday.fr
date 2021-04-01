import React from 'react'
import { Helmet } from 'react-helmet'
import PostHeader from '../components/Post/PostHeader'
import PostPagination from '../components/Post/PostPagination'
import CommentList from '../components/Comment/CommentList'
import { graphql } from 'gatsby'

const BlogPost = ({
  data: { markdownRemark: post, allCommentsYaml, site },
  pageContext,
}) => (
  <>
    <Helmet>
      <title>
        {post.frontmatter.title} | {site.siteMetadata.title}
      </title>
      <html lang={post.fields.lang}></html>
      {post.frontmatter.description && (
        <meta name="description" content={post.frontmatter.description} />
      )}
    </Helmet>

    <article itemScope="" itemType="http://schema.org/BlogPosting">
      <div className="container pt-16 px-3 max-w-3xl">
        <PostHeader post={post} allCommentsYaml={allCommentsYaml} />

        <div
          className="post-content"
          itemProp="articleBody"
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
      }
    }

    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      fields {
        slug
        lang
        datePublished: date(formatString: "YYYY-MM-DD")
        date: date(formatString: "DD MMMM YYYY", locale: "fr")
      }
      frontmatter {
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
