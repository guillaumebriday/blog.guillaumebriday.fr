---
layout: post
title: Utiliser les networks Docker depuis son host
date: 2018-05-07 09:00
category: DevOps
---

Si vous utilisez beaucoup Docker et Docker-compose, vous savez qu'il y a quelques désagréments et la gestion des réseaux depuis l'host et entre les containers en fait partie. Nous allons voir comment nous simplifier (un peu) son usage.

## Le DNS de Docker

Vos containers sont à l'intérieur d'un même réseau, comme j'en ai parlé dans l'article [Docker : Les réseaux personnalisés](/docker-les-reseaux-personnalises), ils peuvent donc communiquer ensemble et on peut connaitre l'adresse IP d'un container via le nom du service, via un alias `link` ou enfin via un `net-alias`. Cela est possible via le [DNS interne de Docker](https://docs.docker.com/v17.09/engine/userguide/networking/configure-dns/) qui s'occupe de tout pour nous.

Ainsi, si votre `docker-compose.yml` ressemble à cela :

```yml
version: '3'

services:
  app:
    image: php:7.2-fpm
    depends_on:
      - mysql

  mysql:
    image: mysql
    ports:
      - '3306:3306'
    environment:
      - MYSQL_ROOT_PASSWORD=secret
      - MYSQL_DATABASE=laravel
```

Vous pouvez, par exemple, depuis votre container `php` utiliser cette configuration pour MySQL :

```ini
DB_CONNECTION=mysql
DB_HOST=mysql
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=secret
```

Comme on le voit ici, on peut mettre `DB_HOST=mysql`, car le service DNS nous renverra l'adresse IP du container dont le service s'appelle `mysql`.

On peut, par ailleurs, voir toutes ces informations de la façon suivante. Si je fais un `docker inspect` avec l'id de mon container MySQL et que je regarde dans la partie `NetworkSettings`, je vais retrouver toutes les informations concernant le réseau de mon container :

```bash
$ docker ps
946f13c85f9a    php        "docker-php-entrypoi…"   Less than a second ago   Up 5 seconds        9000/tcp                         laravelblog_app_1
8212e8b19f61    mysql      "docker-entrypoint.s…"   Less than a second ago   Up 6 seconds        0.0.0.0:3306->3306/tcp           laravelblog_mysql_1

$ docker inspect 8212e8b19f61

# Le retour est simplifié

[
    {
        "NetworkSettings": {
            "Bridge": "",
            "Ports": {
                "3306/tcp": [
                    {
                        "HostIp": "0.0.0.0",
                        "HostPort": "3306"
                    }
                ]
            },
            "Networks": {
                "laravelblog_default": {
                    "IPAMConfig": null,
                    "Links": null,
                    "Aliases": [
                        "8212e8b19f61",
                        "mysql"
                    ],
                    "NetworkID": "299ff2144683c1a14757b5c6e717607217dacd4d774e1200411b7673dd7e1c66",
                    "EndpointID": "6ea28db687adae1105f57afe4b475e852fa4fad618c996b5cc111af26ab1a53e",
                    "Gateway": "172.21.0.1",
                    "IPAddress": "172.21.0.3",
                    "IPPrefixLen": 16,
                    "IPv6Gateway": "",
                    "GlobalIPv6Address": "",
                    "GlobalIPv6PrefixLen": 0,
                    "MacAddress": "02:42:ac:15:00:03",
                    "DriverOpts": null
                }
            }
        }
    }
]

```

On peut voir les ports qui sont ouverts, dans notre cas ouvrir des ports n'est utile que si on veut accéder au container depuis l'host. Et ensuite on retrouve l'adresse IP du container dans le réseau qui s'appelle `laravelblog_default`. Il pourrait y avoir plusieurs réseaux et donc plusieurs adresses IP différentes.

On peut d'ailleurs s'amuser à changer notre `.env` de cette manière pour obtenir le même résultat :

```ini
DB_CONNECTION=mysql
DB_HOST=172.21.0.3
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=secret
```

Attention tout de même, l'adresse peut changer dans le temps, je fais ça seulement pour expliquer le fonctionnement. Il faut continuer à utiliser les DNS.

Allons encore plus loin. Nous pouvons depuis un container obtenir les informations sur le DNS et retrouver les adresses IP des autres services :

```bash
$ docker exec -it 946f13c85f9a bash

> cat /etc/resolv.conf
nameserver 127.0.0.11 # On obtient alors l'adresse IP du DNS de docker
options ndots:0

> apt install dnsutils -y # Il faut installer dig dans le container pour nos tests
> dig mysql
; <<>> DiG 9.10.3-P4-Debian <<>> mysql
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 28649
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 0

;; QUESTION SECTION:
;mysql.         IN    A

;; ANSWER SECTION:
mysql.   600    IN    A    172.21.0.3
```

Le service DNS nous retourne bien l'adresse du container.

## Accéder au réseau depuis son host

Si j'essaye de lancer une commande PHP qui a besoin de la base de données `MySQL` pour fonctionner, je vais obtenir une erreur. En effet, le DNS de docker ne fonctionne qu'à l'intérieur des containers et mon host ne peut pas résoudre l'adresse "mysql".

Cela n'empêche pas d'accéder aux containers depuis l'host si l'on change l'adresse par `127.0.0.1` et qu'un port est bindé sur l'extérieur du container. En revanche, c'est le container `app` qui n'aura plus accès au service `mysql`.

On ne va pas s'amuser à changer notre configuration à chaque fois que l'on veut exécuter une commande, alors deux choix s'offre à nous. Soit on exécute nos commandes dans des nouveaux containers, soit on change notre `/etc/hosts` en local.

### Exécuter les commandes dans un nouveau container

Par exemple, la commande pour lancer les migrations de Laravel :

```bash
# Sans Docker
$ php artisan migrate

# Avec Docker
$ docker-compose run --rm app php artisan migrate
```

Docker va alors lancer un nouveau container, qui sera supprimé à la fin de l'exécution, sur le même réseau que les autres services pour lancer les migrations.

C'est assez rapide (surtout sous Linux) et cela marche très bien, c'est juste embêtant de devoir préfixer la commande que l'on veut exécuter par `docker-compose run --rm [nom_du_service] [commande]`. De plus, il est difficile de faire un alias générique, car cela dépend du nom du service et des options que l'on veut passer.

### Modifier son /etc/hosts

Dans ce cas, on va simplement associer le nom d'hôte `mysql` à l'adresse `127.0.0.1` pour ne pas avoir à changer la configuration à chaque fois, mais pointer vers la bonne adresse.

Rajoutez cette ligne à la fin du fichier `/etc/hosts` :

```ini
# /etc/hosts

127.0.0.1   mysql
```

Désormais, je peux lancer les commandes suivante depuis mon host et ma configuration sera valable tant pour les containers que pour mon host :

```bash
$ php artisan migrate
```

**Bien entendu dans ce cas, il sera obligatoire d'avoir les commandes installées sur votre host contrairement à l'exécution dans un container qui n'a besoin que des images Docker pour fonctionner.**

Et de plus, les containers correspondants devront être lancés au préalable tandis que la commande Docker lance tous les containers dont nous avons besoin.

Je ne pense pas que ça soit gênant, car c'est très rare de lancer ces commandes en dehors d'un contexte de développement (là où les containers sont tous lancés).

De plus, vous devez créer autant d'associations que vous avez de services qui portent un nom différent et pour lesquels vous avez besoin d'avoir un accès depuis l'host et un container en même temps.

## Conclusion

Je trouve cette astuce très pratique lorsqu'on travaille beaucoup avec Docker, on garde les avantages de travailler sur son host et les avantages d'isoler les processus dans des containers.
