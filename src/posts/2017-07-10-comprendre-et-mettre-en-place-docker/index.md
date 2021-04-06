---
layout: post
title: "Comprendre et mettre en place Docker"
category: DevOps
---
J'ai eu l'occasion récemment d'utiliser [Docker](https://www.docker.com) de façon un peu plus poussée et je tenais à faire un retour car j'ai eu pas mal de points de blocage dans mon apprentissage que je voudrais détailler ici plus clairement.

On va parler de plusieurs choses importantes. L'objectif est de voir en détails le fonctionnement de Docker et les principes généraux à bien comprendre avant d'aller plus loin. Nous verrons dans un second temps comment le mettre en place dans un cas concret.

## Rappels sur la virtualisation

Avant de commencer, je pense qu'il est important de rappeler ce qu'est Docker et pourquoi on le distingue des autres outils de virtualisation.

Pour reprendre la définition de Wikipédia, Docker est un outil de déploiement d'applications dans des containers. On parle alors de ```virtualisation légère```. En simplifiant, un container va pouvoir partager une grande partie de ses ressources avec le système hôte. Ainsi, il a accès aux fichiers du système d'exploitation en lecture seule pour pouvoir se mettre en place. L'avantage ici est indéniable, on va utiliser les mêmes ressources pour un ou plusieurs containers. Pour prendre un exemple simple, si vous souhaitez monter un container pour MySQL et un autre pour PHP, les deux vont utiliser les mêmes fichiers présents sur le système sans les recréer à l'intérieur de leur container, à l'inverse d'une machine virtuelle (VM) par exemple.

D'un autre côté, une machine virtuelle va recréer un système complet dans le système hôte pour avoir ses propres ressources, on parlera de ```virtualisation lourde``` ou ```complète```.

Des containers peuvent ainsi fonctionner sur la même machine en partageant le même OS tout en étant isolés au niveau des processus ou des utilisateurs.

Le schéma officiel résume très bien cela et permet de bien comprendre la différence.

![Docker vs VM](docker-vs-vm.png)

Docker a donc plusieurs avantages qui ont fait son succès. Les containers ne tiennent que très peu de place, ils sont bien plus rapides à lancer que des VM et consomme beaucoup moins de RAM.

Maintenant qu'on voit un peu plus quelles sont les grandes catégories de la virtualisation, on va se plonger dans les fondamentaux de Docker.

## Composants essentiels de Docker

Maintenant que nous avons un peu plus le fonctionnement général des containers en tête, nous allons voir plus en détail comment nous servir de Docker et quels sont les composants essentiels à sa mise en place.

C'est un point très important que je tenais à aborder, car c'est souvent un point de blocage dans l'apprentissage et dans la mise en place de containers.

### Les volumes

Comme on l'a vu avant, les containers sont isolés du système hôte. Ils ont un accès en lecture seule pour exister mais c'est tout. La problématique, c'est que dans beaucoup de cas, on va avoir besoin d'utiliser des fichiers qui ne sont pas dans un container.

Ils devront soit, être partagés par plusieurs containers, soit ils devront être sauvegardés mêmes après la suppression d'un container. En effet, lorsqu'un container est supprimé, l'ensemble des fichiers présents à l'intérieur le sont également. Cela peut être gênant pour ces raisons ou pour un upload de fichier par un utilisateur sur une application Web entre autres.

