---
layout: post
title: "Problèmes de produits cartésiens sur MySQL"
category: Dev
---
Récemment, en travaillant sur un projet de développement Web, j'ai eu besoin d'utiliser la fonction d'agrégation ```SUM``` avec plusieurs ```JOIN```. J'ai rencontré un comportement étrange, à savoir que MySQL **doublait ou triplait les résultats attendus**. Ayant mis du temps à trouver une solution, je tenais à partager celle que j'avais trouvé avec quelques détails.

Dans mon cas, je devais récupérer la liste des factures encore impayées en comparant les lignes de factures et les paiements attribués. Le schéma, simplifié, de mes tables est le suivant :

**invoices**

| id | reference |
| -- | --------- |
| 1  | AAA       |

**invoice_lines**

| id | amount | invoice_id |
| -- | ------ | ---------- |
| 1  | 500    | 1          |
| 2  | 1000   | 1          |
| 3  | 2000   | 1          |

**payments**

| id | amount | invoice_id |
| -- | ------ | ---------- |
| 1  | 2000   | 1          |


La structure est assez simple à comprendre. Une facture peut avoir une infinité de lignes de facture et de paiements associés. Les paiements et lignes de facture ne sont pas relié entre eux.

Au total, on remarque que la facture ```AAA``` a déjà reçu un paiement de ```2000``` sur un total à payer de ```3500```, la facture n'est donc pas soldée.

Pour faire ma liste, je vais commencer avec cette requête :

```sql
/* Les SUM dans le SELECT sont temporaires et permettent de mieux comprendre ce qu'il se passe. */
SELECT invoices.*, SUM(payments.amount) AS paid_amount, SUM(invoice_lines.amount) AS due_amount
FROM invoices
JOIN payments ON invoices.id = payments.invoice_id
JOIN invoice_lines ON invoices.id = invoice_lines.invoice_id
GROUP BY invoices.id
HAVING SUM(payments.amount) < SUM(invoice_lines.amount);
```

Si j'exécute cette requête qui semble correcte, étrangement, aucune ligne n'est retournée. Si on enlève la condition du ```HAVING``` pour voir de ce qu'il en retourne, on obtient cela :

| id | reference | paid_amount | due_amount |
| -- | --------- | ----------- | ---------- |
| 1  | AAA       | 6000        | 3500       |

On remarque alors qu'il est indiqué que ```6000``` ont été payés au lieu des ```2000``` initialement, soit trois fois plus que prévu, ce qui correspond également au nombre de lignes de facture.

On peut alors ajouter une ligne de facture pour se rendre compte que le ```paid_amount``` passe alors à ```8000``` et ainsi de suite. De la même façon, si on ajoute un paiement, le montant du ```due_amount``` sera alors lui aussi multiplié par deux.

## Que se passe-t-il ?

N'ayant pas de relation direct entre les tables ```payments``` et ```invoice_lines``` mais ayant un ```GROUP BY``` sur les invoices, ce que va faire MySQL est assez simple.

Pour calculer la ```SUM```, il va pour chaque ```ROW``` trouvés, faire le [produit cartésien](https://fr.wikipedia.org/wiki/Produit_cartésien) avec toutes les tables dans les ```JOIN``` reliées aux ```invoices```.

En clair, pour chaque ```payments```, il va multiplier la valeur de ```amount``` par le nombre de lignes dans les ```invoice_lines``` et inversement, pour chaque ```invoice_lines``` il va multiplier la valeur de ```amount``` par le nombre de ```payments```.

Je ne sais pas pourquoi c'est le fonctionnement par défaut de MySQL, mais si vous avez la réponse, n'hésitez pas à la partager en commentaires.

## Comment résoudre notre problématique ?

Il existe plusieurs solutions actuellement. Tout d'abord, il est possible de faire des sous-requêtes dans la ```JOIN``` pour isoler les tables, mais je ne trouve pas cela très lisible.

Dans la [documentation officielle](https://dev.mysql.com/doc/refman/5.7/en/group-by-functions.html#function_sum), on nous explique que l'on peut rajouter le mot clé ```DISTINCT``` dans la méthode ```SUM``` pour forcer l'utilisation de valeurs différentes, donc utiliser les lignes qu'une seule fois.

Je rajoute donc des ```DISTINCT``` dans tous mes ```SUM``` :

```sql
/* Les SUM dans le SELECT sont temporaires et permettent de mieux comprendre ce qu'il se passe. */
SELECT invoices.*, SUM(DISTINCT payments.amount) AS paid_amount, SUM(DISTINCT invoice_lines.amount) AS due_amount
FROM invoices
JOIN payments ON invoices.id = payments.invoice_id
JOIN invoice_lines ON invoices.id = invoice_lines.invoice_id
GROUP BY invoices.id
HAVING SUM(DISTINCT payments.amount) < SUM(DISTINCT invoice_lines.amount);
```

Et cette fois-ci, ma facture non soldée apparait correctement avec les bons montants.

| id | reference | paid_amount | due_amount |
| -- | --------- | ----------- | ---------- |
| 1  | AAA       | 2000        | 3500       |


Bien sûr, si vous n'avez qu'un champ pour chaque table, vous ne verrez pas d'erreur. Cela fut mon cas pendant longtemps et avec beaucoup de données, c'est donc par chance que j'ai rencontré le problème avant de pouvoir le corriger.

## Conclusion

Si vous êtes amené à faire plusieurs ```JOIN``` avec des fonctions d'agrégations (aggregate functions), vérifiez bien tous les cas possibles pour éviter ce genre de désagrément, sinon ajouter les ```DISTINCT``` au besoin.

Cet article traitant d'un cas assez particulier, si vous avez des suggestions, des remarques ou des axes d'amélioration à apporter, n'hésitez pas à le faire savoir dans les commentaires.

Merci !
