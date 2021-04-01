import React from 'react'
import { formatReadingTime } from '../../utils/helpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'gatsby'

const PostHeader = ({ post, allCommentsYaml }) => {
  const comments = allCommentsYaml ? allCommentsYaml.edges : []

  return (
    <header className="pb-4 mb-8 border-b">
      <Link
        to="/categories"
        itemProp="articleSection"
        className="btn btn--lightest btn--sm"
      >
        {post.frontmatter.category}
      </Link>

      <h1 className="my-2 text-black leading-tight" itemProp="name">
        {post.frontmatter.title}
      </h1>

      <ul className="mb-4 text-sm text-indigo-500">
        <li className="block sm:inline-block mr-3">
          <time
            dateTime={post.fields.datePublished}
            itemProp="datePublished"
            content={post.fields.datePublished}
          >
            <FontAwesomeIcon
              icon={['far', 'calendar-alt']}
              className="mr-1 text-indigo-200"
            />{' '}
            Le {post.fields.date}
          </time>
        </li>

        <li className="block sm:inline-block sm:border-l sm:pl-3 mr-3 border-indigo-500">
          <FontAwesomeIcon icon="user" className="mr-1 text-indigo-200" /> Par
          <span itemProp="author" itemScope itemType="http://schema.org/Person">
            <span itemProp="name"> Guillaume Briday</span>
          </span>
        </li>

        <li className="block sm:inline-block sm:border-l sm:pl-3 mr-3 border-indigo-500">
          <a href="#comments" className="text-indigo-500">
            <FontAwesomeIcon icon="comments" className="mr-1 text-indigo-200" />{' '}
            {comments.length} commentaire
            {comments.length > 1 ? 's' : ''}
          </a>
        </li>

        <li className="block sm:inline-block">
          <FontAwesomeIcon
            icon={['far', 'clock']}
            className="mr-1 text-indigo-200"
          />{' '}
          {formatReadingTime(post.timeToRead)}
        </li>
      </ul>
    </header>
  )
}

export default PostHeader
