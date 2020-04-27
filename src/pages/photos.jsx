import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import Gallery from '../components/Gallery'

export default ({ data: { site, allFile } }) => (
  <>
    <Helmet title={`Photos | ${site.siteMetadata.title}`} />

    <div className="container pt-16 px-3 mx-auto max-w-3xl">
      <h1>Photos</h1>

      <p className="font-light text-gray-700 text-sm mb-12">
        Faire de la photo fait partie de mes activités favorites. Tu trouveras
        ici quelques-unes de mes photos préférées prisent durant mes voyages à
        travers le monde.
      </p>
    </div>

    <div className="container px-3 mx-auto max-w-6xl pb-16">
      <Gallery
        images={allFile.edges.map(
          ({
            node: {
              childImageSharp: {
                fluid,
                fluid: { srcSet },
                original: { src },
              },
            },
          }) => ({
            src,
            srcSet,
            fluid,
          })
        )}
      />
    </div>
  </>
)

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }

    allFile(
      filter: { absolutePath: { regex: "/gallery/" } }
      sort: { fields: [absolutePath], order: DESC }
    ) {
      edges {
        node {
          id
          childImageSharp {
            original {
              src
            }
            fluid(maxWidth: 1100, quality: 80) {
              srcSet
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`
