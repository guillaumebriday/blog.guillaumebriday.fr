import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'

import About from '../components/Resume/About'
import Skill from '../components/Resume/Skill'
import Experience from '../components/Resume/Experience'
import Education from '../components/Resume/Education'
import Hobbies from '../components/Resume/Hobbies'

const Profile = ({ data: { site, file } }) => (
  <>
    <Helmet>
      <title>Mon profil | {site.siteMetadata.title}</title>
      <meta
        name="description"
        content="Tu trouvera tout mon parcours sur mon profil."
      />
    </Helmet>

    <About file={file} />
    <Skill />
    <Experience />
    <Education />
    <Hobbies />
  </>
)

export default Profile
export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }

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
