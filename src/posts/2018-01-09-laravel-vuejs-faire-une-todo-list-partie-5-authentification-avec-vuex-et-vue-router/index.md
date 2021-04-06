---
layout: post
title: "Laravel & Vue.js - Faire une Todo List, partie 5 : Authentification avec Vuex et Vue-router"
category: Dev
---
![Page de login de Todolist front](frontend-login.jpg)

Maintenant que nous avons installé l'environnement de développement et de production de l'application, nous allons pouvoir créer notre première interface et notre premier composant pour s'authentifier.

Avant d'aller plus loin, j'ai rajouté depuis l'article précédent un plugin pour supprimer le contenu du dossier ```dist``` avant de générer notre application en production. Sans cela, on se retrouvait avec plusieurs fichiers CSS et JS, différenciés par leur hash, dans le même dossier. Ce n'était pas très propre, c'est maintenant corrigé.

```diff
+ var CleanWebpackPlugin = require('clean-webpack-plugin')

// ...

if (inProduction) {
  module.exports.plugins = (module.exports.plugins || []).concat([
    // ...
+    new CleanWebpackPlugin(['dist']),
    // ...
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
  ])
}
```

Passons au vif du sujet !

## Ce que nous allons faire

<video loop autoplay width="100%">
  <source src="frontend-login.mp4" type="video/mp4">
Your browser does not support the video tag.
</video>

Il ne faut pas s'y méprendre, il y a plein de choses intéressantes à voir présentées dans cette vidéo !

## Vuex

Vuex va nous permettre de sauvegarder des états de notre application et de partager ces informations entre les composants.

![Flux de données de Vuex](vuex.png)

Pour faire simple, on va ```dispatch``` des actions qui vont exécuter du code. Ensuite, via un ```commit```, on va faire une ```mutation``` qui va modifier un état. Dans notre cas, on va s'en servir pour gérer les JWT et sauvegarder deux états : ```connecté``` et ```pas connecté```.

Dans un dossier ```store```, je vais faire deux fichiers. Un pour la configuration générale de Vuex et un autre pour la configuration propre à l'authentification.


```js
// store/index.js

import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth
  }
})
```

Et il faut l'ajouter dans l'instance de Vue dans ```app.js``` :

```diff
+import store from './store'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
+  store,
  template: '<App/>',
  components: { App }
})
```

Et dans ```store/auth.js``` :

```js
import router from '../router'

// On définit les types de mutations possibles
const types = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT'
}

// On définit les états possibles
const state = {
  logged: !!localStorage.getItem('token')
}

// On définit nos mutations
const mutations = {
  [types.LOGIN] (state) {
    state.logged = true
  },

  [types.LOGOUT] (state) {
    state.logged = false
  }
}

// On définit les getters qu'on pourra appeler dans les autres composants
// pour avoir des informations
const getters = {
  isLogged: state => state.logged
}

const actions = {
  // On prend le token en paramètre
  login ({ commit }, token) {
    // On change l'état
    commit(types.LOGIN)

    // On sauvegarde le token dans le localStorage qu'on utilisera dans axios
    localStorage.setItem('token', token)

    // On redirige sur Home
    router.push({name: 'Home'})
  },

  logout ({ commit }) {
    commit(types.LOGOUT)
    localStorage.removeItem('token')

    router.push({name: 'Login'})
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
```

On peut maintenant utiliser notre ```store``` de cette façon, n'importe où dans notre instance ```Vue``` :

```js
this.$store.dispatch('login', response.data.access_token)

// or

this.$store.dispatch('logout')
```

Maintenant que nous avons notre JWT dans le localStorage, on va pouvoir s'en servir à chaque requête dans axios. Dans le fichier ```js/bootstrap.js```, on va rajouter trois informations :

```js
const API_URL = process.env.API_URL || 'http://localhost/api/v1/'

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.token
axios.defaults.baseURL = API_URL
```

Si le token n'existe pas, ce n'est pas un problème de définir le header ```Authorization```. Il sera utilisé, mais géré comme un token invalide sur Laravel.

## Vue router

Tout d'abord, on peut remarquer, en regardant l'url, qu'il n'y a pas de ```#``` juste après le nom de domaine.

