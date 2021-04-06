---
layout: post
title: "Bien configurer son environnement de développement"
category: Dev
---
Aujourd'hui, je vais aborder un sujet qui me tient à coeur. La configuration de son environnement de développement et de son ordinateur est un point fondamental dans son organisation et son workflow au quotidien.

Il est indispensable de bien gérer ses dépendances, ses outils et avoir un environnement que l'on peut recréer sur n'importe quel ordinateur. Les développeurs sont les premiers concernés, je pense, mais ils ne sont pas les seuls.

## Gestionnaire de dépendances : Homebrew

Un gestionnaire de dépendances va, comme son nom l'indique, gérer vos dépendances. Il va automatiser l'installation, les mises à jour, la configuration et la suppression des logiciels et outils que vous souhaitez installer.

Si vous êtes sur Linux, il en existe plus que je ne pourrais en citer, en revanche sur macOS, par défaut il n'y en a aucun.

Heureusement, la communauté a résolu ce problème avec [Homebrew](https://brew.sh). C'est le plus connu, je pense, car lorsque vous souhaiterez installer un package à l'avenir, dans l'immense majorité des cas, la documentation préconisera de le faire avec Homebrew.

Tous les packages sont mis à jour très régulièrement et vous pouvez trouver la liste complète [ici](http://formulae.brew.sh). De plus, comme le projet est open-source, vous pouvez également proposer une nouvelle version d'un package.

Vous ne voyez pas encore l'intérêt d'un package manager ? Voyons quelques cas d'usages :

```bash
# Installer un paquet
$ brew install [package]

# Pour mettre à jour tous ses paquets :
$ brew upgrade
# or
$ brew upgrade [package]

# Pour lister ses paquets installés :
$ brew list

# Pour mettre à jour la liste des paquets disponibles :
$ brew update

# Pour lister les paquets à mettre à jour :
$ brew outdated
```

Vous voyez que la simplicité d'utilisation est assez déconcertante. On peut encore aller plus loin !!

[Cask](https://caskroom.github.io) est une extension de Brew. Elle permet d'installer de vrais logiciels directement en ligne de commande. Cela fait gagner un temps assez impressionnant.

En effet, pour installer un logiciel normalement, il faut le faire en plusieurs étapes, par exemple pour [Firefox](https://www.mozilla.org/en-US/firefox/new/) :

1. Ouvrir un navigateur
2. Chercher "Firefox"
3. Trouver le bon lien pour télécharger Firefox
4. Télécharger le ```.dmg```
5. L'ouvrir
6. Glisser l'icône dans le dossier ```application```
7. Éjecter le ```.dmg```

Avec Cask :

```bash
$ brew cask install firefox
```

Et il fera le téléchargement et l'installation de Firefox de façon complètement transparente.

De la même manière, on peut désinstaller un logiciel :

```bash
$ brew cask remove firefox
```

## Les dotfiles

Les ```dotfiles``` sont des fichiers de configurations sur les environnements UNIX. On les appelle ainsi, car ils sont préfixés par un point et sont cachés dans les dossiers par défaut.

Par extension, il y a certains fichiers de configuration qui ne sont pas préfixés par un point, mais qui sont utilisés avec une extension, comme du ```.json```, mais qui ont le même objectif de configurer un outil.

Avant d'expliquer comment je m'organise, vous pouvez trouver [mes dotfiles sur Github](https://github.com/guillaumebriday/dotfiles).

J'ai découpé mes dotfiles en plusieurs sous-dossiers, un pour chaque outil ou logiciel que j'utilise.

Prenons l'exemple de ```Git``` et ```VSCode```.

Pour Git, on retrouve dans le dossier correspondant les deux fichiers de configuration standard de Git, à savoir ```.gitconfig``` et le ```.gitignore_global```.

Par défaut, Git ne s'attend pas à les trouver dans ce dossier, il faudra donc les déplacer dans votre ```home``` pour qu'ils soient activés.

Sauvegarder et versionner ces fichiers me permet de les réutiliser quel que soit le Mac sur lequel je me trouve.

Pour VSCode, la configuration est plus complexe, mais le fonctionnement est similaire.

```
├── keybindings.json
├── locale.json
├── package.sh
└── settings.json
```

Sur macOS, ces fichiers (sauf ```package.sh```, on reviendra dessus après) se trouvent dans ```~/Library/Application Support/Code/User```. Pour ma part, à chaque fois que je fais une modification dans mes préférences de VScode, je copie ces fichiers et je les mets dans mon dossiers ```~/dotfiles``` qui contient toute ma configuration historisée.

Dans le sens inverse, si je veux utiliser cette configuration sur n'importe quel poste, il me suffit de les déplacer ces fichiers dans le dossier de configuration de VSCode et les paramètres seront automatiquement appliqués.

Pour les extensions, il n'y a pas de fichier de configuration. En revanche, on peut exporter la liste des extensions installées avec la commande :

```bash
$ code --list-extensions
```

Et on peut installer une extension avec la commande :

```bash
$ code --install-extension [extension]
```

Pour trouver le nom de l'extension, on peut se rendre dans la section ```EXTENSIONS``` et on trouvera le nom à utiliser à côté du titre de l'extension que l'on souhaite installer.

Par exemple avec celle de Docker :

![Installer l'extension Docker sur VSCode](docker-extension.png)

Dans ce cas :
```bash
$ code --install-extension PeterJausovec.vscode-docker
```

Le principe est similaire pour les autres ```dotfiles``` sauf pour les fichiers comme la configuration de Better Touch Tools que je dois importer manuellement par exemple.

C'est très pratique, mais on ne va pas s'amuser à lancer autant de commandes qu'il y a de logiciels, de packages Brew ou d'extensions VSCode à installer. Il faut automatiser l'installation.

## Automatiser l'installation

Pour cela, on va utiliser des scripts Bash qui vont exécuter une série de commandes à notre place. On pourrait également utiliser [Ansible](/ansible-automatiser-l-installation-d-un-serveur) pour configurer notre environnement local.

Il suffit de créer un fichier (l'extension n'a aucune importance) et d'y rajouter un [Shebang](https://en.wikipedia.org/wiki/Shebang_%28Unix%29) avec le chemin vers Bash (par exemple) :

```bash
#!/usr/bin/env bash

echo "Hello World"
```

Pour reprendre notre exemple avec la liste des extensions de VSCode, j'utilise un script dans un fichier ```package.sh```. Je rajoute une extension ```.sh``` uniquement à titre indicatif.

Pour exécuter le fichier, il faut d'abord se donner les droits :

```bash
$ chmod +x package.sh
```

Puis l'appeler :

```bash
$ ./package.sh
Hello World
```

Désormais, toutes vos extensions vont s'installent les unes après les autres.

Les possibilités sont infinies, mais je vais donner quelques exemples. Je m'en sers pour configurer Brew avec tous [mes packages et logiciels](https://github.com/guillaumebriday/dotfiles/blob/master/brew/Brewfile), également configurer [macOS directement](https://github.com/guillaumebriday/dotfiles/blob/master/macOS/.macos) et télécharger des applications depuis le [Mac App Store](https://github.com/guillaumebriday/dotfiles/blob/master/brew/Brewfile#L69).

On pourrait aller encore plus loin et avoir un seul fichier qui exécute tout d'un coup. On perdrait alors la possibilité de lancer la configuration indépendemment et je trouve ça trop contraignant.

De la même façon, pour des commandes simples comme la copie des fichiers de Git, je n'ai pas besoin de créer un script puisqu'il n'y a qu'une commande.

J'ai détaillé l'ensemble de la procédure à suivre pour installer mon environnement de développement dans le [README](https://github.com/guillaumebriday/dotfiles/blob/master/README.md) du projet.

## Partager ses dotfiles

Comme ce ne sont que de simples fichiers, ils sont très facilement versionnable et peuvent être partagés sur Github par exemple. Il existe des dizaines de milliers de dépôts avec [des configurations en exemples](https://github.com/search?o=desc&q=dotfiles&s=stars&type=Repositories&utf8=✓), vous pouvez très largement vous en inspirer et l'adapter à vos besoins.

Je ne peux que vous conseiller de partager votre configuration à votre tour. Cela pourra donner des idées aux autres développeurs et de votre côté vous pourrez télécharger très simplement votre configuration.

Attention, si ces fichiers deviennent public, il faudra au préalable enlever les informations confidentielles et les rajouter lors de l'installer.

## Conclusion

Pensez bien à tenir à jour votre configuration, vous serez bien content le jour où vous en aurez besoin.

Si vous avez des suggestions ou des questions, n’hésitez pas dans les commentaires.

Merci !

EDIT:

Désormais, plutôt que de copier manuellement les fichiers à la main à chaque modification, j'utilise [des liens symboliques](https://github.com/guillaumebriday/dotfiles/commit/9ed8348c5b99349d095c3fe315618972195ae60c). Cela me permet de modifier les fichiers directement dans mon dépôt Git et les modifications seront directement appliquées partout.
