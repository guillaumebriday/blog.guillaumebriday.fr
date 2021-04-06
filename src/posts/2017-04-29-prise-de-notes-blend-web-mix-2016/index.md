---
layout: post
title: "Prise de notes - Blend Web Mix 2016"
category: Billets
---
J'ai eu l'occasion, comme en 2015, de participer à l'évènement Blend Web Mix. J'ai pu prendre pas mal de notes que je tenais à partager. Ce n'est pas une critique constructive ou un résumé des présentations mais simplement une publication des notes que j'ai pu prendre. J'espère que vous me pardonnerez le côté "haché" du texte. Bonne lecture !

## Duik - Histoire d'un logiciel libre

Outil développé par lui même pour les dessins animés.

"Qui a une idée de ce qu'est un logiciel libre ?"

Pourquoi mettre mon logiciel sous licence libre ? Comment je peux rentrer dans mes frais sans pouvoir le vendre ?

Il n'est pas du tout développeur, parcours de réalisateur et animateur, mais il a des affinités avec le développement.

Il a travaillé en free-lance puis maintenant il est dans une coopérative qu'il a créé à la suite du succès de Duik.

### Qu'est ce que Duik ?

Extension pour aider à animer des personnages, c'est un plugins pour After Effects. Outil pour faire des animations traditionnel en 2D et 3D.

Différence entre la 2D et 3D : l'un a peu de niveau de détails et l'autre en a une infinité. Il permet de détailler beaucoup plus des personnages en 2D avec des outils de la 3D.

La technique est appelé le "rigging".

Un personnage en 3D est composé de ~140K polygone, on va animer le personnage avec un squelette. L'idée est de prendre ce concept et de l'appliquer au monde de la 2D.

La première idée vient de South Park, c'est de la 3D avec une dimension en moins. Modification de l'application MAYA pour l'appliquer à South Park. C'est "utiliser un canon pour écraser une mouche".

Duik a pour but d'uniformiser et de simplifier le processus qu'a utilisé South Park mais dans After Effects.

Aujourd'hui, Duik est utilisé pour des courts et longs métrages sur Netflix et ailleurs.

Le problème c'est que tout est payant, très cher, et pas forcément malléable, avec des DRM etc etc. Duik arrive, libre et gratuit, le succès est rapide.
Débuté en 2009, aujourd'hui il y a 15K lignes de code grâce à un crownfunding.

Le succès est lié aux nombres de features dans le logiciel. Actuellement 822 copies sont téléchargées chaque jour.

Traduit en anglais et en chinois, il est utilisé partout dans le monde par environ 10 000 utilisateurs par jour.

### Logiciel libre et gratuit

Libre ce n'est pas juste gratuit.

Arrive le problème de comment le vendre ? Vendre un produit c'est compliqué, il y a trop de licences, il faut une boutique en ligne, lutter contre le piratage, on a une responsabilité envers les utilisateurs (bug etc), il faut les aider à s'en servir... On reçoit beaucoup de mails de demande d'aide.

Trop de temps de développement juste pour ça.

Quand c'est gratuit, on le donne et on perd toutes responsabilités "si ça marche pas pour vous, c'est méchant mais tant pis".
Un logiciel est réplicable à l'infini, le modèle n'est pas applicable à celui des biens physique.

Tous les éditeurs essayent au mieux de restreinte l'accès à des logiciels mais toujours de manière super restrictive, l'utilisateur final n'est jamais gagnant.

Quand le logiciel a commencé à avoir du succès, le regret commence à venir de ne pas essayé de l'avoir vendu, mais en fait pas du tout.

Première rencontre avec la FSF (GNU), ils proposent des licences comme la GPL.

Elle permet d'assurer 3 libertés aux utilisateurs :

