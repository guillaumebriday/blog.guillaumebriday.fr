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
        }
      }
    }
  `)

  return (
    <>
      <Helmet
        title={site.siteMetadata.title}
        htmlAttributes={{ lang: 'fr' }}
        meta={[
          {
            name: 'description',
            content: site.siteMetadata.description,
          },
          {
            name: 'author',
            content: 'Guillaume Briday'
          },
        ]}
      />

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
