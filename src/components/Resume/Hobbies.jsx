import React from 'react'

const Hobbies = () => (
  <section className="pt-8 pb-16 bg-gray-200">
    <div className="container max-w-3xl px-3">
      <h2 className="uppercase text-center text-4xl mb-8">
        Mes centres d'intérêts
      </h2>

      <div className="flex flex-wrap justify-around text-indigo-500">
        <div className="w-1/2 md:w-1/3 text-center mb-6">
          <div className="bg-indigo-100 mb-4 inline-block p-8 rounded-full">
            <svg
              viewBox="0 0 62 50"
              className="hobby-icon fa-3x stroke-current text-indigo-500"
            >
              <g
                strokeWidth="1"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <g transform="translate(1.000000, 1.000000)" strokeWidth="2">
                  <path d="M0,0 L60,0 L60,12 L0,12 L0,0 Z M0,12 L0,48 L60,48 L60,12 L0,12 Z"></path>
                  <path d="M36,22 L43,30 L36,38 M24,22 L17,30 L24,38"></path>
                  <circle cx="6" cy="6" r="1"></circle>
                  <circle cx="13" cy="6" r="1"></circle>
                  <circle cx="20" cy="6" r="1"></circle>
                </g>
              </g>
            </svg>
          </div>

          <p className="text-sm font-bold m-0">Développement</p>
        </div>

        <div className="w-1/2 md:w-1/3 text-center mb-6">
          <div className="bg-indigo-100 mb-4 inline-block p-8 rounded-full">
            <svg
              viewBox="0 0 62 44"
              className="hobby-icon fa-3x stroke-current text-indigo-500"
            >
              <g
                strokeWidth="1"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <g transform="translate(1.000000, 1.000000)" strokeWidth="2">
                  <polyline points="3 6 3 0 13 0 13 6"></polyline>
                  <path d="M18,2 L18,6 L0,6 L0,42 L60,42 L60,2 L18,2 Z M0,12 L30,12 L0,12 Z M30,12 L60,12 L30,12 Z"></path>
                  <circle cx="30" cy="24" r="12"></circle>
                  <circle cx="30" cy="24" r="4"></circle>
                  <path d="M53,20 C53,21.1045695 52.1045695,22 51,22 L49,22 C47.8954305,22 47,21.1045695 47,20 C47,18.8954305 47.8954305,18 49,18 L51,18 C52.1045695,18 53,18.8954305 53,20 Z"></path>
                </g>
              </g>
            </svg>
          </div>

          <p className="text-sm font-bold m-0">Photographie</p>
        </div>

        <div className="w-1/2 md:w-1/3 text-center mb-6">
          <div className="bg-indigo-100 mb-4 inline-block p-8 rounded-full">
            <svg
              viewBox="0 0 62 44"
              className="hobby-icon fa-3x stroke-current text-indigo-500"
            >
              <g
                strokeWidth="1"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <g transform="translate(1.000000, 1.000000)" strokeWidth="2">
                  <path d="M4,34 L4,2 C4,0.8954305 4.8954305,0 6,0 L54,0 C55.1045695,0 56,0.8954305 56,2 L56,34"></path>
                  <path d="M36,34 L36,36 L24,36 L24,34 L0,34 L0,40 C0,41.1045695 0.8954305,42 2,42 L58,42 C59.1045695,42 60,41.1045695 60,40 L60,34 L36,34 Z"></path>
                </g>
              </g>
            </svg>
          </div>

          <p className="text-sm font-bold m-0">Technologie</p>
        </div>

        <div className="w-1/2 md:w-1/3 text-center mb-6">
          <div className="bg-indigo-100 mb-4 inline-block p-8 rounded-full">
            <svg
              viewBox="0 0 62 58"
              className="hobby-icon fa-3x stroke-current text-indigo-500"
            >
              <g
                strokeWidth="1"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <g transform="translate(1.000000, 1.000000)" strokeWidth="2">
                  <path d="M52,8 L60,8 L60,52 L40,52 C34,52 30,54 30,55.8"></path>
                  <path d="M30,12 C30,8.4 34,0 42.6,0 L52,0 L52,46 L41.9,46 C35.8,46 30,50.2 30,56"></path>
                  <path d="M30,12 C30,10 26,8 16,8 L0,8 L0,52 L20,52 C26,52 30,54 30,55.8 L30,12 Z"></path>
                </g>
              </g>
            </svg>
          </div>

          <p className="text-sm font-bold m-0">Culture</p>
        </div>

        <div className="w-1/2 md:w-1/3 text-center mb-6">
          <div className="bg-indigo-100 mb-4 inline-block p-8 rounded-full">
            <svg
              viewBox="0 0 68 68"
              className="hobby-icon fa-3x stroke-current text-indigo-500"
            >
              <g
                strokeWidth="1"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <g transform="translate(1.000000, 1.000000)" strokeWidth="2">
                  <path d="M44.8249233,2 C37.5526087,5.57308585 32.4118345,5.95591647 32.4118345,10.549884 C32.4118345,15.1438515 38.9318407,12.4640371 38.9318407,17.1856148 C38.9318407,21.9071926 33.9164513,25.225058 30.280294,22.800464 C26.6441367,20.3758701 21.6287473,18.9721578 17.2402816,25.0974478 C12.8518159,31.2227378 15.7356648,38.3689095 18.8702832,38.2412993 C22.0049015,38.1136891 24.8887504,35.1786543 26.2679825,39.0069606 C27.6472146,42.8352668 27.8979841,42.8352668 29.2772162,43.6009281 C30.6564482,44.3665893 30.781833,46.025522 30.280294,48.1948956 C29.7787551,50.3642691 32.5372193,57 34.6687598,57 C36.8003002,57 38.806456,56.1067285 39.0572255,52.5336427 C39.3079949,48.9605568 41.9410744,48.8329466 43.1949217,47.812065 C44.4487691,46.7911833 42.3172286,43.0904872 44.5741538,40.6658933 C46.831079,38.2412993 51.7210837,33.774942 47.7087722,32.6264501 C43.6964607,31.4779582 43.9472301,30.712297 43.3203065,28.9257541 C42.6933828,27.1392111 41.0633812,25.3526682 44.4487691,25.225058 C47.939823,25.2369533 51.286897,23.8099137 53.7272394,21.2691415 C56.7575869,14.5980022 56.7575869,10.0090164 53.7272394,7.50218405 C50.696892,4.99535169 47.7294533,3.16129034 44.8249233,2 Z"></path>
                  <circle cx="33" cy="33" r="33"></circle>
                </g>
              </g>
            </svg>
          </div>

          <p className="text-sm font-bold m-0">Voyages</p>
        </div>

        <div className="w-1/2 md:w-1/3 text-center mb-6">
          <div className="bg-indigo-100 mb-4 inline-block p-8 rounded-full">
            <svg
              viewBox="0 0 68 68"
              className="hobby-icon fa-3x stroke-current text-indigo-500"
            >
              <title>Medical Research</title>
              <g
                fill="none"
                strokeLinecap="round"
                strokeWidth="2"
                strokeLinejoin="round"
              >
                <circle cx="31" cy="19.994" r="2"></circle>
                <circle cx="35" cy="31.994" r="2"></circle>
                <circle cx="22" cy="47.994" r="2"></circle>
                <circle cx="38" cy="50.994" r="4"></circle>
                <path d="M47.962 40l-7.439-14.95A5 5 0 0 1 40 22.819V1.994H24V22.82a5 5 0 0 1-.523 2.227L16.04 40"></path>
                <path d="M53.064 50.251L47.962 40H16.04l-5.1 10.254a7.943 7.943 0 0 0-.844 4.98 8.184 8.184 0 0 0 8.17 6.764h27.443a8.2 8.2 0 0 0 8.271-7.44 7.936 7.936 0 0 0-.916-4.307z"></path>
                <path d="M21 1.994h22"></path>
              </g>
            </svg>
          </div>

          <p className="text-sm font-bold m-0">Science</p>
        </div>
      </div>
    </div>
  </section>
)

export default Hobbies
