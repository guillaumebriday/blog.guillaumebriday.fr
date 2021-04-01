import React from 'react'
import { Link } from 'gatsby'

const PostPagination = ({ pageContext: { previous, next } }) => (
  <div className="my-6 py-6 flex flex-wrap border-t border-indigo-500">
    <div className="w-full sm:pr-4 sm:w-1/2">
      {previous && (
        <>
          <div className="mb-4">
            <Link
              to={previous.fields.slug}
              rel="prev"
              className="btn btn--lightest btn--sm"
            >
              <svg
                viewBox="0 0 17 13"
                className="w-4 stroke-current mr-1 inline"
              >
                <g
                  strokeWidth="1"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <g transform="translate(1.000000, 0.000000)">
                    <path d="M0,5.8325 L15,5.8325"></path>
                    <polyline points="5.83333333 0 0 5.83333333 5.83333333 11.6666667"></polyline>
                  </g>
                </g>
              </svg>
              Article précédent
            </Link>
          </div>

          <Link
            to={previous.fields.slug}
            rel="prev"
            className="font-semibold text-2xl text-gray-900 leading-tight"
          >
            {previous.frontmatter.title}
          </Link>
        </>
      )}
    </div>

    <div className="w-full sm:pl-4 mt-3 sm:w-1/2 sm:mt-0 text-right">
      {next && (
        <>
          <div className="mb-4">
            <Link
              to={next.fields.slug}
              rel="next"
              className="btn btn btn--lightest btn--sm"
            >
              Article suivant{' '}
              <svg
                viewBox="0 0 17 13"
                className="w-4 stroke-current ml-1 inline"
              >
                <g
                  strokeWidth="1"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <g transform="translate(1.000000, 0.000000)">
                    <g transform="translate(7.500000, 6.000000) scale(-1, 1) translate(-7.500000, -6.000000) ">
                      <path d="M0,5.8325 L15,5.8325"></path>
                      <polyline points="5.83333333 0 0 5.83333333 5.83333333 11.6666667"></polyline>
                    </g>
                  </g>
                </g>
              </svg>
            </Link>
          </div>

          <Link
            to={next.fields.slug}
            rel="next"
            className="font-semibold text-2xl text-gray-900 leading-tight"
          >
            {next.frontmatter.title}
          </Link>
        </>
      )}
    </div>
  </div>
)

export default PostPagination
