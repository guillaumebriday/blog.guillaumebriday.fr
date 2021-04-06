---
layout: post
title: "Prise de notes - Blend Web Mix 2015"
category: Billets
---
![Logo de Blend Web Mix](blend-web-mix.jpg)

J'ai eu cette année la chance de participer à l'évènement [Blend Web Mix](http://www.blendwebmix.com/) de Lyon, je remercie encore [@FlorentGoumy](https://twitter.com/FlorentGoumy) et [@PKoin](https://twitter.com/PKoin) pour cette opportunité ! Je vais faire ici un bref résumé des conférences auxquelles j'ai pu assister et donner mon ressenti général sur chacune.

## Jour 1 - Le 28/10

### Javascript: Stack Overdose - 10h30

#### Avis personnel : intéressant

Les explications sont claires, la vulgarisation est assez poussée, on comprend vite où il veut en venir.

Il nous explique comment il faut gérer l'arrivée de ces centaines de nouveaux outils JS, qu'ils soient Frameworks, Task Runner ou autres. Il mise beaucoup sur la déculpabilisation et sur le fait que beaucoup se ressemblent, et que la plupart vont mourir ( comparaison au darwinisme, s'adapter ou disparaitre ), apprendre à être patient et à savoir de quoi on a vraiment besoin pour nos projets. Il faut apprendre des concepts et non pas des outils, par exemple si je connais gulp je prendrais 5 minutes pour apprendre grunt en lisant la documentation, c'est la même chose pour les nouveaux outils "révolutionnaires !!".

### Golang - 11h00

#### Avis personnel : neutre

Découverte complète du langage, intéressant dans le concept moins dans la pratique.

### Stratégie d'adaptation mobile - 11h30

#### Avis personnel : bien

"Penser mobile first !!" résume bien la conférence.

Un thème et la structure d'un site doit être penser en amont. Bien connaître la cible de client que l'on veut pour pouvoir adapter au mieux l'ergonomie.
Il faut savoir faire des choix et des concessions sur les images et la police par exemple, le contenu est plus important et doit s'afficher en 1 seconde maximum.

Il ne doit y avoir qu'une version du site à developper avec les mêmes fonctionnalités sur plusieurs devices différents, si je suis sur mon mobile et que je continue sur bureau, mon expérience doit être la même. Il faut changer de mentalité, c'est difficile de convaincre de faire des choix et non pas des concessions. Un site mobile ne doit pas avoir moins d'informations que la version desktop, juste mieux adaptés.

Il ne faut pas essayer de faire rentrer un site desktop dans une version mobile mais l'inverse en ajoutant non pas des fonctionnalités mais des possibilités ! Les informations doivent être accessible dans les deux cas mais de manière plus pertinente sur desktop.
Exemple : Pour afficher une carte, un lien vers une application de carte sur mobile et une carte interactive sur desktop par exemple.

On ne peut pas faire les mêmes choses sur un mobile que sur un desktop, il faut adapter les contenus et les fonctionnalités disponibles au devices, exemple : hover vs on click / Swipe vs shortcut clavier. Utiliser les capacités de l'appareil : APN, téléphone, localisation et ne jamais oublier que les formulaires restent la chose la plus compliquée pour un utilisateur sur mobile.

Aujourd'hui de plus en plus d'utilisateurs ne vont utiliser que la version mobile du site, et si la tendance continue il y aura à terme largement plus d'utilisateurs mobile que desktop, il ne faut donc pas les négliger.

Penser au design émotionnel, pouvoir ajouter un site sur le homescreen de mon device et penser au full screen.

Un utilisateur part si dans les 4 premières secondes il ne peut pas commencer à lire le contenu, la pub et les images de présentation ne sont donc pas prit en compte mais bien le contenu de la page. La rapidité de la page est aussi importante voire plus que l'accessibilité de celle-ci (une page qui se charge vite mais pas forcement adapté au support sera toujours plus visitée qu'une page responsive qui met 10 secondes à se charger).

lien évoqué : [Webpagetest.org](http://www.webpagetest.org/)

### PHP 7 arrive - 13h30

#### Avis personnel : bien

Explication des nouveautés de PHP 7 et des choix qui ont été fait dans la conception et la compatibilité avec les anciennes versions de PHP. Orienté très technique mais intéressante par les explications un peu poussées sur certains points clés de PHP.

## UX Design - 16h

#### Avis personnel : Fantastique

Présentation du métier de UX designer, des contraintes et des enjeux en liant l'humain à la technologie, les émotions et les idées.

Présentation de la recherche effectuée pour créer des théories sur l'expérience utilisateur.

Aujourd'hui ce qui nous intéresse ce n'est plus l'objet ou le service mais bien l'expérience qu'il nous procure, acheter des chaussures de marche ne nous rend pas heureux mais le fait que les chaussures permettent de ne pas nous faire mal au pied nous fait plaisir.

Présentation des émotions, il est important de jouer sur les émotions et ne pas oublier qu'une expérience commence avant même d'avoir essayé le produit en question. On doit garder une émotion positive tout le long de l'utilisation du produit pour en garder un bon souvenir et avoir envie de le réutiliser, ce qui est important c'est le souvenir de l'utilisation et pas forcement l'utilisation elle même car on ne va pas se baser sur l'utilisation temps réel pour juger l'application mais bien du souvenir qu'on en a.

L'expérience utilisateur doit être au centre de l'attention et pas forcement les fonctionnalités attendu (il vaut mieux faire peu de choses très rapidement et simplement que 10 000 choses inutiles et compliquées).

## Jour 2 - Le 29/10

### Drupal :

#### Avis personnel : neutre

Présentation de général de Drupal et plus précisément du futur Drupal 8\. Conférence un peu lente et pas particulière intéressante pour les "moldus" comme moi de Drupal, dommage...

### Design for a billion people

#### Avis personnel : Très bien

C'est un peu le cas concret de la présentation de la présentation de la veille sur l'UX Design. Beaucoup d'exemples, de problèmes décortiqués en micro-problèmes pour ne pas trouver une seule solution mais autant de micro-solutions qu'il y a de micro-problèmes. Comment réfléchir à des idées, comment Facebook fait pour correctement cibler ses utilisateurs à travers le monde et tout un tas de question auxquelles ils ont dû apporter des réponses rapidement. Un speaker très intéressant en plus de ça !

### De 1 à 10 millions d'utilisateurs

#### Avis personnel : Intéressant

La conférence était intéressante, mais surtout pour les admin réseaux et système. Les problèmes évoqués dans cette présentation ne m'atteignant peu, j'ai surtout regardé la conférence d'un oeil curieux plus qu'intéressé.

L'explication des upscales verticaux et horizontaux était de mise, avec des petites techniques et explications lorsque le nombre de visiteurs augmentent drastiquement avec la mise en place de CDN ou de base de données esclaves mise en lecture uniquement par exemple.

Rapide présentation du principe de jobs asynchrone côté serveur !

### D3 Source D'inspiration - 14h

#### Avis personnel : neutre

Même problème que Drupal, intéressant dans le concept mais pas forcement dans la pratique, c'est juste bien de savoir que ça existe si j'en ai besoin un jour.

### Pimp my front-end - 15h

#### Avis personnel : intéressant

Je n'ai pas forcement appris grand chose durant cette conférence, mais le ton donné était intéressant. Présentation rapide des problèmes liés au CSS standard et au nommage des éléments et des solutions que peuvent apporter des outils comme les prépocésseurs ou les conventions de nommage comme BEM ou SMACSS. Speaker intéressant qui donnait des petits anecdotes sur son expérience personnelle.

### Comment concevoir la navigation sur mobile ? - 16h

#### Avis Personnel : très intéressant

On nous rappelle les problèmes liés à la navigation sur mobile comme le contexte, les ruptures, la rapidité, et une sur-exposition des usages : quand il y a un problème d'architecture sur l'application, on l'a retrouvera tout au long de notre navigation (un utilisateur va souvent choisir de désinstaller l'application dans les premières secondes d'utilisation que d'essayer de comprendre le fonctionnement de celle-ci).

Un utilisateur mobile cherche généralement quelques fonctionnalités seulement pour aller le plus vite possible car sur mobile, et souvent dû au contexte, on est pressé, on ne veut pas chercher dans 18 menus la catégorie d'article que l'on souhaite par exemple, il faut donc aller droit au but !

Miser au maximum sur les usages principaux de l'application en visant au mieux le public que l'on souhaite avoir et faire des compromis sur les usages secondaires de l'application. Le mieux est d'éviter plus que de la limiter la navigation, si j'ai mon info tout de suite je vais revenir souvent sur l'application.

Il faut beaucoup miser sur l'[affordance](https://fr.wikipedia.org/wiki/Affordance) (je n'aurais jamais pensé un jour pouvoir placer ce mot ici !) d'un objet, éviter les explications inutiles ou les tooltips à répétition qui peuvent énerver ou frustrer l'utilisateur.

