---
layout: post
title:  "Comment j'utilise Git ? Mes astuces et bonnes pratiques !"
category: Dev
---
Depuis quelques temps, j'ai en tête de faire un article pour expliquer comment je fonctionne avec git, quelles sont les commandes que j'utilise et pourquoi.

Quand j'ai commencé à utiliser git, j'ai souvent trouvé des tutoriels pour le fonctionnement interne, quelles étaient les différentes commandes mais rarement on me montrait quelles étaient les "bonnes pratiques", dans quelles situations je devais utiliser quelles commandes. C'est pourtant plus à ce genre de question que j'aurais voulu avoir une réponse et je vais essayer ici d'y répondre maintenant que j'utilise git au quotidien.

Alors aujourd'hui je vais essayer de répondre aux cas les plus communs que j'ai pu rencontrer jusqu'ici en espérant pouvoir donner une ou deux astuces.

La configuration de votre git est importante, elle va permettre, entre autre, de définir votre identité dans vos commits, de choisir l'éditeur utilisé par git et j'en passe.

Le plus important, cela va permettre de vous identifier en tant qu'auteur du commit :
```bash
$ git config --global user.name "John Doe"
$ git config --global user.email johndoe@example.com
```

Également, vous pouvez changer l'éditeur qu'utilisera git, cela est uniquement une question de goût et dépend des préférences de chacun :
```bash
$ git config --global core.editor nano
```

Vous pouvez vérifier la configuration avec :
```bash
$ git config --list # Pour voir toute la config
$ git config user.name # Pour voir un paramètre en particulier
```

