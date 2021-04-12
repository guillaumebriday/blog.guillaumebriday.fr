import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql, Link } from 'gatsby'
import PodcastList from '../components/Podcast/PodcastList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Podcast = ({
  data: {
    allMarkdownRemark: { edges: podcasts },
    site,
  },
}) => (
  <>
    <Helmet>
      <title>Podcast | {site.siteMetadata.title}</title>
      <meta
        name="description"
        content="J'ai lancé un Podcast avec des amis pour parler de Tech, de Business, de DevOps, de Produits et plein d'autres choses !"
      />

      <script src="https://player.ausha.co/ausha-player.js" defer></script>
    </Helmet>

    <div className="container py-16 px-3 mx-auto max-w-3xl">
      <div className="border-b mb-4">
        <h1>Podcast</h1>

        <p className="font-light text-gray-700 text-sm">
          J'ai lancé un Podcast avec des amis pour parler de Tech, de Business,
          de DevOps, de Produits et plein d'autres choses !
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          <div>
            <Link
              to="https://podcasts.apple.com/fr/podcast/expressions-irr%C3%A9guli%C3%A8res/id1562503305"
              className="inline-block px-2 py-1 border border-gray-900 text-gray-900 rounded"
            >
              <FontAwesomeIcon className="mr-2" icon="podcast" />
              Apple Podcasts
            </Link>
          </div>

          <div>
            <Link
              to="https://open.spotify.com/show/1WAZVCkc8AytLSxYihXnSR"
              className="inline-block px-2 py-1 border border-gray-900 text-gray-900 rounded"
            >
              <FontAwesomeIcon className="mr-2" icon={['fab', 'spotify']} />
              Spotify
            </Link>
          </div>

          <div>
            <Link
              to="https://feed.ausha.co/yA4zaUrOm3En"
              className="inline-block px-2 py-1 border border-gray-900 text-gray-900 rounded"
            >
              <FontAwesomeIcon className="mr-2" icon="rss" />
              RSS
            </Link>
          </div>
        </div>
      </div>

      <iframe
        title="Ausha player"
        loading="lazy"
        height="420"
        id="ausha-haRX"
        style={{ border: 'none', width: '100%', height: '420px' }}
        src="https://player.ausha.co/index.html?showId=yA4zaUrOm3En&color=%236574cd&multishow=true&playlist=true&podcastId=omnZ4s0q0wG8&v=3&playerId=ausha-haRX"
      ></iframe>

      <PodcastList podcasts={podcasts} />
    </div>
  </>
)

export default Podcast
export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }

    allMarkdownRemark(
      sort: { fields: [fields___date], order: DESC }
      filter: { frontmatter: { layout: { eq: "podcast" } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
            datePublished: date(formatString: "YYYY-MM-DD")
            date: date(formatString: "DD MMMM YYYY", locale: "fr")
          }
          frontmatter {
            layout
            title
            description
          }
        }
      }
    }
  }
`
