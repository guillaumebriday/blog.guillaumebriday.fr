---
layout: post
title: "Laravel & Vue.js - Faire une Todo List, partie 6 : Un peu de refactoring"
category: Dev
---

J'ai pris le temps de refactoriser certaines parties du code depuis le dernier article. Pas de changement majeur, mais la mise à jour de dépendances m'a forcé à faire plusieurs modifications que je voulais présenter avec de continuer la série.


## Séparation de la configuration Webpack

Au fur et à mesure que l'application évolue, la configuration Webpack devient de plus en plus spécifique, selon l'environnement dans lequel on se trouve.

Pour simplifier la lecture de celle-ci, on peut alors la séparer dans plusieurs fichiers spécifiques à l'environnement.

Dans notre cas, il y en aura trois. Un commun, un pour le développement et un dernier pour la production.

```bash
$ tree build

build
├── webpack.common.js
├── webpack.dev.js
└── webpack.prod.js
```

Nous allons avoir besoin du package [webpack-merge](https://github.com/survivejs/webpack-merge) pour pouvoir merger nos configurations :

```bash
$ npm install webpack-merge
```

C'est une fonction qui prend plusieurs paramètres, à savoir les configurations que vous voulez fusionner. Vous pouvez en passer autant que besoin.

Par exemple pour la configuration de la version de production, je peux désormais faire :

```js
// ./build/webpack.prod.js

let merge = require('webpack-merge')
let common = require('./webpack.common.js')

module.exports = merge(common, {
  // Configuration spécifique à la production
})
```

On va ici ajouter la minification de l'html, du CSS et du JavaScript.

Ainsi, nous n'avons plus besoin de faire des conditions et une surcharge d'un attribut de la configuration comme c'était le cas avant :

```diff
- var inProduction = (process.env.NODE_ENV === 'production')

- if (inProduction) {
-  module.exports.devtool = false
-   // http://vue-loader.vuejs.org/en/workflow/production.html
-   module.exports.plugins = (module.exports.plugins || []).concat([
-     // Configuration des plugins
-   ])
- }
```

La variable `inProduction` n'a plus d'intérêt également puisqu'on lance le build Webpack directement sur le bon fichier de configuration en fonction de l'environnement désiré :

```diff
"scripts": {
-  "development": "cross-env NODE_ENV=development webpack --progress --hide-modules",
+  "development": "cross-env NODE_ENV=development webpack --config build/webpack.dev.js --mode development --progress --hide-modules",
-  "production": "cross-env NODE_ENV=production webpack --no-progress --hide-modules",
+  "production": "cross-env NODE_ENV=production webpack --config build/webpack.prod.js --mode production --no-progress --hide-modules",
}
```

Ils utiliseront alors automatiquement le fichier de configuration commun.

J'en ai profité pour migrer de `PurifyCSS` à `PurgeCSS`, car il offrait une bien meilleure compatibilité avec Tailwind, notamment sur les classes comportant des caractères spéciaux comme les `:`, omniprésent sur Tailwind.

## Changement de configuration de Vue Loader et Dotenv

Il y a eu un changement majeur dans la gestion des fichiers `.vue` entre la version 14 et 15 de [vue-loader](https://github.com/vuejs/vue-loader).

La documentation à ce sujet se trouve [ici](https://vue-loader.vuejs.org/migrating.html). C'est [un changement](https://github.com/guillaumebriday/todolist-frontend-vuejs/commit/0e58b6185f9e02cd4b929afdf896388847c7f23e) assez notable pour le signaler.

Vous remarquez également la présence d'un nouveau fichier `.env` qui me permet avec [dotenv-webpack](https://github.com/mrsteele/dotenv-webpack) de gérer mes variables d'environnements pour Node facilement sans avoir à partager mes informations sensibles.

## Font Awesome 5

Je pense faire un article entier sur l'utilisation du nouveau [composant Vuejs](https://fontawesome.com/how-to-use/on-the-web/using-with/vuejs) que Font Awesome met à disposition dans sa version 5.

Désormais je peux utiliser les icônes sous la forme :

```js
<fa icon="spinner" class="mr-1" spin />
```

## Les interceptors d'Axios

Un token JWT a une durée de validité limitée dans le temps. Il faut donc pouvoir gérer son expiration et son rafraichissement directement dans le navigateur. Pour cela, j'utilise les [interceptors](https://github.com/axios/axios#interceptors) d'Axios.

Ils me permettent d'intercepter à la fois toutes les requêtes et toutes les réponses qui passent par l'application. Vu que l'application est stateless, je dois contrôler l'état du token à chaque requête et réponse pour connaitre sa validité.

C'est dans le fichier `App.vue`, qui est le point d'entrée de mon application, que je vais rajouter cette gestion, car c'est cela me certifie que les interceptors seront bien mis en place par axios.

```js
// src/js/components/App.vue

import axios from 'axios'
import moment from 'moment'

export default {
  created () {
    axios.interceptors.request.use(config => {
      let expiresAt = moment(window.localStorage.getItem('expiresAt'))

      if (expiresAt.isValid() && moment().isBefore(expiresAt)) {
        let diff = moment.duration(expiresAt.diff(moment()))

        if (diff.asHours() < 12 && config.url !== 'auth/refresh') {
          axios.post('auth/refresh')
            .then(({ data }) => {
              this.$store.commit('LOGIN', data)
            })
        }
      }

      return config
    })

    axios.interceptors.response.use(response => response, error => {
      if (error.response && error.response.status === 401) {
        this.$store.dispatch('logout')
      }

      return Promise.reject(error)
    })
  }
}
```

Lors de la première connexion, le serveur me revoit la date d'expiration du token que je sauvegarde dans le localStorage. À partir de là, si le token expire dans moins de 12 heures alors je le rafraîchis en utilisant le store du Vuex. Il sera alors disponible de nouveau pour 24 heures et c'est parfaitement transparent pour l'utilisateur sans même le déconnecter de l'application.

Dans le cas contraire, si le serveur me renvoie un statut `401 Unauthorized` alors c'est que le token du client a expiré et que je ne peux pas le renouveler automatiquement, il faut alors simuler une déconnexion pour supprimer les anciennes informations dans le localStorage et rediriger sur la page d'authentification.

## Eslint plugin Vue

J'en ai profité pour rajouter le [plugin officiel](https://github.com/vuejs/eslint-plugin-vue) de Vue pour ESLint. La configuration est très simple à changer et tout est dans ce commit : [5f81780](https://github.com/guillaumebriday/todolist-frontend-vuejs/commit/5f817803500ac2dab6ba719513e7671a8ceabeb7).

## Conclusion

C'est un article de transition avant de parler de la gestion des tâches avec Vuex plus en détail et de la mise en production.

Mais je pense qu'avec autant de modifications, il était important de faire une mise au point sur les modifications pour partir d'une base commune dans la suite de la série.

On parlera de la gestion des tâches dans l'article suivant !

Merci !
