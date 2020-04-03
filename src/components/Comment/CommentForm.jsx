import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

// As per the HTML5 Specification
const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

export default class CommentForm extends Component {
  state = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    form: {
      slug: this.props.slug,
      name: '',
      email: '',
      content: '',
    },
  }

  isDisabled = () => {
    return (
      this.state.isLoading ||
      this.state.form.name === '' ||
      this.state.form.email === '' ||
      !emailRegExp.test(this.state.form.email) ||
      this.state.form.content === ''
    )
  }

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    if (this.isDisabled()) {
      return false
    }

    this.setState({ isLoading: true })

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': 'comment',
        ...this.state.form,
      }),
    })
      .then(() => {
        this.setState({
          isLoading: false,
          isSuccess: true,
        })
      })
      .catch(() => {
        this.setState({
          isLoading: false,
          isError: true,
        })
      })
  }

  submitIcon = () => {
    if (this.state.isLoading) {
      return <FontAwesomeIcon className="ml-1" icon="spinner" spin />
    }

    return (
      <svg viewBox="0 0 17 13" className="w-4 text-white stroke-current ml-2">
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
    )
  }

  render() {
    const { slug, name, email, content } = this.state.form

    return (
      <>
        {this.state.isError && (
          <div
            className="bg-red-100 border border-red-200 px-5 py-4 rounded flex"
            role="alert"
          >
            <svg
              viewBox="0 0 36 38"
              className="w-12 text-red-600 fill-current mr-4"
            >
              <g strokeWidth="1">
                <path d="M34.1052632,1.9 L34.1052632,0 L32.2105263,0 L30.3157895,0 L28.4210526,0 L26.5263158,0 L24.6315789,0 L22.7368421,0 L20.8421053,0 L18.9473684,0 L18.9473684,1.9 L17.0526316,1.9 L17.0526316,3.8 L17.0526316,5.7 L17.0526316,7.6 L17.0526316,9.5 L17.0526316,11.4 L17.0526316,13.3 L15.1578947,13.3 L15.1578947,15.2 L13.2631579,15.2 L13.2631579,17.1 L11.3684211,17.1 L11.3684211,19 L9.47368421,19 L9.47368421,20.9 L7.57894737,20.9 L5.68421053,20.9 L5.68421053,19 L3.78947368,19 L3.78947368,17.1 L1.89473684,17.1 L1.89473684,15.2 L1.89473684,13.3 L0,13.3 L0,15.2 L0,17.1 L0,19 L0,20.9 L0,22.8 L1.89473684,22.8 L1.89473684,24.7 L3.78947368,24.7 L3.78947368,26.6 L5.68421053,26.6 L5.68421053,28.5 L7.57894737,28.5 L7.57894737,30.4 L9.47368421,30.4 L9.47368421,32.3 L9.47368421,34.2 L9.47368421,36.1 L9.47368421,38 L11.3684211,38 L13.2631579,38 L13.2631579,36.1 L11.3684211,36.1 L11.3684211,34.2 L13.2631579,34.2 L13.2631579,32.3 L15.1578947,32.3 L15.1578947,30.4 L17.0526316,30.4 L18.9473684,30.4 L18.9473684,32.3 L20.8421053,32.3 L22.7368421,32.3 L22.7368421,30.4 L20.8421053,30.4 L20.8421053,28.5 L22.7368421,28.5 L22.7368421,26.6 L24.6315789,26.6 L24.6315789,24.7 L24.6315789,22.8 L24.6315789,20.9 L24.6315789,19 L24.6315789,17.1 L26.5263158,17.1 L26.5263158,19 L28.4210526,19 L28.4210526,17.1 L28.4210526,15.2 L26.5263158,15.2 L24.6315789,15.2 L24.6315789,13.3 L26.5263158,13.3 L28.4210526,13.3 L30.3157895,13.3 L32.2105263,13.3 L32.2105263,11.4 L30.3157895,11.4 L28.4210526,11.4 L26.5263158,11.4 L26.5263158,9.5 L28.4210526,9.5 L30.3157895,9.5 L32.2105263,9.5 L34.1052632,9.5 L36,9.5 L36,7.6 L36,5.7 L36,3.8 L36,1.9 L34.1052632,1.9 Z M23,2 L23,4 L21,4 L21,2 L23,2 Z"></path>
              </g>
            </svg>

            <div className="flex flex-col justify-center">
              <strong className="font-bold text-red-500">Whoops ! </strong>

              <p className="block sm:inline m-0">
                Quelque chose s'est mal passé, merci de réessayer plus tard.
              </p>
            </div>
          </div>
        )}

        {this.state.isSuccess ? (
          <div
            className="bg-green-100 border border-green-200 px-5 py-4 rounded flex"
            role="alert"
          >
            <svg
              viewBox="0 0 37 38"
              className="w-12 text-green-600 fill-current mr-4"
            >
              <g strokeWidth="1">
                <g>
                  <g transform="translate(0.000000, 0.500000)">
                    <path d="M1.00243501,30.2723793 C0.751237401,30.2723793 0.500137931,30.1766406 0.308415119,29.9849668 C-0.0748832891,29.6016684 -0.0748832891,28.9802255 0.308415119,28.5969761 L5.9834496,22.9220398 C6.36674801,22.5387414 6.98819098,22.5388395 7.37139125,22.9220398 C7.75468966,23.3053382 7.75468966,23.9267812 7.37139125,24.3100305 L1.69640584,29.9849668 C1.50478117,30.1765424 1.25353448,30.2723793 1.00243501,30.2723793 Z"></path>
                    <path d="M2.27132891,35.7101525 C2.02018037,35.7101525 1.76898276,35.6143156 1.57735809,35.4227401 C1.19405968,35.0394416 1.19405968,34.4179987 1.57735809,34.0347493 L7.49240186,28.1197056 C7.87574934,27.7364072 8.49714324,27.7364072 8.8803435,28.1197056 C9.26364191,28.503004 9.26364191,29.1244469 8.8803435,29.5076963 L2.96529973,35.422691 C2.77367507,35.6143156 2.52247745,35.7101525 2.27132891,35.7101525 Z"></path>
                    <path d="M36.6915849,0.308513263 C36.4688488,0.0857771883 36.1529257,-0.0166352785 35.8417626,0.0335159151 C35.7278183,0.0518687003 33.0076804,0.498714854 29.3007122,1.91501989 C27.1261034,2.74585146 25.0598939,3.74072944 23.1595955,4.87217374 C20.7747149,6.29211008 18.6448103,7.93267241 16.8290623,9.74837135 C13.7649814,12.8124523 11.2611512,16.6765477 9.38720424,21.2331419 C9.23660345,21.5994615 9.32081034,22.0203979 9.60086207,22.3004496 L11.4562599,24.1558966 L15.647565,19.9645915 C16.0309615,19.5812931 16.6523064,19.5812931 17.0355557,19.9645915 C17.418805,20.3478899 17.4188541,20.9693329 17.0355557,21.3525822 L12.8442507,25.5438873 L14.6995995,27.3993342 C14.8873475,27.5869841 15.1383488,27.6867467 15.3937666,27.6867467 C15.519439,27.6867467 15.6461419,27.6626034 15.7669072,27.612943 C20.3237958,25.7388488 24.1877931,23.2350186 27.2517268,20.171134 C29.0673767,18.3553859 30.7080371,16.2254814 32.1279244,13.8406008 C33.2593687,11.9402533 34.2542958,9.87414191 35.0850782,7.69948408 C36.5013342,3.99246684 36.9482785,1.27237798 36.9665822,1.15838462 C37.0165862,0.847319629 36.914321,0.531200265 36.6915849,0.308513263 Z M27.8552095,14.0796777 C27.1961286,14.7388077 26.3199549,15.1017905 25.3879867,15.1017905 C25.3878886,15.1017905 25.3877905,15.1017905 25.3876923,15.1017905 C24.455626,15.1016923 23.579305,14.7387586 22.9203223,14.0797268 C22.2612905,13.4205968 21.8983568,12.5443249 21.8983568,11.6122586 C21.8983568,10.6801923 22.2612905,9.80387135 22.9204204,9.14488859 C23.5794523,8.48575862 24.4558223,8.12277586 25.3878886,8.12277586 C26.3199549,8.12277586 27.1961777,8.48570955 27.8552095,9.14479045 C29.2157202,10.5053501 29.2157202,12.719118 27.8552095,14.0796777 Z"></path>
                    <path d="M7.70905305,36.9789973 C7.45785544,36.9789973 7.2067069,36.8832586 7.01503316,36.6915849 C6.63173475,36.3082865 6.63173475,35.6868435 7.01503316,35.3035942 L12.6900676,29.6285597 C13.073366,29.2453594 13.6947109,29.2452613 14.0779602,29.6285597 C14.4612095,30.0118581 14.4612586,30.6333011 14.0779602,31.0165504 L8.4029748,36.6915849 C8.21135013,36.8831605 7.96020159,36.9789973 7.70905305,36.9789973 Z"></path>
                    <path d="M14.4659204,10.1151817 L9.53530239,11.0750716 C9.34402122,11.1122679 9.16809947,11.2057003 9.03001194,11.3432971 L2.31505172,18.0367149 C2.00918833,18.3415968 1.9385252,18.8105252 2.14104377,19.1919589 C2.31357958,19.5168621 2.64967109,19.7132467 3.00764854,19.7132467 C3.06977321,19.7132467 3.1327321,19.707309 3.19539655,19.6951393 L8.95483422,18.5738528 C10.4738952,15.3763952 12.319626,12.5438833 14.4659204,10.1151817 Z"></path>
                    <path d="M18.4260981,28.0452149 L17.3049098,33.8046034 C17.2223714,34.2285332 17.4266074,34.6565358 17.8080902,34.8589562 C17.9533912,34.9360968 18.1112546,34.9735875 18.2679403,34.9735875 C18.5227692,34.9735875 18.7746048,34.8744138 18.9633833,34.6849973 L25.6567029,27.9698408 C25.7943488,27.8318024 25.887683,27.6558806 25.9249775,27.4645504 L26.8848674,22.5340796 C24.4562639,24.6803249 21.6237029,26.5260066 18.4260981,28.0452149 Z"></path>
                  </g>
                </g>
              </g>
            </svg>

            <div className="flex flex-col justify-center">
              <strong className="font-bold text-green-600">
                Commentaire envoyé !{' '}
              </strong>

              <p className="block sm:inline m-0">
                Votre commentaire a bien été envoyé, il est en attente de
                modération.
              </p>
            </div>
          </div>
        ) : (
          <form
            onSubmit={this.handleSubmit}
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            name="comment"
            method="post"
          >
            <input type="hidden" name="form-name" value="comment" />
            <input type="hidden" name="slug" value={slug} required />

            <p className="text-sm text-gray-700">
              Votre adresse de messagerie ne sera pas publiée.
              <br />
              Les champs obligatoires sont indiqués avec{' '}
              <span className="text-red">*</span>.
            </p>

            <div className="my-4 inline-block w-full md:w-1/2 md:pr-2">
              <label htmlFor="name">
                Nom <span className="text-red-400">*</span>
              </label>
              <input
                value={name}
                onChange={this.handleChange}
                placeholder="Votre nom"
                className="text-input mt-1"
                name="name"
                id="name"
                type="text"
                required
              />
            </div>

            <div className="my-4 inline-block w-full md:w-1/2 md:pl-2">
              <label htmlFor="email">
                Email <span className="text-red-400">*</span>
              </label>
              <input
                value={email}
                onChange={this.handleChange}
                placeholder="Votre email"
                className="text-input mt-1"
                name="email"
                id="email"
                type="email"
                required
              />
            </div>

            <div className="my-4">
              <label htmlFor="content">
                Commentaire <span className="text-red-400">*</span>
              </label>
              <textarea
                value={content}
                onChange={this.handleChange}
                placeholder="Votre commentaire"
                className="text-input mt-1"
                name="content"
                id="content"
                rows="8"
                required
              />
              <em className="text-sm text-gray-700">
                Les commentaires sont formatés en{' '}
                <a
                  href="https://www.markdownguide.org/cheat-sheet"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  markdown
                </a>
                .
              </em>
            </div>

            <div className="flex justify-end">
              <button
                disabled={this.isDisabled()}
                className="btn btn--link leading-tight py-3 px-4 flex items-center"
              >
                Envoyer {this.submitIcon()}
              </button>
            </div>
          </form>
        )}
      </>
    )
  }
}
