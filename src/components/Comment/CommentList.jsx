import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CommentForm from './CommentForm'
import ReactMarkdown from 'react-markdown'

const CommentList = ({ post, allCommentsYaml }) => {
  const comments = allCommentsYaml ? allCommentsYaml.edges : []

  return (
    <>
      <h2 id="comments" className="text-3xl">
        <FontAwesomeIcon icon="comments" className="mr-4" />
        {comments.length} commentaire{comments.length > 1 ? 's' : ''}
      </h2>

      <CommentForm slug={post.fields.slug} />

      {comments.map(({ node: comment }) => (
        <div
          key={comment.id}
          className="border-t pt-6 my-6"
          itemScope
          itemType="https://schema.org/Comment"
        >
          <div>
            <div
              itemProp="creator"
              itemScope
              itemType="http://schema.org/Person"
            >
              <span className="font-bold" itemProp="name">
                {comment.author}
              </span>
            </div>

            <span className="text-gray-700">
              <time itemProp="dateCreated" dateTime={comment.datePublished}>
                Le {comment.date}
              </time>
            </span>
          </div>

          <div className="mt-4 break-words" itemProp="text">
            <ReactMarkdown source={comment.content} />
          </div>
        </div>
      ))}
    </>
  )
}

export default CommentList