## Ajouter une clé ssh
Cette étape est optionnelle mais peut être utile si vous travaillez avec des dépôts à distance, notamment sur [Github](https://github.com) ou [Gitlab](https://gitlab.com) par exemple.

Pour cela, [@Pkoin](https://twitter.com/PKoin) a fait un article détaillant cela ici : [https://pkoin.github.io/arretez-d-utiliser-la-meme-cle-ssh-privee-partout.html](https://pkoin.github.io/arretez-d-utiliser-la-meme-cle-ssh-privee-partout.html).

Selon les recommandations de Github et Gitlab, il est préférable d'utiliser le port https, et cela peut être utilisé avec ssh : [https://help.github.com/en/articles/which-remote-url-should-i-use](https://help.github.com/en/articles/which-remote-url-should-i-use).

Pour faire simple, il suffira de spécifier le `Port 443` dans le fichier `~/.ssh.config`.

Une fois votre fichier config modifié et vos clés générées, rendez-vous dans les paramètres de vos comptes Github ou Gitlab et ajoutez votre `clé publique` (celle qui termine par `.pub` uniquement) dans le formulaire correspondant. Ainsi, quand vous vous connecterez à ces services, aucun identifiant vous sera demandé.

## Initialiser un dépôt git
Pour cela, il y a plusieurs cas d'utilisation possible.

### En local
```bash
$ git init [nom_repertoire]
```

Cette commande va permettre d'initialiser un dépôt dans le répertoire courant sauf si [nom_repertoire] est spécifié et dans quel cas un nouveau répertoire sera créé et initialisé avec git directement.

Si un dépôt distant existe vous pouvez l'ajouter :
```bash
$ git remote add origin git@host:user/project_name.git
```

et vérifier la liste des remotes :
```bash
$ git remote -v
origin  git@host:user/project_name.git (fetch)
origin  git@host:user/project_name.git (push)
```

Bien entendu, le nom `origin` est un nom très souvent utilisé mais pas obligatoire, vous pouvez prendre le nom que vous souhaitez, cela n'a aucune influence. Plusieurs remote peuvent être ajouté au besoin.

A savoir, la récupération du dépôt ne se fait pas automatiquement lors de l'ajout d'un remote, vous devrez le faire à la main, nous verrons tout cela plus tard.

### Avec un dépôt distant existant
```bash
$ git clone git@host:user/project_name.git [nom_repertoire]
```

`git clone` permet d'initialiser un projet local avec un projet distant. Il va initialiser le répertoire et télécharger tout le dépôt distant dans ce dossier. Cette commande est à utiliser si vous rejoignez un projet ou que vous l'avez initialisé en ligne directement. Un remote `origin` sera automatiquement créé pour le dépôt distant```

## Le gitignore
C'est un petit fichier qui va permettre à git d'ignorer certains fichiers. Son fonctionnement est très simple. Il fonctionne par pattern, chaque dossiers ou fichiers qui correspond à un pattern présent dans le gitignore sera ignorés par git. Il influe sur le dossier dans lequel il est présent et tous les sous-dossiers. Plusieurs gitignore peuvent se surcharger.

Github propose un dépôt bien pratique avec beaucoup d'exemples de `.gitignore` selon le projet sur lequel vous travaillez que vous pourrez compléter selon vos besoins et tout au long de la vie de votre dépôt : [https://github.com/github/gitignore](https://github.com/github/gitignore).

Cas concret :

Il peut parfois arriver qu'un fichier ait déjà été historisé au sain de git. Si vous ajoutez le pattern de ce fichier au gitignore après, le fichier continuera d'apparaître dans la liste des fichiers modifiés. En effet, dès qu'un fichier est suivi par git, il ne sera pas pris en compte par un gitignore créé après. Il existe tout de même une solution :
```bash
$ git rm --cached /path/to/file # Pour un fichier
$ git rm --cached -r /path/to/folder # Pour un dossier
```

Le fichier ou le dossier va être supprimé des fichiers suivis de git. A savoir qu'il sera toujours présent sur votre ordinateur et dans l'historique git. Vous devrez une dernière fois commiter la suppression du fichier.

## Les branches
Git permet de faire des branches, je pense qu'il faut en user et en abuser. Pour la simple raison que des gens vont probablement relire votre code derrière avec le système de `Pull Request` et même si une fonctionnalité n'est pas terminée, il pourra relire votre code en amont et vous faire des retours plus facilement.

De plus, vous aurez un historique bien plus clair des fonctionnalité qui ont été développées. Cela va permettre de bien séparer les développements même si vous travaillez seul, par exemple si vous avez besoin de rapidement corriger un bug, vous pourrez mettre en "pause" le développement en cours et corriger le bug de manière transparente pour votre avancement en cours.

Quelques commandes intéressantes :
```bash
$ git branch # Voir la liste des branches
$ git branch [nom_branche] # Créer une branche
$ git branch -v # Voir la liste des branches et leur dernier commit
$ git branch --merged # Voir les branches mergées
$ git branch --no-merged # Voir les branches non mergées
$ git branch -a # Voir toutes les branches
$ git branch -d nom_branche # Supprime une branche mergée
$ git branch -D nom_branche # Supprime une branche
```

Petite astuce au passage, vous pouvez créer et vous rendre directement sur une nouvelle branche avec :
```bash
$ git checkout -b [nom_branche]
```

Beaucoup d'équipes et de projets open-source adoptent la méthodologie [Gitflow](https://nvie.com/posts/a-successful-git-branching-model/). Gitflow propose un workflow d'utilisation de git, une séparation des branches et des fonctionnalités. Très pratique pour travailler à plusieurs, elle permet de normaliser l'utilisation des branches. Je vous invite grandement à jeter un coup d'oeil sur son fonctionnement.

Si votre fonctionnalité est conséquente, n'hésitez pas à splitter votre fonctionnalité en plusieurs branches, cela facilitera la relecture pour un potentiel collaborateur et ainsi accélèrera la mise en production de votre travail.

## Le statut
Élément important de votre workflow, le statut va vous permettre d'avoir un aperçu de l'état de votre dépôt.

La commande par défaut est :
```bash
$ git status
```

Vous pouvez rajouter le flag `-s` pour avoir le format court.

Autre commande très pratique :
```bash
$ git status -u
```

Cela permet d'afficher le détail des fichiers non suivis. Par exemple, si vous ajoutez un dossier avec des fichiers dedans :
```bash
$ git status

On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

  modified:   demo.txt

Untracked files:
  (use "git add <file>..." to include in what will be committed)

  folder/

no changes added to commit (use "git add" and/or "git commit -a")
```

Et avec ```git status -u``` :
```bash
$ git status -u

On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

  modified:   demo.txt

Untracked files:
  (use "git add <file>..." to include in what will be committed)

  folder/index.html
  folder/show.html

no changes added to commit (use "git add" and/or "git commit -a")
```

Si vous avez besoin d'ajouter un seul fichier, parmi un dossier non suivi, aux fichiers suivis, cela peut s'avérer très utile.
Vous pouvez d'ailleurs le configurer de manière permanente :
```bash
$ git config --global status.showUntrackedFiles all
```

## git add, git reset et git checkout
### Ajouter des fichiers au staging

Plusieurs possibilités s'offrent à vous. Les cas les plus basiques d'abord :
```bash
$ git add path/to/file # Ajoute un fichier en particulier
$ git add path/to/file path/to/file # Ajoute ces fichiers en particulier
$ git add folder/ # Ajoute tous les fichiers du dossier
$ git add . # Ajoute tous les fichiers (Créé, modifié ou supprimé)
$ git add -A # Équivalent de git add .
```

À noter que l'ajout de fichier peut également ce faire via le même système de pattern que le `.gitignore` :
```bash
$ git add *.txt # Tous les fichiers txt du dossier courant
$ git add "*.txt" # Tous les fichiers txt du projet entier
```

Un flag intéressant à connaître également :
```bash
$ git add -u
```

Cela permet d'ajouter au staging seulement les fichiers déjà suivis et ne touche en aucun cas aux fichiers non suivis.

Cas concret :
```bash
$ git status

On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

  modified:   demo.txt

Untracked files:
  (use "git add <file>..." to include in what will be committed)

  index.html
  show.html

no changes added to commit (use "git add" and/or "git commit -a")
```

Je veux tout rajouter rapidement sauf `ìndex.html` et `show.html` car j'en ai eu besoin pour faire des modifications mais ils n'ont rien à faire dans le prochain commit pour le moment :
```bash
$ git add -u
$ git status

On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

  modified:   demo.txt

Untracked files:
  (use "git add <file>..." to include in what will be committed)

  index.html
  show.html
```

Comme on peut le voir ici, seul `demo.txt` est dans la zone de staging.

Dernier point et le plus pratique je trouve, c'est l'ajout partiel d'un fichier. Je m'explique, il arrive parfois que l'on modifie plusieurs parties d'un fichier mais que l'on veut en commiter que certaines pour faire des commits clairs et avoir un historique plus logique.

Il faut ajouter le flag `-p` à n'importe quelle commande `git add` que l'on a vu plus haut.

Cas concret :

J'ai au préalable créé un controller `articles_controller.rb` que j'ai commité avec quelques méthodes dedans mais il reste incomplet. Entre mes deux commit, j'ai eu besoin d'ajouter les méthodes new et create mais j'en ai également profité pour ajouter l'utilisation de la méthode search. Or je ne veux commiter que la partie concernant `new` et `create`.

Problème, `git status` ne m'affiche qu'un seul fichier modifié :
```bash
$ git status

On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

  modified:   articles_controller.rb

no changes added to commit (use "git add" and/or "git commit -a")
```

Avec `git add -p`, je vais avoir une interface interactive qui va m'offrir différentes possibilités :
```bash
$ git add -p articles_controller.rb

diff --git a/articles_controller.rb b/articles_controller.rb
index a2ed241..1026d5a 100644
--- a/articles_controller.rb
+++ b/articles_controller.rb
@@ -4,6 +4,10 @@ class ArticlesController < ApplicationController
   # GET /articles.json
   def index
     @articles = Article.all
+
+    if params[:q].present?
+      @articles = Article.search params[:q]
+    end
   end

   # GET /articles/1
Stage this hunk [y,n,q,a,d,/,j,J,g,e,?]?
```
On voit ici qu'il me propose plusieurs choix parmis : `[y,n,q,a,d,/,j,J,g,e,?]`

Je peux avoir plus d'informations en choisissant `?` :
```bash
$ ?

y - stage this hunk
n - do not stage this hunk
q - quit; do not stage this hunk or any of the remaining ones
a - stage this hunk and all later hunks in the file
d - do not stage this hunk or any of the later hunks in the file
g - select a hunk to go to
/ - search for a hunk matching the given regex
j - leave this hunk undecided, see next undecided hunk
J - leave this hunk undecided, see next hunk
k - leave this hunk undecided, see previous undecided hunk
K - leave this hunk undecided, see previous hunk
s - split the current hunk into smaller hunks
e - manually edit the current hunk
? - print help
```
Un hunk est simplement un morceau du fichier sélectionné.

On peut voir qu'il me remet la partie qu'il veut ajouter dans un contexte avec des lignes de code au dessus et au dessous de la partie ajoutée (indiquée par des `+` devant chaque lignes).

Cette partie ne correspond pas à ce que je voulais donc je fais `n` et il va me proposer le hunk suivant.
```bash
$ n

@@ -11,7 +15,28 @@ class ArticlesController < ApplicationController
   def show
   end

+  # GET /articles/new
+  def new
+    @article = Article.new
+  end
+
   # GET /articles/1/edit
   def edit
   end
+
+  # POST /articles
+  # POST /articles.json
+  def create
+    @article = Article.new(article_params)
+
+    respond_to do |format|
+      if @article.save
+        format.html { redirect_to @article, notice: 'Article was successfully created.' }
+        format.json { render :show, status: :created, location: @article }
+      else
+        format.html { render :new }
+        format.json { render json: @article.errors, status: :unprocessable_entity }
+      end
+    end
+  end
 end
```

On arrive à la partie qui nous intéresse, mais je voudrais, par exemple, faire un commit pour le `create` et un commit pour le `new` (l'exemple est pas top mais c'est pour comprendre), malheureusement tout est dans le même hunk, il faut que je le split.
```bash
$ s

Split into 2 hunks.
@@ -11,6 +15,11 @@
   def show
   end

+  # GET /articles/new
+  def new
+    @article = Article.new
+  end
+
   # GET /articles/1/edit
   def edit
   end
```

Git m'indique alors qu'il a splitté le hunk en deux et ainsi je n'ai plus que la méthode `new` proposée, parfait. Je ne souhaite que cela dans mon staging pour le moment alors je fais `y` pour ajouter ce hunk et `q` pour quitter ce menu d'édition.

Et là, chose intéressante que l'on peut voir, c'est que le même fichier est à la fois en état de staged et not staged :
```bash
$ git status

On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

  modified:   articles_controller.rb

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

  modified:   articles_controller.rb
```

Je peux alors faire mes commits séparement comme je le souhaitais plus haut.

### Git reset
Cette commande va servir à plusieur choses. Elle permet de supprimer un fichier d'un état de staged. Très pratique si on veut par exemple ajouter tout un dossier sauf un fichier, on va rapidement pouvoir faire :
```bash
$ git add folder/
$ git reset folder/file # Enlève le fichier file du staging
```

Elle peut aussi être utilisée dans le cas où vous voulez modifier le dernier commit. Par exemple si vous avez oublié d'ajouter un fichier à ce dernier :
```bash
$ git reset --soft HEAD^
```

Le `HEAD^` permet de dire "Je veux revenir d'un commit en arrière". `HEAD^^` permet de revenir 2 commits en arrière et ainsi de suite. Vous pouvez également utiliser :
```bash
$ git reset --soft HEAD~n # Avec n le nombre de commit à remonter
```
Notez que les commits vont être effacés mais les fichiers vont être placés en zone de staging. À utiliser avec précaution malgré tout car l'historique sera perdu mais pas les fichiers.

Je ne vous parlerais pas de `git reset --hard` car c'est très dangereux à utiliser si on ne sait pas exactement ce que l'on fait. Si jamais vous voulez voir comment s'en servir, vous trouverez votre bonheur sur le net.

### Git revert
Il faut bien faire la différence avec `git reset`. Git reset peut, entre autre, supprimer complètement un commit et donc modifier l'historique de git.

Le revert est plus souple et permet de garder un historique des modifications, il va tout simplement supprimer les modifications d'un commit mais dans un nouveau commit.
```bash
$ git revert HEAD^ # ou <SHA-1> ou <HEAD~4>
```

Revert est très utile quand vous avez commité une partie de code que vous voulez changer mais garder l'historique pour expliquer, par exemple, aux autres l'erreur que vous avez réalisé dans un commit. Également utile si vous avez déjà poussé un code erroné sur un dépôt distant. Cela évite d'alterer l'historique, et c'est très important pour le travail en collaboration.

### Git checkout
Commande qui fait beaucoup de choses mais je vais en détailler 3 particulierement.

#### Supprimer les modifications d'un fichier
Si vous avez modifié un fichier mais que ces modifications ne vous conviennent pas, vous pouvez toutes les annuler :
```bash
$ git checkout file/to/path
```

Et le fichier sera comme au dernier commit.

#### Changer de branche
Checkout permet de passer d'une branche à l'autre où d'en créer une rapidement :
```bash
$ git checkout nom_branche # Permet de passer sur la branche nom_branche si elle existe
$ git checkout -b nom_branche # Permet de créer la branche nom_branche et de passer dessus directement
```

A noter que `git checkout -b nom_branche` équivaut à :
```bash
$ git branch nom_branche
$ git checkout nom_branche
```

#### Permet de détacher le HEAD (revenir dans le passé)
Si vous avez besoin de voir votre projet dans un état précédent, c'est possible avec :
```bash
$ git checkout SHA-1 # Déplacer le HEAD sur le commit qui correspond au SHA-1
$ git checkout HEAD^ # Revient au commit précédent
$ git checkout HEAD~4 # Revient 4 commmits en arrière
```

Vous pouvez revenir à tout moment au dernier commit avec :
```bash
$ git checkout nom_branch
```

A noter que si vous changer la référence du HEAD, vous pouvez effectuer des modifications mais elles seront référencés sur le commit en cours et non plus sur votre branche directement. Attention ces commits n'étant pas référencés, ils seront supprimés par git. Vous pouvez faire une branche pendant la modification pour les historiser et ainsi avoir comme référence le commit désiré utilisé lors du checkout et revenir sur votre branche initiale par la suite.

## Git commit
Pas beaucoup de commande ici, juste un petit point sur ce qui me semble être une bonne pratique. Le message de commit n'est pas optionnel et il y a une raison. Il doit résumé le code que vous avez produit ou modifié pour le commit en question. Juste en regardant les messages de vos commits on devrait savoir ce que vous avez fait et remonter le fil de votre réflexion.

C'est très important pour les personnes qui vont vous relire et pour les nouveaux sur le projet pour voir d'un coup d'oeil le travail effectué. De plus, quand vous allez faire des `rebase` que nous verrons ensuite vous serez très heureux de voir un historique clair sans avoir à ouvrir chaque commit. Tout ceci est valable même pour vous quand vous relirez votre historique quelques jours ou semaines plus tard.

De plus un commit doit être assez unitaire, ce n'est pas un récapitulatif de votre feature. Il ne faut pas hésiter à créer beaucoup de commits mais qu'ils restent malgré tout pertinant et pas vide de sens juste pour faire un commit.

Petites astuces au passage :
```bash
$ git commit -m "message du commit" # Évite de passer par l'interface de commit
$ git commit -am "Message du commit" # Évite la phase d'indexation et de l'interface de commit
```

## Git diff
Un outil très utile puisqu'il va vous permettre d'afficher les différences entre vos modifications et votre dépôt.

La commande courante est :
```bash
$ git diff
```

Elle permet de comparer les fichiers entre votre historique et votre répertoire courant. Mais elle n'affichera pas les fichiers qui ne sont pas dans l'index, pour cela il faut ajouter les fichiers voulu dans la zone de staging et utiliser :
```bash
$ git diff --cached # Ou --staged
```

Vous pouvez également comparer deux branches entre elles :
```bash
$ git diff master # Voir la différence entre master et la branche courante
$ git diff master..develop # voir la différence entre master et develop
```

Vous pouvez également filtrer les fichiers que vous voulez comparer en indiquant le chemin de ces derniers :
```bash
$ git diff file/to/path
```

Une dernière commande qui peut être intéressante, elle permet de faire des stats sur l'état de vos modifications :
```bash
$ git diff --stat
```

On peut également modifier l'aspect des diff :

Modifications sur la même ligne :
```bash
$ git diff --word-diff
```

Afficher les différences par caractères, pratique pour rapidement voir une modification mineure :
```bash
$ git diff --color-words=.
```

## Voir son historique
Rappelons le, git est un logiciel de gestion de version, et il serait donc sympa de pouvoir voir ces versions.

La commande par défaut est :
```bash
$ git log
```

Cela permet d'afficher plusieurs informations intéressantes, et liste les commits de la branche courante. Attention, les commits les plus récents sont en haut de la liste. Vous pouvez y trouver le hash du commit, le message, l'auteur, etc..

Cet affichage ne reste pas le plus pratique, soyons honnete. Vous pouvez affiner un peu cet affichage.

Tout d'abord, il est possible de voir les différences d'un commit à l'autre avec le flag `-p`, pratique pour voir rapidement le détail d'un commit.

Si vous avez besoin de voir visuellement votre historique :
```bash
$ git log --graph --oneline --decorate
```

Cela permet de voir les commits et les branches triés du plus récent au plus ancien. Du plus, on remarque l'importance de rédiger un bon message de commit dans ce genre de situation.

### Filter son historique
Je ne vois pas bien l'usage concret qu'il peut y avoir, mais vous pouvez limiter le nombre de commit à afficher :
```bash
$ git log -n # Pour n commit
```

#### Par date
Plus intéressant, vous pouvez filtrer par date :

Elles peuvent être absolues :
```bash
$ git log --after="2014-7-1"
$ git log --before="2014-7-1"
$ git log --after="2014-7-1" --before="2015-7-1"
```

Ou relatives :
```bash
$ git log --after="yesterday"
$ git log --before="1 week ago"
```

#### Par auteur
```bash
git log --author="Guillaume"
```

Le nom n'a pas besoin d'être exact mais juste de contenir la phrase entre guillement.

#### Par message
```bash
$ git log --grep="controller"
```

Affichera tous les commit qui ont le mot "controller" dans leur message.

#### Par fichier
```bash
$ git log -- README.md
```

Affichera tous les commits qui ont affecté le fichier `README.md`. Plusieurs fichiers peuvent être choisis.

#### Par interval
```bash
$ git log <commit>..<commit>
```

Avec le SHA-1 des commits souhaités.

Vous pouvez également appliquer ce système avec des branches pour voir les commits qui différent entre les deux :
```bash
$ git log master..feature
```

Bien-sûr, plusieurs flag peuvent être utilisés en même temps pour affiner au mieux votre recherche.

## Git rebase
Le point le plus intéressant pour moi et celui qui fera de vous un développeur apprécié par les personnes qui auront de travailler à vos côté.

C'est un chapitre important et pas forcement évident à assimiler mais indispensable pour autant.

### Le rebase simple
Tout d'abord, il faut savoir quand on en a besoin. Comme le nom pour le laisser sous entendre, rebase permet de changer la base de la branche. En effet, quand vous allez créer une branche, le premier commit de cette branche va être le commit sur lequel vous vous trouviez au moment de la création de la branche.

Il peut arriver qu'entre temps, la branche initiale ait reçu plusieurs commits et ainsi, votre branche n'est plus synchronée avec la branche d'origine. C'est très souvent le cas lorsque l'on travaille avec des dépôts distants car beaucoup de commit peuvent intervenir sur master par exemple.

Faire un rebase permet d'être à jour par rapport à la branche avec laquelle vous souhaitez travailler et ainsi éviter les conflits en cas de merge sur le dépôt car vous allez devoir les résoudres proprement en local, nous verrons comment par la suite.

Exemple :
```bash
$ git log master --oneline
ec63d70 Adding Vagrantfile
6bc904c Adding index.html
7596964 Initial commit
```

```bash
$ git log devel/feature --oneline
4a0b63d Adding new.html
228e6d7 Adding show.html
6bc904c Adding index.html
7596964 Initial commit
```

On remarque que le commit initial est `6bc904c Adding index.html`, que l'on pourrait également trouver avec :
```bash
$ git merge-base master devel/feature
6bc904c79aa8a17ee2774dc0b1c2222aaa74bf10
```

De plus, on peut voir qu'après ce commit, chaque branche a reçu des modifications, il pourrait donc y avoir des conflits en cas de merge ou nous pouvons avoir besoin de modifications effectués sur cette branche par un autre développeur ou nous même en parallèle également sur une autre branche. On souhaite donc changer la base de notre branche pour avoir ces modifications de manière transparente et ainsi avoir un historique propre.

Pour cela nous allons rebaser la branche master, c'est à dire changer la base de notre branche avec la branche (actualisée) master :

```bash
$ git checkout devel/feature # On se place bien sur la branche devel/feature
$ git rebase master
First, rewinding head to replay your work on top of it...
Applying: Adding show.html
Applying: Adding new.html
```
Qu'à fait le rebase ? Il a placé tous les commit de la branche devel/feature dans un espace temporaire, il a changé le commit initial de la branche, et a "rejoué" commit après commit ceux de la branche `devel/feature` pour vérifier s'il n'y avait pas de conflit.

```bash
$ git log devel/feature --oneline
2afc447 Adding new.html
3ec6df9 Adding show.html
ec63d70 Adding Vagrantfile # Dernier commit de master
6bc904c Adding index.html
7596964 Initial commit
```

On remarque ainsi que tous les commits effectués dans master sont bien disponible dans devel/feature et que le rebase a bien fonctionné. Il faut penser à faire des rebases des branches concernés assez régulièrement pour éviter de gérer des conflits trop important lors d'un éventuelle push sur un dépôt distant.

On vérifie le commit commun :

```bash
$ git merge-base master devel/feature
ec63d7060827f48a48e6b5d72ea37f1619d0dc8e
```

### Le rebase interactif
On a vu que le rebase simple permettait de "rejouer" une série de commit. Nous allons voir comment modifier ces commits lors du "replay". Tout d'abord, il faut que la zone de staging soit vide, autrement dit aucun fichier ne doit être en cours de modification. Si vous en avez, plusieurs solutions :

```bash
$ git stash
$ git add -u && git commit -m "WIP"
```

Pour le deuxième cas, vous devrez `reset` le commit pour revenir à l'état initial.

Comme on l'a déjà vu plus haut, on va devoir choisir un commit de référence et ajouter le flag `-i` (pour interactive) :

```bash
$ git rebase -i HEAD^ # ou SHA-1 ou HEAD~4
```

Un menu va alors apparaitre et vous donner la liste des commits sélectionnés du plus ancien au plus récent (contrairement au git log). Des lignes commentées vous donne un rappel des commandes que vous pouvez utiliser mais nous allons voir comment s'en servir.

Détaillons l'interface :

```bash
pick 3ec6df9 Adding show.html
pick 2afc447 Adding new.html

# Rebase ec63d70..2afc447 onto ec63d70 (2 command(s))
#
# Commands:
# p, pick = use commit
# r, reword = use commit, but edit the commit message
# e, edit = use commit, but stop for amending
# s, squash = use commit, but meld into previous commit
# f, fixup = like "squash", but discard this commit's log message
# x, exec = run command (the rest of the line) using shell
# d, drop = remove commit
#
# These lines can be re-ordered; they are executed from top to bottom.
#
# If you remove a line here THAT COMMIT WILL BE LOST.
#
# However, if you remove everything, the rebase will be aborted.
#
# Note that empty commits are commented out
```

L'explication est assez bien fournie je trouve, mais concretement vous allez devoir réordonner vos commit comme bon vous semble, et choisir des commandes à éxecuter devant chez commit. La commande par défaut est `pick`, elle permet tout simplement de choisir le commit. Il va lire les commandes dans l'ordre et ainsi choisir les commits les uns à la suite des autres. Si lors de la modification de lors des conflits sont créés, il vous demandera de les corriger avant de continuer.

### Choisir une autre commande
Il va falloir changer donc la commande devant les commits, vous pouvez choisir plusieurs commandes pour plusieurs commits en même temps. Pour faire un reword sur le 2e commit par exemple :

```bash
pick 3ec6df9 Adding show.html
reword 850c4b7 Adding new.html # ou juste : r

# Rebase ec63d70..850c4b7 onto ec63d70 (2 command(s))
#
# Commands:
# p, pick = use commit
# r, reword = use commit, but edit the commit message
# e, edit = use commit, but stop for amending
# s, squash = use commit, but meld into previous commit
# f, fixup = like "squash", but discard this commit's log message
# x, exec = run command (the rest of the line) using shell
# d, drop = remove commit
#
# These lines can be re-ordered; they are executed from top to bottom.
#
# If you remove a line here THAT COMMIT WILL BE LOST.
#
# However, if you remove everything, the rebase will be aborted.
#
# Note that empty commits are commented out
```

### Les commandes edit et fixup
Les commandes les plus utiles à mon goût son `edit` et `fixup`.

#### La commande fixup / squash
Commençons par `fixup` ou `squash`, elle va permettre de merger un commit avec le précédent, mais celui de la liste que vous avez réordonnée.

Prenons un exemple :
```bash
$ git log --oneline
021b5cf Adding show.html
b52be45 Adding index.html
8bb8121 Initial commit
```

Je me rend compte après coup, que faire des commits pour ajouter deux fichiers de vues n'est pas utile, et que un commit serait plus clair.

```bash
$ git rebase -i HEAD~2 # Je liste les 2 derniers commit

pick b52be45 Adding index.html
pick 021b5cf Adding show.html

# Rebase 8bb8121..021b5cf onto 8bb8121 (2 commands)
#
# Commands:
# p, pick = use commit
# r, reword = use commit, but edit the commit message
# e, edit = use commit, but stop for amending
# s, squash = use commit, but meld into previous commit
# f, fixup = like "squash", but discard this commit's log message
# x, exec = run command (the rest of the line) using shell
# d, drop = remove commit
#
# These lines can be re-ordered; they are executed from top to bottom.
#
# If you remove a line here THAT COMMIT WILL BE LOST.
#
# However, if you remove everything, the rebase will be aborted.
#
# Note that empty commits are commented out
```

Je change alors la commande du commit `021b5cf` par `squash` car je veux changer le message des commits. En effet, si j'utilisais `fixup`, il garderait le message "Adding index.html" pour les deux commits. On arrive alors sur une interface nous proposant plusieurs choses.

Tout d'abord, plusieurs rappels nous indique ce qui est en cours et ce qui va être fait, ainsi que les instructions à réaliser pour finir l'opération. Il nous explique qu'il faut écrire un message de commit pour merger les deux commits ensemble et que toutes les lignes commencant par `#` seront ignorée.

```bash
# This is a combination of 2 commits.
# This is the 1st commit message:

Adding index.html

# This is the commit message #2:

Adding show.html

# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
#
# Date:      Mon Oct 31 22:45:14 2016 +0100
#
# interactive rebase in progress; onto 8bb8121
# Last commands done (2 commands done):
#    pick b52be45 Adding index.html
#    squash 021b5cf Adding show.html
# No commands remaining.
# You are currently editing a commit while rebasing branch 'master' on '8bb8121'.
#
# Changes to be committed:
#       new file:   index.html
#       new file:   show.html
#
```

On peut alors changer le message par :

```bash
# This is a combination of 2 commits.
# This is the 1st commit message:

Adding index.html and show.html

# This is the commit message #2:

# Adding show.html

# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
#
# Date:      Mon Oct 31 22:45:14 2016 +0100
#
# interactive rebase in progress; onto 8bb8121
# Last commands done (2 commands done):
#    pick b52be45 Adding index.html
#    squash 021b5cf Adding show.html
# No commands remaining.
# You are currently editing a commit while rebasing branch 'master' on '8bb8121'.
#
# Changes to be committed:
#       new file:   index.html
#       new file:   show.html
#
```

Et ainsi, on remarque que l'ajout des deux fichiers se fait bien dans le même commit :

```bash
$ git log --oneline
0e5207f Adding index.html and show.html
8bb8121 Initial commit
```

#### La commande edit
Parfois on souhaite pouvoir séparer un commit en plusieurs, peut être à la suite d'un `git add` un peu trop brouillons, ou si l'on a besoin de s'y retrouver plus facilement dans l'historique, les exemples sont nombreux mais cela arrivera surement un jour ou l'autre.

La commande `edit` permet pendant le rebase de retrouver son dépôt comme il était au moment du commit et de pouvoir y faire ce qu'on l'on y souhaite. Ce n'est pas clair mais je vais prendre un exemple concret :

```bash
$ git log --oneline
528dfdc Adding index.html
ff2837a Adding user model and controller
8bb8121 Initial commit
```

Je souhaite séparer le commit `ff2837a` en un commit pour l'ajout du model et l'un pour l'ajout de mon controller.

```bash
$ git rebase -i HEAD~2

edit ff2837a Adding user model and controller # On souhaite éditer ce commit
pick 528dfdc Adding index.html

# Rebase 8bb8121..528dfdc onto 8bb8121 (2 commands)
#
# Commands:
# p, pick = use commit
# r, reword = use commit, but edit the commit message
# e, edit = use commit, but stop for amending
# s, squash = use commit, but meld into previous commit
# f, fixup = like "squash", but discard this commit's log message
# x, exec = run command (the rest of the line) using shell
# d, drop = remove commit
#
# These lines can be re-ordered; they are executed from top to bottom.
#
# If you remove a line here THAT COMMIT WILL BE LOST.
#
# However, if you remove everything, the rebase will be aborted.
#
# Note that empty commits are commented out
```

On se retrouve alors dans un état un peu particulier de notre dépôt, avec un git log on peut voir que le dernier commit n'existe pas :

```bash
Stopped at ff2837a... Adding user model and controller
You can amend the commit now, with

  git commit --amend

Once you are satisfied with your changes, run

  git rebase --continue
```

```bash
$ git log --oneline
ff2837a Adding user model and controller
8bb8121 Initial commit
```

Il nous rappel d'ailleurs deux commandes intéressantes :

```bash
$ git commit --amend
```

Qui permet de changer rapidement le message de commit du dernier commit, ce qui reviendrait à utiliser la commande `reword`sur le commit en cours.

```bash
$ git rebase --continue
```

Cette commande permet d'indiquer au rebase que l'on a terminé ce qu'on l'on avait à faire et qu'il peut continuer à jouer la liste des commandes prévues.

```bash
$ git rebase --abort
```

Permet au contraire de tout annuler et revenir dans l'état au moment où le rebase interactif à commencer.

Revenons à notre séparation de commit. A ce moment là, nous sommes donc dans un état de post commit, de la même manière que si nous avions fait :

```bash
$ git add User.php UserController.php
$ git commit -m "Adding user model and controller"
```

Les commits suivant toujours dans une zone temporaire en attendant pouvoir être "joué".

Rien n'empêche donc de `reset` notre commit.

```bash
$ git reset HEAD^

Untracked files:
  (use "git add <file>..." to include in what will be committed)

  User.php
  UserController.php
```

On remarque alors que les deux fichiers ne font plus partie du tout de la zone d'index comme si git ne les avait jamais connu. On peut alors les ajouter l'un après l'autre comme on pourrait le faire normalement :

```bash
$ git add User.php
$ git commit -m "Adding user model"
$ git add UserController.php
$ git commit -m "Adding user controller"
```

Une fois terminé, on continue donc avec :

```bash
$ git rebase --continue
$ git log --oneline

d460973 Adding index.html
33bb519 Adding user controller
7be3718 Adding user model
8bb8121 Initial commit
```

Notre commit est effectivement désormais séparé en deux commit distinct.

On peut alors retrouver les commits que nous avions stashés plus haut (ou mis en WIP) :

```bash
$ git stash pop
$ git reset --soft HEAD^
```

## Git merge
Le merge va permettre de fusionner deux branches entre elles, où plutôt l'une dans l'autre. Pour prendre un exemple, imaginons que vous avez terminé de travailler sur votre branche `feature` et que vous voulez fusionner ce code avec l'existant en cours de développement sur la branche `devel`, dans le cas le plus simple :

```bash
$ git checkout devel
$ git merge feature # Je veux merge feature dans devel
Updating ec63d70..850c4b7
Fast-forward
 new.html  | 0
 show.html | 0
 2 files changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 new.html
 create mode 100644 show.html
```

On remarque qu'il nous indique `Fast-forward`, c'est à dire qu'il a prit tous les commits de la branche `feature` pour les mettre sur la branche `devel` à la suite. Il pouvait le faire car il n'y a eu aucune modification sur la branche devel depuis le commit de création de notre branche feature.

Cette pratique est assez critiqué car elle ne permet pas d'avoir un historique clair sur les merge qui ont été effectués, en effet les commit sont placé les uns à la suite des autres et lors de la relecture de la branche, il est difficile de voir au premier coup d'oeil à quel moment un merge sur une branche a été effectué. De plus, pour supprimer les modifications apportées par un merge avec un fast-forward est assez laborieux. A utiliser donc avec précaution et de préférence lors de la récupération d'une branche en local qui n'est pas encore sur un dépôt distant.

### Sans fast-forward
On peut forcer la création d'un commit de merge avec le flag `--no-ff` :

```bash
$ git merge feature --no-ff
Merge branch 'feature' into devel

# Please enter a commit message to explain why this merge is necessary,
# especially if it merges an updated upstream into a topic branch.
#
# Lines starting with '#' will be ignored, and an empty message aborts
# the commit.
```

Vous pouvez alors changer le message du commit. Mais désormais on voit clairement le moment où la branche a été mergée et d'en connaitre l'existence.

## Gestion des conflits
Comme j'ai pu le répéter plusieurs fois, il peut arriver que des conflits apparaissent, à la suite d'un merge, d'un stash pop, d'un rebase etc.
Un conflit apparait lorsqu'un même fichier est modifié au même endroit, où qu'il est supprimé sur une branche mais modifié sur une autre par exemple.

Comment cela se présente ? Prenons un cas concret.

Je me suis fait une class `UserController.php` dans une branche devel avec juste une méthode :

```php
# ./UserController.php
<?php

class UserController {
  public function index () {
    return view('users/index');
  }
}
```

A partir de là, j'ai créé une branche `feature` pour ajouter dans un commit la récupération de tous les users :

```bash
$ git checkout feature
$ git diff HEAD^

diff --git a/UserController.php b/UserController.php
index 972d624..15eacba 100644
--- a/UserController.php
+++ b/UserController.php
@@ -2,6 +2,7 @@
 class UserController {
   public function index () {
-    return view('users/index');
+    $users = User::all();
+    return view('users/index', compact('users'));
   }
 }
```

Et en même temps un autre développeur, par exemple ca aurait pu être moi, a lui aussi voulu récupérer des users :

```bash
$ git checkout devel
$ git diff HEAD^

diff --git a/UserController.php b/UserController.php
index 972d624..f5d3cb4 100644
--- a/UserController.php
+++ b/UserController.php
@@ -2,6 +2,7 @@
 class UserController {
   public function index () {
-    return view('users/index');
+    $users = User::active()->get();
+    return view('users/index', compact('users'));
   }
 }
```

On remarque une différence, il a utilisé une méthode `active` en plus et `get` au lieu de mon `all`, le tout sur la même ligne du même fichier.
Dans `feature`, je rajoute une méthode plus bas dans la class pour récupérer les informations d'un seul user :

```bash
$ git diff HEAD^

diff --git a/UserController.php b/UserController.php
index 8b16063..5b0d212 100644
--- a/UserController.php
+++ b/UserController.php
@@ -5,4 +5,9 @@ class UserController {
     $users = User::all();
     return view('users/index', compact('users'));
   }
+
+  public function show(Request $request, User $user)
+    {
+      view('users/show', compact('user'));
+    }
 }
```

Voilà, maintenant que ma fonctionnalité est prête, je vais la merger sur la branche devel.

```bash
$ git checkout devel
$ git merge feature

Auto-merging UserController.php
CONFLICT (content): Merge conflict in UserController.php
Automatic merge failed; fix conflicts and then commit the result.
```

J'ai un message d'erreur qui m'indique où se trouve le conflit, je peux d'ailleurs avoir des informations supplémentaires :

```bash
$ git status

On branch devel
You have unmerged paths.
  (fix conflicts and run "git commit")
  (use "git merge --abort" to abort the merge)

Unmerged paths:
  (use "git add <file>..." to mark resolution)

  both modified:   UserController.php

no changes added to commit (use "git add" and/or "git commit -a")
```

Comme c'est indiqué, on peut annuler le merging à tout moment, le dépôt reviendra dans l'état avant le lancement de la commande `merge` :

```bash
$ git merge --abort
```

Si on ouvre le fichier `UserController.php`, on remarque plusieurs choses. Tout d'abord la méthode show est apparue sans poser de problème, mais on voit également que la ligne qui pose problème a été entouré avec des symboles `<<<<<` ou `=====` :

```bash
$ cat UserController.php

class UserController {
  public function index () {
<<<<<<< HEAD
    $users = User::active()->get();
=======
    $users = User::all();
>>>>>>> feature
    return view('users/index', compact('users'));
  }

  public function show(Request $request, User $user)
    {
      view('users/show', compact('user'));
    }
}
```

On retrouve notre ligne modifiée dans nos deux branches, git nous indique les modification apportées par chaque branche. D'abord la modification sur la branche courante et la modification par la branche qu'on merge ensuite après les `=======` jusqu'à `>>>>>>> feature`.

Il n'est pas capable de faire un choix pour nous, nous alors donc modifier le fichier pour choisir ce que l'on souhaite garder. Je souhaite récupérer les utilisateurs actifs uniquement :

```bash
$ cat UserController.php
<?php

class UserController {
  public function index () {
    $users = User::active()->get();
    return view('users/index', compact('users'));
  }

  public function show(Request $request, User $user)
    {
      view('users/show', compact('user'));
    }
}
```

Comme il me l'indiquait plus haut pour valider mon choix, je dois ajouter le fichier à l'index et commiter :

```bash
$ git add UserController.php
$ git status

On branch devel
All conflicts fixed but you are still merging.
  (use "git commit" to conclude merge)

Changes to be committed:

  modified:   UserController.php

$ git commit
```

Et de la même manière qu'avec un merge sans conflit suivi du flag `--no-ff`, on se retrouve à devoir créer un commit de merge avec un message pré-rempli par git.
Ma classe `UserController`, récupère bien tous les users actifs dans la méthode index et possède également la méthode show. Le merge a bien fonctionné et les conflits ont été résolu.

La méthode de résolution de conflit est la même tout le temps. Vous pourrez en avoir plusieurs à la suite, par exemple dans un rebase. Sachez qu'à tout moment les rebase ou merge peuvent être `--abort` en cas d'erreur de manipulation.

Des outils existent pour gérer ce genre de problème mais je vous laisserais le soin de choisir celui qui vous convient le mieux.

## Travailler avec un dépôt distant
Il y a plusieurs moyen de travailler avec un dépôt distant.

### Vous avez des droits d'accès au projet
Autrement dit, vous pouvez pousser des branches sur le dépôt. Il y a un workflow que j'aime beaucoup utilisé mais avant toute chose retenez bien qu'une branche poussée sur un dépôt ne doit jamais être supprimée ou rebasé, il est possible qu'un autre développeur utilise votre branche et cela pourrait poser des problèmes donc il faut bien faire attention avant de pousser une branche sur un dépôt.

Généralement ce que je fais, quand par exemple j'ai un doute sur mon architecture ou un algorithme à mettre en place, je pousse ma feature et je fais une Merge Request avec le statut `WIP`, cela permet aux autres développeurs de voir mon travail et le commenter, on peut alors en discuter et je peux faire mes modifications par la suite. Ce n'est pas grave si je dois faire des commits qui "annule" ce que j'ai pu faire avant ou qui change complètement le comportement, après tout c'est fait pour. Il vaut mieux trop de commit que pas assez, du moment que c'est clair et organisé. De plus, cela vous permettra plus tard de revenir sur votre travail et de comprendre le cheminement de votre pensé. Une fois qu'une merge request est créée, si du code est poussé sur la même branche, la merge request ciblera le dernier commit de la branche concernée, très pratique.

Une fois mon travail sur la branche achevée, je change supprime le statut `WIP`. Je sélectionne toujours la suppression automatique de la branche, car un commit de merge est prévu pour me rappeler l'existence de la branche et au pire je l'ai toujours sur mon environnement local. Il reste peu probable que j'ai besoin de revenir dessus une fois mergée, la plupart du temps, je préfère refaire une branche pour que tout soit le plus clair possible.

S'il y a beaucoup de développeurs ou que le projet est très actif, il est assez probable que des conflits bloquent le merging de la branche sur votre dépôt distant. Prenons le cas où je veux merger ma feature sur la branche `devel`. J'ai commencé ma feature, il y a quelques temps et ma branche `devel` n'est plus à jour par rapport au dépôt distant :

```bash
$ git checkout devel # Je me replace sur la branche d'origine de ma feature
$ git pull origin devel # Je met à jour avec le dépôt distant
$ git checkout feature # Je retourne sur ma branche de feature
$ git rebase devel # Je rebase avec le code mis à jour
# Résolution des conflits en local
$ git push origin devel
```

Le bon workflow est de rebase la branche d'origine avant même de pusher votre branche. De plus, rien ne dit qu'une merge request sans conflit le reste tout au long de sa vie. Il faut donc vérifier lorsque d'autres merge requests sont acceptées si ça ne pose pas de problème pour la notre sinon il faut refaire la manipulation.

Je n'invente rien, beaucoup de projets open source ont adopté ce workflow que j'aime beaucoup, à la difference que les contributeurs n'ont généralement pas accès au projet.

Il peut être embêtant de devoir spécifier à chaque fois le dépôt et la branche que l'on veut puller ou pusher. On peut le définir par défaut :

```bash
$ git push -u origin feature # Lors du premier push
$ git branch -u origin/feature # Quand vous le souhaitez
```

Bien entendu, vous pouvez surcharger les paramètres par défauts choisi et push vers un autre dépôt distant en le spécifiant normalement.

### Récupérer une branche sur le dépôt distant
On remarque que lorsque l'on clone un dépôt, aucune branche par défaut n'est créée. En revanche, toutes les références sont disponible. Exemple avec le dépôt de Rails sur Github :

```bash
$ git clone git@github.com:rails/rails.git
$ cd rails
$ git branch
* master
$ git branch -a
remotes/origin/1-2-stable
remotes/origin/2-0-stable
remotes/origin/2-1-stable
remotes/origin/2-2-stable
remotes/origin/2-3-stable
remotes/origin/3-0-stable
remotes/origin/3-1-stable
remotes/origin/3-2-stable
remotes/origin/4-0-stable
remotes/origin/4-1-stable
remotes/origin/4-2-stable
remotes/origin/5-0-stable
...
```

On remarque la forme des branches est `remote/origin/branch_name`. On peut alors créer rapidement une branche :

```bash
$ git checkout 2-1-stable
Branch 2-1-stable set up to track remote branch 2-1-stable from origin.
Switched to a new branch '2-1-stable'
```
De plus, il nous indique que le tracking de la branche a été effectué.

Il peut arriver de devoir récupérer une branche qui a été créée après l'initialisation du projet.

Je vais prendre un projet vierge pour faire plus simple. J'ai cloné le dépôt alors qu'il n'y avait qu'une branche master et je veux récupérer `devel` :
```bash
$ git fetch origin
remote: Counting objects: 3, done.
remote: Compressing objects: 100% (2/2), done.
remote: Total 3 (delta 0), reused 3 (delta 0), pack-reused 0
Unpacking objects: 100% (3/3), done.
From github.com:guillaumebriday/demo
 * [new branch]      devel      -> origin/devel
```

Et de la même manière que tout à l'heure, la branche est désormais référencée :

```bash
$ git branch -a
* master
remotes/origin/HEAD -> origin/master
remotes/origin/devel
remotes/origin/master
$ git checkout devel # Pour créer la branche en local
```

Maintenant, imaginons que la branche devel ait été modifié sur le dépôt distant. Je veux récupérer les modifications distante. J'ai le choix entre deux commandes :

```bash
$ git fetch
$ git diff devel origin/devel
diff --git a/index.html b/index.html
index 3b18e51..7654074 100644
--- a/index.html
+++ b/index.html
@@ -1 +1 @@
-hello world
+hello world, how are you ?
```

On voit effectivement les modifications apportées par le dépôt distant mais ma branche locale reste intacte. Je peux alors merger manuellement ces branches si cela me convient :
```bash
$ git merge origin/devel
# Résoudre les potentiels conflits
```

Vous pouvez également faire ces deux opérations en une commande :

```bash
$ git pull origin
```
Attention tout de même, `git pull` fait `git fetch + git merge`. Si j'ai effectué des modifications sur la même branche, il va alors faire un commit de merge, ce qui n'a pas grand sens ici puisque l'on veut uniquement mettre à jour notre branche et pas ajouter une fonctionnalité au projet, il ne serait pas très judicieux de laisser un commit dans l'historique pour des raisons techniques... Pour contourner le problème il faut utiliser le rebase pour réécrire l'historique.
```bash
$ git fetch origin
$ git rebase origin/devel
```

Un autre problème se pose encore. La commande `rebase` va "aplatir" votre branche, en d'autres termes, si vous aviez fait des commits de merge ils vont être effacé et votre branche va devenir linéaire. Nous voulons bien entendu que cela n'arrive pas pour garder notre historique correctement. Pour cela deux techniques :

Avec git pull directement :

```bash
$ git pull --rebase=preserve
```

Ou avec le `fetch` + `rebase` :
```bash
$ git fetch
$ git rebase origin/devel --preserve-merges
```

Et ainsi, le rebase va garder les commits de merge et les nouveautés seront ajoutées à votre branche.

### Vous n'avez pas les droits d'accès au projet
Comprendre que vous ne pouvez pas pousser de branche directement sur le dépôt. Heureusement d'ailleurs sinon les gros projets seraient vite un bazarre sans nom.

Le workflow est plus ou moins similaire que le précédent à quelques détails prêt.

Un fork doit être créé si vous voulez proposer des merge requests, le nouveau dépôt créé sera sous votre nom. Un fork est une copie complète d'un dépôt existant. Ainsi vous aurez tous les droits sur votre fork distant. Une fois les modifications réalisées en local, vous allez devoir les pousser sur votre dépôt. Il faut voir le fork comme une branche, ainsi vous pourrez proposer des merge requests du fork vers le dépôt original. Le problème qui se pose alors, c'est la mise à jour du fork avec le dépôt initial. Voyons cela en détail :

```bash
$ git remote add original <path_to_repo> # original est le nom du remote mais le choix du nom est libre
$ git pull original --rebase=preserve
$ git push origin master
```

Nous avons ajouté le lien du dépôt original à notre projet local. A chaque fois qu'une merge request est accepté nous allons devoir mettre à jour notre dépôt local, une fois que nous sommes à jour en local, nous pouvons pousser librement les modifications vers notre fork, appelé ici `origin`.

## Statistiques

Il peut être intéressant de sortir quelques statistiques rapidement sans avoir à installer tel ou tel outils. Avant de commencer, tout les filtres que l'on a vu dans `filtrer son historique` son valable ici également et peuvent être combinés. La commande la plus simple est shortlog :

```bash
$ git shortlog # Affiche le nombre et la liste des messages des commits par auteur
$ git shortlog -s # Affiche juste le nombre de commits par auteur
$ git shortlog -s -n [ou -sn] # Affiche le nombre de commits de manière décroissante par auteur
```

Un flag très important est `--no-merges`, il permet de ne pas prendre en compte les commits de merge dans les statistiques. Pour prendre un exemple complet :

```bash
$ git shortlog --no-merges --author="Guillaume" --grep="Fix" # Affiche le nombre et les messages de commits contenant "Fix" pour l'auteur "Guillaume"
```

N'hésitez pas à combiner les flags pour être plus précis. On peut également faire des statistiques beaucoup plus poussés pour voir le nombre de lignes modifiées :

```bash
$ git log --shortstat --author="Guillaume" --no-merges | grep -E "fil(e|es) changed" | awk '{files+=$1; inserted+=$4; deleted+=$6; delta+=$4-$6; ratio=deleted/inserted} END {printf "Commit stats:\n- Files changed (total)..  %s\n- Lines added (total)....  %s\n- Lines deleted (total)..  %s\n- Total lines (delta)....  %s\n- Add./Del. ratio (1:n)..  1 : %s\n", files, inserted, deleted, delta, ratio }' -
Commit stats:
- Files changed (total)..  162
- Lines added (total)....  9746
- Lines deleted (total)..  2154
- Total lines (delta)....  7592
- Add./Del. ratio (1:n)..  1 : 0,221014
```

## Conclusion
J'espère avoir été le plus clair possible et le plus complet. Le but n'est pas de présenter chaque ligne de commande mais avoir une bonne base pour être à l'aise sur un projet, avoir des commandes en tête et des méthodes pour résoudre des problèmes que l'on rencontre souvent.

Si vous avez des idées d'ajouts ou des retours à faire, n'hésitez pas dans les commentaires.

Merci !
