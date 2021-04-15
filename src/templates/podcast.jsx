import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import PodcastPagination from '../components/Podcast/PodcastPagination'
import Seo from '../components/Seo/Seo'

const Page = ({ data: { markdownRemark: podcast, site }, pageContext }) => (
  <>
    <Seo site={site} page={podcast}></Seo>
    <Helmet>
      <script src="https://player.ausha.co/ausha-player.js" defer></script>
    </Helmet>

    <article>
      <div className="container px-3 py-16 mx-auto max-w-3xl">
        <h1 className="leading-tight">{podcast.frontmatter.title}</h1>

        <div className="text-gray-700 text-sm">
          Le{' '}
          <time className="font-light" dateTime={podcast.fields.datePublished}>
            {podcast.fields.date}
          </time>
        </div>

        {podcast.frontmatter.description && (
          <p>{podcast.frontmatter.description}</p>
        )}

        {podcast.frontmatter.podcastId && (
          <iframe
            loading="lazy"
            id="ausha-N6mb"
            height="420"
            title="Ausha player"
            style={{ border: 'none', width: '100%', height: '420px' }}
            src={`https://player.ausha.co/index.html?showId=yA4zaUrOm3En&color=%236574cd&podcastId=${podcast.frontmatter.podcastId}&v=3&playerId=ausha-N6mb`}
          ></iframe>
        )}

        {podcast.frontmatter.youtubeId && (
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src={`https://www.youtube.com/embed/${podcast.frontmatter.youtubeId}`}
              title="YouTube video player"
              allowFullScreen=""
            ></iframe>
          </div>
        )}

        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: podcast.html }}
        />
      </div>

      <div className="container px-3 max-w-6xl">
        <PodcastPagination pageContext={pageContext} />
      </div>
    </article>
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
      frontmatter: { layout: { eq: "podcast" } }
      fields: { slug: { eq: $slug } }
    ) {
      html
      excerpt(pruneLength: 250)
      fields {
        datePublished: date(formatString: "YYYY-MM-DD")
        date: date(formatString: "DD MMMM YYYY", locale: "fr")
      }
      frontmatter {
        layout
        title
        description
        podcastId
        youtubeId
      }
    }
  }
`