+ l'utilisateur peut **utiliser** le logiciel à n'importe quelle fin.
+ Liberté de **modifier** le programme pour répondre à nos besoins (copie du monde physique, je dois pouvoir changer les roues de mon vélo), ou juste pour voir comment il fonctionne. Il n'y a pas de raison de pouvoir faire ce que l'on veut avec ce que l'on a acheté. Cela rajoute une relation de confiance, savoir ce que l'éditeur veut faire avec nos infos.
+ Liberté de **partager** les modifications qu'on a pu faire.

Choisir une licence libre, c'est un choix politique, des valeurs qu'on défend. Extrême opposé de Google, Amazon etc.. qui pourtant font de l'Open-Source.

C'est aussi une manière de remercier ceux qui ont inspiré, "si j'en suis la aujourd'hui c'est parce que des gens ont partagé leur code avant moi".

### Et l'argent ?

C'est bien d'avoir des convictions, mais si on peut pas bouffer ça sert a rien.

Le développement prend du temps. Le support prend du temps. Il faut écrire une documentation pour son logiciel. Il faut faire des tutoriels. Il faut payant l'hébergement web (200€/an dans son cas).

300K (utilisateurs) * 10$ (prix potentiel) = 3 millions "que je n'ai pas gagné".
Estimation des coûts : ~15K € / an.

Évaluer la valeur par le travail.

On fait gagner du temps et donc de l'argent à des gens, le faire payant permet de redistribuer l'argent gagné par les gens.

Il faut malgré tout trouver 15K € par an ! Aujourd'hui, on en est a 3000 € de dons par an.

Il y a l'argent qu'on refuse :

