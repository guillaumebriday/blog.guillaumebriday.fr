---
layout: post
title: "Installer et utiliser les GitLab Runners"
category: DevOps
---
Si vous avez déjà travaillé avec [Gitlab](https://gitlab.com), vous avez peut-être déjà eu l'occasion de jouer avec l'intégration continue (CI). Aujourd'hui, nous allons voir ce qu'est un ```Runner``` et comment le mettre en place.

## Pourquoi s'en servir ?

L'intégration continue va permettre de lancer vos tests et vos builds directement sur le serveur via des [pipelines](https://docs.gitlab.com/ee/ci/pipelines.html). Les pipelines sont des groupes de jobs qui vont définir les scripts à exécuter sur le serveur.

Pour gérer vos pipelines, il faut mettre en place un GitLab Runner. Le GitLab Runner va gérer vos jobs et les lancer automatiquement quand une branche sera envoyée sur le dépôt ou lorsqu'elle sera mergée, par exemple. Vous pouvez également lancer les jobs à la main ou changer complètement la configuration.

Si vous utilisez Gitlab.com, plusieurs runners sont mis à votre disposition gratuitement, ce qui est super sympa. Vous pouvez alors lancer plusieurs pipelines en parallèles pour avoir les retours plus rapidement.

Ce sont des `Shared Runners`, ce qui veut dire qu'ils sont utilisés sur l'ensemble de vos projets, ce qui permet de limiter le nombre de runners à installer. Mais cela peut aussi poser problème, si vous avez beaucoup d'activité sur un projet. Les pipelines des autres projets seront alors en attente le temps que les `Shared runners` soient à nouveau disponibles.

En fonction de vos besoins, cela ne sera peut-être pas suffisant. Selon le nombre de projets que vous avez ou de l'activité que vous avez sur un projet, il vous faudra davantage de runners ou beaucoup de patience.

Si vous hébergez Gitlab vous-même, vous devrez définir vous-même un ou plusieurs runners pour vous servir de Gitlab CI.

On va pouvoir alors définir des `Specific Runners` qui seront disponibles uniquement pour un projet.

## Comment installer Gitlab Runner

### Sur linux

Ajouter le repository :
```bash
# For Debian/Ubuntu/Mint
$ curl -L https://packages.gitlab.com/install/repositories/runner/gitlab-runner/script.deb.sh | sudo bash

# For RHEL/CentOS/Fedora
$ curl -L https://packages.gitlab.com/install/repositories/runner/gitlab-runner/script.rpm.sh | sudo bash
```

Installer le package :

```bash
# For Debian/Ubuntu/Mint
$ sudo apt-get install gitlab-runner

# For RHEL/CentOS/Fedora
$ sudo yum install gitlab-runner
```

### Sur macOS

On va utiliser [Brew](https://brew.sh) comme package manager sur macOS :

```bash
$ brew update
$ brew install gitlab-runner
```

Pour lancer GitLab Runner automatiquement au démarrage de votre machine (optionnel) :

```bash
$ brew services start gitlab-runner
```

Pour windows, vous pouvez suivre [la documentation](https://docs.gitlab.com/runner/install/windows.html).

## Inscrire votre Runner sur Gitlab

```bash
$ gitlab-runner register
> # exemple : https://gitlab.com/
```

Ajoutez l'url de votre instance Gitlab. Attention, ce n'est pas l'url d'un dépôt en particulier.

Un token vous est maintenant demandé, vous pouvez le trouver dans la partie ```https://gitlab.com/<group>/<repo>/settings/ci_cd``` d'un projet :

```bash
> Please enter the gitlab-ci token for this runner:
a1b2c3d4e5
Registering runner... succeeded                     runner=a1b2c3d4e5
```

Vous pouvez alors choisir sur quel support le Runner doit lancer les pipelines. En fonction de vos besoins et de votre stack, vous pouvez choisir parmi beaucoup de possibilités :

```bash
> Please enter the executor: docker+machine, docker-ssh+machine, kubernetes, docker, shell, ssh, virtualbox, docker-ssh, parallels:
docker
```

Pour ma part, j'ai choisi Docker. Libre à vous de prendre la techno qui vous convient au mieux.

Une fois les dernières options choisi, votre Runner est prêt à être lancé. On peut le voir dans les paramètres du projet sur Gitlab :

![Un Runner spécifique sur un projet](gitlab-specific-runner.jpg)

Vous devez lancer une première fois le service GitLab Runner :
```bash
$ gitlab-runner start
```

C'est ce service qui va s'occuper de lancer les runners.

Pour permettre à votre machine de recevoir et d'exécuter les pipelines :

```bash
$ gitlab-runner run
Starting multi-runner ...
```

Si je lance un job sur Gitlab, je peux voir qu'il va choisir un des runners disponibles. On peut voir quel Runner est utilisé dans les informations du job dans l'interface :

![Un job qui se lance sur un runner spécifique](gitlab-specific-runner-job.jpg)

On peut alors voir l'état du job dans le terminal qui a lancé le Runner :

```bash
$ gitlab-runner run

Checking for jobs... received      job=52772913 repo_url=https://gitlab.com/<group>/<repo>.git runner=bdfebe22
Job succeeded                      job=52772913 project=5049427 runner=bdfebe22
```

Vous pouvez changer la configuration de votre GitLab Runner en modifiant les paramètres qui se trouvent dans le fichier ```~/.gitlab-runner/config.toml```.

## Conclusion

Vous pouvez maintenant ajouter autant de Runners que vous souhaitez, que ce soit sur une instance auto-hébergée ou `gitlab.com`.

En fonction de vos besoins, ajouter des runners peut grandement accélérer les reviews de merge requests et vos mises en productions.

Si vous avez des suggestions ou des questions, n’hésitez pas dans les commentaires.

Merci !
