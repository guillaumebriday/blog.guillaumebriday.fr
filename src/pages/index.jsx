import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default ({ data: { file } }) => (
  <div className="container py-16 mx-auto max-w-3xl px-3">
    <div className="flex justify-center">
      <div className="flex flex-col">
        <Img
          fluid={file.childImageSharp.fluid}
          className="rounded-full w-32 mx-auto"
          alt="Photo de profil"
        />

        <h1 className="mr-4 text-3xl text-gray-700 font-normal mt-4">
          Guillaume <span className="font-extrabold text-black">BRIDAY</span>
        </h1>
      </div>
    </div>

    <div className="post-content text-gray-700">
      <p>
        Je suis développeur Web avec l'envie de partager ce que j'aime sur ce
        blog. Tu y trouveras tous <Link to="/articles">les articles</Link> que
        j'écris au fil de mes recherches. Je fais également{' '}
        <Link to="/talks">des talks</Link> sur divers sujets autour du Web.
      </p>

      <p>
        Je travaille sur{' '}
        <a href="https://github.com/guillaumebriday">des projets open source</a>{' '}
        que tu peux retrouver sur Github.
      </p>

      <p>
        Je suis membre de l'association{' '}
        <a href="http://www.lyonenglishtoastmasters.org/">
          Lyon English Toastmasters
        </a>{' '}
        et désormais organisateur du{' '}
        <a href="https://www.meetup.com/LyonRB/">Meetup Lyon.rb</a>.
      </p>

      <p>
        Le reste du temps, je suis passionné de photographie et de voyages comme
        tu peux le voir sur mon{' '}
        <a href="https://instagram.com/guillaumebriday">Instagram</a>.
      </p>

      <p>
        N'hésite pas à venir discuter sur{' '}
        <a href="https://twitter.com/guillaumebriday">Twitter</a> ! 👋
      </p>

      <div className="flex justify-center my-8">
        <div className="w-full md:w-8/12 flex justify-between flex-wrap">
          <p className="w-1/2 md:w-auto text-center sm:mt-0 mt-4">
            <a href="https://github.com/guillaumebriday">
              <FontAwesomeIcon
                icon={['fab', 'github']}
                className="text-indigo-500 mr-1"
              />{' '}
              GitHub
            </a>
          </p>

          <p className="w-1/2 md:w-auto text-center sm:mt-0 mt-4">
            <a href="https://twitter.com/guillaumebriday">
              <FontAwesomeIcon
                icon={['fab', 'twitter']}
                className="text-indigo-500 mr-1"
              />{' '}
              Twitter
            </a>
          </p>

          <p className="w-1/2 md:w-auto text-center sm:mt-0 mt-4">
            <a href="https://instagram.com/guillaumebriday">
              <FontAwesomeIcon
                icon={['fab', 'instagram']}
                className="text-indigo-500 mr-1"
              />{' '}
              Instagram
            </a>
          </p>

          <p className="w-1/2 md:w-auto text-center sm:mt-0 mt-4">
            <a href="https://www.linkedin.com/in/guillaumebriday">
              <FontAwesomeIcon
                icon={['fab', 'linkedin']}
                className="text-indigo-500 mr-1"
              />{' '}
              Linkedin
            </a>
          </p>

          <p className="w-1/2 md:w-auto text-center sm:mt-0 mt-4">
            <a href="https://www.patreon.com/guillaumebriday">
              <FontAwesomeIcon
                icon={['fab', 'patreon']}
                className="text-indigo-500 mr-1"
              />{' '}
              Patreon
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
)

export const query = graphql`
  {
    file(relativePath: { eq: "me.jpg" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fluid(maxWidth: 128, quality: 100) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`