Pour remédier à ce problème, Docker a mis en place un système appelé [Volume](https://docs.docker.com/glossary/?term=volume).

Les volumes ont pour objectifs d'utiliser des données directement sur le système hôte. Pour faire simple, on va dire à Docker : "Voilà ce dossier (ou ce fichier) en particulier ne le cherche pas dans le container mais à cet emplacement sur l'host. Merci !". Les chemins vers ces dossiers et fichiers peuvent être mis en place dans la configuration du container que nous verrons en détail plus tard.

A partir du moment où le volume est mis en place, le container a un accès direct au dossier ciblé dans l'host. Ce n'est pas une copie du container vers l'host mais bien un accès direct du container vers le File System de l'host. Donc on va s'en servir pour partager du code source entre plusieurs containers, mais aussi sauvegarder une base de données MySQL et plus encore. On peut, bien entendu, définir autant de volumes que l'on souhaite avec les chemins de notre choix, il n'y a pas de limitation à ce niveau-là.

![Docker volumes](docker-volumes.png)

### Les ports

#### Entre l'host et les containers

De la même façon que le reste, les ports réseaux à l'intérieur d'un container sont isolés du reste du système. C'est une notion importante car, on va devoir faire de la redirection de port. Lorsqu'un service expose un port à l'intérieur du container, il n'est, par conséquent, pas accessible depuis l'extérieur par défaut.

Nous avons besoin d'exposer un port du host sur un port interne à un container. Pour être plus clair, je vais prendre un exemple.

Le port par défaut d'un serveur Rails est 3000. Pour pouvoir accéder à ce port depuis mon host, je dois rediriger le port 3000 interne du container vers un port de mon choix sur l'host. Il n'y a aucune restriction à ce niveau-là.

![Docker ports](docker-ports.png)

Ainsi pour se connecter à notre application Rails qui tourne dans un container sur le port 3000, on pourra simplement faire :

```bash
$ curl http://localhost:1337
```

J'ai choisi le port 1337, complètement arbitrairement, libre à vous de changer selon vos besoins.

#### Entre containers

Il existe également un autre aspect important avec les ports, c'est la notion d'[EXPOSE](https://docs.docker.com/engine/reference/builder/#expose).

```EXPOSE``` va permettre d'ouvrir un port uniquement pour les autres containers. En pratique, on va s'en servir pour faire interagir des containers entre eux. Typiquement, un container MySQL n'aura pas besoin d'être accessible via l'host, on va donc exposer son port par défaut ```3306``` aux autres container pour qu'ils y aient accès.

Docker utilise aussi cette notion lors de l'utilisation de l'opérateur ```--link``` que nous allons détailler.

### Les links

Une des philosophies de Docker est d'avoir un container par service. Les containers ont besoin de communiquer entre eux. On a pris plus tôt le cas de MySQL mais les exemples ne manquent pas.

L'opérateur ```link``` permet, comme son nom l'indique, de lier des containers entre eux automatiquement. Il permet au container d'avoir accès directement au service d'un autre container via un port sur un **réseau privé**. Pour définir ce port, il regarde la valeur du ```EXPOSE``` sur le container cible.

Docker va également modifier le fichier ```/etc/hosts``` pour nous. Ainsi, on pourra accéder à ce container via son nom et non son ip plus facilement. L'avantage c'est qu'on ne va pas exposer ici un container sur l'host pour rien. C'est un réseau totalement privé entre deux containers.

![Docker links](docker-links.png)

## Les images Docker

Maintenant que nous avons un peu plus en tête les grands principes de Docker, je vais aborder un point fondamental de Docker, à savoir les ```images```.

Les images ont en grande partie fait la popularité de Docker grâce à leur simplicité de mise en place. Une image représente un état d'un container à un moment donné. Beaucoup de services plus ou moins connus proposent des images pré-configurées pour que vous n'aillez plus qu'à les lancer en un clin d'oeil. La liste est disponible sur le [Docker Hub](https://hub.docker.com).

Les images sont définies par un Dockerfile, sur lequel nous reviendrons en détail par la suite. Elles proviennent toutes d'une image parent (sauf les images de bases comme les OS par exemple). Par exemple, pour PHP, d'après le [Dockerfile de l'image officielle](https://hub.docker.com/_/php/) c'est Debian en version Jessie qui est utilisé pour construire l'image au moment d'écrire cet article.

Comme je le disais, une image est juste un état d'une configuration Docker à un moment. On le voit très bien dans le Dockerfile de PHP, ils sont partis d'une installation vierge de Debian pour installer et configurer PHP. De notre côté, on aura juste à lancer cette image dans un container et ce sera tout bon. Docker va ajouter des couches de configuration sur l'image à chaque changement de configuration.

Bien entendu, nous pouvons créer notre propre image pour la partager ou s'en servir personnellement, nous allons voir comment faire cela dans la suite de l'article.

La commande pour lister les images Docker disponible sur votre poste :

```bash
$ docker images
```

## Les Dockerfiles

Pour la suite, Docker doit être installé sur votre poste ou serveur. Pour cette partie, je vous en remet à la documentation qui vous détaillera les étapes à suivre, selon votre système d'exploitation : [https://docs.docker.com](https://docs.docker.com).

C'est un fichier qui va décrire la construction de votre image. Il doit se situer à la racine de votre projet. Il va contenir plusieurs instructions indispensables et d'autres optionnelles que nous allons voir ensemble.

Je vous propose de mettre en place mon projet [Laravel-blog](https://github.com/guillaumebriday/laravel-blog) sur Docker. Le besoin est très standard et je pense que cela fera un bon exemple pour comprendre les fondamentaux.

Nous allons avoir besoin de :
- PHP 7.1 fpm et de quelques dépendances dont Laravel a besoin
- Configurer les locales pour avoir les dates en français
- Une base de données avec MySQL
- Nginx
- Pouvoir lancer les jobs en arrière plan

Pour commencer nous allons créer un fichier ```Dockerfile```. L'idée est de construire une nouvelle image à partir de celle de PHP-FPM, pour pouvoir nous en servir dans des containers par la suite.

Nous allons modifier l'image de ```php:7.1-fpm``` comme ils l'ont fait avec celle de Debian. On peut le voir dans le [Dockerfile de l'image officielle](https://hub.docker.com/_/php/).

Dans le Dockerfile, il faut en premier choisir l'image de base que nous allons adapter à nos besoins :

```bash
FROM php:7.1-fpm
```

Cela ne peut être défini qu'une seule fois dans le fichier.

On peut également définir un ```LABEL``` concernant le ```maintainer``` du Dockerfile pour savoir qui contacter en cas de besoin :

```bash
LABEL maintainer="hello@guillaumebriday.fr"
```

C'est une valeur optionnelle.

Nous allons installer nos dépendances système. Docker va créer des couches intermédiaires pour sauvegarder l'état de l'image à chaque commande. Cela permet d'éviter de tout refaire à chaque fois si aucune valeur n'a changé entre temps.

```bash
RUN apt-get update && apt-get install -y \
    build-essential \
    mysql-client \
    libmcrypt-dev \
    locales \
    zip
```

Pour que l'image soit un peu moins lourde, on peut vider le cache des dépendances (optionnel) :

```bash
RUN apt-get clean && rm -rf /var/lib/apt/lists/*
```

On installe maintenant les extensions PHP dont Laravel a besoin pour ce projet :

```bash
RUN docker-php-ext-install mcrypt pdo_mysql tokenizer
```

Pour que les dates soient disponibles également en français sur le projet, il faut installer les locales au niveau du système :

```bash
RUN echo fr_FR.UTF-8 UTF-8 > /etc/locale.gen && locale-gen
```

Et pour terminer, on va changer le ```WORKDIR``` pour avoir un dossier qui accueillera notre application :

```bash
WORKDIR /application
```

Le ```WORKDIR``` est le point d'entrée de notre container. Il définit le chemin à utiliser pour toutes les commandes telles que ```RUN```, ```CMD```, ```ENTRYPOINT```, ```COPY``` et ```ADD```.

Je n'utilise pas de l'```ENTRYPOINT``` ici, mais je tenais à en parler rapidement. Je vous laisse consulter [cet article](http://goinbigdata.com/docker-run-vs-cmd-vs-entrypoint/) qui détaille la différence entre les commandes ```RUN```, ```CMD``` et ```ENTRYPOINT```.

Et voilà, notre Dockerfile est complet pour cette image et il devrait ressembler à cela :

```bash
# Dockerfile

FROM php:7.1-fpm
LABEL maintainer="hello@guillaumebriday.fr"

# Installing dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    mysql-client \
    libmcrypt-dev \
    locales \
    zip

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Installing extensions
RUN docker-php-ext-install mcrypt pdo_mysql

# Setting locales
RUN echo fr_FR.UTF-8 UTF-8 > /etc/locale.gen && locale-gen

# Changing Workdir
WORKDIR /application
```

Docker a besoin que l'image soit ```build``` au moins une fois pour pouvoir y monter des containers.

```bash
$ docker build -t laravel-blog .
```

Le flag ```-t laravel-blog``` permet de définir un nom à notre image ce qui va être très pratique lorsque nous monterons des containers dessus. Et le point à la fin de la commande permet d'indiquer que l'on veut utiliser le Dockerfile situé au même niveau. Dans notre cas, c'est celui qu'on vient de créer juste avant.

Une fois buildée, vous devriez voir apparaitre ```laravel-blog``` dans la liste de vos images :

```bash
$ docker images | grep laravel-blog
```

## Mise en place du projet final

Comme je le disais en début d'article, l'idée est de créer un container par service.

Contrairement à une machine virtuelle, un container ne peut pas être lancé s'il ne fait rien. On peut donc lancer un container pour une tâche très unitaire et le laisser "mourir" une fois son [travail terminé](https://www.youtube.com/watch?v=OTB0Q03BRn0).

Ainsi, la première chose à faire dans notre cas c'est d'installer les dépendances PHP via composer.

La [commande](https://docs.docker.com/engine/reference/commandline/run/) ```docker run``` que nous allons beaucoup utiliser par la suite se compose de cette façon :

```bash
$ docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
```

### Installer nos dépendances via Composer

Je n'avais pas beaucoup d'intérêt à installer Composer dans mon Dockerfile tout à l'heure. J'aurais ajouté de la complexité à ce dernier et une [image Composer officielle](https://hub.docker.com/r/composer/composer/) existe justement pour ce besoin.

La documentation nous indique exactement ce que nous devons faire pour installer nos dépendances via un container :

```bash
$ docker run --rm -v $(pwd):/app composer/composer install
```

```composer/composer``` étant le nom de l'image qui se place toujours à la fin, avant une éventuelle commande à exécuter, ce qui est notre cas avec le ```install```.

Le flag ```--rm``` permet de supprimer automatiquement le container une fois qu'il aura terminé d'installer les dépendances. En effet, un container s'arrête de lui-même mais il reste en état de ```exited``` tant qu'il n'est pas relancé ou supprimé par la suite. Dans notre cas, garder ce container dans cet état n'est pas pertinent.

La commande ```-v $(pwd):/app``` permet de monter un ```VOLUME``` entre le dossier courant sur notre host et le dossier ```/app``` dans notre container. Cela va nous permettre d'installer les dépendances sur notre host via un container dédié. J'utilise pour ce container le dossier ```/app``` pour monter le volume car, c'est le ```WORKDIR``` par défaut de l'image Composer.

### Installer une base de données avec MySQL

On peut maintenant passer à une partie critique de l'application, à savoir sauvegarder nos données dans une base. Pour cela, j'utilise tout simplement l'[image officielle de MySQL](https://hub.docker.com/_/mysql/).

La documentation nous explique tout encore une fois. Pour définir une base de données ou créer un utilisateur avec un mot de passe, il faut utiliser les variables d'environnements.

Il faut sauvegarder la base de données sur l'host pour pouvoir couper et relancer le container plusieurs fois sans perdre des informations ou tout simplement si le container venait à se couper.

Comme nous allons avoir besoin de la base de données depuis les autres containers, je vais le renommer pour plus de simplicité lors de la mise en place du ```--link``` dont on a parlé en début d'article. Enfin, c'est optionnel, mais je veux accéder à la base de données depuis l'extérieur du container donc je dois rediriger le port utilisé par défaut : 3306.

Alors, commençons par définir le nom du container avec le flag ```--name mysql```. Je choisis de l'appeler ```mysql```, mais vous pouvez choisir le nom que vous souhaitez.

Pour les ports, je choisis de rediriger le même port utilisé par MySQL sur le port extérieur, vous pouvez choisir le port libre de votre choix :

```bash
-p 3306:3306 # -p <host>:<container>
```

Les variables d'environnements doivent avoir un nom que l'image MySQL utilisera par défaut, il suffit de changer leurs valeurs avec le flag ```-e``` :

```bash
-e MYSQL_ROOT_PASSWORD=secret -e MYSQL_DATABASE=laravel-blog
```
MySQL se chargera de créer la base et les utilisateurs, si besoin, en fonction de ces variables d'environnements de façon complètement transparente pour nous. Fantastique !

Et enfin, pour lancer le container en tâche de fond, il faut utiliser le flag ```-d```.

La commande pour lancer le container MySQL ressemble donc à cela :

```bash
$ docker run --name mysql -p 3306:3306 -v $(pwd)/tmp/db:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=secret -e MYSQL_DATABASE=laravel-blog -d mysql
```

Il ne faut pas confondre les deux ```mysql``` dans la commande. Le premier étant le nom du container qui va être lancé et le dernier étant le nom de l'image officielle.

### Installer le serveur Web et le gestionnaire de queues

Maintenant que nous avons créé une image à partir de PHP-FPM, nous allons pouvoir nous en servir simplement. Il nous suffit de donner un nom à notre container, c'est presque indispensable cette fois-ci pour la mise en place de Nginx juste après. Je rappelle que nous avions choisi de mettre le ```WORKDIR``` de l'image dans le dossier ```/application```, nous allons donc créer un volume avec notre projet dans ce dossier également pour que le serveur PHP puisse avoir les sources.

Vous pouvez créer un ou plusieurs volumes avec le flag suivant :

```bash
$ -v $(pwd):/application # -v <host path>:/<container path>
```

```$(pwd)``` permet de définir le dossier courant sur votre host.

Enfin, nous allons linker le container MySQL pour accéder à notre container via un réseau privé.

Il n'y a pas besoin de commande à la fin, tout est déjà géré par l'image PHP-FPM.

```bash
$ docker run --name blog-server -v $(pwd):/application --link mysql -d laravel-blog
```

Pour le gestionnaire de queues, c'est un peu différent. Laravel intègre un [gestionnaire de queues](https://laravel.com/docs/5.4/queues#running-the-queue-worker) qu'il faut lancer en ligne de commande. Je vais monter un deuxième container avec la même image, mais cette fois-ci en précisant la commande à lancer :

```bash
$ docker run --name queue-server -v $(pwd):/application --link mysql:mysql -d laravel-blog php artisan queue:work
```

### Mettre en place Nginx

Nginx sera notre serveur web qui traitera toutes les requêtes depuis l'extérieur. Il demandera au serveur PHP-FPM de traiter les fichiers PHP avant de les renvoyer au client.

Pour cela, il va falloir créer une configuration nginx pour qu'elle puisse fonctionner avec notre application :

```nginx
# nginx.conf

server {
  listen 80;
  index index.php index.html index.htm;
  root /application/public; # default Laravel's entry point for all requests

  access_log /var/log/nginx/access.log;
  error_log /var/log/nginx/error.log;

  location / {
    # try to serve file directly, fallback to index.php
    try_files $uri /index.php?$args;
  }

  location ~ \.php$ {
    fastcgi_index index.php;
    fastcgi_pass blog-server:9000; # address of a fastCGI server
    fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    fastcgi_param PATH_INFO $fastcgi_path_info;
    include fastcgi_params;
  }
}
```

C'est une configuration assez standard. Tout d'abord, on commence par écouter le ```port 80``` qui est le port http par défaut, cela implique que nous devrons rediriger les ports extérieurs vers le port 80 du container nginx.

Ensuite, nous indiquons le chemin ```root```, qui sera le chemin par défaut pour traiter les requêtes. Nous utilisations ```/application/public```, car ```public``` est le [dossier d'entrée utilisé par Laravel](https://laravel.com/docs/5.4/structure#the-public-directory). Toutes les requêtes doivent arriver dans le fichier ```index.php``` de ce dossier et seront traitées ensuite par le routeur interne de Laravel.

La dernière ligne qui nous intéresse est ```fastcgi_pass blog-server:9000```. On remarque une chose importante c'est le ```blog-server```.

En effet, le ```fastcgi_pass``` s'attend à recevoir le lien vers un serveur fastCGI (dans notre cas c'est PHP-FPM qui le gère) sur le port 9000 par défaut. Ce qui est génial, c'est que nous pouvons utiliser le nom du container qu'on nous avons monté tout à l'heure puisque [Docker a changé le fichier](https://docs.docker.com/engine/userguide/networking/default_network/dockerlinks/) ```/etc/hosts``` pour pouvoir binder ```blog-server``` vers l'adresse IP correspondante du container via le réseau privé. C'est tellement pratique !

Il nous reste à monter un volume pour pouvoir accéder aux assets, entre autres, depuis l'extérieur et remplacer la configuration ```default.conf``` utilisée par nginx par défaut :

```bash
$ docker run --name nginx --link blog-server -v $(pwd)/nginx.conf:/etc/nginx/conf.d/default.conf -v $(pwd):/application -p 80:80 -d nginx
```

### Compiler les assets

Rien de plus simple ici, j'utilise l'image node officiel dans sa version 7 car j'ai des erreurs inexplicables avec la version 8 :

```bash
$ docker run --rm -it -v $(pwd):/application -w /application node:7 npm install # Install npm dependencies
$ docker run --rm -it -v $(pwd):/application -w /application node:7 npm run production # Compile assets and minify output
```

### Migrations et seeds pour Laravel

Dans le même esprit que pour composer, nous avons besoin de containers très unitaires ici. Je vais simplement utiliser l'image ```laravel-blog``` pour me simplifier la vie :

```bash
$ docker run --rm -it --link mysql -v $(pwd):/application laravel-blog php artisan migrate
$ docker run --rm -it --link mysql -v $(pwd):/application laravel-blog php artisan db:seed
```

![Schéma de l'architecture finale](docker-architecture-diagram.png)

### Rappel des quelques commandes Docker

```bash
$ docker ps # Voir les containers en cours
$ docker ps -a # Voir tous les containers
$ docker images # Voir toutes les images installées
$ docker exec -it blog-server bash # Lancer bash dans le container blog-server en mode interactif

# Monter une image appelée laravel-blog via le Dockerfile du dossier courant
$ docker build -t laravel-blog .

# Installer les dépendances via l'image composer dans le dossier courant
$ docker run -it --rm -v $(pwd):/app composer/composer install

# Mettre en place un container MySQL avec une base de données sauvegardée sur l'host
$ docker run --name mysql -p 3306:3306 -v $(pwd)/tmp/db:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=secret -e MYSQL_DATABASE=laravel-blog -d mysql

# Lancer le container de l'application pour PHP-FPM
$ docker run --name blog-server -v $(pwd):/application --link mysql:mysql -d laravel-blog
# Lancer le moteur de jobs de Laravel
$ docker run --name queue-server -v $(pwd):/application --link mysql:mysql -d laravel-blog php artisan queue:work

# Lancer les migrations de Laravel
$ docker run --rm -it --link mysql -v $(pwd):/application laravel-blog php artisan migrate
# Lancer les seeds de Laravel
$ docker run --rm -it --link mysql -v $(pwd):/application laravel-blog php artisan db:seed

# Lancer nginx sur le port 80
$ docker run --name nginx --link blog-server -v $(pwd)/nginx.conf:/etc/nginx/conf.d/default.conf -v $(pwd):/application -p 80:80 -d nginx

# Installer les dépendances JavaScript via npm
$ docker run --rm -it -v $(pwd):/application -w /application node:7 npm install
# Compiler les assets du projet via un script npm
$ docker run --rm -it -v $(pwd):/application -w /application node:7 npm run production
```

Et voilà ! Si tout va bien, tout est opérationnel et on pourrait s'arrêter ici !

En revanche, même si tout cela est très bien, il y a quelques problèmes.

Tout d'abord, ce n'est pas pratique à reproduire sur différents postes. Il faudrait faire une liste de commandes à copier-coller, c'est assez chiant et pas pratique même si ce n'est pas si loin que cela au final. Devoir le faire à chaque fois qu'on veut mettre en place notre environnement n'est pas ce qu'il y a de plus fun.

On peut se servir de cette mise en place tant pour un environnement de développement que de production en faisant plus attention à la sécurité au niveau des variables d'environnements dans le second cas. Donc on peut être amené à faire cette manipulation souvent.

Et enfin, c'est hyper lourd à lire je trouve, c'est ni agréable ni intuitif. Bref, on peut améliorer tout cela.

## Automatisation avec docker-compose

[Docker compose](https://github.com/docker/compose) est un outil pour lancer un ou plusieurs containers, définis par un fichier nommé ```docker-compose.yml``` à la racine de votre projet, avec une seule ligne de commande.

Voilà le fichier final pour notre application :

```yml
# docker-compose.yml

version: '2'

services:
  blog-server:
    build: .
    image: laravel-blog
    links:
      - mysql
    volumes:
      - ./:/application

  queue-server:
    build: .
    image: laravel-blog
    command: php artisan queue:work
    links:
      - mysql
    volumes:
      - ./:/application

  mysql:
    image: mysql
    ports:
      - '3306:3306'
    environment:
      - MYSQL_ROOT_PASSWORD=secret
      - MYSQL_DATABASE=laravel-blog
    volumes:
      - ./tmp/db:/var/lib/mysql

  nginx:
    image: nginx
    ports:
      - '80:80'
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf
      - ./:/application
    links:
      - blog-server
```

La première chose qui me saute aux yeux, c'est la simplicité de lecture. Avec ce fichier, on peut monter tous les containers dont on a besoin pour notre application avec une simple ligne de commande :

```bash
$ docker-compose up -d
```

Je ne mets pas dans le fichier les containers que je lance de manière unitaire, car ils ont pour vocation d'être lancés uniquement au besoin et pas à chaque fois.

Après tout ce que l'on vient de voir, je ne pense pas que détailler le fichier soit pertinent, l'ensemble est déjà affordant. Le nom des containers est optionnel désormais, Docker fait le lien tout seul en interne. En revanche, le nom des services est important pour les liens entre containers.

Dans le ```.env``` de votre Laravel, la configuration de votre base de données devrait ressembler à cela :

```bash
DB_CONNECTION=mysql
DB_HOST=mysql
DB_DATABASE=laravel-blog
DB_USERNAME=root
DB_PASSWORD=secret
```

Dans le ```DB_HOST```, on peut mettre ```mysql``` car c'est le nom utilisé dans notre ```--link```. Il faudra adapter si vous changez le nom du ```service``` dans votre ```docker-compose.yml``` bien entendu. C'est valable également pour la configuration nginx.

Si vous souhaitez arrêter les containers et les supprimer :

```bash
$ docker-compose down
```

Il existe la version 3 de docker-compose dont je parlais prochainement.

Je pense que j'en ai terminé pour cet article, j'espère avoir été clair et complet dans mes explications. Si vous avez des retours, des questions ou des remarques n'hésitez pas à les faire dans les commentaires.

Merci !
