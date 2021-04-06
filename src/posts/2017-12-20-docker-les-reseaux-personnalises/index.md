---
layout: post
title: "Docker : Les réseaux personnalisés"
category: DevOps
---
Cet article est la suite de la présentation que j'ai pu faire sur Docker : [Comprendre et mettre en place Docker](/comprendre-et-mettre-en-place-docker). J'ai eu quelques retours pertinents et je tenais à revenir sur des points qui me semblent importants.

## Les networks

Je ne l'avais pas précisé, mais sur Docker il existe un network par défaut. Son nom est ```bridge``` et si vous ne changez pas la configuration, tous les containers seront associés à ce réseau. Qu'est-ce que cela change pour nous ? Si vous n'avez pas besoin d'isoler vos containers entre eux, ils pourront tous communiquer ensemble sur ce réseau sans avoir à utiliser ```les links``` par exemple. Pour cela, il faudra utiliser soit l'adresse IP du container, soit passer par le nom donné à un container via ```--name```.

Vous pouvez lister vos networks avec la commande suivante :

```bash
$ docker network ls
```

### Les dépendances entre containers

Les ```links``` ne servent pas qu'à cela pour autant. Au-delà de créer des réseaux privés entre les containers pour faire transiter des informations sensibles, ils permettent de définir un ordre de lancement et des dépendances entre vos containers ainsi que de permettre la création d'alias pour le nom de vos containers.

Par exemple, si votre container s'appelle ```mysql```, mais que pour un autre service vous avez besoin qu'il se nomme ```database```, vous pouvez créer un alias sous la forme ```--link mysql:database```. Si le deuxième argument est le même que le premier, il devient optionnel. Ainsi, dans votre configuration de base de données, vous pourrez alors entrer pour ```l'host``` directement : ```database``` au lieu de mettre l'adresse IP du container ou ```mysql```.

Pour les dépendances maintenant, dans le cas d'un ```docker-compose up -d``` la question ne se pose pas, car tous les containers sont lancés sans condition.

En revanche, si vous avez besoin de lancer un container qui en a besoin d'un autre (je pense à un container PHP, pour lancer des tests, qui aurait besoin d'un container MySQL par exemple), avec la commande ```docker-compose run``` ou ```docker-compose exec```, Docker ne pourra pas savoir que le container PHP a besoin de celui de MySQL pour fonctionner. Il lancera alors uniquement le container que vous avez demandé et vos tests échourrons.

```links``` permet de lancer les containers qui sont dépendants entre eux.

Dans le cas où il n'y a pas de ```links```, on remarque qu'aucun autre container n'est lancé. En revanche, docker-compose créer un network pour ne pas utiliser celui par défault et ainsi garder une isolation entre vos projets.

```bash
$ docker-compose run --rm blog-server ./vendor/bin/phpunit
Creating network "laravelblog_default" with the default driver
PHPUnit 6.4.4 by Sebastian Bergmann and contributors.
...
```

Dans le cas où on utilise les ```links```, tous les autres containers dépendants sont également lancés :
```bash
$ docker-compose run --rm blog-server ./vendor/bin/phpunit
Creating laravelblog_redis_1 ...
Starting laravelblog_mysql_1 ...
Starting laravelblog_mysql-test_1 ... done
Creating laravelblog_redis_1 ... done
PHPUnit 6.4.4 by Sebastian Bergmann and contributors.
...
```

Depuis que les networks sont personnalisables, il n'est plus vraiment conseillé d'utiliser les ```links``` qui ont été ```deprecated```. En effet, si vous avez besoin d'isoler des containers entre eux, il est préférable d'utiliser un nouveau network en particulier et de gérer les dépendances en utilisant ```depends_on```.

Une version simplifiée de notre ancien ```docker-compose.yml``` ressemblerait à cela :
```diff
services:
  blog-server:
-    links:
+    depends_on:
      - mysql
      - mysql-test
      - redis
```

### Network personnalisé

Comme on vient de le voir, on peut définir des networks personnalisés, il faut les définir à deux endroits. D'une part, au même niveau que les services pour les créer, on les appelle les ```top-level networks``` et dans les services eux-mêmes pour s'en servir, les ```service-level networks```. Même si le groupe ```networks``` est défini après celui des ```services``` dans votre ```docker-compose.yml```, ils seront créées avant quoi qu'il arrive.

Pour définir un network avec docker-compose :

```yaml
services:
  blog-server:
    depends_on:
      - mysql

networks:
  backend:
    driver: bridge
```

Dans cet exemple, on a créé un réseau nommé ```backend``` avec le driver ```bridge```, qui est le driver utilisé par défaut sur Docker. Vous pouvez trouver toutes les options disponibles sur [la documentation officielle](https://docs.docker.com/compose/compose-file/#network-configuration-reference). Je ne vais pas toutes les présenter, je pense qu'il est seulement intéressant de savoir comment cela fonctionne, le reste dépendra de vos besoins.

Un service peut rejoindre un ou plusieurs networks :
```yaml
services:
  blog-server:
    depends_on:
      - mysql
    networks:
      - backend
      - frontend

networks:
  backend:
    driver: bridge
  frontend:
    driver: bridge
```

Le nom des networks créés avec docker-compose seront de la forme ```[projectname]_[networkname]``` donc dans notre cas ce sera ```laravelblog_backend```. On peut alors inspecter un container avec la commande :

```bash
$ docker inspect <container_id>
```

Vous pouvez également créer des networks avec Docker :

```bash
$ docker network create --driver bridge <network_name>
```

Et pour rejoindre un network lorsqu'on lance un container :

```bash
$ docker run --name blog-server -v $(pwd):/application --network <network_name> -d laravel-blog
```

Dans la section des networks, on remarquera qu'il y en a bien deux avec une IP distinctes pour le même container en fonction du réseau.

Si toutefois, vous n'avez pas besoin de créer un réseau pour des cas particuliers, il est conseillé d'utiliser le réseau par défaut sachant que docker-compose le fait pour vous.

J'ai mis à jour mon ```docker-compose.yml``` pour le projet [laravel-blog](https://github.com/guillaumebriday/laravel-blog/blob/master/docker-compose.yml) si vous voulez l'exemple complet.

Merci !
