---
layout: post
title: "Laravel : Utiliser Travis CI sur GitHub"
category: DevOps
---
Je développe depuis quelques temps un [projet en Laravel](https://github.com/guillaumebriday/laravel-blog) pour présenter dans un cas très concret, des aspects et des astuces qui me semblent intéressantes sur le framework.

Une fois les tests unitaires et fonctionnels mis en place, je voulais que d'autres contributeurs puissent rejoindre le projet et que je puisse voir le résultat des tests et de PHP-CS-Fixer directement sans avoir à le lancer sur mon environnement de développement à chaque fois.

C'est maintenant qu'intervient [Travis-CI](https://travis-ci.org).

La plateforme Travis-CI travaille en étroite collaboration avec GitHub et elle est donc très bien intégré au site. Pour l'installer, il suffit de se rendre dans les ```settings``` de votre projet sur GitHub et d'ajouter Travis-CI dans la partie ```Integrations & services```.

Sur Travis-CI vous devez autoriser l'application à accéder à votre GitHub. Désormais, lorsqu'une branche sera pushée ou mergée sur le dépôt, des scripts seront lancés sur Travis-CI et vous pourrez voir l'avancement via un terminal directement dans votre navigateur.

Bon, je pourrais parler plus longtemps de toutes les fonctionnalités disponibles mais ce n'est pas le sujet de l'article je vous redirige vers la [documentation](https://docs.travis-ci.com) si vous souhaitez plus d'informations à ce sujet.

## Mais alors, comment intégrer Travis-CI sur mon dépôt ?

Toute la configuration de Travis tient dans un seul fichier nommé ```.travis.yml```, si le fichier est nommé autrement cela ne fonctionnera pas. Il doit également être situé à la racine de votre projet. Une fois que vous aurez poussé une branche contenant ce fichier, Travis le remarquera et lancera les scripts mais dans le cas contraire il ne fera rien et tout sera comme avant pour vous.

Il y a vraiment des centaines de possibilités et de configuration possibles mais je tenais juste à présenter un cas classique contenant des tests avec [PHPUnit](https://phpunit.de/) et de la vérification syntaxique avec [PHP-CS-Fixer](https://cs.symfony.com/) dans un projet complet en PHP.

## Comment écrire les instructions ?

Comme on peut le voir, le fichier est en yml. La syntaxe est donc très basique et tout se joue sur l'indentation.

Je vais prendre en exemple le fichier que j'utilise pour [mon projet](https://github.com/guillaumebriday/laravel-blog/blob/master/.travis.yml) et le détailler pour comprendre mais bien-sûr il faudra adapter selon vos besoins.

### Langage

Tout d'abord, il va falloir préciser le langage utilisé principalement dans votre projet pour créer votre environnement de test. Tout en haut du fichier il faut donc tout simplement préciser :

```yaml
language: php
```

Par défaut, Travis propose plusieurs environnements de tests avec des outils pré-installés dessus. L'environnement PHP installe [tous ces paquets](https://docs.travis-ci.com/user/ci-environment/#PHP-VM-images) donc vous n'aurez pas à le faire dans les scripts suivant.

### Les versions

Vient ensuite la version du langage que vous souhaitez utiliser. Vous pouvez en sélectionner plusieurs et Travis-CI lancera les scripts indépendamment pour chacune des versions. Cela peut être très pratique pour connaître la version minimale dont votre application à besoin pour fonctionner et pouvoir vérifier simplement que ça ne changera pas au cours de vos développements (sauf si c'est prévu bien-sûr).

Il suffit alors d'indiquer les versions du langage que vous souhaitez tester sous cette forme :

```yaml
php:
  - 7.0
  - 7.1
```

### Les services

Plusieurs services sont fournis par défaut pour chaque images. Il suffit de les activer et Travis fera l'installation et la configuration pour nous.
[La liste](https://docs.travis-ci.com/user/ci-environment/#Data-Stores) est plutôt complète mais dans notre cas, nous n'avons besoin que de ```MySql```. Bien-sûr ces services sont pré-installés mais rien ne vous empêche d'installer manuellement ceux de votre choix.
Pour les activer, rien de plus simple :

```yaml
services:
  - mysql
```

### Le cache (optionnel)

Si vos builds mettent trop de temps à se terminer, c'est peut être à cause du téléchargement ou la mise en place trop longue de vos dépendances. Heureusement, Travis prévoit un [système de cache](https://docs.travis-ci.com/user/caching/) pour sauvegarder l'état de dossier entre les différents builds. Dans notre cas, on voudra garder d'un build à l'autre les dépendances de composer :

```yaml
cache:
  directories:
    - $HOME/.composer/cache
```

### Le before_script

On arrive à la partie critique de notre configuration. Mais avant de commencer, il va falloir préparer le terrain pour que notre build fonctionne.

Pour Laravel, cela va se limite à trois étapes. Si vous aviez besoin d'installer d'autres outils comme on l'a vu dans les services plus haut, c'est le moment.

Tout d'abord, il faut installer les dépendances de notre projet via Composer, qui est déjà installé par défaut, en y ajoutant quelques ```flags``` pour accélérer le processus.

```yaml
before_script:
  - composer install --no-progress --no-interaction --prefer-dist --no-suggest
```

Pour la base de données, même si MySQL est maintenant installé il faut créer une base. La documentation complète se trouve dans la section [database](https://docs.travis-ci.com/user/database-setup/#MySQL) sur le site officiel. On notera qu'on pourra se connecter à cette base avec les identifiants ```root``` ou ```travis``` et sans mot de passe.

On peut rajouter cette ligne dans notre ```before_script``` :
```yaml
- mysql -e 'CREATE DATABASE homestead;'
```

Pour ces raisons, j'ai créé dans mon projet un [fichier de configuration d'environnement](https://github.com/guillaumebriday/laravel-blog/blob/master/.env.travis) Laravel spécialement pour Travis. Cela permet d'indiquer au framework quelle base de données utiliser avec les bons identifiants. Puisque PHPUnit utilise le fichier de configuration ```.env.testing``` par défaut, cela me permet de remplacer le fichier original, utilisé sur mon environnement de développement, par celui spécifique à Travis lors des builds.

```yaml
- cp .env.travis .env.testing
```

### Les scripts

On va enfin pouvoir lancer nos scripts. Rien de plus simple, c'est l'exact équivalent de ce que vous feriez sur un environnement de développement :

```yaml
script:
  - vendor/bin/php-cs-fixer fix --config=.php_cs --verbose --dry-run --diff
  - vendor/bin/phpunit
```

### Notifications (optionnel)

Par défaut Travis envoie un email à chaque étape du build, ce qui peut vite être pénible. Pour désactiver les notifications, il faut le spécifier dans le fichier de configuration :

```yaml
notifications:
  email: false
```

### Fichier complet

Mon fichier de configuration à la fin ressemble à cela :

```yaml
language: php

php:
  - 7.0
  - 7.1

services:
  - mysql

cache:
  directories:
    - $HOME/.composer/cache

before_script:
  - composer install --no-progress --no-interaction --prefer-dist --no-suggest
  - mysql -e 'CREATE DATABASE homestead;'
  - cp .env.travis .env.testing

script:
  - vendor/bin/php-cs-fixer fix --config=.php_cs --verbose --dry-run --diff
  - vendor/bin/phpunit

notifications:
  email: false
```

## Conclusion

Avec cela, vous avez les bases d'une configuration Travis et vous pouvez commencer à travailler à plusieurs sans tout casser.

Bien entendu, le service permet de faire tellement plus de choses que je vous invite à consulter sur la documentation, c'est très intéressant et complet.

Et voilà, vous pouvez maintenant afficher fièrement le petit ![Build Passing](build-passing.png) en utilisant ce lien dans vos README.md :

```markdown
[![Build Status](https://travis-ci.org/{ORG-or-USERNAME}/{REPO-NAME}.png?branch=master)](https://travis-ci.org/{ORG-or-USERNAME}/{REPO-NAME})
```

Merci !
