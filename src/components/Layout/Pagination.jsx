import React from 'react'
import { Link } from 'gatsby'

export default function ({ pageContext: { currentPage, numPages } }) {
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage =
    currentPage - 1 <= 1 ? `/articles` : `/articles/page/${currentPage - 1}`
  const nextPage =
    currentPage + 1 <= numPages
      ? `/articles/page/${currentPage + 1}`
      : `/articles/page/${currentPage}`

  if (numPages === 1) {
    return false
  }

  let pages = []
  Array.from({ length: numPages }).forEach((_, i) => {
    const iteration = i + 1

    if (iteration === 1) {
      pages.push({
        iteration: iteration,
        url: `/articles`,
      })
    } else {
      pages.push({
        iteration: iteration,
        url: `/articles/page/${iteration}`,
      })
    }
  })

  let prevTag = (
    <Link
      className="mx-4"
      to={prevPage}
      rel="prev"
      aria-label="Page précédente"
    >
      <svg
        viewBox="0 0 17 13"
        className="w-4 text-gray-700 hover:text-indigo-500 stroke-current"
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
    </Link>
  )

  if (isFirst) {
    prevTag = (
      <span className="mx-4">
        <svg viewBox="0 0 17 13" className="w-4 text-gray-700 stroke-current">
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
      </span>
    )
  }

  let nextTag = (
    <Link
      className="mx-4"
      to={nextPage}
      rel="prenextv"
      aria-label="Page suivante"
    >
      <svg
        viewBox="0 0 17 13"
        className="w-4 text-gray-700 hover:text-indigo-500 stroke-current"
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
  )

  if (isLast) {
    nextTag = (
      <span className="mx-4">
        <svg viewBox="0 0 17 13" className="w-4 text-gray-700 stroke-current">
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
      </span>
    )
  }

  return (
    <div className="flex justify-center items-baseline">
      {prevTag}

      <div className="mx-4 flex">
        {pages.map((page) => {
          const activeClassName = (page) => {
            let classes =
              'mx-1 rounded-full h-10 w-10 flex items-center justify-center'

            let activeClasses =
              page.iteration === currentPage
                ? 'bg-indigo-100 text-indigo-500 font-semibold'
                : 'text-gray-700 hover:bg-indigo-100 hover:no-underline'

            return { className: [classes, activeClasses].join(' ') }
          }

          const className = () => activeClassName(page)
          return (
            <Link to={page.url} key={page.iteration} getProps={className}>
              {page.iteration}
            </Link>
          )
        })}
      </div>

      {nextTag}
    </div>
  )
}
