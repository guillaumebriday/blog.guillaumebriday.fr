import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import PodcastPagination from '../components/Podcast/PodcastPagination'

const Page = ({ data: { markdownRemark: podcast, site }, pageContext }) => (
  <>
    <Helmet>
      <title>
        {podcast.frontmatter.title} | {site.siteMetadata.title}
      </title>

      {podcast.frontmatter.description && (
        <meta name="description" content={podcast.frontmatter.description} />
      )}

      <script src="https://player.ausha.co/ausha-player.js" defer></script>
    </Helmet>

    <article itemScope="" itemType="http://schema.org/BlogPosting">
      <div className="container px-3 py-16 mx-auto max-w-3xl">
        <h1 className="leading-tight">{podcast.frontmatter.title}</h1>

        <div className="text-gray-700 text-sm">
          Le{' '}
          <span
            itemProp="datePublished"
            className="font-light"
            content={podcast.fields.datePublished}
          >
            {podcast.fields.date}
          </span>
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
            src={`https://player.ausha.co/index.html?showId=yA4zaUrOm3En&color=%23f12e49&podcastId=${podcast.frontmatter.podcastId}&v=3&playerId=ausha-N6mb`}
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
          itemProp="articleBody"
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
      }
    }

    markdownRemark(
      frontmatter: { layout: { eq: "podcast" } }
      fields: { slug: { eq: $slug } }
    ) {
      html
      fields {
        datePublished: date(formatString: "YYYY-MM-DD")
        date: date(formatString: "DD MMMM YYYY", locale: "fr")
      }
      frontmatter {
        title
        description
        podcastId
        youtubeId
      }
    }
  }
`
