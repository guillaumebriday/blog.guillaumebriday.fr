import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import PageTransition from '../components/Layout/PageTransition'
import ScrollIndicator from '../components/ScrollIndicator'

const Layout = ({ children, location, pageContext }) => {
  const { site } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
          description
          lang
          author
        }
      }
    }
  `)

  return (
    <>
      <Helmet>
        <title>{site.siteMetadata.title}</title>
        <html lang={site.siteMetadata.lang}></html>
        <meta name="description" content={site.siteMetadata.description} />
        <meta name="author" content={site.siteMetadata.author} />
      </Helmet>

      <div className="flex flex-col min-h-screen font-sans leading-normal">
        {pageContext.isBlog && <ScrollIndicator />}

        <Header isBlog={pageContext.isBlog} />

        <PageTransition location={location}>
          <main>{children}</main>
        </PageTransition>

        <Footer />
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
