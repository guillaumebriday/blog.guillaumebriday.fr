---
layout: post
title: "Laravel & Vue.js - Faire une Todo List, partie 1 : Présentation et objectifs"
category: Dev
---
Je vais commencer une série d'articles pour présenter un projet que je souhaite mettre en place depuis quelques temps : une Todo List !! Alors, dit comme ça, je reconnais que ça n'a pas de quoi casser trois pattes à un canard, mais laissez-moi vous présenter le concept, vous allez voir qu'il y a vraiment pleins de choses cool à faire techniquement et ergonomiquement.

On ne va pas se mentir, ce projet n'est pas là pour révolutionner le monde des applications de Todo List, mais il a plusieurs objectifs précis. Le premier est de me faire monter en compétence sur des aspects techniques particuliers, on y reviendra plus tard, mais également d'avoir une application "exemple" la plus complète possible comme j'ai essayé de le faire au maximum avec mon projet [laravel-blog](https://github.com/guillaumebriday/laravel-blog) pour Laravel et d'autres technologies.

Avec cette série d'article, je veux vraiment présenter étape par étape la conception de cette application et les technologies qui seront utilisées pour bien comprendre les tenants et aboutissements d'un tel développement.

Je veux couvrir beaucoup d'aspects techniques bien-sûr, mais également miser sur l'expérience utilisateur et visuelle de l'application. On va profiter de la simplicité du concept pour mettre en avant ce qu'il nous reste, à savoir l'UX/UI et le code.

![Todo list de Ennio Dybeli](todolist.jpg)

Vous l'avez compris, nous allons faire dans ce projet une SPA ([Single Page Application](https://en.wikipedia.org/wiki/Single-page_application)). Les avantages sont multiples.

En effet, le serveur back-end ne fera que servir des API versionnées et RESTful. La partie front-end du projet ne sera donc qu'un seul client proposé parmi beaucoup d'autres possibles qui pourront venir se connecter au back-end.

On aurait pu servir des vues avec Laravel, mais on aurait limité les possibilités à ce que propose ces vues à moins de développer des API en parallèle, ce qui est un peu dommage avec l'arrivée des frameworks JS, je pense.

Il est également possible de faire une SPA dans le même projet et de ne servir que la première vue avec Laravel et utiliser tout le reste de l'application via des API, mais je préfère séparer complètement le back-end du front-end pour ce projet.

## Les fonctionnalités

Je ne vais pas faire une liste exhaustive des fonctionnalités qui seront développées, mais seulement les plus pertinentes pour se rendre bien compte des possibilités de l'application.

Je vais grandement m'inspirer de [Todoist](https://todoist.com) qui est une application que j'aime beaucoup.

+ Je dois pouvoir m'authentifier, me créer un compte, réinitialiser mon mot de passe, me connecter avec GitHub, Twitter ou Facebook.

+ Ajouter une tâche avec un texte et une échéance (optionnelle).

+ Je dois pouvoir éditer une tâche.

+ Marquer une tâche comme ```terminée``` et pouvoir la supprimer uniquement dans ce cas.

+ Les tâches supprimées iront dans une corbeille qu'on pourra vider d'un coup.

+ Filtrer les tâches par ```Toutes```, ```terminées``` et ```En cours```.

+ Pouvoir mettre une tâche en favoris et la retirer.

+ Lister les tâches sur les sept prochains jours, à la suite de celles en retard et non programmées.

+ Je dois pouvoir afficher seulement les tâches du jour ou celles en favoris.

+ Recherche une tâche par son titre et le filtre en cours.

## Ce qui n'est pas encore prévu

J'imagine déjà beaucoup d'autres fonctionnalités, mais ce n'est pas forcément pertinent de les ajouter maintenant au projet. Je préfère bien faire les choses avec ce que j'ai cité au-dessus que de vouloir tout faire.

Je vais d'abord me concentrer sur l'essentiel et faire un MVP en quelque sorte.

## Le Front-end

Pour ce qui est des technologies front-end, je vais utiliser les technologies qui m'intéressent particulièrement en ce moment et les outils nécessaires pour faire une SPA avec Vue.js.

