---
layout: post
title: "Ruby On Rails : Authentification avec token"
category: Dev
---
![Rails authentification avec token](rails-token-authentication.jpg)

Après les articles concernant les moyens d'installer Rails sur différents supports, nous allons aujourd'hui faire un
peu plus de concret !

## Les tokens d'authentification

Avec Rails 5, il est très facile de configurer Rails pour en faire seulement une API. Je vous laisserai le soin de lire [la documentation](http://edgeguides.rubyonrails.org/api_app.html) pour savoir quelles sont les différences avec la version standard.

Lors de la création d'une nouvelle application, il suffit d'ajouter le drapeau `--api` :

```bash
$ rails new ma_super_api --api
```

Si votre application n'est pas configurée pour être uniquement une API, ce que je vais présenter ici fonctionne malgré tout !

### Introduction

Comme le suggère le titre de l'article, nous voulons avoir la possibilité de s'authentifier avec un token de façon sécurisée.
Pour cet exemple, je vais venir greffer l'authentification avec token à une application déjà existante mais il sera très simple de l'adapter si celle-ci est nouvelle.

### Notre application

Je vais faire une application qui gère des livres ayant seulement un titre.

```bash
$ rails generate scaffold Book title:string
```

Je souhaite pouvoir accéder à l'ensemble de cette ressource uniquement si je suis authentifié avec un token d'accès. Commençons par ajouter un champ à notre model User, il nous permettra de sauvegarder notre token pour chaque membre.

### Générer les tokens

```bash
$ rails generate migration AddAuthTokenToUser auth_token:string
```

Lors de la création d'un membre, nous allons générer automatiquement un token privé pour qu'il puisse s'en servir dans l'API.

Dans le model User, je vais utiliser le callback `before_create` pour générer automatiquement un token en vérifiant qu'il soit bien unique pour chaque utilisateur.

```ruby
# app/models/user.rb
class User < ApplicationRecord
  before_create :set_auth_token
  private
  def set_auth_token
    self.auth_token = generate_auth_token
  end
```

Pour générer le token, je me sers directement de la méthode utilisée par `has_secure_token` dans [active_record](https://github.com/rails/rails/blob/master/activerecord/lib/active_record/secure_token.rb).

Si je créer un User, je remarque que le champ `auth_token` a bien été rempli automatiquement !

### Utiliser les tokens

Rails vient avec la méthode `authenticate_or_request_with_http_token` qui va vérifier pour nous le header `Authorization` et nous renvoyer le token directement dans un block si ce dernier est valide.

```ruby
# app/controllers/application_controller.rb
class ApplicationController < ActionController::API
  include ActionController::HttpAuthentication::Token::ControllerMethods
  # Ce before_action vérifira le token pour chaque requête.
  # Vous pouvez le placer dans les controllers enfants si vous voulez l'authentification
  # pour seulement certaines méthodes
  before_action :authenticate
  protected
  def authenticate
    authenticate_token || render_unauthorized
  end
  def authenticate_token
    authenticate_or_request_with_http_token do |token, options|
      @current_user = User.find_by(auth_token: token)
    end
  end
```

à partir de maintenant, chacune des requêtes aux controllers devront avoir un token valide dans le header `Authorization` et je peux le vérifier directement avec curl :

```bash
$ curl -I http://localhost:3000/books
HTTP/1.1 401 Unauthorized
```

Et avec un token généré lors de la création d'un utilisateur :

```bash
$ curl -IH "Authorization: Token token=coUra7m9yYGBR6SN66bzWefB" http://localhost:3000/books
HTTP/1.1 200 OK
```

Si je souhaite pouvoir accéder à la liste des films sans token, je peux utiliser le callback `skip_before_action` :

```ruby
# app/controllers/books_controller.rb
class BooksController < ApplicationController
  skip_before_action :authenticate, only: [:index, :show]
```

Et si l'on test avec curl :

```bash
$ curl -I http://localhost:3000/books
HTTP/1.1 200 OK
```

Tout fonctionne comme on pourrait l'attendre mais utilisons les tests pour le vérifier.

## Les tests

Je vais utiliser les tests qui ont été générés pour nos Books que nous allons devoir modifier un peu pour passer le header `Authorization`. Mais avant tout, je vais rajouter aux helpers une méthode pour encoder les token d'authentification durant mes tests :

```ruby
# test/test_helper.rb
class ActiveSupport::TestCase
  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all
```

Et enfin, je peux modifier mes tests :

```ruby
# test/controllers/books_controller_test.rb
require 'test_helper'
class BooksControllerTest < ActionDispatch::IntegrationTest
  setup do
    @book = books(:one)
    # Je créer un User pour obtenir un token
    @demo = User.create!({email: 'demo@demo.com', password: 'demodemo', password_confirmation: 'demodemo'})
  end
  test "should get index" do
    get books_url, as: :json
    assert_response :success
  end
  # Je dois ajouter le header 'Authorization'...
  test "should create book" do
    assert_difference('Book.count') do
      post books_url,
           params: { book: { title: @book.title } },
           as: :json,
           headers: {'Authorization' => token_header(@demo.auth_token)}
    end
    assert_response 201
  end
  test "should show book" do
    get book_url(@book), as: :json
    assert_response :success
  end
  test "should update book" do
    patch book_url(@book),
          params: { book: { title: @book.title } },
          as: :json,
          headers: {'Authorization' => token_header(@demo.auth_token)}
    assert_response 200
  end
  # ... Sinon ça ne marche pas
  test "should not update book" do
    patch book_url(@book),
          params: { book: { title: @book.title } },
          as: :json
    assert_response 401
  end
  test "should destroy book" do
    assert_difference('Book.count', -1) do
      delete book_url(@book),
             as: :json,
             headers: {'Authorization' => token_header(@demo.auth_token)}
    end
```

Tout se passe comme on l'attendait !

## Conclusion

Nous avons donc fini cette rapide implémentation de l'authentification par token. L'application est disponible sur [ce dépôt Github](https://github.com/guillaumebriday/Rails-token-authentication-demo) si vous souhaitez.

N'hésitez pas à faire des retours ou proposer des améliorations !

Merci :)
