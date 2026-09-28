# Questions ouvertes

Faits non confirmés : tant qu'ils ne le sont pas, ils restent HORS du JSON-LD
(règle d'audit `mel-jsonld-faits-confirmes`).

1. **Téléphone** : le site affiche deux numéros — +32 495 28 09 76 (en-tête,
   pied de page, JSON-LD) et 04/365.45.39 (page rendez-vous, et un lien cassé
   `/04/365.45.39` dans un bouton de l'accueil). Lequel est le numéro du
   cabinet ? Les deux ?
2. **Horaires** : « sur rendez-vous » est affiché, mais le code contenait
   « Mo-Fr 09:00-18:00 ». Quels sont les horaires réels ?
3. **Carte** : l'URL du plan Google Maps de la page rendez-vous contient des
   identifiants fictifs (`0x47c0f7a5a5a5a5a5…`) — à remplacer par l'intégration
   officielle de l'adresse.
4. **Coordonnées GPS, date de fondation (2010 ?), fourchette de prix** : à
   confirmer avant toute publication en données structurées.
5. **Page « à propos »** : `/docteur-jocelyne-fassotte` affiche la page
   `a-propos` de la base, alors qu'une page `docteur-jocelyne-fassotte` existe
   aussi (titre plus complet). Laquelle garder ?
6. **Maillage** : `/docteur-jocelyne-fassotte` et `/galerie` ne sont liées que
   par le menu et le pied de page (avertissement d'audit). Ajouter des liens
   dans le texte de l'accueil ?
7. **Publicité des actes esthétiques** (loi du 23 mai 2013) : les textes des
   pages (« résultats naturels », galerie avant/après) sont à faire relire.
