import React from 'react'
import { Helmet } from 'react-helmet'

const SchemaOrg = ({
  layout,
  title,
  description,
  articleSection,
  datePublished,
  author,
  siteUrl,
  url,
}) => {
  const isPost = layout === 'post' || layout === 'podcast'

  const breadcrumbList = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@id': siteUrl,
          url: siteUrl,
          name: 'Accueil',
        },
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          '@id': url,
          url,
          name: title,
        },
      },
    ],
  }

  const blogPosting = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    articleSection: isPost ? articleSection : undefined,
    datePublished: isPost ? datePublished : undefined,
    dateModified: isPost ? datePublished : undefined,
    description: description,
    author: {
      '@type': 'Person',
      name: author,
    },
    mainEntityOfPage: {
      '@type': 'WebSite',
      '@id': siteUrl,
    },
  }

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      url: siteUrl,
      name: author,
    },
    breadcrumbList,
    blogPosting,
  ]

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  )
}

export default SchemaOrg
