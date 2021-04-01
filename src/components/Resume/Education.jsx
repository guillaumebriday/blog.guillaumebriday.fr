import React from 'react'

const Education = () => (
  <section className="py-8 container max-w-6xl px-3">
    <h2 className="uppercase text-center text-4xl mb-8">Formation</h2>

    <article className="mb-8 py-6 border-b flex flex-wrap md:flex-no-wrap">
      <div className="flex-shrink-0">
        <div className="inline-block border-b pb-4">
          <div className="inline-block leading-none">
            <div className="text-gray-700 text-xs text-right">Septembre</div>
            <span className="font-bold text-3xl">2015</span>
          </div>

          <div className="inline-block font-bold mx-6">&ndash;</div>

          <div className="inline-block leading-none">
            <div className="text-gray-700 text-xs text-right">Juin</div>
            <span className="font-bold text-3xl">2018</span>
          </div>
        </div>

        <p className="mt-4 md:text-right">Institut G4 - Lyon</p>
      </div>

      <div className="md:ml-6 md:pl-6 md:border-l">
        <h3 className="text-indigo-500 text-2xl font-bold">
          École d'ingénierie en Informatique : Institut G4 à Lyon
        </h3>
        <p className="text-gray-700 leading-loose">
          École d'ingénierie en informatique amenant à un titre RNCP de niveau I
          (Bac +5) pour me spécialiser dans les technologies du Web et du
          Management.
        </p>
      </div>
    </article>

    <article className="mb-8 py-6 border-b flex flex-wrap md:flex-no-wrap">
      <div className="flex-shrink-0">
        <div className="inline-block border-b pb-4">
          <div className="inline-block leading-none">
            <div className="text-gray-700 text-xs text-right">janvier</div>
            <span className="font-bold text-3xl">2015</span>
          </div>

          <div className="inline-block font-bold mx-6">&ndash;</div>

          <div className="inline-block leading-none">
            <div className="text-gray-700 text-xs text-right">Juin</div>
            <span className="font-bold text-3xl">2015</span>
          </div>
        </div>

        <p className="mt-4 md:text-right">Cégep Shawinigan - Canada</p>
      </div>

      <div className="md:ml-6 md:pl-6 md:border-l">
        <h3 className="text-indigo-500 text-2xl font-bold">
          Techniques de l'informatique : Informatique de gestion
        </h3>
        <p className="text-gray-700 leading-loose">
          Fin de mon diplôme universitaire de technologie au Canada durant 6
          mois. Découverte de nouvelles méthodes de travail ainsi qu'une
          approche différente du monde de l'informatique. Réalisation de mon
          stage de développeur Web chez Second Life.
        </p>
      </div>
    </article>

    <article className="mb-8 py-6 border-b flex flex-wrap md:flex-no-wrap">
      <div className="flex-shrink-0">
        <div className="inline-block border-b pb-4">
          <div className="inline-block leading-none">
            <div className="text-gray-700 text-xs text-right">Septembre</div>
            <span className="font-bold text-3xl">2013</span>
          </div>

          <div className="inline-block font-bold mx-6">&ndash;</div>

          <div className="inline-block leading-none">
            <div className="text-gray-700 text-xs text-right">Janvier</div>
            <span className="font-bold text-3xl">2015</span>
          </div>
        </div>

        <p className="mt-4 md:text-right">Université Lyon 1</p>
      </div>

      <div className="md:ml-6 md:pl-6 md:border-l">
        <h3 className="text-indigo-500 text-2xl font-bold">
          Institut Universitaire de Technologie - Informatique
        </h3>
        <p className="text-gray-700 leading-loose">
          Formation de deux ans à l'institut universitaire de technologie
          département informatique de Lyon 1.
        </p>
      </div>
    </article>

    <article className="mb-8 py-6 border-b flex flex-wrap md:flex-no-wrap">
      <div className="flex-shrink-0">
        <div className="inline-block border-b pb-4">
          <div className="inline-block leading-none">
            <div className="text-gray-700 text-xs text-right">Septembre</div>
            <span className="font-bold text-3xl">2012</span>
          </div>

          <div className="inline-block font-bold mx-6">&ndash;</div>

          <div className="inline-block leading-none">
            <div className="text-gray-700 text-xs text-right">Juillet</div>
            <span className="font-bold text-3xl">2013</span>
          </div>
        </div>

        <p className="mt-4 md:text-right">Lycée Ampère-Saxe - Lyon</p>
      </div>

      <div className="md:ml-6 md:pl-6 md:border-l">
        <h3 className="text-indigo-500 text-2xl font-bold">
          Baccalauréat Scientifique - SVT / ISN / Histoire-géographie
        </h3>
        <p className="text-gray-700 leading-loose">
          Obtention de mon Baccalauréat Scientifique option Informatique et
          Science du Numérique. Création d'un projet de domotique avec un
          arduino et une interface de contrôle sur le Web.
        </p>
      </div>
    </article>
  </section>
)

export default Education
