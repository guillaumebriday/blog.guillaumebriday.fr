---
title: 'Macbook Pro avec Touch Bar : Un an plus tard'
layout: post
category: Billets
---
Depuis la sortie du MacBook Pro 2016, j'entends un peu tout et n'importe quoi à son sujet. Je vais essayer de faire un retour d'expérience après presque un an d'usage. L'idée est de casser un peu les mythes et légendes que j'entends, mais aussi de les appuyer si besoin. Généralement les retours que j'ai sont ceux de gens qui n'ont jamais eu le produit entre les mains ou qui ne se sont jamais demandés pourquoi Apple avait fait ces choix.

C'est pourquoi je tenais à en parler une dernière fois à l'écrit, car je dois le répéter beaucoup trop souvent à l'oral. Bonne lecture !

## Ce que je trouve génial

### La touch bar

C'est bien entendu la grande nouveauté de ce modèle 2016 ! Beaucoup l'ont présenté comme un "écran à émoji" pendant longtemps, car Apple a beaucoup insisté dessus pendant le Keynote de présentation.

Je me rends compte que la plupart des gens qui trouvent cette Touch Bar inutile ou peu pratique sont souvent ceux qui ne l'ont jamais essayé ou qui n'ont pas voulu voir plus loin que la présentation officielle.

