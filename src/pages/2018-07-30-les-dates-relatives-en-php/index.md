---
layout: post
title: Les dates relatives en PHP
date: 2018-07-30 20:00
category: Dev
---
La gestion des dates n'a jamais été une tâche facile et le langage ne change pas grand-chose au problème.
Il y a des librairies comme [Carbon](https://carbon.nesbot.com/docs/) qui simplifie grandement leur manipulation, mais il faut souvent faire une gymnastique cérébrale pour savoir quel résultat est attendu.

Nativement, PHP permet de créer des dates dans un format relatif avec de vraies expressions anglaises. C'est très pratique, car on peut lire une date naturellement.

Je vais continuer l'article avec des exemples dans un projet Laravel, mais cela fonctionnerait dans n'importe quel projet PHP, à vous d'adapter au besoin.

Avant de commencer, je vais créer un helper pour simplifier la création d'une instance `Carbon` :

```diff
- use Illuminate\Support\Carbon;

- $date = new Carbon();
- $date->toDateString();

+ carbon()->toDateString();
```

Je vais créer un fichier `date.php` dans le dossier `App/Helpers` pour inclure toutes les méthodes dont je vais avoir besoin au même titre que les autres [helpers de Laravel](https://laravel.com/docs/5.6/helpers). Pour que ces méthodes soient disponibles dans l'application, il faut le fichier dans l'`autoload` de composer :

```diff
"autoload": {
  "classmap": [
    "database/seeds",
    "database/factories"
  ],
  "psr-4": {
    "App\\": "app/"
    },
+ "files": [
+   "app/Helpers/date.php"
+ ]
}
```

Et mon fichier contiendra la méthode suivante :

```php
<?php

use Illuminate\Support\Carbon;

/**
 * Return a Carbon instance.
 */
function carbon(string $parseString = '', string $tz = null): Carbon
{
    return new Carbon($parseString, $tz);
}
```

Cela m'évitera également d'inclure le namespace `Illuminate\Support\Carbon` partout.

## Utiliser les dates relatives

Dans Laravel, il existe deux helpers bien pratique pour les dates : `now` et `today`.

En lisant le nom des méthodes, on comprend explicitement leur comportement ce qui est moins le cas d'un appel comme celui là :

```php
$date = new Carbon();
$date->subWeeks(3);
$date->startOfDay();
```

Même si l'on comprend rapidement l'objectif derrière ces trois lignes, la lecture n'est pas naturelle, on ne peut pas les lire comme de l'anglais courant.

**Éviter la dette visuelle permet de se concentrer sur l'aspect métier du code !**

Avec les dates relatives, on peut transformer ce code par :

```php
carbon('3 weeks ago midnight');
```

Les cas concrets sont nombreux.

Par exemple, lorsque l'on veut lancer un job tous les lundis :
```diff
- $date = now();
- $date->addWeek();
- $date->startOfWeek();

+ carbon('next monday');
```

Si l'on veut récupérer tous les articles du mois courant :

```diff
- $date = now();
- $date->startOfMonth();

+ carbon("first day of this month midnight");
```

C'est toujours un objet Carbon, on peut donc lui appliquer d'autres méthodes à la suite si besoin.
```php
carbon("next friday")->diffForHumans();
=> "1 day from now"
```

On peut également effectuer des calculs combinant plusieurs unités possibles :
```php
carbon('monday this week +12 hours +30 minutes -20 seconds')
```

Pour éviter les ambiguïtés ou pour faire des modifications sur une date existante, on peut séparer les calculs :
```php
carbon('first day of january this year')->modify('+14 days');
```

## Quelques choses à savoir

L'ordre des éléments a également une importance. En effet, les mots clés qui modifient l'heure doivent être placés en premier si l'heure est personnalisée sinon ils surchargent le comportement.

```php
carbon('tomorrow 11:00'); # Correct ! Le lendemain à 11h

carbon('11:00 tomorrow'); # Incorrect ! Le lendemain, mais à 00h
```

Un autre comportement qui peut prêter à confusion c'est la notation `first day of`. Ce format renverra toujours le premier jour du mois courant à moins qu'il soit précisé.

Ainsi, ces trois déclarations renverront exactement la même date, à savoir le premier jour du mois :

```php
carbon('first day of this month');

carbon('first day of');

carbon('first day of this year');
```

Si vous voulez le premier jour de l'année il faudra alors préciser le mois de `January` :

```php
carbon('first day of january this year');
```

De même pour le premier jour de la semaine, il faut passer par `Monday` en précisant la semaine courante :

```php
carbon('monday this week');
```

Sans préciser la semaine, il ira au prochain jour désiré.

Et enfin, les expressions relatives comme `+14 days` seront toujours traitées après celles non relatives quelle que soit la position dans votre recherche.

## Comprendre le fonctionnement

Maintenant que l'on a vu les principaux cas particuliers, on peut regarder le fonctionnement de plus prêt.

Nous allons devoir utiliser des mots-clés particuliers pour construire notre expression. Comme on l'a vu, il y a un ordre et malgré tout une certaine logique à respecter. Le résultat sera toujours calculé par rapport à la date actuelle.

Tous les mots-clés sont disponibles sur la documentation : [https://secure.php.net/manual/en/datetime.formats.relative.php](https://secure.php.net/manual/en/datetime.formats.relative.php)

L'ensemble est assez clair quand on a bien compris ce qu'on a vu avant.

Attention tout de même aux résultats parfois complètement erronés de requêtes trop complexes, car le parser a ses limites.

## Cas d'usages pratiques

Je pense qu'il ne faut pas en abuser ou vouloir s'en servir pour la création de toutes les dates. Certaines expressions seraient plus complexes à comprendre et maintenir qu'en déclaration standard.

Malgré tout, il y a plusieurs cas d'usages que je trouve très pratique comme les exemples que j'ai utilisés plus haut.

Je pense également aux dates simples qui se lisent naturellement en anglais, mais pour les autres je préfère utiliser les méthodes standards.

Par exemple, dans les tests j'aime beaucoup cette notation :

```diff
- $faker->dateTimeBetween(now()->subWeeks(3), now()->subWeek());

+ $faker->dateTimeBetween(carbon('3 weeks ago'), carbon('1 weeks ago'));
```

Ou encore pour rajouter un délai sur la tâche d'un job :

```diff
- PrepareNewsletterSubscriptionEmail::dispatch()->delay(now()->addMonth());

+ PrepareNewsletterSubscriptionEmail::dispatch()->delay(carbon('next month'));
```

## Conclusion

Je pense qu'il est intéressant de savoir que cela existe, à vous de juger lorsqu'il sera nécessaire de s'en servir.

Merci !
