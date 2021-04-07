import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'

const Page = ({ data: { markdownRemark: page, site } }) => (
  <>
    <Helmet>
      <title>
        {page.frontmatter.title} | {site.siteMetadata.title}
      </title>
    </Helmet>

    <div className="container px-3 py-16 mx-auto max-w-3xl">
      <h1 className="leading-tight">{page.frontmatter.title}</h1>

      <div
        className="post-content"
        itemProp="articleBody"
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
      }
    }

    markdownRemark(
      frontmatter: { layout: { eq: "page" } }
      fields: { slug: { eq: $slug } }
    ) {
      html
      frontmatter {
        title
      }
    }
  }
`
