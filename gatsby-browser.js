import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faRss,
  faSearch,
  faUser,
  faComments,
  faChevronRight,
  faSpinner,
  faMugHot,
  faAtom,
  faPodcast,
} from '@fortawesome/free-solid-svg-icons'
import {
  faCalendarAlt,
  faClock,
  faCheckCircle,
} from '@fortawesome/free-regular-svg-icons'
import {
  faGithub,
  faTwitter,
  faInstagram,
  faLinkedin,
  faTwitch,
  faAmazon,
  faYoutube,
  faSpotify,
} from '@fortawesome/free-brands-svg-icons'

import './src/styles/tailwind.css'
import './src/styles/index.css'
import SmoothScroll from 'smooth-scroll'
import 'typeface-roboto'

library.add(
  faRss,
  faSearch,
  faUser,
  faCalendarAlt,
  faComments,
  faAtom,
  faClock,
  faChevronRight,
  faCheckCircle,
  faSpinner,
  faGithub,
  faTwitter,
  faInstagram,
  faLinkedin,
  faTwitch,
  faYoutube,
  faAmazon,
  faSpotify,
  faPodcast,
  faMugHot
)

export const onRouteUpdate = () => {
  new SmoothScroll('a[href*="#"]', {
    duration: 350,
    speedAsDuration: true,
    offset: 30,
    updateURL: false,
  })
}
