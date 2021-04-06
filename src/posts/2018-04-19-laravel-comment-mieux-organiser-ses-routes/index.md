---
layout: post
title: "Laravel : Comment mieux organiser ses routes"
category: Dev
---

Par défaut, sur Laravel il y a quatre fichiers de routes pour gérer les points d'entrées de notre application. On peut alors gérer les routes dédiées aux API, aux Websockets, à la console et bien-sûr aux navigateurs Web. Si l'application est de taille petite voire de taille moyenne, on peut encore s'y retrouver facilement.

En revanche, les choses se compliquent lorsque l'application prend de l'ampleur. Les fichiers commencent à être très long, on s'y perd facilement dans les groupes disponibles, il y a parfois des doublons et il y a souvent beaucoup de conflits à gérer. Heureusement pour nous, sur Laravel rien n'est figé et nous allons voir comment mieux s'organiser.

## Comment les fichiers de routes sont déclarés ?

Il faut savoir que les fichiers disponibles, lors de la création d'un projet, ne sont qu'un exemple de configuration que Laravel propose et nous pouvons la changer. Dans notre cas, je parle surtout des routes concernant les API et le Web.

Les fichiers sont appelés dans un ```ServiceProvider``` classique qui se trouve dans le fichier ```app/Providers/RouteServiceProvider.php ```.

La méthode ```map``` permet d'appeler des méthodes ```protected``` qui vont se contenter de déclarer des routes comme nous le ferions dans les fichiers directement. En effet, on peut voir que le fichier ```routes/web.php``` est seulement un ```group``` de route qui utilise le namespace par défaut et le middleware ```web```.

```php
/**
  * Define the "web" routes for the application.
  *
  * These routes all receive session state, CSRF protection, etc.
  *
  * @return void
  */
protected function mapWebRoutes()
{
    Route::middleware('web')
          ->namespace($this->namespace)
          ->group(base_path('routes/web.php'));
}
```

## Déclarer d'autres fichiers de routes

Rien ne vous empêche de définir un nouveau groupe de routes pour gérer un back-office (par exemple), ce qui est très souvent le cas sur beaucoup d'applications :

```php

/**
  * Define the routes for the application.
  *
  * @return void
  */
public function map()
{
    $this->mapApiRoutes();

    $this->mapWebRoutes();

    $this->mapAdminRoutes();
}

/**
  * Define the "admin" routes for the application.
  *
  * These routes are typically stateless.
  *
  * @return void
  */
protected function mapAdminRoutes()
{
    Route::prefix('admin')
          ->middleware(['web', 'auth', 'role:admin'])
          ->namespace($this->namespace . '\Admin')
          ->as('admin.')
          ->group(base_path('routes/admin.php'));
}
```

Dans mon cas je définis donc un groupe de routes, pour le web, accessible uniquement pour les utilisateurs authentifiés qui ont le rôle ```admin```. De plus, je change le namespace des controllers pour mieux les isoler du reste de l'application et enfin j'ajoute un préfixe pour distinguer ces routes.

Ainsi, toutes les routes dans le fichier ```admin.php```, auront déjà toutes ces propriétés sans avoir à redéfinir un groupe pour cela.

Si vous développez une API versionnée, on peut également imaginer avoir un fichier de routes par version comme ceci :

```bash
└── routes
    └── api
        ├── v1.php
        └── v2.php
```

## Une architecture mieux découpée et moins de conflits

Si l'on compare notre architecture de routes avant et maintenant, on voit vite qu'on se soulage d'une dette visuelle importante et on évite beaucoup de conflits, car les modifications seront dans plusieurs fichiers distincts.

Avant, on avait quelque chose qui ressemble à cela :

```php
<?php
# routes/web.php

Route::prefix('admin')->middleware(['auth', 'role:admin'])->namespace('Admin')->as('admin.')->group(function () {
    Route::resource('photos', 'PhotoController');
    Route::resource('posts', 'PostsController');
    // Beaucoup de routes ...
});

Route::view('/', 'home');
// Beaucoup de routes ...

Route::middleware('auth')->group(function () {
    Route::resource('photos', 'PhotoController');
    Route::resource('posts', 'PostsController');

    // Beaucoup de routes ...
});
```

Et maintenant, nos fichiers ressemblent à ça :

```php
<?php
# routes/web.php

Route::view('/', 'home');

// Beaucoup de routes ...
```

```php
<?php
# routes/admin.php

Route::resource('photos', 'PhotoController');
Route::resource('posts', 'PostsController');

// Beaucoup de routes ...
```

```php
<?php
# routes/auth.php

Route::resource('photos', 'PhotoController');
Route::resource('posts', 'PostsController');

// Beaucoup de routes ...
```

## Conclusion

Je pense qu'il faut plutôt éviter de trop séparer les routes sur les projets de petites tailles pour rester le plus simple possible et migrer vers cette solution lorsque le besoin s'en fait ressentir.

Vous pouvez trouver un cas d'usage concret sur [guillaumebriday/laravel-blog](https://github.com/guillaumebriday/laravel-blog).

Merci !
