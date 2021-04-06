---
title: "Ansible : Automatiser l'installation d'un serveur"
layout: post
category: DevOps
---
![Ansible](ansible.jpg)

Cet article est la première partie de la mise en production d'un projet étape par étape avec plusieurs technologies. Dans cet article, je vais déployer mon projet [laravel-blog](https://github.com/guillaumebriday/laravel-blog). Il est développé avec PHP et [Laravel](https://laravel.com), mais le principe restera relativement similaire avec d'autres langages ou frameworks, du moins pour cette partie.

## Présentation
Tout l'environnement de développement du projet est fait avec [Docker](https://docker.com) et nous allons nous servir de la même technologie pour la mise en staging puis production. En effet, cela nous permettra de simplifier grandement la mise en place des technologies côté serveur puisque tout passera par des containers.

Si ces notions sont encore floues pour vous, j'ai fait [un article à propos de Docker](/comprendre-et-mettre-en-place-docker) pour mieux comprendre de quoi on parle.

Pour ce qui est de la mise en place côté serveur, nous procéderons en deux étapes :

1. Mettre en place les outils sur le serveur avec [Ansible](https://www.ansible.com/).
2. Déploiement automatisé du projet avec [Capistrano](https://capistranorb.com/) et [Docker-compose](https://github.com/docker/compose).

Ces outils ont chacun un rôle bien défini, mais ils vont nous permettre d'automatiser et de simplifier les étapes de mise en production et d'installation de serveurs. On parle alors d'industrialisation.

## Introduction à Ansible

Ansible est un outil disponible en ligne de commande. Son principal objectif est d'automatiser la configuration de système et le déploiement de logiciels. Vous trouverez plus d'informations sur [la documentation officielle](https://docs.ansible.com/ansible/latest/index.html), mais je vais essayer de la résumer rapidement.

Ansible s'installe sur votre machine et non sur le serveur. Une fois Ansible installé sur votre machine et configuré correctement, il se connectera en SSH au serveur et il exécutera les commandes que vous lui avez spécifié au format ```.yml``` dans un fichier appelé le ```Playbook```.

L'avantage est double, il n'y a pas à exécuter de commande à la main sur le serveur même s'il est vierge. Vous pouvez versionner le ```Playbook```, car c'est un fichier standard et pas une suite de commandes.

Nous pouvons ajouter à cela un fichier ```hosts``` qui listera nos serveurs disponible ainsi que des variables propres au serveur. Ce fichier ne doit pas être partagé puisqu'il peut contenir des données privées !

Et enfin, pour simplifier la lisibilité et la personnalisation de la configuration, on pourra séparer nos commandes dans des rôles.

Nous allons donc voir en détail, les ```hosts```, les ```playbooks```, les ```roles``` et les ```templates```.

## Les hosts

Les fichiers hosts vont nous permettre de définir les serveurs qui vont être utilisés par Ansible. Ils sont définis de la manière suivante et n'ont pas d'extension particulière :

```ini
[webservers]
example.com
192.168.50.4
foo.example.com

[databases]
foobar.example.com
barfoo.example.com

# Ubuntu Xenial ou supérieur
[webservers:vars]
ansible_python_interpreter=/usr/bin/python3
```

Attention, si vous utilisez Ubuntu Xenial ou supérieur, vous devez ajouter des variables au groupe ```webservers``` par exemple. Dans notre cas la variable ```ansible_python_interpreter``` de valeur ```/usr/bin/python3``` permet de dire à Ansible d'utiliser la version 3 de python qui est la seule disponible par défaut dans ces versions d'Ubuntu.

Le nom du fichier n'a pas d'importance, il sera simplement utilisé au moment de provisionner notre serveur dans la commande que l'on exécutera plus tard. Par convention, on l'appelle souvent : ```hosts```.

On peut définir des ```groupes``` qui peuvent contenir les adresses des serveurs auxquels ils sont attachés. Par exemple, ici j'ai un serveur dont l'adresse est ```example.com``` et qui est rattaché au groupe ```webservers```. On pourra alors utiliser nos groupes dans les ```playbooks``` pour exécuter la commande sur plusieurs serveurs, c'est super pratique. Il peut y avoir un ou plusieurs serveurs par groupe.

Il existe un groupe par défaut : ```all```. Ce groupe permet de définir tous les serveurs dans le ```playbook```.

## Les playbooks

C'est le composent principal d'Ansible. C'est dans ce fichier qu'on va définir la configuration et les commandes à exécuter sur notre serveur. On pourra y rajouter des informations et des conditions particulières. Ansible permet de rendre abstrait un certain nombre de paramètres et permet ainsi d'avoir une grande lisibilité dans le fichier.

La documentation est disponible à [cette adresse](https://docs.ansible.com/ansible/latest/playbooks.html).

Pour créer un playbook, il suffit de créer un fichier ```playbook.yml```. Pour l'exemple, je vais essayer d'installer [Vim](http://www.vim.org/).

```yaml
---
- name: Provisionning webservers group
  hosts: webservers
  become: yes
  tasks:
  - name: Installing Vim
    apt:
      name: vim
      state: latest
      update_cache: yes
```

On retrouve notre ```hosts: webservers```, il utilise alors la liste des serveurs qu'on a défini dans le groupe ```webservers``` du fichier ```hosts```.

Les commandes ```- name: ``` permettent d'avoir un retour visuelle dans le terminal lorsqu'on lance le provisionnement.

On peut définir alors plusieurs ```tasks``` à exécuter. L'idée n'est pas de réécrire la documentation officielle, mais de comprendre le fonctionnement. Dans notre exemple, on installe ```Vim``` comme si on faisait :

```bash
$ apt install vim
```

On peut alors lancer le provisionnement avec la commande :

```bash
$ ansible-playbook -i hosts playbook.yml
```

Le flag ```-i``` permet de spécifier le chemin vers notre ```hosts```, il faudra donc ici remplacer ```hosts``` par le nom de votre fichier.

Ansible devrait retourner quelque chose qui ressemble à ça :

```bash
PLAY [Provisionning web group] *********************************************************************************************************************************************************************************

TASK [Gathering Facts] *****************************************************************************************************************************************************************************************
ok: [example.com]

TASK [Installing Vim] ******************************************************************************************************************************************************************************************
ok: [example.com]

PLAY RECAP *****************************************************************************************************************************************************************************************************
example.com               : ok=2    changed=0    unreachable=0    failed=0
```

Ansible nous fait un récapitulatif des changements qu'il a effectué. On voit notamment ici que deux tâches ont été correctement installées.

### Les handlers

Les handlers sont des tâches qui vont s'exécuter lors de changement. Ils doivent être indiqués dans une section nommée ```handlers``` et sont appelés via la commande ```notify```.

Prenons un autre exemple avec ```nginx``` cette fois. Une fois que la tâche est terminée, on appelle le handler ```restart nginx``` :

```yaml
---
- name: Provisionning webservers group
  hosts: webservers
  become: yes
  tasks:
    - name: ensure nginx is at the latest version
      apt:
        name: nginx
        state: latest
        update_cache: yes
      notify:
        - restart nginx

  handlers:
    - name: restart nginx
      service:
        name: nginx
        state: restarted
```

Dans notre cas, la commande exécutée par Ansible est alors la suivante :

```bash
$ service nginx restart
```

## Les rôles

On se rend alors rapidement compte que le fichier peut devenir énorme et assez illisible. On peut séparer les commandes dans des sous-dossiers et les appeler via le ```playbook``` normal.

On peut regrouper des tâches ou des services dans des ```roles```, ce qui est très pratique. Si on réutilise un playbook pour un autre serveur par exemple on aura seulement à dé-commenter la ligne appelant le ```role``` pour ne pas exécuter toute une partie de l'installation.

Pour appeler des ```roles```, il faut le définir de cette manière dans le ```playbook.yml``` :
```yml
---
- name: Provisionning webservers group
  hosts: webservers
  become: yes
  roles:
    - tools
    - docker
    - app
```

La structure de votre projet devrait donc ressembler à cela  :
```
├── hosts
├── playbook.yml
└── roles/
    ├── docker/
    │   ├── tasks/main.yml
    │   └── handlers/main.yml
    ├── tools
    │   └── tasks/main.yml
    └── app
        ├── tasks/main.yml
        ├── templates/.env.j2
        └── templates/docker-compose.j2
```

Le nom des dossiers a une importance. Si vous avez un fichier ```main.yml``` dans le dossier ```handlers``` d'un ```role``` vous n'aurez pas à repréciser que c'est un ```handler```.

J'ai rajouté un role ```tools``` pour avoir des outils pratiques lors de la maintenance de notre serveur. Je pense à [Vim](https://www.vim.org/), [Git](https://git-scm.com/), htop, etc.

Nous verrons en détail le role ```app``` dans les templates.

## Installation de Docker et des outils

On va passer à la partie qui nous concerne le plus, l'installation de Docker qui nous servira lors du déploiement avec Capistrano.

Je me suis servi de la [documentation officielle](https://docs.docker.com/engine/installation/linux/docker-ce/ubuntu/#install-using-the-repository) pour l'installation.

Pour les outils tout d'abord, c'est très simple. J'ai fait une liste des outils qui me seront utiles pour gérer le serveur et d'autres qui sont indispensables à l'installation de Docker. Plutôt que de faire une tâche par service, je vais utiliser [les boucles d'Ansible](https://docs.ansible.com/ansible/latest/playbooks_loops.html).

{% raw %}
```yaml
# roles/tools/tasks/main.yml
---
- name: Install some tools
  apt:
    pkg: "{{ item }}"
    state: present
    update_cache: yes
  with_items:
    - htop
    - vim
    - git
    - curl
    - python3-pip
```
{% endraw %}

Le paramètre ```update_cache: yes``` permet de mettre de mettre à jour le cache des dépôts avant d'executer la commande et ainsi avoir une liste des paquets disponibles à jour.

Pour les outils je n'ai pas besoin d'handlers donc je ne crée pas d'autre dossier.

Pour Docker, l'idée est la même, je fais une tâche par élément à installer :

{% raw %}
```yaml
# roles/docker/tasks/main.yml
---
- name: Install packages to allow apt to use a repository over HTTPS
  apt:
    pkg: "{{ item }}"
    state: present
  with_items:
    - apt-transport-https
    - ca-certificates
    - software-properties-common

- name: Add GPG key for Docker
  shell: curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

- name: Add the Docker repository to the apt sources list
  apt_repository:
    repo: "deb [arch=amd64] https://download.docker.com/linux/ubuntu xenial stable"

- name: Install Docker
  apt:
    name: docker-ce
    state: present
    update_cache: yes
  notify:
    - start docker

- name: Install Docker-compose
  apt:
    name: docker-compose
    state: present

- name: Add ubuntu to the docker group
  user:
    name: ubuntu
    group: docker

- name: Add the Python client for Docker
  pip:
    name: docker-py

- name: Pull docker images
  docker_image:
    name: "{{ item }}"
  with_items:
    - nginx:latest
    - php:7.1-fpm
    - mysql:latest
    - node:latest
```
{% endraw %}

Comme on peut le voir en fin de fichier, j'en profite pour télécharger quelques images qui me seront nécessaires plus tard, ça m'évitera d'attendre lors du déploiement.

Et pour les handlers :

```yaml
# roles/docker/handlers/main.yml
---
- name: start docker
  service:
    name: docker
    state: started
    enabled: true
```

## Les templates

Dans de nombreux cas, on veut pouvoir cacher des informations confidentielles comme les mots de passe d'une base de données, les clés d'API de services extérieur, etc.

Généralement ces informations sont stockées dans des fichiers de configuration ou des variables d'environnements.

Pour ne pas divulguer ces informations mais malgré tout versionner notre code, on va pouvoir utiliser les templates.

Par défaut, Ansible utilise [jinja2](https://docs.ansible.com/ansible/latest/playbooks_templating.html) pour générer ces templates.

On va ainsi pouvoir créer des templates avec l'extension ```.j2``` et Ansible les convertira au moment du provisionnement. Dans notre cas, on va définir le fichier ```.env``` et ```docker-compose.yml``` et définir les valeurs à cacher dans notre fichier ```host``` qui n'est pas accessible publiquement.

```ini
[webservers]
example.com
192.168.50.4
foo.example.com

[databases]
foobar.example.com
barfoo.example.com

# Ubuntu Xenial ou supérieur
[webservers:vars]
ansible_python_interpreter=/usr/bin/python3

# Variables pour les templates
db_password=my-secret-password
...
```

Pour gérer nos templates et nos tâches propre à notre application, je vais créer un ```role``` nommé ```app```. J'y ajoute le dossier ```templates``` pour contenir tous les fichiers en ```.j2``` :

Mon fichier de ```tasks``` pour le ```role``` ```app``` est donc le suivant :

{% raw %}
```yaml
# roles/app/tasks/main.yml
---
- name: Ensures App dirs exist
  file:
    path: "{{ item }}"
    state: directory
    owner: ubuntu
    group: docker
  with_items:
    - /var/www
    - /var/www/logs
    - /var/www/vendor
    - /var/www/uploads
    - /var/www/node_modules
    - /var/lib/mysql

- name: Adding .env file
  template:
    src: ../templates/.env.j2
    dest: /var/www/.env
    owner: ubuntu
    group: docker

- name: Adding docker-compose.yml file
  template:
    src: ../templates/docker-compose.yml.j2
    dest: /var/www/docker-compose.yml
    owner: ubuntu
    group: docker
```
{% endraw %}

Pour interpréter une variable dans un template il suffit de l'utiliser de la façon suivante :

{% raw %}
```yaml
# roles/app/templates/.env.j2
...
DB_PASSWORD={{ db_password }}
...
```
{% endraw %}

Et ainsi, une fois sur le serveur, le fichier ressemblera à cela :

```yaml
# /var/www/.env
...
DB_PASSWORD=my-secret-password
...
```

## Provisionning

On peut alors exécuter notre ```playbook.yml``` avec la même commande vu plus haut :

```bash
$ ansible-playbook -i hosts playbook.yml
```

![Résultat du playbook via Ansible](ansible-play-recap.jpg)

On peut alors se connecter au serveur pour vérifier que tout fonctionne correctement :

```bash
$ ssh example.com
$ service docker status # Pour vérifier que Docker est bien actif
$ docker-compose -v # Voir si docker-compose est installé
$ htop # Version améliorée de top
$ vim -v # Voir si vim est installé
```

Tout semble correct, on peut maintenant passer à la partie déploiement automatique avec Capistrano !

## Comment tester ? (optionnel)

Si vous n'avez pas de serveur à disposition, vous pouvez vous entrainer dans une machine virtuelle. Pour cela, on va utiliser [Vagrant](https://www.vagrantup.com). Ce n'est pas un article sur Vagrant donc je ne vais pas expliquer son fonctionnement ici, mais voici la configuration à utiliser.

Dans un nouveau dossier, il faut créer un fichier ```Vagrantfile``` :

```ruby
# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure('2') do |config|
  config.vm.box = "ubuntu/xenial64"
  config.vm.network 'private_network', ip: '192.168.50.4'

    config.vm.provider "virtualbox" do |v|
    v.memory = 1024
    v.cpus = 2
    end
end
```

Et lancez la commande :

```bash
$ vagrant up
```

J'ai volontairement omis la partie sur le [Provisionning d'Ansible](https://www.vagrantup.com/docs/provisioning/ansible.html) car l'idée est de simulé un serveur distant avec un accès SSH. Et c'est une fois le serveur disponible qu'on lancera les commandes avec Ansible pour le provisionner.

Vagrant me sert uniquement à lancer la machine virtuelle de simulation. Pour plus de "réalisme" vous pouvez changer le paramètre ```Host 192.168.50.4``` par ```Host example.com``` dans votre configuration SSH et ajoutez la ligne suivante à la fin de votre fichier ```/etc/hosts``` :

```
192.168.50.4 example.com
```

Votre fichier ```hosts``` qui sera utilisé par Ansible pourra alors également contenir ce nom de domaine plutôt que l'adresse IP de la machine virtuelle.

Bien entendu, vous pouvez changer ```example.com``` par la vraie adresse que possède votre serveur.

Attention tout de même, Docker doit être exécuté avec ```root``` donc vous devez ajouter ```sudo``` devant chaque commande ou bien lancer ```sudo su``` en début de session.

Pour que tout fonctionne, vous devez configurer les accès SSH à votre machine virtuelle comme c'est indiqué sur mon [précédent article à ce sujet](/utiliser-la-commande-ssh-pour-entrer-dans-une-machine-vagrant).

## Conclusion

Bien entendu, on pourrait aller beaucoup plus loin avec par exemple l'ajout d'outils supplémentaires, l'utilisation des [templates](https://docs.ansible.com/ansible/latest/template_module.html) ou le déploiement multi-serveur.

Je ferai bien entendu évoluer le projet au fur et à mesure, mais avec ça, on peut déjà commencer notre mise en production.

L'ensemble du projet est disponible sur mon dépôt GitHub : [traefik-docker-ansible](https://github.com/guillaumebriday/traefik-docker-ansible/tree/99c77eb90fe037955e67a0731ef4f3cf6fe3c447).

Attention, le contenu a pu évoluer entre la rédaction de l'article et le moment où vous le lisez.

Dans le prochain article, nous verrons donc comment [automatiser le déploiement avec Capistrano](/capistrano-deployer-laravel-automatiquement-avec-docker) sur notre serveur qui est maintenant prêt.

Si vous avez des suggestions ou des questions, n'hésitez pas dans les commentaires !

Merci.

**EDIT** du {{ '04/04/2018' | localize: ":excerpt" }} :

J'ai beaucoup changé la configuration depuis la rédaction de cet article.

[5380485](https://github.com/guillaumebriday/traefik-docker-ansible/tree/538048531fd019ab57fc53c903277e6929617a47) est le dernier commit encore pertinent. L'article sur la nouvelle architecture est en cours d'écriture.
