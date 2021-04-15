import React from 'react'
import Seo from '../components/Seo/Seo'
import { graphql } from 'gatsby'

const Page = ({ data: { markdownRemark: page, site } }) => (
  <>
    <Seo site={site} page={page}></Seo>

    <div className="container px-3 py-16 mx-auto max-w-3xl">
      <h1 className="leading-tight">{page.frontmatter.title}</h1>

      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: page.html }}
      />
    </div>
  </>
)

export default Page
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
      frontmatter: { layout: { eq: "page" } }
      fields: { slug: { eq: $slug } }
    ) {
      html
      frontmatter {
        layout
        title
      }
      fields {
        lang
      }
    }
  }
`
