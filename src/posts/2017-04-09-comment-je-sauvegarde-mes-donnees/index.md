---
layout: post
title: "Comment je sauvegarde mes données ?"
category: Billets
---
Souvent inexistante ou très marginale, je suis toujours surpris de voir le peu de mérite qui est attribué à la sauvegarde, si indispensable pourtant. Beaucoup d'entre nous, encore aujourd'hui, n'ont leur données que sur leur ordinateur portable. Je vais ici vous présenter la méthode que j'utilise pour avoir l'esprit tranquille ou vous donner quelques idées.

On oublie, à tort, que les données ont bien plus de valeurs que le matériel, nous prenons des milliers de photos, passons des centaines d'heures sur des documents, on ne peut pas se permettre de tout perdre ne serait-ce qu'une journée. Par exemple, si vous perdez votre MacBook Pro, vous en racheter un et on en parle plus, tout sera comme avant. En revanche, si vous perdez vos photos d'enfance ou votre rapport de 700 pages à rendre à un client ou à votre professeur, ça risque de poser (beaucoup) plus de problèmes.

Avant de penser mon système de sauvegarde, j'avais plusieurs besoins. Tout d'abord, la sauvegarde doit être totalement automatique, transparente et incrémentale. Il est impossible pour un humain de gérer une si grande quantité d'information sans oublier des parties ou faire des erreurs, ce qui est un jeu d'enfant pour une machine, elle le fera bien plus vite et bien mieux que moi en évitant toutes les erreurs. Je dois pouvoir accéder à ma sauvegarde depuis l'autre bout du monde et y avoir accès très facilement.

Le but étant de prévoir les pires cas, comme la perte complète de mon matériel informatique (vol, incendie, crash, etc.). Si cela devait arriver, je dois pouvoir récupérer l'ensemble de mes données dans l'état où je les ai laissées dès que j'aurais récupéré mon matériel physique.

Bon assez d'explications sur le comment du pourquoi, passons aux détails !

## Schéma récapitulatif

![Schéma de mon système de sauvegarde](backup-schema.png)

Une image vaut mille mots et permet d'avoir une vision assez globale de comment tout cela fonctionne. Voyons tout ça l'un après l'autre.

## Le NAS

Comme on le remarque assez facilement, le NAS est la pièce maîtresse de mon système de sauvegarde. C'est un [Synology 1515+](http://amzn.to/2dvbcRm) équipé de 5 * 3To configuré en RAID 6 ce qui limite un peu les performances mais qui me permet d'avoir deux disques défaillants au lieu d'un seul si c'était du RAID 5\. Au final, je dispose de presque 9 To sur les 15 initiaux même si on se rapproche plus de 8 To. Rien n'empêchera par la suite d'augmenter la taille des disques l'un après l'autre afin de mieux répartir les coûts.

