---
layout: post
title: "Capistrano : Déployer Laravel automatiquement avec Docker"
category: DevOps
---
![Capistrano : Déployer Laravel automatiquement avec Docker](capistrano.jpg)

Cet article est la seconde partie de notre mise en production d'un projet étape par étape. Cette fois-ci, nous allons automatiser le déploiement avec [Capistrano](https://capistranorb.com/) et [Docker-compose](https://github.com/docker/compose).

Vous pouvez retrouver la mise en place du serveur dans l'article précédent : [Ansible : Automatiser l'installation d'un serveur](/ansible-automatiser-l-installation-d-un-serveur).

## Introduction

Capistrano est un outil écrit en [Ruby](https://github.com/ruby/ruby) qui permet d'automatiser des scripts de déploiement. Pour faire simple, il va nous permettre de mettre simplement et automatiquement notre application en production.

On peut s'en servir pour déployer des applications en Ruby bien-sûr, mais pas seulement. Comme pour Ansible, Capistrano va exécuter des commandes sur notre serveur, on peut donc l'utiliser pour n'importe quel langage. Lors d'un déploiement, Capistrano va créer une release de notre projet à chaque fois. Cela nous permettra de revenir très simplement à un état antérieur de notre application en une seule ligne de commande et d'avoir le moins de downtime possible entre les déploiements voire aucun.

Je rappelle que notre exemple, nous allons déployer mon projet [laravel-blog](https://github.com/guillaumebriday/laravel-blog), qui est développé en PHP avec Laravel, dans [des containers avec Docker](/comprendre-et-mettre-en-place-docker).

## Comment installer Capistrano

Pour installer Capistrano, vous allez avoir besoin de deux outils :

+ [Ruby](https://www.ruby-lang.org/en/)
+ [Bundler](http://bundler.io)

Une fois installé sur votre host, il va falloir créer un ```Gemfile```, à la racine de votre projet, pour télécharger les dépendances Ruby de votre projet :

```ruby
group :development do
  gem "capistrano", "~> 3.10"
end
```

Puis on installe Capistrano sur notre host avec Bundler :

```bash
$ bundle install
```

On pourrait écrire à la main les fichiers dont Capistrano a besoin pour fonctionner, mais une commande est disponible pour ce cas. Elle va générer des fichiers de bases que nous allons modifier par la suite pour obtenir ce que l'on cherche à faire :

```bash
$ bundle exec cap install
```

Maintenant que les fichiers sont prêts, on va voir en détail comment cela fonctionne.

## Structure générale

Capistrano vient donc de générer deux dossiers avec plusieurs fichiers. On retrouve un dossier ```config/deploy``` et un autre ```lib/capistrano``` ainsi qu'un fichier ```deploy.rb``` dans le dossier ```config```.

```
├── Capfile
├── config
│   ├── deploy
│   │   ├── production.rb
│   │   └── staging.rb
│   └── deploy.rb
└── lib
    └── capistrano
            └── tasks
```

Ne faites pas attention au fichier ```Capfile```, il sert seulement à charger les dépendances dont Capistrano a besoin.

Le fichier ```deploy.rb``` va nous permettre de configurer les variables par défaut dont on va avoir besoin pour le déploiement.

Dans le dossier ```config/deploy```, on va retrouver un fichier par environnement. En effet, Capistrano va nous permettre de déployer plusieurs états de notre projet et sur plusieurs serveurs différents si on le souhaite. Dans notre cas avec Docker, on pourrait même avoir un environnement de staging sur le même serveur qu'un environnement de production très simplement avec Nginx. Chaque environnements ayant un état différent, on va pouvoir définir les informations et les commandes à exécuter pour chacun d'entre eux.

Dans le dossier ```lib/capistrano```, on va retrouver un ou plusieurs fichiers contenant un ensemble de tâches disponibles qu'on pourra appeler en fonction des environnements. Elles sont optionnelles, mais comme le font les ```roles``` d'Ansible, les ```tasks``` permettent de séparer et regrouper les actions à réaliser pour plus de lisibilité.

## Configuration par défaut

Nous allons commencer par définir quelques variables importantes pour Capistrano. Il s'agit du fichier ```config/deploy.rb```.

Il y a quatre variables générées par défaut qu'il va falloir adapter.

```ruby
set :application, 'laravel-blog'
set :repo_url, 'git@github.com:guillaumebriday/laravel-blog.git'
set :branch, :master
set :deploy_to, '/var/www/laravel-blog'
```

Le nom des variables est assez explicite, mais il y a quelques informations à savoir en plus.

Ces variables peuvent être redéfinies dans les fichiers spécifiques aux environements que vous avez défini. Par exemple, en ```staging``` c'est peut-être la branche ```develop``` que vous allez vouloir déployer et non ```master```.

Il est probable que votre dépôt ne soit pas accessible publiquement. Capistrano a donc besoin d'authentification à deux niveaux, le premier est entre votre machine et le serveur puis un second entre le serveur et le dépôt distant.

J'ai déjà fait un article sur la [connexion via SSH](/se-connecter-via-ssh-a-un-serveur-distant) si vous ne l'avez jamais fait. Comme pour Ansible, il faut que votre machine ait un accès SSH à votre serveur pour exécuter les commandes.

Pour la connexion entre le serveur et le dépôt Git, il y a deux solutions.

La plus complexe est de générer une clé SSH directement sur votre serveur et la lier à votre dépôt Git comme vous l'avez sûrement déjà fait entre votre machine et GitHub (par exemple). Je ne trouve pas ça très pratique, car il faut maintenir du coup deux clés SSH pour pas grand chose.

La plus simple est d'utiliser le SSH Agent Forwarding comme l'explique [la documentation à ce sujet](https://capistranorb.com/documentation/getting-started/authentication-and-authorisation/). Cela va permettre au serveur d'utiliser la clé SSH de votre machine pour établir la connexion, vous n'aurez donc plus rien à faire.

Ensuite, on doit définir l'emplacement de notre application sur le serveur avec la variable ```deploy_to```. Par défaut, c'est dans le dossier ```/var/www/my_app_name```, mais vous pouvez la mettre où bon vous semble tant que vous avez les droits d'accès dessus.

Je vais rajouter trois autres variables spécifiques à mon application Laravel dont je vais avoir besoin quel que soit l'environnement de déploiement. On verra l'utilisation en détail plus tard.

```ruby
# Path to the dotenv file
set :dotenv, '/var/www/.env'

# Path to the docker-compose.yml file
set :docker_compose, '/var/www/docker-compose.yml'

# Paths that should have ACLs set for a standard Laravel 5 application
set :laravel_acl_paths, [
  'bootstrap/cache',
  'storage',
  'storage/app',
  'storage/app/public',
  'storage/framework',
  'storage/framework/cache',
  'storage/framework/sessions',
  'storage/framework/views',
  'storage/logs'
]
```

On remarque que ```dotenv``` et ```docker_compose``` sont les fichiers qui ont été générés avec les templates d'Ansible dans l'article précédent.

## Environnement de production

Pour cet article, je vais parler uniquement de l'environnement de ```production```, la procédure sera la même pour un environnement de ```staging```.

Mon fichier ```config/deploy/production.rb``` va être finalement très succinct, car il va se contenter d'appeler des tâches les unes après les autres et de définir le serveur sur lequel cela doit être fait.

```ruby
# config/deploy/production.rb

server 'laravel-blog.com', user: 'ubuntu', roles: %w{app db web}

after 'deploy:updated', 'docker:compose'
after 'deploy:updated', 'docker:build'
after 'deploy:updated', 'laravel:resolve_acl_paths'
after 'deploy:updated', 'laravel:ensure_acl_paths_exist'
after 'deploy:updated', 'composer:install'
after 'deploy:updated', 'node:install'
after 'deploy:updated', 'node:build'
after 'deploy:updated', 'laravel:env'
after 'deploy:updated', 'docker:down'
after 'deploy:updated', 'laravel:migrate'
after 'deploy:updated', 'laravel:seeds'
after 'deploy:updated', 'docker:up'
```

La première ligne permet de définir le serveur sur lequel Capistrano doit se connecter et avec quel utilisateur. Il va utiliser votre configuration SSH pour cela. Les ```roles``` vont permettre de filtrer les tâches à exécuter par la suite. Je n'en ai pas l'utilité pour ce projet donc je laisse les rôles par défaut si jamais j'en ai besoin dans le futur.

## Nos tâches

Lorsque Capistrano lance la procédure de déploiement, il nous donne accès à un certain nombre de ```hooks``` qui sont tous définis dans le [Flow](https://capistranorb.com/documentation/getting-started/flow/). Ils nous renseignent, par exemple, lorsqu'une release est sur le point d'être créé. Pour chacun de ces ```hooks```, on va pouvoir greffer une action avant ou après son déclenchement.

Dans mon cas, je vais créer une [tâche](https://capistranorb.com/documentation/getting-started/tasks/) pour chacune des commandes que j'aurais lancé si j'avais eu à le faire manuellement.

On peut regrouper les tâches dans des ```namespaces``` pour mieux les organiser. J'ai donc créé les ```namespaces``` :

+ docker
+ laravel
+ composer
+ node

Pour les lancer, il faut suivre le pattern suivant :

```ruby
[before|after] [hook] [namespace:task]
```

Toutes les tâches fonctionnent sur le même principe. Je vais donc en détailler une seule, vous pourrez retrouver l'ensemble de celles-ci directement sur le dépôt GitHub.

On va prendre en exemple, la tâche qui permet de faire les migrations de notre base de données :

```ruby
# lib/capistrano/tasks/laravel.rb

namespace :laravel do
  desc 'Run migrations'
  task :migrate do
    on roles(:app) do
      within release_path do
        execute 'docker-compose' , :run, 'blog-server', 'php artisan migrate --force'
      end
    end
  end
end
```

L'idée n'est pas de faire un cours sur la syntaxe du Ruby, mais décortiquons un peu ce code.

Tout d'abord, on va créer un ```namespace``` nommé ```laravel```. Dedans je vais pouvoir créer autant de ```task``` que je veux et pourrons porter le même nom que des tâches d'autres namespaces sans poser de problème. C'est ce qui nous permet, entre autre, d'appeler nos tâches de la manière suivante```laravel:migrate```.

L'utilisation des namespaces n'est pas obligatoire, comme celle des tâches d'ailleurs. Vous pouvez très bien tout faire dans un seul block dans votre fichier de production, c'est à vous de juger en fonction des besoins et de l'organisation que vous souhaitez avoir.

Comme je le disais plus haut, on peut créer des rôles au niveau de notre configuration générale. C'est maintenant qu'on va pouvoir nous en servir et ainsi pouvoir indiquer à notre notre tâche si elle doit s'arrêter maintenant ou continuer. Je peux alors préciser un ou plusieurs rôles avec la ligne :

```ruby
on roles(:app) do
```

Dans ce cas, on lance la tâche uniquement pour les serveurs qui ont le rôle ```app``` d'associé.

Comme on ne connait pas à l'avance le chemin du dossier de la release que nous sommes en train de créer, Capistrano nous fournit une méthode ```release_path``` pour se situer dans ce dossier lors de l'exécution de nos commandes.

Et enfin, on peut lister les commandes de la tâche. Dans notre cas, on veut ```execute``` une commande. Il y a plusieurs actions qui sont disponibles, mais nous n'en avons pas besoin d'autres ici.

A la suite du ```execute```, on peut définir via des [Symbol](https://ruby-doc.org/core-2.4.2/Symbol.html) ou des chaînes de caractères standards pour les instructions qui comportent plus d'un mot. On peut séparer nos paramètres en autant de symboles que l'on souhaite ou tout mettre en une chaîne de caractères, c'est au choix.


Maintenant que tout est prêt, on peut lancer notre commande pour déployer en production :

```bash
$ cap production deploy
```

Si tout fonctionne comme prévu, vous devriez avoir quelque chose comme ça :
![Résultat du déploiement via Capistrano](capistrano-deploy.jpg)

## Conclusion

Si vous ne connaissiez pas Capistrano j'espère que maintenant vous avez compris le fonctionnement. Je ne suis pas administrateur système donc il y a sûrement plusieurs façons de faire plus optimisées ce que je présente dans l'article, mais je tenais seulement partager ce que j'ai réussi à faire.

Je ne parlerai pas [des rollbacks](https://capistranorb.com/documentation/getting-started/rollbacks/), car le principe est le même, mais avec des hooks différentes. De plus, comme le dit la documentation la problématique vient plus souvent du code que du déploiement, donc corriger le problème et déployer de nouveau est souvent bien plus pertinent.

Dans mon cas, il était également plus simple d'utiliser les ```volumes``` de Docker plutôt que les ```linked_dirs``` ou ```linked_files```, c'est pour cela que vous n'en trouverez pas dans ce projet.

J'attends vraiment des retours pour améliorer ce projet et découvrir de meilleures manières de faire avec Capistrano.

Si vous avez des suggestions ou des questions, n'hésitez pas dans les commentaires !

Merci.