Une fois qu'on découvre tout son potentiel, on ne peut plus s'en passer, vraiment. Imaginez que pour chaque applications, vous pouvez définir une action, un ensemble d'actions ou un raccourci via un bouton personnalisé de votre choix ! Plus besoin d'apprendre des milliers de raccourcis souvent peu pratique (j'y reviendrais), plus besoin de faire une suite d'action, tout peut se faire tout seul. Avant, je devais apprendre des alias ou écrire des commandes à rallonge, maintenant j'appuie sur un bouton.

Et c'est là toute la force de la Touch Bar, Apple a laissé aux développeurs la possibilité de tout faire dessus. Elle est d'une réactivité déconcertante, l'écran OLED est sublime et de nouveau geste sont apparu pour changer le volume ou la luminosité de l'écran par exemple.

On m'a quand même dit un jour, qu'il n'était plus possible d'avoir la touche <kbd>esc</kbd> ou de mute le son via les touches de contrôles...

Il y a un article officiel sur l'[Utilisation de la Touch Bar](https://support.apple.com/fr-fr/HT207055) qui fourni déjà beaucoup d'informations.

On remarque tout d'abord que la Touch Bar est complètement optionnelle, donc si vraiment on veut le nouveau modèle sans pour autant être forcé de s'en servir, c'est possible !

![Les modes d'affichage de la Touch Bar](touch-bar-shows.jpg)

Les applications natives de macOS intègrent particulièrement bien cet outil. C'est parfaitement adapté dans mon Workflow quand je travaille sur Photos, ou sur Pages, Keynote et Numbers et je ne réfléchis même plus pour m'en servir, les boutons tombent sous mes doigts.

Mais rentrons un peu plus en détail. Pour ce qui est du ```Control Strip```, on peut définir différentes actions, quatre au maximum. C'est un point fondamental par rapport à un clavier physique, on peut choisir les touches que l'on veut. Petite astuce sympa, pour le volume et la luminosité, on peut rester appuyé sur le bouton et slider dans un sens ou l'autre pour faire notre réglage, on retrouve un comportement très proche que celui sur iPhone par exemple, je trouve ça beaucoup plus agréable que de devoir cliquer plusieurs fois sur un bouton.

![Les réglages du Control Strip](control-strip-settings.png)

Ce n'est pas tout. Pour ce qui est des applications qui ne sont pas fournies avec macOS, il y a deux scénarios.

Les développeurs ont directement intégré le support de la Touch Bar et dans ce cas vous pouvez avoir une interaction direct avec l'application et personnalisé l'affichage. Et pour les applications non compatible, la Touch Bar n'affichera rien, que du noir, pour ne pas distraire.

Même un an après, il faut être honnête, assez peu d'applications l'intègre et parmi celles-ci, beaucoup le font très maladroitement. Pour être plus clair, je vais prendre l'exemple de Chrome, qui a ajouté la gestion récemment.

Au lieu de proposer une réelle intégration de l'application dans la Touch Bar, comme par exemple un raccourci vers nos bookmarks, onglets ouverts et ce genre de contenu qui s'adaptent, on a juste des boutons de l'interface standard. À savoir, les boutons précédents / suivants, recharger et l'omnibox et dans ce cas je vous l'accorde, la Touch Bar n'a aucune plus value.

Heureusement pour nous, des applications peuvent utiliser la Touch Bar de manière globale et prendre son contrôle que l'application intègre le support ou pas.

[BetterTouchTool](https://www.boastr.net/) en fait partie et le fait à la perfection. Je ne vais pas faire une présentation complète de BTT, il faudra un article à part entière, mais pour faire rapide c'est une application qui tourne en tâche de fond et qui vous permet de personnaliser des raccourcis claviers, souris, Touch Bar etc. pour exécuter tout un tas d'actions systèmes.

L'idée va être, pour chaque application que vous voulez, définir des boutons avec un texte, une icône et une action. Les actions peuvent être des raccourcis clavier ou des actions système et plusieurs peuvent être enchaînées automatiquement. Je vous laisse imaginer le potentiel de cette solution pendant que je regrette encore qu'Apple ne l'ai pas intégré par défaut dans macOS.

Je vais aller droit au but et montrer quelques exemples que j'utilise désormais quotidiennement pour mieux comprendre.

Dans mon éditeur de texte [VSCode](https://github.com/Microsoft/vscode) :

![Ma Touch Bar sur VSCode](touch-bar-vscode.png)

Pour le Finder :

![Ma Touch Bar sur Finder](touch-bar-finder.png)

Bien entendu, la valeur de <kbd>CPU Temp</kbd> s'actualise en temps réel.

Pour Safari :

![Ma Touch Bar sur Safari](touch-bar-safari.png)

Mes raccourcis peuvent surprendre, mais je peux vous assurer que d'appuyer sur un bouton <kbd>Go to top</kbd> ou <kbd>Dernier onglet</kbd> est bien plus agréable à l'usage que de se torde le poignet pour avoir le raccourci équivalent. On peut les faire sans quitter la main de la souris !

Pour Tweetbot :

![Ma Touch Bar sur Tweetbot](touch-bar-tweetbot.png)

Pour iTerm :

![Ma Touch Bar sur iTerm](touch-bar-iterm.png)

Si vous êtes développeur, je pense que cela peut être la partie la plus intéressante. Il y a énormément de cas où l'on est amené à faire un enchainement de raccourci clavier dans certains outils (je pense à vim pour sauvegarde et quitter un fichier), mais également à ré-écrire plusieurs fois de longues commandes.

La première solution est de faire des [alias](https://en.wikipedia.org/wiki/Alias_(command)) pour nous simplifier un peu la vie, mais il y en a des tonnes, on ne sait pas toujours comment les nommer, parfois on met le même nom, etc. vous voyez très bien de quoi je veux parler. Je m'en sers tout le temps, mais ce n'est pas toujours optimal, il faut le reconnaitre. Je suis très fainéant et je n'aime pas répéter ou chercher les mêmes actions plusieurs fois, qui plus est lorsque je dois le faire des centaines de fois par jour.

Avant pour sauvegarder et quitter sur vim, je devais :

+ Appuyer sur <kbd>esc</kbd>
+ Appuyer sur <kbd>:</kbd>
+ Appuyer sur <kbd>w</kbd> puis <kbd>q</kbd>
+ Appuyer sur <kbd>Entré</kbd>

Aujourd'hui, je dois :

+ Appuyer sur <kbd>Save</kbd>

Un autre exemple avec les tests unitaires et fonctionnels. Selon le langage utilisé, la commande pour lancer les tests n'est pas la même. Ainsi la création d'un alias devient en quelque sorte compromie, car on se retrouve à raccourcir le nom de la commande, ou à l'inverse mettre des noms super explicite et long pour décrire une commande complexe et on s'y perd un peu.

Avec mon bouton ```PHPUnit```, il écrit et exécute pour moi la commande :

```bash
$ ./vendor/bin/phpunit
```

Pareil pour Rspec :

```bash
$ bundle exec rspec
```

Vous avez compris le concept, mais je peux vous assurer qu'une fois qu'on y a goûté la Touch Bar prend vraiment tout son sens.

Pour les emoji dans iTerm:

![Ma Touch Bar sur iTerm emoji](touch-bar-iterm-emoji.png)

On peut également faire des groupes pour avoir un même type d'action dans un même dossier, c'est assez pratique.

Et je pourrais continuer comme ça pour toutes mes applications ou presque. Il y a quelques exemples très sympa et complet sur le [site officiel](http://docs.bettertouchtool.net/docs/touch_bar.html) avec également les widgets que je n'utilise pas personnellement. On voit très bien que tout est personnalisable, c'est vraiment ce qu'il faut retenir, il n'y a plus de limite.

La configuration est un jeu d'enfant. Il suffit de créer un bouton, ajouter un texte et une icône (optionnel) ainsi qu'une action et c'est tout. Pas de redémarrage nécessaire ou de rechargement, tout est en live.

![Interface de better touch tool](better-touch-tool.jpg)

L'ensemble de ma configuration est disponible sur [mon Github](https://github.com/guillaumebriday/dotfiles).

### Le Thunderbolt 3 et le Type C

J'en avais déjà parlé dans [Un Mac pour le prix de deux](/un-mac-pour-le-prix-de-deux) et je peux le confirmer maintenant, le Thunderbolt 3 est absolument fantastique.

Je ne reviendrais pas dessus, mais à l'usage, rien que pouvoir mettre son câble dans les deux sens et de n'importe quel côté du Mac c'est top. Je pensais que le MagSafe allait me manquer mais finalement pas du tout même après m'avoir pris les pieds dans le câble, il s'enlève sans faire de dégât.

Avec un seul port, je peux absolument tout faire et dans un avenir proche il ne restera que celui là je pense. En attendant, il suffit d'acheter les bons câbles ou de prendre des Hubs.

### L'écran

C'est un bijou pour les yeux. Je dis cela et pourtant j'ai vendu un MacBook Pro Retina et un iMac 5K pour cet ordinateur donc la barre était déjà élevée.

Les couleurs sont bien plus intenses et de même pour les contrastes. Les 500 nits de luminance permettent enfin de travailler sans forcer sur les yeux, au point où quand je retourne sur un écran moins lumineux je passe mon temps par réflexe à essayer d'augmenter la luminosité. Par conception, on limite ainsi beaucoup les reflets tout en gardant un écran magnifique.

On ne voit pas la couche de verre supérieur, ce qui donne la sensation que l'écran "flotte" au-dessus du clavier.  Je ne m'en rendais pas forcement compte avant de l'avoir dans les mains, mais il faut le tester pour comprendre la prouesse qui a été réalisée avec cet écran.

### Le trackpad

J'ai entendu des choses tellement surprenantes à son propos. "C'est trop grand", "on fait des actions qu'on ne veut pas", "Ça sert à rien", et j'en passe.

Je ne comprends pas un seul de ces reproches. Je les ai tous entendus de gens qui ne l'ont jamais testé voire jamais vu en vrai.

Il est immense, vraiment, nos paumes de mains reposent dessus lorsqu'on écrit au clavier. Est-ce gênant pour autant ou fait-on des actions par erreur ? Absolument pas. Comme sur tous les appareils tactiles d'Apple, les paumes de mains ou les doigts qui tiennent les écrans sont ignorés par le système. Donc comme sur l'iPhone ou l'iPad vous pouvez poser une paume ou un doigt bêtement sur le Trackpad et c'est comme s'il n'existait pas. C'est assez bluffant tant ce comportement fonctionne exactement comme on s'y attend.

À mon avis, je ne vois que des bénéfices à avoir un trackpad plus grand. C'est plus pratique pour faire des glisser-déposer sans avoir à le faire en deux étapes. On peut jeter notre main sous le clavier pour faire le geste que l'on veut sans viser le trackpad. Et enfin, je trouve ça plus esthétique que d'avoir des bords inutiles tout au-dessus et au-dessous.

### Le système audio

On ne le dit pas assez, mais le système audio a connu sa petite révolution dans cette génération de Mac. On a enfin un son digne de ce nom dans un ordinateur aussi compact. Vraiment, pour donner un ordre d'idée, j'ai des enceintes logitech vraiment sympa sur mon bureau, mais je m'en passe maintenant largement, car celles intégrées suffisent pour 95 % des usages. Les bases sont très présentes ce qui est rare, mais elles ne gênent pas pour autant les aiguës et les médiums.

Pour la petite anecdote, un collègue m'a demandé, depuis une autre pièce, quelle enceinte Bluetooth j'utilisais alors que j'avais seulement mon Mac ce jour-là.

### Le SSD

Ce SSD a beaucoup fait parler de lui et à raison. Les vitesses sont démentiels, elles avoisinent les 3 Go/s. Tout le système semble être alors beaucoup plus fluide et réactif. C'est vraiment une des nouveautés qui rend l'expérience vraiment excellente en restante très discrète.

### Le clavier

J'ai mis une semaine avant de m'habituer à ce nouveau clavier qui a une course très courte et qui fait plus de bruit qu'avant, mais à force je le trouve vraiment agréable. En réalité, je m'en suis rendu compte quand je suis retourné sur les anciennes générations. J'avais l'impression de devoir enfoncer énormément les touches pour pouvoir écrire et c'était beaucoup moins fluide.

Je pense pour le coup qu'il n'y a pas de mieux ou moins bien, c'est juste une question de feeling avec son clavier. Personnellement, revenir à des courses plus longues me semble compliqué.

## Ce que j'ai moins aimé

Tout n'est pas parfait dans ce Mac. Enfin, presque.

### Le chargeur
Apple a fait un changement étrange avec ce nouveau chargeur. Précédemment pour [89€](https://www.apple.com/fr/shop/product/MD506Z/A/adaptateur-secteur-magsafe-2-85w-apple-pour-macbook-pro-avec-écran-retina?fnode=8b) on avait une rallonge, le convertisseur et l'adaptateur secteur mural. Un indicateur de charge était directement sur le connecteur et un système pour enrouler la rallonge était intégrée au convertisseur. Un point négatif de l'ancien chargeur, c'est que le câble entre le convertisseur et le Mac n'était pas séparable. Cela reste un problème mineur comparé au nouveau chargeur.

Sur les modèles de 2016, tout est séparé en trois morceaux. On a d'un côté [la rallonge](https://www.apple.com/fr/shop/product/MK122Z/A/câble-extension-adaptateur-secteur?fnode=8b&fs=f%3D15_mbp_thdblt3_late2016%26fh%3D4595%252B4804), puis [l'adaptateur secteur](https://www.apple.com/fr/shop/product/MNF82Z/A/adaptateur-secteur-usb-c-87w-apple?fnode=8b&fs=f%3D15_mbp_thdblt3_late2016%26fh%3D4595%252B4804) et enfin un câble [Thunderbolt 3](https://www.apple.com/fr/shop/product/MLL82ZM/A/câble-de-charge-usb-c-2-m?fnode=8b&fs=f%3D15_mbp_thdblt3_late2016%26fh%3D4595%252B4804) (USB-C). Certains me diront que "cela est pratique", "que l'on peut changer qu'une partie si elle venait à être abimée", mais pour une fois mon problème : c'est le prix. Le convertisseur seul coûte maintenant 89€, la rallonge en coûte 25€(!) et le câble USB-C 25€ également. Il faudra qu'on m'explique ce qui justifie la différence de 50€.

### Et c'est tout ?

Pour être transparent, je n'ai pas grand-chose à reprocher à ce Mac au final. Je pense que c'est un produit qui est extrêmement abouti et qui définit une vision claire de ce que sera l'avenir de l'ordinateur portable. À savoir un ordinateur à la fois très puissant et complet en partie grâce au Thunderbolt 3 à la maison ou au bureau, mais très léger et compact une fois en déplacement.

## Conclusion

Voilà globalement ce que je peux dire de ce Mac après presque un an d'utilisation intensive.

J'ai vraiment envie d'avoir d'autres retours pertinents sur ce Mac, donc n'hésitez pas dans les commentaires.

Merci !
