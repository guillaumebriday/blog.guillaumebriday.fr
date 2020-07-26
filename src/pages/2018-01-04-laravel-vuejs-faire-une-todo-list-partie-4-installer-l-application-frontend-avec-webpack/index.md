---
layout: post
title: "Laravel & Vue.js - Faire une Todo List, partie 4 : Installer l'application Frontend avec Webpack"
category: Dev
---
C'est l'une des parties les plus importantes de la partie frontend : la mise en place de l'environnement avec Webpack.

## Avant de commencer

Je ne suis pas parti d'un projet vierge, il existe des templates officiels à installer pour avoir une configuration de base pour votre projet. Pour pouvoir les utiliser, il faut tout d'abord installer [vue-cli](https://github.com/vuejs/vue-cli) :

```bash
$ npm install -g vue-cli
```

Les templates disponibles sont sur l'organisation [vuejs-templates](https://github.com/vuejs-templates). Pour ma part, j'avais vraiment envie de partir du plus simple pour vraiment comprendre les fondamentaux de Webpack.

Avant ce projet, j'utilisais Webpack qu'avec [Laravel Mix](https://github.com/JeffreyWay/laravel-mix), qui est un excellent outil, mais qui ne permet pas de bien comprendre le fonctionnement de Webpack quand on ne s'en est jamais servi, selon moi.

## Webpack

Côté frontend, Webpack va s'occuper de tout. Il va nous fournir un serveur avec du [Hot Module Replacement](https://webpack.js.org/concepts/hot-module-replacement/) et manager nos dépendances dans un environnement de production et développement. Il est de loin l'outil le plus puissant à ce jour, mais il n'est pas facile à prendre en main au premier abord.

Je ne vais pas expliquer comment fonctionne Webpack, pour cela je vous invite à lire la page [Concepts](https://webpack.js.org/concepts/) de la documentation officielle qui est très pratique. Je vais plutôt détailler les modifications et les ajouts que j'ai fait à la configuration Webpack pour les besoins du projet et pour voir plus en détails certains points.

Pour installer notre template :

```bash
$ vue init webpack-simple todolist-frontend
```

### Nos entrées

Même si avec Webpack, on peut gérer le CSS via le JS, c'est d'ailleurs ce que fait Adam Watham dans [son exemple avec Tailwind](https://github.com/adamwathan/media-demo), personnellement je préfère séparer les deux. Faire un ```import``` d'un fichier CSS depuis un ```index.js``` me perturbe encore. Libre à vous de changer.

Je vais donc avoir deux points d'entrées, un point le JS et un pour le CSS qui sont dans deux dossiers bien distincts.

```js
entry: {
  app: [
    './src/js/app.js',
    './src/styles/app.scss'
  ]
},
```

### Nos modules

```js
module: {
  rules: [
    {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        extractCSS: true
      }
    },
    {
      test: /\.s[ac]ss$/,
      use: ExtractTextPlugin.extract({
        use: [
          {loader: 'css-loader', options: {importLoaders: 2}},
          'postcss-loader',
          'sass-loader'
        ],
        fallback: 'style-loader'
      })
    },
    {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    },
    {
      test: /\.(js|vue)$/,
      loader: 'eslint-loader',
      enforce: 'pre',
      include: [path.resolve(__dirname, './src')],
      options: {
        emitWarning: true
      }
    },
    {
      test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'fonts/'
        }
      }]
    }
  ]
},
```

Quelques points importants sont à noter.

On va bien-sûr utiliser [vue-loader](https://vue-loader.vuejs.org/) pour pouvoir créer des components dans des fichiers en ```.vue```. C'est indispensable pour développer avec Vue.js, je pense.

J'utilise toujours [Sass](https://sass-lang.com) pour écrire mon CSS. J'utilise simplement le [sass-loader](https://github.com/webpack-contrib/sass-loader) avec un test sur les fichiers ```.sass``` ou ```.scss```.

J'ai envie que le CSS final soit extrait dans un fichier ```app.css``` à part, et pas dans une balise ```<style>``` comme c'est le cas par défaut avec le ```style-loader```.

Pour cela, il faut utiliser le plugin [Extract Text Plugin](https://github.com/webpack-contrib/extract-text-webpack-plugin). Il va nous permettre d'extraire le résultat dans un fichier séparé s'il le peut, sinon il va utiliser le loader par défaut ```style-loader```. Couplé à ```vue-loader```, il va permettre d'extraire le CSS écrit dans les fichiers ```.vue``` dans le CSS principal directement avec l'option ```extractCSS: true```.

Pour les fichiers ```.js```, on va utiliser [Babel](https://github.com/babel/babel) pour pouvoir profiter de la syntaxe ES2015.

#### Tailwind CSS

Pour pouvoir installer [Tailwind CSS](https://tailwindcss.com/docs/installation#webpack) avec Webpack, il faut utiliser [PostCSS](https://github.com/postcss/postcss#usage). J'utilise donc le ```sass-loader``` à la suite du ```postcss-loader```, car l'ordre à une importance comme c'est indiqué [ici](https://github.com/postcss/postcss-loader#config-cascade).

```PostCSS``` permet également d'autoprefixer automatiquement notre CSS.

```js
// postcss.config.js

var tailwindcss = require('tailwindcss');

module.exports = {
  plugins: [
    tailwindcss('./tailwind.config.js'),
    require('autoprefixer'),
  ]
}
```

#### Font Awesome

Pour installer les polices, on va avoir besoin du ```file-loader```. En effet, on a besoin d'extraire les polices dans des fichiers pour pouvoir les charger via notre navigateur.

Dans mon cas, je souhaite les extraire dans un dossier ```/fonts```.

Je n'ai plus qu'à modifier la variable du chemin de Font Awesome dans le scss et d'importer le fichier principal :

```scss
// src/styles/app.scss

$fa-font-path: "~font-awesome/fonts";
@import "~font-awesome/scss/font-awesome.scss";
```

#### ESLint

Pour les fichiers ```.vue``` et ```.js```, on va utiliser [ESLint](https://github.com/eslint/eslint) qui va nous permettre de linter notre code et d'ainsi garder une cohérence dans la syntaxe, dans le cas où d'autres développeurs seraient amenés à travailler sur le projet. Il y a plusieurs configurations possibles, j'utilise le [JavaScript Standard Style](https://github.com/standard/standard). La configuration se trouve dans le fichier ```.eslintrc.js```.

Si vous utilisez [VS Code](https://github.com/Microsoft/vscode), il existe une super extension qui va utiliser la configuration de votre projet en cours et vous remonter les erreurs directement dans votre éditeur !

```bash
$ code --install-extension dbaeumer.vscode-eslint
```

### Les plugins

```js
var inProduction = (process.env.NODE_ENV === 'production')

// ...

plugins: [
  new ExtractTextPlugin({
    filename: 'css/[name].[contenthash].css',
    disable: !inProduction
  }),
  new HtmlWebpackPlugin({
    template: 'index.html'
  })
]
```

Il n'est pas nécessaire d'extraire le CSS dans un fichier pendant les phases de développement, c'est pour cela que je désactive ```ExtractTextPlugin``` pour un environnement autre que la production. Le plugin va alors utiliser le ```fallback``` qu'on a configuré plus haut.

Le plugin [HTML Webpack](https://github.com/jantimon/html-webpack-plugin) va générer un fichier ```index.html``` en y injectant automatiquement, entre autre, notre JavaScript et notre CSS avec les balises correspondantes. C'est très pratique pour générer le projet final avec les bonnes url qui contiennent un hash pour le versionning.

Dans une partie uniquement dédié à la production, j'ai rajouté le plugin [PurifyCSS](https://github.com/webpack-contrib/purifycss-webpack).

Il va scanner nos fichiers ```.html``` et ```.vue``` (on peut en configurer d'autres) pour ne garder que le CSS utilisé dedans. Et il nous permet en plus de minifier le CSS une fois filtré.

```js
new PurifyCSSPlugin({
  // Give paths to parse for rules. These should be absolute!
  paths: glob.sync([
    path.join(__dirname, './src/js/components/**/*.vue'),
    path.join(__dirname, 'index.html')
  ]),
  minimize: true
}),
```

## Docker et Docker-Compose

Pour utiliser Node et NPM, je préfère passer par Docker pour faciliter la mise en production et assurer un environnement similaire entre tous les développeurs du projet.

L'image par [défaut de Node](https://github.com/nodejs/docker-node/blob/a7e88f1dd2102689180f485c51133212f45fa064/9/Dockerfile) n'expose pas de ports et ne possède pas de Working Directory (```WORKDIR```). On pourrait changer le ```WORKDIR``` via le fichier ```docker-compose.yml```, mais je préfère le changer dans le Dokerfile pour permettre de se passer plus facilement de docker-compose à l'avenir, si besoin.

J'ai donc créé un ```Dockerfile``` super simple pour gérer ces deux cas :

```dockerfile
FROM node
LABEL maintainer="hello@guillaumebriday.fr"

WORKDIR /app

EXPOSE 8080
```

Je ne rajoute pas de commande (```CMD```) au démarrage, car le but est d'utiliser docker-compose uniquement pour lancer plus facilement les containers.

Utiliser docker-compose seulement pour ça, c'est complètement overkill, on est d'accord. Passer par Docker directement fonctionnerait parfaitement, mais je préfère comme ça. Ça me permet d'avoir toujours la même commande à lancer même si la configuration change à l'avenir.

NPM est installé par défaut dans cette image donc nous n'avons pas à le faire.

Le ```docker-compose.yml``` est, lui aussi, très simple :

```yml
version: '3'

services:
  node:
    build: ./provisioning
    image: todolist-frontend
    ports:
      - 8080:8080
    volumes:
      - .:/app:cached
```

Dans notre cas, faire un ```docker-compose up``` n'aurait aucun intérêt, je ne veux pas qu'il y ait de commande par défaut pour le moment.

A la place, on peut s'en servir pour lancer les commandes :

```bash
# Installer nos dépendances
$ docker-compose run node npm install

# Lancer le serveur Webpack avec le Hot Module Replacement
$ docker-compose run --service-ports node npm run hot

# Compiler l'application en mode développement
$ docker-compose run --rm node npm run dev

# Compiler l'application en mode développement avec le watch mode
$ docker-compose run --rm node npm run watch

# Compiler l'application en mode production (minification, etc.)
$ docker-compose run --rm node npm run production

# Lancer ESLint
$ docker-compose run --rm node npm run lint
```

```--service-ports``` permet d'activer le mappage des ports entre les containers et l'host lors de l'éxécution d'une commande. En effet, en dehors du ```docker-compose up```, il est désactivé par défaut.

## Travis CI

Pour assurer que tout fonctionne, j'ai mis en place [Travis CI](https://travis-ci.org) pour tester si la compilation du projet fonctionne et si ESLint ne remonte pas d'erreur. Dans un futur proche, je pourrais rajouter les tests unitaires et fonctionnels de l'application.

```yml
language: node_js

node_js:
  - "7"
  - "8"
  - "9"

cache:
  directories:
    - "node_modules"

script:
  - npm run lint
  - npm run production

notifications:
  email: false
```

## Conclusion

La configuration est amenée à encore évoluer au cours des développements bien-sûr.

Tout est disponible sur le dépôt GitHub : [guillaumebriday/todolist-frontend-vuejs](https://github.com/guillaumebriday/todolist-frontend-vuejs).
