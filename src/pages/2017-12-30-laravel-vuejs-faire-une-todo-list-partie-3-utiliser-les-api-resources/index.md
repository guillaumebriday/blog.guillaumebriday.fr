---
layout: post
title: "Laravel & Vue.js - Faire une Todo List, partie 3 : Utiliser les API Resources"
category: Dev
---

Depuis la version 5.5 de Laravel, nous pouvons utiliser les [API Resources](https://laravel.com/docs/5.5/eloquent-resources).

Avant cet ajout, il fallait passer par des packages comme [Fractal](https://github.com/thephpleague/fractal) qui est, je pense, le plus connu.

Les ```API Resources``` vont nous permettre de structurer les données que nous allons renvoyer au format JSON. On va, ce qu'on appelle, transformer nos données pour plusieurs raisons :

+ On peut avoir envie de filtrer les données qu'on envoie, mais aussi d'en rajouter.
+ On veut pouvoir paginer nos résultats en ajoutant des informations sur cette pagination.
+ Ajouter des relations imbriquées à nos données.
+ etc.

Par exemple, je n'ai pas besoin d'envoyer les dates de création ou de dernière modification d'un utilisateur. En revanche, je pense que c'est intéressant de renvoyer des informations calculées telles que le nombre de tâches ou le nombre de tâches en cours entre autre.

De la même manière, lorsque l'on récupère une tâche, c'est pratique d'avoir directement les informations de l'auteur dans la même requête plutôt que de devoir en faire une seconde. Ce sera à nous de juger s'il est pertinent d'imbriquer les ressources de cette façon ou pas.

Structurer nos réponses va permettre de faire cela et d'assurer une certaine cohérence dans les structures JSON que nous renverrons.

Pour la suite, je vais prendre les exemples de la documentation en l'adaptant au besoin du projet.

## Créer une Resource

Pour le moment, la seule ressource que je renvoie dans l'application correspond aux utilisateurs.

```bash
$ php artisan make:resource UserResource
```

Un fichier dans le namespace ```App\Http\Resources``` va alors être généré.

On va devoir le modifier pour l'adapter à nos besoins :

```diff
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
-        return parent::toArray($request);
+        return [
+            'id' => $this->id,
+            'name' => $this->name,
+            'email' => $this->email,
+        ];
    }
```

La méthode appelée par défaut se nomme ```toArray``` et elle nous permet d'accéder à la ```request``` en cours.

En revanche, les informations de la resource que nous voulons transformer se trouve directement dans l'instance de la classe accessible via ```$this``` comme d'habitude. On peut rajouter autant de champs que l'on souhaite dans ce tableau. Quand j'aurai commencé la gestion des tâches, je pourrais rajouter une clé ```tasks_count``` de valeur ```$this->tasks->count``` par exemple.

Maintenant dans notre controller ```AuthController```, on peut directement envoyer notre ressource en réponse :

```diff
public function me()
{
-    return response()->json($this->guard()->user());
+    return new UserResource($this->guard()->user());
}
```

Avant, toutes les données accessibles étaient renvoyées au format JSON. Désormais on a uniquement l'id, le nom et l'adresse email de la ressource le tout dans un objet appelé ```data``` :

```json
{
  "data": {
      "id": 3,
      "name": "anakin",
      "email": "darthvader@deathstar.ds"
  }
}
```

Par défaut, les informations sont placées dans un objet ```data``` pour permettre d'ajouter des informations supplémentaires dans un objet ```meta``` ou ```links```. On isole mieux nos données de cette façon.

Avec ce même ```UserResource```, on peut également transformer plusieurs utilisateurs et même des utilisateurs paginés.

```php
use App\User;
use App\Http\Resources\UserResource;

Route::get('/users', function () {
    return UserResource::collection(User::all());
});
```

On aura alors un tableau de ```User``` formaté comme précédemment :

```json
{
  "data": [
    {
      "id": 2,
      "name": "luke",
      "email": "luke@rebel.ya"
    },
    {
      "id": 3,
      "name": "anakin",
      "email": "darthvader@deathstar.ds"
    },
    # Et ainsi de suite, autant qu'il y a d'utilisateurs
  ]
}
```

Pour optimiser les temps de chargement, on peut paginer nos requêtes. Si vous n'avez pas beaucoup de données, la différence sera négligeable, mais il peut rapidement y avoir une différence importante.

Laravel mâche complètement le travail pour nous. En effet, il suffit d'utiliser la pagination comme on le fait habituellement et de l'envoyer à notre ```UserResource```. Le résultat sera un peu différent des collections standards.

```php
use App\User;
use App\Http\Resources\UserResource;

Route::get('/users', function () {
    return UserResource::collection(User::paginate(1));
});
```

On retrouve alors nos informations formatées dans ```data``` comme avant, mais les objets ```links``` et ```meta``` se sont rajoutés à la réponse. Ils vont nous permettre d'avoir des informations supplémentaires sur les url à appeler pour avoir les pages suivantes, avoir le nombre totale de pages disponibles etc. Lors de la récupération côté client, ces informations vont être capitales et les avoir formatées nous simplifie la tâche.

```json
{
  "data": [
    {
      "id": 2,
      "name": "luke",
      "email": "luke@rebel.ya"
    }
  ],
  "links": {
    "first": "http:\/\/localhost\/api\/v1\/users?page=1",
    "last": "http:\/\/localhost\/api\/v1\/users?page=2",
    "prev": null,
    "next": "http:\/\/localhost\/api\/v1\/users?page=2"
  },
  "meta": {
    "current_page": 1,
    "from": 1,
    "last_page": 2,
    "path": "http:\/\/localhost\/api\/v1\/users",
    "per_page": 1,
    "to": 1,
    "total": 2
  }
}
```

## Les relations

On peut imbriquer des ressources en relation. Comme je le disais plus haut, j'aimerais retrouver directement dans ma tâche les informations de l'utilisateur.

Il suffit d'ajouter une clé et d'appeler la ressource ou la collection de la ressource correspondante :

Par exemple, voici à quoi pourrait ressembler la ressource d'une tâche :

```php
/**
  * Transform the resource into an array.
  *
  * @param  \Illuminate\Http\Request  $request
  * @return array
  */
public function toArray($request)
{
    return [
        'id' => $this->id,
        'title' => $this->title,
        'author' => new User($this->author)
    ];
}
```

Attention, nous sommes dans le namespace ```App\Http\Resources```, le ```new User``` fait donc référence à la ressource et non au model ```User```.

Et le résultat sera :

```json
{
  "data": {
    "id": 1,
    "title": "Faire le tour du monde",
    "author": {
      "id": 3,
      "name": "anakin",
      "email": "darthvader@deathstar.ds"
    }
  }
}
```

On aurait pu envoyer une collection pour avoir un tableau d'objets imbriqués.

## Autres méthodes

Il y a beaucoup d'autres méthodes disponibles pour s'amuser avec les ```Resources```. De mon expérience, je n'ai eu besoin que de celles-ci. Je vous laisse donc regarder la documentation si vous avez besoin de plus d'informations, elle est vraiment très complète.

## Conclusion

Les modifications sont déjà sur [le dépôt GitHub](https://github.com/guillaumebriday/todolist-backend-laravel).

On va désormais pouvoir mettre en place la gestion des tâches !
