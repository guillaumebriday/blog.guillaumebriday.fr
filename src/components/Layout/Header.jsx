import React from 'react'
import { Link } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { InstantSearch, Index, Configure } from 'react-instantsearch-dom'
import algoliasearch from 'algoliasearch'
import AutoComplete from '../AutoComplete'

const searchClient = algoliasearch(
  '8MB3KSYZEQ',
  '7fc62cf15955fb0a464f0c2a7ec8bb1e'
)

const Header = ({ isBlog }) => {
  const activeClassName = (isActive) => {
    let classes =
      'header-link flex-shrink-0 hover:no-underline hover:text-indigo-500 relative mr-8 my-2 lg:my-0 font-semibold'
    let activeClasses = isActive ? 'active text-indigo-500' : 'text-gray-900'

    return { className: [classes, activeClasses].join(' ') }
  }

  const className = ({ isPartiallyCurrent }) =>
    activeClassName(isPartiallyCurrent)
  const classNameBlog = ({ isPartiallyCurrent }) =>
    activeClassName(isBlog || isPartiallyCurrent)

  return (
    <header className="px-3 shadow">
      <nav className="container max-w-6xl text-gray">
        <div className="-my-2px py-4 flex flex-col lg:flex-row flex-wrap justify-between items-baseline">
          <Link
            className="mr-4 text-2xl text-gray-700 hover:no-underline flex-shrink-0 font-normal"
            to="/"
          >
            Guillaume <span className="font-extrabold text-black">BRIDAY</span>
          </Link>

          <div className="flex flex-col lg:flex-row items-baseline w-full lg:w-auto">
            <Link getProps={classNameBlog} to="/articles">
              Articles
            </Link>

            <Link getProps={className} to="/talks">
              Talks
            </Link>

            <Link getProps={className} to="/mon-profil">
              Mon profil
            </Link>

            <div className="flex items-center inline border border-indigo-500 rounded-full mt-2 lg:mt-0 py-1 px-2 pr-4 leading-tight w-full">
              <InstantSearch indexName="blog" searchClient={searchClient}>
                <Index indexName="blog">
                  <Configure hitsPerPage={5} />
                  <AutoComplete />
                </Index>
              </InstantSearch>

              <FontAwesomeIcon icon="search" className="text-indigo-500" />
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