Les disques durs sont des [WD Red](https://www.wd.com/fr-fr/products/internal-storage/wd-red.html) spécialement conçu pour être les plus fiables possibles dans un NAS et ainsi éviter au maximum les défaillances et de pouvoir laisser le NAS allumé en permanence.

Tous mes fichiers sont sauvegardés dessus sans exceptions, soit en accès direct, soit via des systèmes de sauvegardes comme Time Machine.

## Time Machine

Élément très important également, le fameux Time Machine. Outil disponible uniquement sur macOS (l'équivalent existe désormais sur Windows sous le nom de File History). Il me permet de faire une sauvegarde incrémentale de l'ensemble de mon MacBook Pro sur le NAS. Très pratique pour remonter à un état antérieur d'un fichier ou d'un dossier et de pouvoir restaurer mon Mac en cas de souci ou de changement de machine. Je limite la sauvegarde à 1 To ce qui est largement suffisant pour mes besoins et pour remonter assez loin dans le passé.

En plus d'une sauvegarde sur le NAS, j'utilise Time Machine sur un disque dur externe une fois toutes les 2 semaines environ.

## iCloud

Je prends beaucoup de photos avec l'iPhone et l'ensemble est sauvegardé sur [iCloud Photo library](https://www.apple.com/icloud/photos/). Le tout est rapatrié sur le MacBook Pro dans Photos pour ensuite être sauvegardé avec le reste de l'ordinateur. Le reste de l'iPhone est uniquement sauvegardé avec iCloud pour une raison de simplicité.

## Amazon Drive

Petite nouveauté, alors que j'utilisais CrashPlan sur l'iMac, je ne pouvais pas l'utiliser facilement pour sauvegarder hors site l'ensemble du NAS. De plus, seulement l'iMac était sauvegardé. Depuis septembre 2016, Amazon Drive propose un stockage illimité. Oui oui, totalement illimité pour 70€/an.

Même si je trouve le service très limité pour une utilisation comparable à celle de Dropbox ou Google Drive, le service s'avère extrêmement pratique pour une sauvegarde conséquente hors site. Pour cela, j'utilise l'outil interne au Synology, le dénommé : [Hyper Backup](https://www.synology.com/fr-fr/dsm/data_backup#hyper_backup). Il fonctionne de la même manière que Time Machine mais permet de faire une sauvegarde sur de multiples services, dont Amazon Drive.

La première sauvegarde peut être très longue selon votre connexion mais une fois qu'elle est terminée, il ne sauvegardera que les modifications apportées pour économiser de la place et de la bande passante et cela 3 fois par semaine pour ma part. Il permet de faire une sauvegarde sur plusieurs services externes mais aucun, excepté celui d'Amazon, ne m'a vraiment convaincu à ce jour. à voir dans le futur.

Ce sera très pratique malgré tout, pour facilement multiplier les sauvegardes hors site. Si jamais mon NAS venait à prendre feu ou à être volé, je pourrais facilement en racheter un et rapatrier l'ensemble de mon ancien NAS sur le nouveau via Amazon Drive.

## Cloud Station

J'ai récemment remplacé Dropbox par [Cloud Station](https://www.synology.com/fr-fr/dsm/6.1/cloud_file_syncing). Ce n'est pas un outil de sauvegarde à proprement parler puisqu'il est hébergé sur le NAS donc comme pour Time Machine, il est dépendant de la fiabilité du NAS. En revanche, je m'en sers pour partager des fichiers avec d'autres personnes et transférer le plus rapidement possible tous mes documents importants sur le NAS via internet, ce qui n'est pas possible avec Time Machine à l'heure actuelle.

L'application officielle Synology est disponible sur iOS et Android ce qui s'avère très sympa pour voir rapidement un fichier sans passer par toute l'arborescence du NAS. Il existe une application pour macOS qui fonctionne exactement comme ses concurrents avec une très bonne intégration au Finder donc c'est parfait pour moi, elle s'est se faire discrète c'est tout ce que je lui demande.

Je regrette, comme pour Dropbox, l'impossibilité de faire un filtre par nom de dossier pour éviter pas mal de transferts inutiles.

## Améliorations

Cette configuration telle qu'elle est aujourd'hui convient pour mes besoins. Elle est largement perfectible, j'en suis bien conscient.

Tout d'abord, j'ai besoin que mon MacBook soit allumé sur mon réseau local pour sauvegarder mes photos de l'iPhone autre part que sur iCloud, ce qui n'est pas pratique en vacances par exemple. Il reste toujours la solution de transférer les photos à la main directement sur le NAS depuis l'extérieur mais on perd la notion d'automatisation si importante. Pas top.

De plus, je n'ai qu'une sauvegarde hors site de mes données. L'idée à terme est de placer un deuxième NAS chez une personne de confiance pour y répliquer mes données de la même manière que sur Amazon Drive. Au moins elles ne pourront pas être supprimées au bon vouloir d'Amazon ou d'une autre compagnie de stockage dans le nuage. Le but est de trouver plusieurs services de cloud pour avoir plusieurs sites de réplications également mais les services ou les tarifs ne me conviennent toujours pas.

Ces axes sont peut être un peu exagérés mais sont, malgré tout, à prévoir pour être parfaitement serein dans un futur proche.

Je suis également très dépendant de services propriétaires comme Hyper Backup et Time Machine qui ne marchent que sur les produits des marques correspondantes, donc je reste très enfermé dans une prison dorée. Ces outils sont ce que j'ai trouvé de meilleur à ce jour mais on se désavantage, non négligeable, à prendre en compte.

J'espère pouvoir trouver rapidement un remplacent Open Source et aussi efficace, si vous avez des idées de solutions, je reste ouvert aux propositions.

## Conclusion

J'espère avoir pu donner des idées à certains ou avoir répondu à des questions pour d'autres.

Je vous souhaite un bon courage pour vos sauvegardes mais si je devais finir par un conseil : Sauvegardez ! S'il-vous-plaît. Je vois encore trop souvent des gens venir me voir car ils ont perdu les 5 dernières années de travail alors que la sauvegarde n'a jamais été aussi simple et rapide à réaliser. Je suis bien conscient que ce que je présente n'est pas accessible à tout le monde, mais je vous assure que vous préférez dépenser 6€ par mois dans un service très bien comme [CrashPlan](https://www.crashplan.com), que je conseille les yeux fermés pour commencer, que de perdre 5 années de travail.

Pour conclure, si vous avez pris conscience de son importance, parlez en autour de vous. La sauvegarde est encore trop perçue comme quelque chose de soit anodin soit complexe, cela doit changer, merci !

À bientôt !
