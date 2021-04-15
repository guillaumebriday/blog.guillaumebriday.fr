import React from 'react'
import { Helmet } from 'react-helmet'
import SchemaOrg from './SchemaOrg'

const Seo = ({
  page,
  page: {
    fields: { datePublished, lang, slug },
    frontmatter: { layout, category },
    frontmatter,
  },
  site: {
    siteMetadata: { title: siteTitle, siteUrl, author },
  },
}) => {
  const title = `${frontmatter.title} | ${siteTitle}`
  const description = frontmatter.description || page.excerpt

  return (
    <>
      <Helmet>
        {/* General tags */}
        <title>{title}</title>
        <html lang={lang}></html>

        <meta name="description" content={description} />

        {/* OpenGraph tags */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content={author} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Helmet>

      <SchemaOrg
        layout={layout}
        title={title}
        description={description}
        articleSection={category}
        datePublished={datePublished}
        author={author}
        siteUrl={siteUrl}
        url={slug}
      ></SchemaOrg>
    </>
  )
}

export default Seo
