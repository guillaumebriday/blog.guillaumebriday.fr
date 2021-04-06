---
layout: post
title: "Libérer de la place sur votre SSD en tant que développeur"
category: Astuces
---

Si vous êtes développeur et que vous avez un Mac, il est très probable que vous ayez déjà eu un manque de place sur votre SSD. Et pour cause, les outils modernes tels que [Docker](https://www.docker.com/), [Node](https://nodejs.org/en/) ou [Brew](https://brew.sh/) sont très gourmands lorsqu'il s'agit de prendre de l'espace. On va voir quelques commandes rapides pour faire (beaucoup) d'espace en toute sécurité.

Avant de commencer, placez-vous dans votre dossier qui contient tous vos projets.

On va voir outils après outils comment libérer de l'espace, c'est parti !

## Node modules

![Poids de node_modules](node_modules.png)

Cette commande permet de faire le cumul du poids de tous vos dossier `node_modules` et de vérifier ce que l'on va supprimer :
```bash
$ find $(pwd) -name "node_modules" -type d -prune -print | xargs du -chs
```

Par définition, ce ne sont que des dépendances et peuvent être réinstallées à tout moment. On peut donc **les supprimer**, si on en a plus besoin, avec cette commande :

```bash
$ find $(pwd) -name 'node_modules' -type d -prune -print -exec rm -rf '{}' \;
```

Au passage, si vous utilisez Time Machine, vous pouvez exclure tous les dossiers `node_modules` avec cette commande :

```bash
$ find $(pwd) -type d -name 'node_modules' -prune | xargs -n 1 tmutil addexclusion
```

Bien sûr, il ne faut **pas** supprimer les `node_modules` avant de lancer cette commande.

Vous pouvez également vider le cache de `npm` ou `yarn`:

```bash
$ npm cache clean 

# ou

$ yarn cache clean
```

## Docker

Entre les containers, les volumes, les images et les réseaux, Docker a tendance à prendre **beaucoup** de place si vous vous en servez régulièrement.


Cette commande permet de supprimer tous les containers stoppés, les images et les réseaux qui ne sont pas utilisés :

```bash
$ docker system prune -a
```

### Les containers

Attention, vous pouvez perdre des données si vous n'avez pas configuré de volume correctement.

```bash
# Lister vos containers
$ docker ps -a 

# Supprimer vos containers
$ docker rm votre_container votre_autre_container 
```

Pour lister et supprimer tous vos containers qui sont coupés:
```bash
# Lister vos containers avec le statut exited
$ docker ps -a -f status=exited 

# Supprimer tous les containers avec le statut exited
$ docker rm $(docker ps -a -f status=exited -q)
```

Pour arrêter et supprimer tous vos containers:
```bash
$ docker stop $(docker ps -a -q)
$ docker rm $(docker ps -a -q)
```

### Les images

Comme pour les `node_modules`, toutes les images peuvent être téléchargées quand vous voulez, mais vous pouvez aussi les supprimer une par une si besoin :

```bash
# Lister vos images
$ docker image ls 

# Supprimer vos images
$ docker rmi votre_image votre_autre_image 
```

Pour supprimer vos images sans tag :
```bash
$ docker image prune
```

Pour supprimer toutes vos images :
```bash
$ docker rmi $(docker images -a -q)
```

### Les volumes

Vous n'avez peut être pas envie de supprimer vos volumes, car ils contiennent vos données et même en développement on n'a pas forcement de tout perdre. Faites donc attention à ne pas supprimer n'importe quoi ici.

```bash
# Lister vos volumes
$ docker volume ls

# Supprimer vos volumes
$ docker volume rm votre_volume votre_autre_volume
```

Supprimer vos volumes qui ne sont pas utilisés par au moins un container :
```bash
$ docker volume prune
```

## Les logs

Les logs, même de développement, peuvent prendre plusieurs Go de place après une certaine période. On en a rarement besoin très longtemps et on peut facilement les supprimer sans prendre de risque.

Pour vérifier ce que l'on va supprimer et voir le poids cumulé :
```bash
$ find $(pwd) -name "*.log" -print | xargs du -chs
```

Pour les supprimer:
```bash
$ find $(pwd) -name "*.log" -print -exec rm '{}' \;
```

N'hésitez pas à adapter la commande si vous avez des dossiers de cache.

## Vagrant

On peut rapidement se retrouver avec plusieurs images de plusieurs Go.

```bash
# Pour lister vos boxes:
$ vagrant box list

# Pour supprimer vos boxes inutiles
$ vagrant box remove votre_box
```

## Brew

Si vous utilisez brew, vous pouvez supprimer les anciennes formules :

```bash
$ brew cleanup
```

## Ruby

Les versions de Ruby et les gems correspondantes peuvent prendre beaucoup de place, surtout si vous travaillez souvent sur des projets avec plusieurs versions.

Avec rvm, on peut lister les versions installées :
```bash
$ rvm list
```

En supprimant une version, cela supprimera également les gems correspondantes :
```bash
$ rvm remove 2.4.3 # ou une autre version
```

Pour supprimer vos gems uniquement :
```bash
# Pour supprimer les anciennes versions de vos gems obsolètes
$ bundle clean

# Pour supprimer toutes les gems d'un gemset
$ rvm gemset empty
```

## PHP

Pour supprimer le cache de composer, rien de plus simple :

```bash
$ composer clearcache
```

Vous pouvez aussi supprimer les dossiers `vendors` avec en adaptant la commande des `node_modules`. Cela est sans risque car les dépendances PHP peuvent être télécharger à tout moment.

## Conclusion

Ces quelques commandes pourront vous faire **gagner plusieurs dizaines de Go** d'espace, ce qui peut être très pratique, surtout avec des SSD de 128Go.
