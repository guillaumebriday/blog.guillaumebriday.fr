---
layout: post
title: "Se connecter via SSH à un serveur distant"
category: DevOps
---

Nous allons voir comment se connecter à un NAS Synology via SSH sans avoir à taper notre mot de passe à chaque fois et de façon sécurisée. Cela fonctionne pour tous les serveurs ou machines fonctionnant sous un système Linux qui ont un [serveur SSH de lancé](https://help.ubuntu.com/lts/serverguide/openssh-server.html).

Sur les Synology, pour activer le SSH vous pouvez vous rendre sur DSM, puis sélectionner le ```Control Panel > Terminal & SNMP```. Cliquez sur ```Enable SSH service``` et choisissez un port (```22``` étant celui par défaut).

Si ce n'est pas un NAS Synology, mais un serveur standard, vous allez devoir modifier la configuration par défaut pour accepter les clés publiques. Ainsi, dans le fichier ```/etc/ssh/sshd_config```, trouvez les lignes :

```ini
#RSAAuthentication yes
#PubkeyAuthentication yes
#AuthorizedKeysFile .ssh/authorized_keys
```

et remplacez les par :

```ini
#RSAAuthentication yes
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys
```

Pour la suite de l'article, on va considérer que le NAS possède l'adresse locale ```192.168.2.23``` et que le nom de mon compte est ```guillaume```.

À partir de maintenant, vous pouvez vous connecter en SSH avec la commande suivante, depuis une machine de votre réseau local :

```bash
$ ssh guillaume@192.168.2.23 # -p 22
guillaume@192.168.2.23's password:
```

Si vous ne mettez pas le ```guillaume@``` devant l'adresse, il essayera de se connecter avec le nom de session de votre machine locale, il faut donc le spécifier. Si vous avez changé le port par défaut, utilisez le flag ```-p 1400``` pour le port ```1400``` par exemple.

À ce moment-là, il vous demande votre mot de passe de compte (attention le mot de passe n'apparaît pas quand vous l'écrivez, c'est normal) et voilà vous êtes connecté en SSH. Vous pouvez alors vous servir des commandes standards de Linux, vous déplacer dans votre Volume ou utiliser Docker via le terminal directement.

En revanche, faire cette manipulation régulièrement peut prendre beaucoup de temps à terme et ce n'est pas pratique de devoir taper son mot de passe à chaque fois.

## Créer une clé SSH

Pour combler ce problème, nous allons utiliser les clés SSH. Elles sont stockées sur votre poste dans le dossier ```~/.ssh```. Vous pouvez (et devez, par sécurité) en générer une par serveur grâce à cette commande :

```bash
$ ssh-keygen -t rsa -f ~/.ssh/id_rsa,mon_nas -C "mon_nas, mbp_2016"
```

J'ai choisi de nommer ma clé ```id_rsa,mon_nas``` mais libre à vous de prendre un autre nom. Le commentaire est optionnel, mais je trouve cela très pratique pour savoir à quel poste correspond une clé une fois sur le serveur. Par exemple, je sais que cette clé est entre mon NAS et mon MacBook Pro 2016.

On vous demande si vous voulez ajouter une passphrase, c'est très important d'en ajouter une. La passphrase sera demandée lors de l'utilisation d'une clé, ce qui évite à la clé d'être utilisée si elle venait à être volée.

On peut maintenant vérifier que la clé a bien été générée :

```bash
$ ls ~/.ssh
id_rsa,mon_nas
id_rsa,mon_nas.pub
```

Le fichier terminant par ```.pub``` est la clé publique correspondante à votre clé privée (qui n'a pas d'extension).

## Ajouter une clé SSH sur notre serveur

On va pouvoir ajouter notre clé publique sur notre serveur. On se connecte une dernière fois avec la méthode du début et on se connecte en tant que ```root``` :

```bash
$ ssh guillaume@192.168.2.23
$ sudo -i
Password:
```

Le mot de passe de ```root``` est le même que celui de ```guillaume```.

Il faut créer un fichier appelé ```authorized_keys``` qui va accueillir l'ensemble de nos clés SSH publiques :

```bash
$ touch ~/.ssh/authorized_keys
$ chmod 644 authorized_keys # Changement des droits pour root
```

Maintenant, on va copier le contenu de notre clé publique, qu'on a généré plus tôt, de notre poste dans le fichier ```authorized_keys``` sur notre serveur. Pour mettre plusieurs clés SSH, il vous suffit de les mettre à la suite dans ce fichier.

Je rappelle que nous sommes dans le ```home``` de l'utilisateur ```root```, donc les clés SSH permettrons de se connecter en tant que ```root``` sur le serveur, pas ```guillaume```.

Et c'est tout. On peut maintenant se connecter sans mot de passe et de façon sécurisée à notre serveur :

```bash
$ ssh root@192.168.2.23
```

Il devrait vous demander, à la première utilisation de la clé, votre passphrase si vous en avez mis une.

## Simplifier la gestion des clés

Avec les clés SSH on gagne grandement en simplicité, mais on peut faire mieux. On va créer un fichier de configuration SSH en local, nommé ```config``` dans le dossier ```~/.ssh``` :

```ini
# ~/.ssh/config
Host *
  AddKeysToAgent yes
  UseKeychain yes

Host eve
  Hostname 192.168.2.23
  User root
  IdentityFile ~/.ssh/id_rsa,mon_nas
```

La première partie du fichier est une configuration pour macOS Sierra ou supérieur. Cela permet d'ajouter, quel que soit l'```Host``` défini, la clé au [ssh-agent](https://fr.wikipedia.org/wiki/Ssh-agent). Ainsi, on aura à rentrer qu'une seule fois notre passphrase pour une session de temps donnée. Sans cela, il faudrait le faire à chaque fois que l'on veut se connecter en SSH. Si une session se termine, il faudra entrer notre passphrase de nouveau.

Pour éviter ce comportement, on peut utiliser le [trousseau d'accès](https://en.wikipedia.org/wiki/Keychain_(software)) de macOS pour qu'il l'enregistre automatiquement pour une durée indéterminée en utilisant ```UseKeychain yes```.

Vous trouverez plus de détails dans le manuel de ```ssh_config``` :

```bash
$ man ssh_config
```

Ensuite, vient la configuration par service.

Il faut, tout d'abord, donner un nom à notre configuration, cela permettra de l'utiliser directement plutôt que de donner l'adresse du serveur, ce qui est plus simple et agréable. J'ai décidé de l'appeler ```eve``` libre à vous de changer.

Il faut définir le ```Hostname```, c'est-à-dire l'adresse du serveur. Elle peut être distante ou sur le réseau local.

Il faut définir le ```User``` qui va être utilisé pour la connexion, ```root``` dans notre cas.

Et enfin, on indique le chemin vers notre clé privée avec le ```IdentityFile```. C'est pour faire le lien avec la clé publique qu'on a déposé sur le serveur précédemment.

Normalement c'est tout bon, on peut le vérifier de cette manière :

```bash
$ ssh eve
root@EVE:~#
```

Et voilà, bien plus pratique, non ?

## Bonus

Cette configuration a pour avantage également d'être utilisable par tous les services SSH. Si vous souhaitez facilement transférer ou récupérer des fichiers depuis votre terminal vous pouvez le faire avec ```scp``` par exemple :

```bash
$ scp -r . eve:/volume1/docker/blog
```

Dans ce cas, je transfère tout le contenu du dossier courant de mon poste vers ```eve``` dans le dossier ```/volume1/docker/blog```.

Ou plus simplement :

```bash
$ scp index.html eve:/volume1/docker/blog/index.html # SourceFile host:directory/TargetFile
```

Vous pouvez également récupérer des fichiers, depuis le serveur, en inversant les paramètres :

```bash
$ scp eve:/volume1/docker/blog/index.html index.html
index.html             100%   17KB  11.1MB/s   00:00
```

Merci !