Cela est possible avec le [HTML5 History Mode](https://router.vuejs.org/en/essentials/history-mode.html) qui va simuler une vraie url, mais qui n'est pas compatible avec [tous les navigateurs](https://caniuse.com/#feat=history) (surtout IE).

```diff
let router = new VueRouter({
+  mode: 'history',
  routes: [
    {
```

J'ai transféré toutes mes routes dans un composant ```Navbar``` que je n'affiche que lorsque que l'utilisateur est authentifié.

Mon composant ressemble à cela :

```html
<template>
  <nav class="bg-indigo" v-if="isLogged">
    <div class="container mx-auto px-8 py-4">
      <div class="flex justify-between">
        <div>
          <router-link class="text-white no-underline font-bold text-3xl hover:underline" to="/" exact>
            Todolist
          </router-link>
        </div>
        <div>
          <button @click="logout" class="text-grey-light mr-3 border border-white py-2 px-4 rounded hover:bg-white hover:text-indigo">
            Logout
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Navbar',

  computed: mapGetters([
    'isLogged'
  ]),

  methods: {
    logout () {
      this.$store.dispatch('logout')
    }
  }
}
</script>
```

Je peux me servir de la méthode ```isLogged``` directement comme une méthode ```computed``` standard.

C'est d'ailleurs ce que je fais avec la condition ```v-if="isLogged"```.

Il suffit d'utiliser le composant ```Navbar``` dans le composant principal ```App```.

```html
<template>
  <div>
    <navbar></navbar>

    <router-view></router-view>
  </div>
</template>

<script>
export default {}
</script>
```

## Login et TailWind CSS

Le composant principal ```Login``` :

```html
<template>
<div class="h-screen flex justify-center items-center">
  <div class="w-full max-w-xs">
    <h1 class="text-center mb-6">Todolist</h1>

    <div v-if="hasErrors" class="bg-red-lightest border border-red-light text-red-dark px-4 py-3 rounded relative mb-3" role="alert">
      <span class="block sm:inline">Incorrect username or password.</span>
    </div>

    <form @submit.prevent="login" class="bg-white shadow-md rounded border-indigo border-t-4 px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
          Email
        </label>
        <input v-model="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="username" type="email" placeholder="Email" autofocus>
      </div>

      <div class="mb-6">
        <label class="block text-grey-darker text-sm font-bold mb-2" for="password">
          Password
        </label>
        <input v-model="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="password" type="password" placeholder="Password">
      </div>

      <div class="flex items-center justify-between">
        <button class="bg-indigo hover:bg-indigo-dark w-full text-white font-bold py-2 px-4 rounded" type="submit" :disabled="this.isDisabled" :class="{ 'opacity-50 cursor-not-allowed': this.isDisabled }">
          <i v-if="isLoading" class="fa fa-spinner fa-spin fa-fw"></i>
          Sign In
        </button>
      </div>
    </form>
  <p class="text-center text-grey text-xs">
    Source code available on <a href="https://github.com/guillaumebriday/todolist-frontend-vuejs" class="text-grey">GitHub</a>.
  </p>
  </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      email: '',
      password: '',
      isLoading: false,
      hasErrors: false
    }
  },

  computed: {
    isDisabled () {
      return this.email.length === 0 || this.password.length === 0
    }
  },

  methods: {
    login () {
      if (this.isDisabled) {
        return false
      }

      this.isLoading = true
      this.hasErrors = false

      axios
        .post('auth/login', {
          email: this.email,
          password: this.password
        })
        .then(response => {
          this.isLoading = false

          this.$store.dispatch('login', response.data.access_token)
        })
        .catch(error => {
          console.log(error)

          this.isLoading = false
          this.hasErrors = true
          this.password = ''
        })
    }
  }
}
</script>
```

Rien de particulier à ce niveau, si ce n'est que [TailWind CSS](https://tailwindcss.com/) est une véritable révélation pour moi ! J'en parlerais plus en détail dans un article prochainement.

## Les tests

J'ai commencé à mettre des tests en place, mais j'ai encore un peu de mal avec ceux en JavaScript, il faut que je m'entraîne.

J'utilise [mochajs/mocha](https://github.com/mochajs/mocha) qui a une syntaxe que j'aime beaucoup et qui est très simple à mettre en place.

Je place tous les tests dans un sous-dossier ```tests``` et j'utilise le suffixe ```.spec``` pour mieux m'y retrouver. Libre à vous d'adapter, selon vos envies.

Pour le moment, je teste le composant ```Login``` pour vérifier l'interaction avec le bouton ```Sign In``` :

```js
import { mount } from 'vue-test-utils'
import Login from '../src/js/components/Login.vue'
import expect from 'expect'

/* eslint-disable no-undef */
describe('Login', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(Login)
  })

  it('does not contain error alert', () => {
    expect(wrapper.html()).not.toContain('Incorrect username or password.')
  })

  it('enables the sign in button', () => {
    wrapper.setData({
      email: 'frodo@baggins.sh',
      password: 'my_precious'
    })

    let button = wrapper.find('button')

    expect(button.attributes().disabled).not.toBe('disabled')
  })

  it('disables the sign in button', () => {
    let button = wrapper.find('button')

    expect(button.attributes().disabled).toBe('disabled')
  })
})
```

Bien entendu, il va falloir que je complète l'ensemble avec un Mock de l'appel au backoffice pour vérifier la réception du JWT et la redirection vers la page ```Home```.

On peut également ajouter un script dans notre ```package.json``` :

```json
"scripts": {
  "test": "mocha-webpack --webpack-config webpack.config.js --require tests/setup.js tests/*.spec.js"
},
```
## Conclusion

Je peux maintenant commencer à traiter le coeur de l'application, à savoir la gestion des tâches. Vous pouvez trouver le code sur [guillaumebriday/todolist-frontend-vuejs](https://github.com/guillaumebriday/todolist-frontend-vuejs) directement.

Si vous avez des suggestions, des questions ou des remarques, n'hésitez pas.

Merci !
