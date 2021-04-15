import React from 'react'
import { Link } from 'gatsby'

const PodcastList = ({ podcasts }) => (
  <ul className="mt-4">
    {podcasts.map(({ node: podcast }) => (
      <li className="mb-8" key={podcast.id}>
        <h2 className="font-semibold mb-0 mt-2 leading-tight">
          <Link to={`/podcast${podcast.fields.slug}`} className="text-black">
            {podcast.frontmatter.title}
          </Link>
        </h2>

        <div className="text-gray-700 text-sm">
          Le{' '}
          <time className="font-light" dateTime={podcast.fields.datePublished}>
            {podcast.fields.date}
          </time>
        </div>

        {podcast.frontmatter.description && (
          <p>{podcast.frontmatter.description}</p>
        )}

        <Link to={`/podcast${podcast.fields.slug}`}>Voir les notes →</Link>
      </li>
    ))}
  </ul>
)

export default PodcastList
