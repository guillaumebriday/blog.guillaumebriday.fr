import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'

const Podcast = ({ data: { site } }) => (
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
      <h1>Podcast</h1>

      <p className="font-light text-gray-700 text-sm">
        J'ai lancé un Podcast avec des amis pour parler de Tech, de Business, de
        DevOps, de Produits et plein d'autres choses !
      </p>

      <iframe
        title="Ausha player"
        loading="lazy"
        height="420"
        id="ausha-haRX"
        style={{ border: 'none', width: '100%', height: '420px' }}
        src="https://player.ausha.co/index.html?showId=yA4zaUrOm3En&color=%23f12e49&multishow=true&playlist=true&playlistSlug=les-rubistes-lyonnais&podcastId=omnZ4s0q0wG8&v=3&playerId=ausha-haRX"
      ></iframe>
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
  }
`
