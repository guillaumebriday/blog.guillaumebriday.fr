---
layout: post
title: "De WordPress à Jekyll"
category: Billets
---
Jusqu'en mai dernier, mon site personnel et mon blog utilisaient deux technologies différentes, à savoir [WordPress](https://wordpress.org) d'un côté et [Pug](https://github.com/pugjs/pug) puis [Middleman](https://github.com/middleman/middleman) de l'autre. C'était loin d'être idéal à maintenir, à faire évoluer ou à exploiter au quotidien.

J'ai donc décidé de tout mettre en commun avec une seule technologie qui correspondait à mes besoins et mes envies, c'est ainsi que je me suis tourné vers le fameux [Jekyll](https://jekyllrb.com).

## Qu'est-ce que Jekyll ?

Jekyll est un outil développé en Ruby qui permet de générer des pages statiques et un blog. Concrètement, en respectant une structure définie par Jekyll, en écrivant vos pages en [Markdown](https://daringfireball.net/projects/markdown/) ou [Liquid](https://github.com/Shopify/liquid/wiki) et avec une configuration personnalisée. Il vous suffira alors de lancer une seule ligne de commande pour générer l'ensemble de votre site Web avec la bonne architecture de dossier et de fichier HTML prêt à être déployé sur n'importe quel hébergeur.

On comprend alors vite pourquoi cette technologie est très intéressante à l'usage.

## Pourquoi avoir migré ?

### Gain de perfomance

Comme je viens de le dire, Jekyll compile notre site. On obtient donc un ensemble de pages HTML statiques. Contrairement à un CMS comme WordPress, les pages n'ont pas besoin d'être générées à chaque visite. Il n'y a pas de connexion à une base de données qui prend une éternité pour faire toujours les mêmes requêtes. Sans parler de l'ajout de certains plugins, qui ne sont pas super exigeant lorsqu'il s'agit de performance Web.

Ainsi, mon blog est passé d'un temps d'affichage moyen situé entre **une et deux secondes à moins de 500 ms**. C'est beaucoup plus agréable à l'usage, la sensation de lenteur a complètement disparu et l'expérience n'en est que meilleur pour l'utilisateur.

### Gain de stabilité et de sécurité

Il n'y a pas de mise à jour à faire pour combler des failles de sécurités toutes les deux semaines. Il n'y a pas de code à maintenir, pas de version de PHP à spécifier et enfin plus besoin de mettre à jour PHP ou MySQL. C'est l'énorme avantage de travailler avec de simple fichiers ```.html```.

### Simple à sauvegarder

Avec Jekyll, on travaille uniquement avec des fichiers. De la configuration de l'outil, au thème et aux articles, il ne s'agit que de fichiers ```.md```, ```.html``` ou ```.yml```. Pas besoin de maintenir une base de données avec des dump à faire régulièrement de peur de tout perdre.

Contrairement à WordPress (où cela n'est pas très pertinent), on peut ici versionner notre configuration et notre thème au même endroit. Un seul dossier très léger peut être sauvegardé et transféré sur le cloud ou Github.

### Simple à déployer

Une fois l'ensemble compilé, vos pages et vos assets se retrouvent dans un seul et même dossier nommé ```_site```. Bien entendu, à l'intérieur, on y retrouvera des fichiers HTML nommés en fonction de vos pages, mais aussi des sous-dossiers (pour gérer des catégories par exemple), vos images et tout ce dont votre site a besoin pour fonctionner.

L'idée est de ne pas toucher à ce dossier, toute modification doit se faire en amont.

Vous pouvez compiler l'ensemble autant de fois que vous le souhaitez, il suffira alors de prendre ce dossier et de le faire glisser sur votre FTP pour que tout fonctionne. C'est la seule chose à faire et c'est parfaitement transparent pour les utilisateurs.

Si vous utilisez un système de gestion de version comme Git, sachez que beaucoup de services s'occupent de l'hébergement pour vous, il suffira de ```push``` votre code sur le repository distant et le site sera compilé pour vous. C'est top !

Le plus connu étant [Github Pages](https://pages.github.com) si besoin. Malheureusement à l'heure actuelle, vous ne pouvez pas avoir votre propre nom de domaine sécurisé via Github, il faudra passer par un hébergement tiers.

### Simple pour écrire des articles ou des pages

Jekyll est pensé pour utiliser le Markdown lors de l'écriture d'un article ou d'une page. Il convertit nativement vos fichiers markdown en page html. C'est super pratique, car il n'y a plus besoin de se connecter à une interface lente et complexe, entre autre. Il suffit d'ouvrir un fichier texte et vous êtes prêt à écrire.

Plus besoin de connexion internet ou d'un ordinateur. Désormais, je me vois souvent commencer mes articles sur mon iPhone, car la syntaxe markdown évite d'avoir une interface complexe pour faire de la mise en forme.

De plus, je peux maintenant très facilement partager le code source de mon site. Cela donne la possibilité aux lecteurs de corriger ou modifier un article ou autre directement via une Pull Request sur Github, ce qui peut m'éviter dans certains cas de le faire manuellement.

## La gestion des commentaires

Je m'emporte peut être un peu. Il y a quelques points noirs et pas des moindres pour la gestion d'un blog. Jekyll n'étant pas une technologie côté serveur, il n'y a aucune gestion des commentaires.

Mon but étant de faire de ce blog aussi un espace d'échange, c'est problématique. Heureusement, il y a une pléthore de solutions disponibles.

La plus utilisée (même sur des CMS comme WordPress) est sans doute [Disqus](https://disqus.com). Vous avez déjà dû le voir sur de nombreux sites. Mettre en place disqus est un jeu d'enfant et l'expérience utilisateur est super agréable, mais il me pose plusieurs problèmes.

Tout d'abord, il brise la simplicité de sauvegarde et de déploiement que je cherchais avec Jekyll. Les commentaires sont hébergés sur un service externe dont je n'ai aucun contrôle. Disqus est aussi affreusement lent, il a besoin de beaucoup de dépendances JavaScript et au final, je me retrouve avec les mêmes temps d'affichage que j'avais avec WordPress.

Enfin, la vie privée des utilisateurs n'est pas respecté par Disqus qui traque les sites sur lequel vous allez, pas cool.

Il existe des alternatives Open Source et beaucoup plus légère comme [Isso](https://posativ.org/isso/), mais qui ne correspondent toujours pas à mes besoins.

Pour ne pas me compliquer la vie, j'ai profité de la présence de PHP sur mon hébergeur pour faire un script simpliste qui m'envoie un email via un formulaire en bas de chaque article, je me suis inspiré d'un plugin existant : [jekyll-static-comments](https://github.com/mpalmer/jekyll-static-comments). Une fois que je reçois les informations par email, je les ajoute dans un fichier ```_data```, ces fichiers qui sont gérés [nativement par Jekyll](https://jekyllrb.com/docs/datafiles/).

Lors de la génération du site, Jekyll récupère la liste des commentaires qui sont alors ajoutés de façon statique dans chaque article. Cela me permet de simplifier grandement la sauvegarde et le déploiement. En revanche, c'est une action que je dois faire à la main pour chaque commentaire, sauf si une personne me fait une Pull Request directement.

Cette solution ne limite pas le spam et c'est une expérience utilisateur moins agréable je trouve. Il fallait trouver un bon compromis et avec le peu de trafic que j'ai l'objectif est parfaitement rempli. Il y a même déjà quelques commentaires sur le site !

## La gestion des assets et des templates

Jekyll [intègre nativement](https://jekyllrb.com/docs/assets/) un support pour [Sass](https://sass-lang.com/guide) et de [CoffeeScript](https://coffeescript.org) (avec une gem) ce qui est vraiment pratique.

Sass prend en charge les ```import``` et la minification ce qui n'est pas encore le cas en JavaScript. Ainsi, si vous voulez minifier votre JS ou utiliser des ```require```, il faudra obligatoirement passer par des outils comme [Webpack](https://webpack.js.org) ou [Gulp](https://gulpjs.com).

Pour la partie thème, Jekyll intègre le moteur de templates [Liquid](https://shopify.github.io/liquid/). Je vous laisse le soin de lire la documentation pour voir toutes les possibilités, mais ce qu'il faut retenir c'est que vous pouvez utiliser des layouts pour chacune de vos pages et créer des morceaux d'HTML réutilisable pour chacune de vos pages. Ainsi, il est tout à fait possible de trouver dans un fichier ```post.html``` le code suivant :

{% raw %}
```html
<body>
  {% include header.html %}

  <div class="container">
    {{ content }}
  </div>

  {% include footer.html %}
</body>
```
{% endraw %}

Le contenu de votre article remplacera le {% raw %}```{{ content }}```{% endraw %} et ainsi ce layout sera réutilisable, mais utilisé uniquement lors de la compilation et pas à chaque chargement de page. Les possibilités sont infinies et si vous souhaitez voir un exemple concret, le code source de ce site est [disponible sur Github](https://github.com/guillaumebriday/guillaumebriday.fr).

Une dernière fonctionnalité intéressante, pour les développeurs principalement, c'est la prise en charge d'[Highlight](https://jekyllrb.com/docs/templates/#code-snippet-highlighting). Highlight permet de gérer la colorisation syntaxique des zones de code lors de la compilation ce qui évitera une certaine latence lorsque cela est fait en JavaScript au chargement des pages.

J'espère avoir été clair sur les raisons qui m'ont poussé à effectuer ce changement, si vous avez des questions n'hésitez pas à les poser en commentaires.

Merci !
