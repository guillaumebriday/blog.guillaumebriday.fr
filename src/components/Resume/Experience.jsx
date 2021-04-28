import React from 'react'

import './experience.css'

const Experience = () => (
  <section className="py-8 bg-gray-200">
    <div className="container max-w-6xl px-3">
      <h2 className="uppercase text-center text-4xl mb-8">Expérience</h2>

      <div className="timeline-container relative">
        <div className="relative bg-white p-3 border-b shadow rounded-lg ml-8 mb-8">
          <div className="timeline-dot" />
          <div>
            <p className="m-0 mt-4 text-sm text-gray-700">
              Septembre 2017 - Maintenant
            </p>

            <h3 className="text-indigo-500">
              Lead Developer & DevOps chez{' '}
              <a href="https://www.studio-hb.com/">Studio-HB</a>
            </h3>

            <p className="text-gray-700 leading-loose">
              Je travaille avec Ruby on Rails, Vue JS, Stimulus, Tailwind CSS,
              PostgreSQL et Ansible pour construire des MVPs et des sites
              vitrines. Je déploie, avec GitLab CI et Capistrano, des
              applications testées avec RSpec et Jest.
            </p>
          </div>
        </div>

        <div className="relative bg-white p-3 border-b shadow rounded-lg ml-8 mb-8">
          <div className="timeline-dot" />
          <div>
            <p className="m-0 mt-4 text-sm text-gray-700">
              Octobre 2015 - Août 2017
            </p>

            <h3 className="text-indigo-500">
              Développeur, concepteur et intégrateur chez{' '}
              <a href="https://www.ochelys.com/">Ochelys</a>
            </h3>

            <p className="text-gray-700 leading-loose">
              Développer des solutions internes, accessibles, créées avec Ruby
              On Rails, Laravel, Sass, Vagrant ou Docker et industrialisation
              des processus. Utiliser la méthode agile avec Scrum."
            </p>
          </div>
        </div>

        <div className="relative bg-white p-3 border-b shadow rounded-lg ml-8 mb-8">
          <div className="timeline-dot" />
          <div>
            <p className="m-0 mt-4 text-sm text-gray-700">
              Mars 2015 - Juin 2015
            </p>

            <h3 className="text-indigo-500">
              Développeur Web chez{' '}
              <a href="https://second-life.ca/">Second Life</a>. Créer un site
              de vente et un blog avec AngularJS / PHP
            </h3>

            <p className="text-gray-700 leading-loose">
              Créer un CMS à l’aide du framework AngularJS et d’une API REST en
              PHP pour la gestion des produits, des commandes et du blog de
              Second Life. Mettre en place la structure de la base de données et
              de l’API REST.
            </p>
          </div>
        </div>

        <div className="relative bg-white p-3 border-b shadow rounded-lg ml-8 mb-8">
          <div className="timeline-dot" />
          <div>
            <p className="m-0 mt-4 text-sm text-gray-700">
              Janvier 2015 - Mars 2015
            </p>

            <h3 className="text-indigo-500">
              Système de gestion de commerce sur FileMaker Pro et CakePHP
            </h3>

            <p className="text-gray-700 leading-loose">
              Mettre en place la structure de la base de données et créer
              l’interface sur FileMaker Pro. Penser le design du site web et
              coder avec CakePHP.
            </p>
          </div>
        </div>

        <div className="relative bg-white p-3 border-b shadow rounded-lg ml-8 mb-8">
          <div className="timeline-dot" />
          <div>
            <p className="m-0 mt-4 text-sm text-gray-700">
              Janvier 2014 - Juillet 2014
            </p>

            <h3 className="text-indigo-500">
              Créer un CMS complet dans une simulation d'un site de vente en
              ligne en PHP
            </h3>

            <p className="text-gray-700 leading-loose">
              Créer une simulation d'un site de vente en PHP avec une gestion du
              panier et des commentaires. Back-office avec une organisation des
              contenus, un système de connexion pour les utilisateurs avec
              différents niveaux de droits.
            </p>
          </div>
        </div>

        <div className="relative bg-white p-3 border-b shadow rounded-lg ml-8 mb-8">
          <div className="timeline-dot" />
          <div>
            <p className="m-0 mt-4 text-sm text-gray-700">
              Août 2013 - Maintenant
            </p>

            <h3 className="text-indigo-500">
              Créer et maintenir le site guillaumebriday.fr
            </h3>

            <p className="text-gray-700 leading-loose">
              Créer mon site personnel. Je m'entraine dessus pour essayer des
              outils comme Sass, Jekyll, Middleman, l'AJAX, Jade ou
              CoffeeScript.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
)

export default Experience