+ comme la pub (pas dans nos valeurs, c'est moche).
+ Choisir le prix (même gratuit) aux utilisateurs, interdit la redistribution et ne paye pas la valeur du travail uniquement.

Le crownfunding, en 2015 : 7175 € à but uniquement de financer le projet et pas de vendre un produit.

Vente de produits dérivés et manuel utilisateur : 1000€ en 2016.

On ne gagne pas forcement des milles et des cents mais on gagne beaucoup en réseau et popularité. Grâce à ça, j'ai pu faire des conférences et rencontrer des gens, ça n'a pas de prix.

Plate formes comme patreon.com (comme Tipeee) pour financer des artistes.
Lancer une plate forme contributive pour le logiciel libre :

+ Lancer une idée
+ Financement participatif sans contre partie
+ Lancer le dev une fois que le financement est un succès
+ Distribuer le logiciel sur la même plate forme sous licence libre
+ Nouvelle version ? Retour au financement participatif

Lien : [rainboxprod.coop](https://rainboxprod.coop/en/)

## Concevoir pour l'inconscient

Par [@gillesdemarty](https://twitter.com/gillesdemarty).

Conférence suite à la modification d'iOS 10 car il faut maintenant appuyer sur le bouton pour déverouiller son iPhone. L'autocorrection multilingue a également changé.

De la même manière, le bouton "back" sur Android ne réagi pas toujours de la même façon.

Pourquoi ces problèmes ?

On sait plus ou moins faire des interfaces, mais on ne cherche pas à savoir ce qui fait un humain. Même si on fait des personas, on cherche les différences entre les humains pas forcement les ressemblances.

On parle souvent du corps et pas forcément ce qu'il se passe dans la tête.

### Qu'est-ce que le subconscient ?

Une tâche automatique, pas forcément dans la mémoire. On ne parle pas ici de religion, ou de conscience, juste de pragmatique.

Le subconscient a évolué, on s'est amélioré. Il nous faut des automatismes pour vivre et pouvoir avoir le temps d'utiliser le conscient à autre chose qu'aux besoins primaires.

On peut ramener quelques choses du subconscient pour le ramener dans le conscient, par choix ou par reflex mais on ne peut pas faire l'inverse, ce n'est pas un choix : "ne pensez pas à cet éléphant", trop tard on y pense.

Le conscient : c'est comme une personne dans notre tête qui nous dit quoi faire, que regarder, etc.

Beaucoup de recherche par l'armée depuis les 50s, stimuli des pilotes d'avions pas capable de faire deux choses en même temps mais capable de le faire à la suite.

Test d'attention avec des passes de deux équipes de couleurs différentes qui se font des passes de ballon de basket. Incapable d'interpréter les éléments changeant.

On ne se concentre que sur une conversation même s'il se passe des choses autour de nous (bruit, autre discussions), le centre de vision est capable de changer en fonction du contexte, on peut changer l'attention facilement (pomme qui tombe, on la regarde), si on nous appelle notre attention est perdue.

Plus on est stressé et plus le focus est faible. Même si des signaux perturbateurs arrivent lors d'un stress important le focus n'est pas forcément modifié (exemple d'alerte dans un hôpital ou en cas de double problème dans un avion).

La mémoire ne fonctionne que s'il y a attention. on est capable de faire deux actions à la fois avec beaucoup d'entraînement mais il est impossible de se souvenir de ce que l'on fait, ce que l'on dit.

État de surattention, état appelé "flow", état de béatitude, on ne voit plus le temps passer, on est surproductif.

### Que se passe t-il dans le subconscient ?

C'est là où les habitudes se développe, on ne pense pas à marcher. On ne l'apprend pas forcément à la naissance, cela peut s'apprendre, comme conduire une voiture, on ne réfléchie plus pour le faire.

Il est d'ailleurs difficile de désapprendre. Et toute activité répétée devient une habitude, elle tombe de l'inconscient.

On en arrive aux fenêtres modales. La frustration se créer par les "mods". Un mod est un état. Il y autant de comportements qu'il y a de fenêtres modales.

Le bouton retour d'Android est implémenté selon le choix du développeur, le comportement n'est pas attendu d'une app à l'autre, il faut le découvrir.

Sur les fenêtres modales, on a tellement prit l'habitude de cliquer spontanément sur "yes" qu'on ne lit plus, on le fait pour tout tout le temps, il faut absolument réatirer l'attention sur la fenêtre modale sinon elle ne marche pas. Il faut pour "corriger" les fenêtres modales, ne pas en mettre et plutôt ajouter un bouton "undo" pour réatirer l'attention après avoir fait une potentielle erreur.

Il faut bien plus d'effort pour désapprendre que pour apprendre. C'est souvent de la mémoire musculaire et changer le comportement créer beaucoup de frustration.

On peut mélanger le subconscient et le conscient. Manger un sandwich et faire un problème de maths. On est focus uniquement sur le problème de maths.

On peut parfois mélanger les deux, exercice de lire des couleurs dont le mot est une autre couleur. Le subconscient est en compétition avec le conscient.
Les dark pattern sont souvent une manipulation des habitudes. Exemple de windows 10, quand on ferme la fenêtre cela revient à accepter l'installation, il faut avoir une certaines éthiques en tant que concepteur d'interfaces.

La "technologie calme" permet de rester dans la périphérie de l'attention. Exemple d'un robinet qui change la couleur de l'eau en fonction de la température, on a une information sans avoir eu à attirer l'attention.

Livre : The human interface, Jef Raskin

## Plus d'un milliard de vidéos vues par an sur 6play

Présentation des outils :

+ Github
+ Hipchat
+ Jenkins
+ Targetprocess

8 équipes scrum, 2 scrum Master, sprint de 15 jours, migration en cours vers des features teams (mélanger le back, le fronts, les designer etc. pour réaliser une feature)

Environ 30 à 40 déploiements par jour que ça soit en front ou back.

Développement de l'Open Source, ouverture d'un blog technique ce qui permet d'avoir des retours et de forcer à la qualité et avoir des avis extérieurs.

Proposer des retours de conférences.

Création des Left Talk Friday, LFT (prononcer "lef t"). Faire des conférences de 25 minutes pour faire une culture de la veille, présenter des technologies, des projets au sein de l'équipe interne.

C'est un workflow en pull request :

+ Code review
+ Espace de recette
+ CI
+ Lint
+ Tests

Chaque branche a un espace de recette, toujours dans le but d'avoir un master propre et toujours fonctionnel.

Environ 30K requêtes / s et 200 Gbps sur l'application, le tout géré par 4 personnes en interne.

Il y a la problématique de suivi de la lecture et des vidéos déjà vu pour plus de personnalisation soit environ 40K requêtes par minute, le tout géré par PHP 7.

L'application est une SPA en React JS. Un serveur Node.js génère la première page d'un bloc pour faciliter le référencement et avoir rapidement une première vue. On charge ensuite que les parties qui changent (isomorphisme).

React Native va permettre d'avoir une seule codebase pour iOS et Android. Toute la partie data fetching sera partagée avec la partie web.

On fait une approche itérative pour changer petit à petit chaque écran pour utiliser React Native car on ne peut pas réécrire l'app from scratch.

## To patch or not to patch

Métaphore avec le vélo qui crève, un problème mais plusieurs solutions. On peut ne pas régler le problème (marcher à côté du vélo), on peut aussi prendre un peu plus de temps pour réparer le vélo avec une rustine. Solutions pas forcément adaptées ou complètement overkill.

La dette est inévitable, les besoins changent, les versions de framework changent, les devs changent ou évoluent.

Besoin de coder rapidement des features, pression de temps, pas beaucoup de cash.

Conséquences : Perte de temps sur le long terme.

Plus on rajoute de fonctionnalités potentiellement inutiles plus on augmente la dette technique, il faut éviter les effets tunnels.

## Le design des performances

Souvent le problème de la performance est vue pour le mobile car les perfs d'un smartphone entre de gamme ou milieu de gamme n'équivaut pas au dernier MacBook Pro Retina.

Le gros problème n'est pas vraiment là, c'est surtout le problème du réseau (Certains desktop bon marché ont encore beaucoup de mal à suivre les dernières techno malgré tout).

Le problème des perfs doit être traité à tous les niveaux, tant front que back, car ont ne peut pas changer le hardware des gens.
Le problème c'est qu'aujourd'hui un site web ne fait pas qu'une seule requête (même longue), il faut faire des requêtes DNS, des requêtes pour les images, pour le JS, le contenu, etc.

On peut tester facilement un mauvais réseau dans un métro pour essayer les performances de son site.

Le temps d'accès à l'antenne 4G est plus longue que les requêtes entre l'antenne 4G et le serveur web...

Mais alors comment résoudre le problème ? Comment faire du design de la performances ?

Ce n'est pas forcément une optimisation technique, le designer est aussi la pour palier ce que les développeurs ne pourront techniquement pas faire. Il est possible de techniquement tout améliorer, il faut donc avoir une collaboration entre designer et développeur.

Pendant très longtemps, les designers et les devs n'étaient pas dans les mêmes bureaux, il y aura forcément des questions de la part de chacun, des problèmes que certains corps de métier ne pourront pas voir.

La collaboration doit avoir lieu à chaque étape du projet. Il faut obligatoirement définir des priorités parce qu'on ne peut pas tout optimiser dans la vraie vie, elle permet de trancher entre les conflits entre design et technique.

Il faut des métriques précises et concrètes qui ne doivent pas être changées, tout le monde doit être d'accord dès le début. Exemple : Définir le temps moyen ou maximal d'une page sur une connexion de tel type, mais également le poids moyen des assets.

Garder à l'esprit que dans beaucoup de pays, on paye la data, très cher, surtout dans les pays en voie de développement. Se fixer un temps d'accès max pour arriver à une fonctionnalité de l'app.

Il est important de connaître les zones de conforts de designer et des développeurs, il ne faut pas que la performance ne prenne pas plus de temps qu'un développement normal.

Dès le début du projet, il faut prioriser les features.

Il faut limiter les appels aux ressources extérieures, on ne maîtrise rien à ces ressources, on ne peut pas optimiser la dessus.

Pour les images, elles sont souvent lourdes et assez souvent optionnels, on peut par exemple utiliser du lazy loading.

La typo c'est lourd, mais c'est beau. Il faut limiter le nombre de famille de typo, et réfléchir à quel moment il faut la charger.

Il est difficile sur smartphone (en mobilité) de voir la différence entre des typo système et des typo perso, car on veut l'info vite et dans un contexte rapide.

Il faut aussi mettre en place un design de l'attente. Cela existe depuis bien avant le Web, exemple : le bouton pour faire passer le feu au vert, ça ne sert à rien mais c'est un artifice que permet d'accepter un peu plus l'attente.

Les transitions, les animations, les enchaînements permettent de faire attendre l'utilisateur.

Comment faire attendre 10s une personne qui veut charger une vidéo lourde ?

Faire une transition longue mais pas dérangeante, afficher les boutons un peu après. Comme il se passe des "trucs" à l'écran l'utilisateur n'a pas l'impression d'attendre.

Il faut aussi réfléchir à quand faire les chargements. On est préparé a attendre à un login donc on peut tout charger et afficher ce que l'on veut après.

Instagram par exemple, envoie la photo sur les serveurs au moment de la prise de vue avant la description et donc au moment de cliquer sur "valider" on n'a pas l'impression d'attendre.

Le coeur du contenu doit être accessible en premier, le reste doit être de l'amélioration progressive, en lazy loading par exemple, le plus lourd étant les images (Medium est un très bon exemple).

On peut faire du lazy loading sur des media queries. de plus on peut faire des fichiers de fonts avec juste les caractères que l'on veut. Il faut automatiser les processus pour optimiser les images.

"srcset" c'est la vie, utilisez le, prévoir plusieurs variantes et plusieurs tailles.

Optimisez les politiques de cache. Concatenez les fichiers JS et CSS.

Le CSS est bien meilleur en performances des animations que du jQuery. Mais il ne faut pas imbriquer des milliers de div pour avoir trop de chemin d'accès ou des trop long.

Résumé :

+ Collaboration entre dev, designer, etc.
+ Jamais de guerre, toujours des compromis, tout le monde doit être content.
+ testez !! (en réel, analytics)
+ Ce qui compte c'est pas le temps, mais le ressenti, une page plus rapide peut avoir un ressenti plus lent.

## Design de formulaire mobile

Par [@walterstephanie](https://twitter.com/walterstephanie).

Les formulaires sont souvent long et "chiant". Une étude montre que passer le nombre de champs de 11-4 augmente le taux de conversion de 120%.

Le contenu des champs est aussi important. Demander par exemple uniquement les infos indisponible au moment opportun.

Les formulaires doivent être basés sur le modèle mental pas sur le modèle de base de données.

Ne pas limiter les champs à 20 caractères car la base de données est prévue comme ça -&gt; changez la base de données.

Le label est super important, le plus efficace c'est un label au dessus et le formulaire au dessous car on a peu de place en largeur sur mobile. En revanche, sur un écran plus large il faut mettre les labels sur le côté.

Les labels doivent être le plus explicite possible, "adresse" vs "adresse de livraison"

On évite les majuscules, l'oeil n'est pas habitué.

Ne pas être trop poli dans un formulaire, on sait qu'on doit remplir le champ pas besoin de dire "merci" à chaque fois.

La description d'un champs compliqué ne doit pas se faire dans le label mais dans une description en dessous. Il faut également expliquer pourquoi on a besoin de certains champs pour ne pas frustré, le tout dans la description.

On peut rajouter des liens d'aide pour expliquer comment trouver des infos pour remplir un champ. Expliquer le format attendu dans un champ lorsque cela est nécessaire. Certains placeholder attirent moins l'attention, on peut croire que c'est pré-rempli et posent un problème d'accessibilité (gris clair sur blanc).

De plus si on se trompe de champs on doit tout supprimer pour voir ce qu'on demande dans le champ. Sauf pour les formulaires super court (login / mot de passe)

On peut faire du floating label, le placeholder devient le label au clique.

Si vous marquez les champs obligatoires il faut marquer les champ facultatif car sinon on doit deviner lesquels sont facultatifs.

Sinon mettre tous les obligatoires en haut et les facultatifs en bas sans indiquer le fait qu'ils soient facultatifs.

Il faut lier les labels aux champs surtout pour les checkbox !

Le tab n'existe pas sur mobile il faut donc pouvoir cliquer partout sur le champ pour sélectionner le champ.

Il faut indiquer le focus en CSS.

Il faut spécifier le tab-index correctement, car sur iOS on peut avoir les petites flèches passer d'un champs à l'autre comme avec la touche tab.

Il faut à peu près que le champ est la taille du contenu souhaité.

Ne pas oublier de spécifier le type de champs :

type="email" n'a pas de majuscule en début de mot, et propose un arobase, de plus le navigateur propose la validation html 5 automatiquement.

Il faut parfois tricher, un numéro de CB a plus le pattern d'un tel, donc utiliser type="tel".

type="search" permet de submit directement avec le clavier.

Autres attributs : autocapitalize="off", autocorrect="off", autocomplete="email" (pour la dernière adresse utilisé).

Évitez de découper les champs, car il faut cliquer pour changer à chaque champs, même les scripts pour changer de champs court circuite l'ux habituelle.

Il faut préférer les input mask pour faire ça dans un seul champ.

Les dropdown list sont nuls sur mobile, il faut souvent scroller et tomber par hasard sur notre champ. L'autocompletion d'un champs est bien plus user-friendly, cela va proposer que les pays commençant par la lettre souhaitée.

Utiliser un date picker plutôt que 3 dropdown pour les dates.

Préférer les incrémenteurs plutôt que les listes déroulantes courtes, laissez les deux choix.

Si on a peu d'options, afficher les 3 ou 4 options directement avec des boutons radio ou déplacer les choix sur une autre vue.

Proposer l'inscription via réseaux sociaux pour éviter des interactions (mais attention aux problèmes de perfs) et attention aux gens qui y sont réfractaires, il faut proposer les deux. Sinon proposer la création d'un compte que si absolument nécessaire (compte invité).

Eviter de demander plusieurs fois la confirmation, préférer la vérification du champ, exemple : "gmail ?"" quand on écrit "gnail".

Proposer toujours l'autocompletion lorsque cela est possible.

Et auto détecter au maximum les infos, par exemple : le type de CB.

Utiliser la géolocalisation pour ne pas avoir à demander d'où l'on part pour un site de trajet par exemple.

Il faut demander les permissions HTML 5 uniquement dans un contexte nécessaire. Si j'arrive sur un blog, il ne faut pas me demander ma géolocalisation.

Attention aux options par défaut surtout si c'est facultatif car si on ne le rempli pas il n'est plus vraiment facultatif.

Il faut restreindre les choix pour guider intelligemment, exemple : date grisée avant une certaine date.

Informer les utilisateurs des contraintes.

Ne pas demander plusieurs fois un mot de passe sur mobile, mais permettre de l'afficher pour checker si c'est le bon.

Il faut aider à réparer les erreurs pour ne pas créer du stress.

Il faut mettre les erreurs au même niveau que les champs concernés pour ne pas avoir à deviner les champs en question, comme bootstrap le propose simplement.

Le rouge est anxiogène, préférer le jaune et l'orange mais attention à l'accessibilité.

La couleur ne doit pas être le seul indicateur, icônes "X" et de "V" en plus du rouge et vert.

Validation au fur et à mesure de la saisie et pas une fois à la fin, de plus on attend la fin de la saisie pour vérifier. Mais si un champ est faux et qu'on le corrige il faut le corriger en temps réel.

Penser à sauvegarder les données d'un formulaire en cas de rechargement de page.

Faire preuve d'humour dans les messages d'erreur pour éviter le côté stress.

Les fausses bonnes idées : cacher le bouton "submit" tant que le formulaire est faux car on peut croire qu'il y a une erreur de chargement de page.

L'action principale doit être la plus visible possible.

Utiliser des verbes d'action clair et précis.

[https://speakerdeck.com/stephaniewalter/aidez-moi-a-remplir-vos-formulaires-mobile](https://speakerdeck.com/stephaniewalter/aidez-moi-a-remplir-vos-formulaires-mobile)

## IoT m'a tué

Il y plusieurs types d'internet des objets mais ce sont principalement des objets pour la maison ou pour la voiture. Il y a aussi les IoT dédié les entreprises pour par exemple tracker les processus de fabrication d'objets.

### Comment hacker un IoT ?

Il faut trouver et comprendre le système de stockage. Faire du reverse engineering, trouver une faille dans du JS et se rendre compte que tout est exécuter sans trop de vérification. L'accès au root est facilement trouvé, accès à tous ces mêmes objets, on peut donc installer ce que l'on veut assez facilement.

On peut aussi installer un Botnet comme sur un ordinateur standard. Ces objets sont connectés en permanence à internet, personne ne peut se plaindre que c'est lent car on ne s'en sert que très peu et ils sont sans GUI.

Des clients demandent à un C2 server d'utiliser ces IoT pour attaquer une cible par DDOS par exemple comme la subit OVH récemment.

### Comment trouver des objets pour les hackers ?

Par Wi-Fi et Bluetooth car ils utilisent des connexions en clair la plupart du temps. Il est aisé de se balader dans la rue et trouver des signaux d'IoT et s'y connecter via le signal radio.

[Shodan](https://www.shodan.io) est le Google de l'IoT, il va sniffer les adresses IP du monde entier pour trouver tout ce qui est ouvert.

Il y a 80M de lignes de code dans un OS standard et 120M dans une voiture, il y a donc forcement des failles de sécurité, reste plus qu'a les trouver. De plus, ces voitures génèrent beaucoup de signaux (BT, Wi-Fi, etc...)

Il y a déjà eu des failles trouvées dans les voitures par des chercheurs en sécurité. Ils pouvaient ainsi ouvrir les portes à distance ou géolocaliser la voiture à souhait.

Il y a d'abord une phase d'infection via les différents ports ouverts. Une fois introduit, on va aller dans le "CAN Bus" (la colonne cérébrale de la voiture) et on va envoyer des signaux de la même manière que le ferait par exemple le bouton volume up du volant. Il n'y a aucune vérification sur la provenance de l'ordre dans ce bus, il est juste interprété et exécuté.

En Ukraine, des hackers se sont attaqués à des RTU (petits RPI dans les distributeurs des quartiers) connectés à internet pour avoir des statistiques sur le centre de convertisseur de courant. Ils ont mis trois mois pour comprendre le fonctionnement des RTU. Ils ont envoyé des fichiers normaux aux opérateurs des centrales, ces fichiers normaux (PDF, Excel) cachaient des petits bouts de logiciel qui se connectaient aux serveurs des hackers (C2) et essayait de se répliquer partout, de RTU en RTU.

Au final, ils avaient pu supprimer tous les firmwares des RTU, l'attaque a durée 6 heures car il a fallu tout réinstaller à la main.

Les IoT sont rarement prévu pour être mis a jour, et du coup une faille de sécurité perdure dans le temps.

[https://www.sentryo.net/fr/blog/](https://www.sentryo.net/fr/blog/)

[IoT m'a tuer sur Youtube](https://www.youtube.com/watch?v=0YQ9LmDp_jE)