Pour ce qui est du design, j'aimerais vraiment réussir à faire du **Semi Flat Design** comme on en retrouve sur beaucoup de site en ce moment, je pense à [Stripe](https://stripe.com), [Discord](https://discordapp.com) ou [Treehouse](https://teamtreehouse.com) pour ne citer qu'eux. Au passage, c'est d'ailleurs ce que je prévois de faire sur [guillaumebriday.fr](https://guillaumebriday.fr) également.

### CSS

[Tailwind CSS](https://tailwindcss.com) : Pour le framework CSS, car je me retrouve complètement dans l'approche que présente Adam Watham dans [CSS Utility Classes and "Separation of Concerns"](https://adamwathan.me/css-utility-classes-and-separation-of-concerns/). Tailwind CSS est le framework sur lequel il contribue et qui utilise cette approche. Je n'ai pas encore eu l'occasion de le tester et je pense que c'est le projet parfait pour ça.

[Font Awesome](http://fontawesome.io): Pour les icônes.

### JavaScript

[Vue.js](https://vuejs.org): Je n'ai pas besoin d'expliquer pourquoi, c'est tout le but du projet.

[vue-router](https://router.vuejs.org/en/): Le router va permettre de gérer les composants en fonction des routes, de gérer l'historique et les urls pour nous.

[vue-test-utils](https://github.com/vuejs/vue-test-utils): Pour tester notre application Vue.js.

[vuex](https://github.com/vuejs/vuex): Pour gérer nos données.

[axios](https://github.com/axios/axios): Permet de gérer les requêtes AJAX simplement. ([Pourquoi ?](https://medium.com/the-vue-point/retiring-vue-resource-871a82880af4))

[moment.js](https://github.com/moment/moment/): Permet de gérer les dates en JavaScript.

[Laravel Echo](https://github.com/laravel/echo): Pour gérer les WebSockets avec Laravel.

Je veux utiliser au maximum les outils fournis avec Vue.js pour plus de cohérence dans la mesure du possible.

## Le Back-end

[Laravel](https://laravel.com): C'est le coeur de l'application back-end. Laravel va nous permettre de servir nos API versionnées et de sauvegarder nos données en base de données.

[Socialite](https://laravel.com/docs/master/socialite): Pour créer un compte via d'autres providers.

[MySQL](https://www.mysql.com): Pour gérer notre base de données.

[Socket.io](https://socket.io): Pour gérer les WebSockets.

[Redis](https://redis.io): Socket.IO et Laravel utilisent Redis pour communiquer.

[spatie/laravel-backup](https://github.com/spatie/laravel-backup): Pour sauvegarder notre base de données.

[spatie/laravel-cors](https://github.com/spatie/laravel-cors): Pour gérer le CORS de nos API.

[tymon/jwt-auth](https://github.com/tymondesigns/jwt-auth): Pour gérer l'authentification avec les Json Web Token (JWT).

## L'environnement de développement et production

[Webpack](https://webpack.js.org): C'est le module bundler le plus complet aujourd'hui, on va s'en servir pour gérer les dépendances JavaScript et CSS.

[Docker](https://www.docker.com): J'en ai bien assez parler sur le site, on va s'en servir pour gérer notre environnement front-end et back-end que ça soit pour le développement ou la production.

[PHP-CS-Fixer](https://github.com/FriendsOfPHP/PHP-CS-Fixer): Pour avoir un code style unifié.

[PHPUnit](https://github.com/sebastianbergmann/phpunit): Pour faire notre tests unitaires et fonctionnels.

[Nginx](https://nginx.org): Sera notre serveur Web pour le back-end et le front-end.

[Travis CI](https://travis-ci.org): Pour gérer le CI de notre application.

[Capistrano](https://capistranorb.com): Outils pour déployer notre application, j'en ai déjà fait [un article complet]() sur le blog.

Je mettrais en production l'application à la fin du développement et tout le monde pourra voir le résultat directement sans avoir à installer le projet.

## Conclusion

Rien n'est figé, cet article présente seulement le projet et ce que j'ai prévu d'intégrer. Il y a surement des packages qui ne sont pas présentés ici, mais que j'utiliserais dans l'application en fonction de comment je vois les choses pendant le maquettage ou le développement.

On est d'accord que le projet semble plus intéressant maintenant, non ?

Je ne fais pas plus long, si vous avez des remarques ou des contributions à apporter n'hésitez pas à le faire dans les commentaires ou sur les dépôts Github que j'ai créé pour le projet :

[todolist-frontend](https://github.com/guillaumebriday/todolist-frontend-vuejs)

[todolist-backend](https://github.com/guillaumebriday/todolist-backend-laravel)

Merci !
