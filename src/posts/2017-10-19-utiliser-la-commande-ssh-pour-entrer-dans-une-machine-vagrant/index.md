---
title: "Utiliser la commande SSH pour entrer dans une machine Vagrant"
layout: post
category: DevOps
---
Si vous utilisez régulièrement [Vagrant](https://www.vagrantup.com), vous devez savoir que pour accéder à la machine virtuelle il faut utiliser la commande :

```bash
$ vagrant ssh
```

Sans explication particulière, Vagrant nous connecte dans la machine virtuelle avec l'utilisateur ```vagrant```.

En revanche, si un [réseau privé](https://www.vagrantup.com/docs/networking/private_network.html#static-ip) a été défini et que vous connaissez l'adresse IP de la machine virtuelle on peut essayer de s'y connecter avec l'utilisateur ```vagrant``` :

Par exemple, pour une configuration comme celle-ci :

```ruby
Vagrant.configure("2") do |config|
  config.vm.network "private_network", ip: "192.168.50.4"
end
```

La commande en SSH serait :
```bash
$ ssh vagrant@192.168.50.4
```

Mais on obtient alors une erreur. Pour une raison étrange, dans ce cas l'utilisateur ```vagrant``` n'arrive pas à se connecter.

Pour se connecter à la machine virtuelle via ```vagrant ssh```, Vagrant utilise les clés SSH et un port particulier. J'en ai déjà parlé dans l'article : [Se connecter via SSH à un serveur distant](/se-connecter-via-ssh-a-un-serveur-distant) si vous ne voyez pas de quoi je parle.

On va pouvoir utiliser cette clé privée pour surcharger la configuration SSH par défaut et ainsi s'en servir avec la commande standard.

Pour obtenir les informations sur la configuration SSH de la machine en question, on peut utiliser la commande suivante :

```bash
$ vagrant ssh-config

Host default
  HostName 127.0.0.1
  User vagrant
  Port 2200
  UserKnownHostsFile /dev/null
  StrictHostKeyChecking no
  PasswordAuthentication no
  IdentityFile /Users/guillaumebriday/Sites/demo/.vagrant/machines/default/virtualbox/private_key
  IdentitiesOnly yes
  LogLevel FATAL
```

Vagrant nous affiche alors la configuration qu'il utilise. Comme on connait l'adresse IP de la machine et le chemin vers sa clé privée, on peut se rendre dans le fichier ```~/.ssh/config``` pour ajouter une configuration.

```yml
Host 192.168.50.4
  User vagrant
  Port 22
  UserKnownHostsFile /dev/null
  StrictHostKeyChecking no
  PasswordAuthentication no
  IdentityFile /Users/guillaumebriday/Sites/demo/.vagrant/machines/default/virtualbox/private_key
  IdentitiesOnly yes
  LogLevel FATAL
```

Désormais on peut se connecter avec la commande ```ssh``` standard :

```bash
$ ssh 192.168.50.4
```

Notre configuration sera ainsi utilisée avec la bonne clé privée et la connexion sera bien établie !

Il est désormais inutile de spécifier l'utilisateur ```vagrant``` dans la commande puisqu'il est indiqué dans le fichier ```~/.ssh/config```.

Dans mon cas j'avais besoin de faire cette manipulation pour exécuter des scripts [Ansible](https://www.ansible.com) manuellement plutôt que de passer par le [Provisioner d'Ansible](https://www.vagrantup.com/docs/provisioning/ansible.html).

Merci !