On peut également jouer avec la logique, si un swipe à gauche affiche l'article précédent, un swipe à droite affichera naturellement l'article suivant, il ne faut pas expliquer l'évidence à des utilisateurs qui ont probablement déjà utilisé d'autres applications et ont donc déjà certains réflexes de navigation et certaines habitudes, il ne faut pas perdre l'utilisateur en essayant de casser ces "conventions".

Il ne faut pas oublier "le juste à temps", c'est-à-dire donner une indication sur une possibilité au moment où j'en ai besoin et pas avant. Je serais beaucoup plus attentif lorsqu'une aide apparaitra une fois au bon moment que toutes les aides au début de ma navigation d'un coup qu'on va passer rapidement pour arriver directement sur l'accueil de notre application.

Je ne vais pas faire la liste de toutes les possibilités et astuces qu'on peut utiliser, [les slides sont disponible ici](http://fr.slideshare.net/amelieboucher/concevoir-la-navigation-sur-mobile), il faut juste toujours avoir à l'esprit que la navigation sur mobile n'est pas un long fleuve tranquille comme elle peut l'être sur un site bureau et qu'il faut prendre en compte tous ces paramètres pour améliorer au mieux l'expérience utilisateur.

Pour conclure, de très belles conférences pendant ces deux jours avec des personnes toujours plus intéressantes les unes que les autres, en espérant les revoir l'année prochaine !
