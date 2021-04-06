---
layout: post
title: "Laravel & Vue.js - Faire une Todo List, partie 7 : Gérer nos tâches avec Vuex et Axios"
category: Dev
---
![Liste des tâches de l'application](tasklist.png)

On arrive au coeur de l'application, la gestion des tâches. C'est la partie centrale du projet et la plus importante pour les utilisateurs finaux. J'ai fait plusieurs itérations sur le design et le fonctionnement pour sortir une première version qui me convienne que je vais présenter dans cet article.

## Introduction

Pour gérer les tâches, je vais utiliser trois composants qui auront chacun un rôle particulier.

Un composant pour [gérer une tâche](https://github.com/guillaumebriday/todolist-frontend-vuejs/blob/master/src/js/components/Tasks/Task.vue), un autre pour [lister l'ensemble des tâches](https://github.com/guillaumebriday/todolist-frontend-vuejs/blob/master/src/js/components/Tasks/TaskList.vue) et un dernier pour créer [un formulaire de création](https://github.com/guillaumebriday/todolist-frontend-vuejs/blob/master/src/js/components/Tasks/TaskForm.vue).

L'avantage d'utiliser Vuex dans notre application, c'est qu'il n'y aura qu'une seule `source de vérité` pour la gestion de nos tâches. Cela veut dire que les trois composants vont communiquer avec Vuex pour toutes les actions dont ils sont responsables.

Ainsi, par exemple, lorsqu'une tâche sera ajoutée via le composant `TaskForm`, il mettra à jour le `store` de Vuex et grâce à la réactivité de Vue, le composant `TaskList` affichera automatiquement la nouvelle tâche à la suite des autres. Nous allons voir tout cela en détail dans la suite de l'article.

On retrouve alors ce concept majeur de [Vuex](https://vuex.vuejs.org/#what-is-a-state-management-pattern) :

![one-way data flow](https://vuex.vuejs.org/flow.png)

Les composants n'auront pas à gérer d'états directement, mais ils utiliseront les actions disponibles dans les modules Vuex que nous allons écrire pour modifier son état et ainsi mettre à jour les différentes vues.

Sans cela, nous aurions dû utiliser les [Events](https://vuejs.org/v2/guide/events.html) de Vue pour gérer les interactions entre les différents composants. On aurait alors perdu la notion de source de vérité unique et on aurait alors la même logique métier écrite à deux endroits différents.

Pour moi, il est indispensable d'utiliser un State Manager, comme Vuex, dans une application complexe avec un Store unique pour tous nos composants lorsque vous avez des données à partager entre eux. Il va gérer l'état et les interactions possibles avec les données à un seul endroit en appliquant la notion de `separation of concerns`.

## Configuration du router

Pour commencer, nous allons rajouter une seule déclaration de route à notre router avec un pattern particulier pour gérer le statut des tâches. Par exemple, je veux que `/app/active/` n'affiche que les tâches... active, que `/app/completed` n'affiche que les tâches terminées et ainsi de suite.

Je ne vais pas faire trois routes avec trois composants différents, mais je vais utiliser le statut que me renvoie [Vue router](https://router.vuejs.org/guide/essentials/dynamic-matching.html#dynamic-route-matching) pour filtrer les tâches en fonction de l'url. Ceci permettra à l'utilisateur de sauvegarder l'url de son choix pour afficher les tâches triées comme il le souhaite.

Dans la liste de mes routes, je rajoute :
```js
{
  path: '/app/:status',
  name: 'TaskList',
  component: TaskList,
  meta: {auth: true}
},
```

`:status` est un segment dynamique. Il peut prendre n'importe quelle valeur et cette route utilisera alors `TaskList` pour gérer l'affichage quel que soit le statut dans l'url.

Je peux alors récupérer la valeur de `:status` partout dans mon application via ```this.$route.params.status```.

On va donc pouvoir créer notre store Vuex pour gérer les règles métier de nos tâches.

## Un module Vuex pour gérer nos tâches

Je vais déplacer les modules dans un sous dossier `store/modules` pour plus de cohérence.

Ainsi, je vais avoir un fichier `store/modules/tasks.js` qui aura cette structure par défaut que nous allons compléter :

```js
import axios from 'axios'

const state = {
  tasks: [],
  endpoint: '/tasks/'
}

const mutations = {
  //
}

const getters = {
  //
}

const actions = {
  //
}

export default {
  state,
  mutations,
  getters,
  actions
}
```

Il ne faut pas oublier de l'importer dans les modules de Vuex également.

### Le state

Notre [state](https://vuex.vuejs.org/guide/state.html) ne va contenir que deux informations. Un tableau de `tâches` et l'`endpoint`.

L'endpoint va être l'url qui définie quel type de ressource on doit récupérer depuis l'API. Rien de particulier à retenir, je trouve ça plus pratique d'avoir une variable qui m'indique une fois l'url plutôt que de devoir la redéfinir à chaque appel à l'API.

Ce tableau de tâches va être notre source de vérité quant à l'état des tâches dans notre application. On va s'en servir pour les lister, les filtrer ou encore les éditer.

Les [mutations](https://vuex.vuejs.org/guide/mutations.html), les [getters](https://vuex.vuejs.org/guide/getters.html) et les [actions](https://vuex.vuejs.org/guide/actions.html) vont interagir avec ce tableau de tâches pour modifier son état et récupérer ses informations.

### Les mutations

Tout d'abord, **une mutation est le seul moyen de modifier les données du state**. En effet avec Vuex, nous devons définir autant de mutations que nécessaire pour effectuer les modifications qui seront mises à notre disposition dans l'application.

Dans notre cas, on va simplement créer des mutations qui vont modifier modifier un tableau classique avec les méthodes natives du JavaScript.

```js
const mutations = {
  setTasks (state, tasks) {
    state.tasks = tasks
  },

  addTask (state, task) {
    state.tasks.push(task)
  },

  updateTask (state, task) {
    const taskId = task.id
    state.tasks.splice(state.tasks.findIndex(task => task.id === taskId), 1, task)
  },

  removeTask (state, task) {
    const taskId = task.id
    state.tasks.splice(state.tasks.findIndex(task => task.id === taskId), 1)
  },

  clearTasks (state) {
    state.tasks = []
  }
}
```

Ainsi, j'ai fait les mutations correspondant à des modifications classiques comme pour ajouter, supprimer ou mettre à jour une tâche. On remarque que toutes nos mutations prennent le `state` en premier argument.

D'ailleurs je voudrais revenir sur la mise à jour d'un élément dans un tableau, car Vuex utilise la réactivité de Vue pour fonctionner et il y a quelques trucs à savoir. À cause de [certaines limitations en JavaScript](https://vuejs.org/v2/guide/list.html#Array-Change-Detection) nous devons utiliser des méthodes sur les tableaux pour que Vue détecte les changements et qu'il mette ainsi le DOM à jour.

Par exemple, pour mettre une tâche à jour dans mon tableau je dois utiliser la méthode [splice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) qui va supprimer un élément à un index donné ou le remplacer par un nouvel élément passé en troisième argument au même index.

Pour pouvoir effectuer une mutation, on va devoir `commit` en choisissant le nom l'action à effectuer.

Par exemple, si je veux rajouter une tâche dans mon tableau, je peux faire :

```js
let task = {
  title: "A newly created task"
}

commit('addTask', task)
```

Et ma tâche sera alors disponible dans mon tableau et tous les éléments qui utilisent le store pourrons alors s'en servir.

Ainsi la boucle suivante, dans un autre composant, sera alors automatiquement mise à jour :

```js
<li v-for="task in this.$store.state.tasks">
```

Comme le comportement d'un state est très similaire à celui des [Computed Properties](https://vuejs.org/v2/guide/computed.html), on peut mapper le state de Vuex aux méthodes computed classiques d'un composant :

```js
import { mapState } from 'vuex'

export default {
  // ...

  computed: {
    ...mapState([
      'tasks',
    ]),
  },

  // ...
}
```

Et on pourra alors faire :

```js
<li v-for="task in this.tasks">
```

### Les getters

Les getters sont des méthodes qui vont utiliser le state de Vuex pour renvoyer des informations traitées ou filtrées, selon un besoin précis.

C'est très pratique pour faire de l'affichage ou des tris en conservant une logique à un seul endroit dans notre code pour la réutiliser dans nos différents composants par la suite.

```js
const getters = {
  filteredTasks: (state, getters) => (status) => {
    if (status === 'completed') {
      return getters.completedTasks
    } else if (status === 'active') {
      return getters.activeTasks
    }

    return getters.allTasks
  },

  allTasks (state) {
    return state.tasks
  },

  activeTasks (state) {
    return state.tasks.filter(task => task.is_completed === false)
  },

  completedTasks (state) {
    return state.tasks.filter(task => task.is_completed === true)
  },

  timeToChill: (state, getters) => (status) => {
    return !state.tasks.length ||
            (status === 'active' && !getters.activeTasks.length) ||
            (status === 'completed' && !getters.completedTasks.length)
  }
}
```

**On ne modifie pas l'état du state, car c'est impossible avec un getter**. On renvoie simplement des données qui ont subi un traitement. Les getters sont sensibles à la réactivité de Vue donc c'est parfait.

On peut leur passer des paramètres pour ajouter des options supplémentaires.

Pour lister toutes mes tâches actives dans mon application, il me suffit alors de faire :

```js
export default {
  computed: {
    activeTasks () {
      return this.$store.getters.activeTasks
    }
  }
}
```

Comme pour le `mapState`, on peut utiliser le `mapGetters` et ainsi alléger notre code :

```js
import { mapGetters } from 'vuex'

export default {
  // ...

  computed: {
    ...mapGetters([
      'allTasks',
      'activeTasks',
      'completedTasks'
    ]),
  },

  // ...
}
```

Et je peux utiliser `this.completedTasks` de façon complètement transparente en utilisant Vuex.

### Les actions

Les actions sont semblables aux mutations, mais elle ne change pas le `state`. Par conséquent, ce sont les actions que nous allons appeler dans notre application qui auront des règles métier propre et qui vont commit les mutations.

C'est également avec les actions que nous allons pouvoir gérer nos requêtes asynchrones qui mettront à jour le state via les mutations.

On commence alors à voir tout le workflow que nous apporte Vuex à travers ces différents concepts.

Avant d'aller plus loin, on peut résumer le rôle de chaque partie.

Un state représente seulement l'état de notre application à un moment donné. Le state est alors la **source de vérité** sur les données de notre application.

On peut modifier le state uniquement avec des mutations et récupérer les valeurs avec des getters. Les mutations et les getters peuvent définir plusieurs façons différentes d'interagir avec le state, selon les besoins de l'application.

Et enfin les actions représentent la logique de notre application qui va s'occuper de faire les requêtes asynchrones et de committer les mutations pour nous.

Dans notre cas, je vais me servir des actions exclusivement pour faire des requêtes asynchrones et commit des mutations en fonction du résultat obtenu. De la même manière, je dois pouvoir utiliser le retour de ces requêtes dans mes composants directement si besoin.


Prenons l'exemple de l'action qui va ajouter une tâche :
```js
const actions = {
  addTask ({ commit }, params) {
    return axios.post(state.endpoint, params)
      .then(({ data }) => {
        commit('addTask', data.data)
        return data.data
      })
      .catch(error => {
        return Promise.reject(error)
      })
  }
}
```

On remarque qu'en premier paramètre, on utilise la déstructuration pour récupérer uniquement la méthode commit. En effet, dans une action, Vuex nous passe automatiquement le contexte de l'instance, mais on ne va utiliser que les commits. Cela nous évite de faire `context.commit` à chaque fois.

On peut également passer des paramètres optionnels comme par exemple les données d'un formulaire

Dans notre action, on va directement retourner l'appelle axios, car il nous renvoie une [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) directement. Il y a plusieurs avantages à faire cela.

Premièrement, en fonction du code HTTP retourné on va pouvoir `commit` différentes actions, mais également envoyer des informations aux composants tout en gardant le comportement d'une promise.

Pour cela, à la détéction d'une erreur nous allons rejeter la promise avec `return Promise.reject(error)` et en cas de succès nous allons simplement retourner les données envoyées par l'API. Ainsi, lors de l'appel d'une action on pourra utiliser les méthodes `then` ou `catch` comme si l'appel avait été fait sans action, mais depuis le composant directement avec Axios.

Pour appeler une action, il faut utiliser la méthode `this.$store.dispatch` avec le nom de la méthode à utiliser et d'éventuels paramètres.

```js
export default {
  // ...
  methods: {
    addTask () {
      this.$store.dispatch('addTask', {
        title: "A newly created task",
        due_at: moment().seconds(0)
      })
    }

    // ...
  }
}
```
<video loop autoplay width="100%">
  <source src="add-task.mp4" type="video/mp4">
Your browser does not support the video tag.
</video>

Puisque l'on a retourné une promise Axios, on peut utiliser `then` et `catch` à la suite de l'appel de l'action. Ainsi, en fonction du résultat, je vais pouvoir faire des changements propres à ce composant. Par exemple :

```js
export default {
  // ...
  methods: {
    addTask () {
      this.loading = true

      this.$store.dispatch('fetchTasks')
        .then((data) => {
          this.isLoading = false
          this.flashSuccess('Tasks loaded')
        })
        .catch(error => {
          this.isLoading = false
          this.errors = error.response.data
        })
    }

    // ...
  }
}
```

**Il est important de savoir que si nous n'avions pas fait le** `return Promise.reject(error)` **dans notre action Vuex, alors ici la méthode** `catch` **ne serait jamais exécutée, car il ne saurait pas si c'est en erreur ou pas.**

On peut alors faire la même chose pour toutes les actions dont on aura besoin dans notre application.

## Conclusion

On a maintenant toute la logique de la gestion de nos tâches en place avec Vuex. J'espère avoir été clair sur l'utilisation que l'on pouvait avoir avoir Vuex dans une Single Page Application.

Je vous invite fortement à parcourir le [dossier de composants des tâches](https://github.com/guillaumebriday/todolist-frontend-vuejs/tree/master/src/js/components/Tasks) ainsi que le [module Vuex dédié à la gestion des tâches](https://github.com/guillaumebriday/todolist-frontend-vuejs/blob/master/src/js/store/modules/tasks.js) sur le [dépôt Github](https://github.com/guillaumebriday/todolist-frontend-vuejs) pour avoir l'ensemble du code sous les yeux.

Si vous avez des questions ou des remarques, les commentaires sont là pour ça.

Merci !
