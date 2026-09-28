# Questions ouvertes

Faits non confirmés : tant qu'ils ne le sont pas, ils restent HORS du JSON-LD
(règle d'audit `mel-jsonld-faits-confirmes`).

## Ouvertes

1. **Coordonnées GPS, date de fondation (2010 ?), fourchette de prix** : à
   confirmer avant toute publication en données structurées.
2. **Maillage** : `/docteur-jocelyne-fassotte` et `/galerie` ne sont liées que
   par le menu et le pied de page (avertissement d'audit). Ajouter des liens
   dans le texte de l'accueil ?
3. **Week-end** : non mentionné sur l'agenda ; le site n'en dit rien.

## Tranchées (28/09/2026, Georges)

- **Téléphone** : le GSM +32 495 28 09 76, partout. Page rendez-vous et bouton
  de l'accueil corrigés en base (`supabase/contenu/2026-09-28-…sql`).
- **Horaires** : mercredi et vendredi 9h30-12h00 et 13h30-19h00, jeudi
  9h30-12h00 et 14h00-18h00, sur rendez-vous ; lundi et mardi fermé. Affichés
  sur la page rendez-vous et publiés en JSON-LD.
- **Carte** : pas de carte Google Maps sur la page rendez-vous (bloc retiré ;
  plus d'iframe Google autorisée par la CSP).
- **Page « à propos »** : `/docteur-jocelyne-fassotte`, telle qu'en ligne.
- **Textes et publicité des actes esthétiques** : validés.
