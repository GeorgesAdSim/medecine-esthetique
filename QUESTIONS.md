# Questions ouvertes

Faits non confirmés : tant qu'ils ne le sont pas, ils restent HORS du JSON-LD
(règle d'audit `mel-jsonld-faits-confirmes`).

## Ouvertes

1. **Date de fondation (2010 ?), fourchette de prix** : à
   confirmer avant toute publication en données structurées.
2. **Week-end** : non mentionné sur l'agenda ; le site n'en dit rien.

3. **Page Botox enrichie (lot 3) — à valider par la Dre Fassotte avant d'écrire
   en base** (`supabase/contenu/2026-09-28-botox-enrichi.sql`, non appliqué) :
   - textes médicaux ajoutés : zones (rides du lion, front, pattes d'oie),
     précautions avant/après, contre-indications, effets secondaires, trois
     questions de FAQ. Rédigés d'après les connaissances générales sur la toxine
     botulique et le contenu déjà en ligne : la docteure doit les relire ;
   - **prix** : la FAQ dit « tarif selon le nombre de zones, communiqué en
     consultation », sans montant. Accepte-t-elle d'afficher un prix ou un
     « à partir de » ? (les concurrents qui le font captent « prix botox liège ») ;
   - **retouche / contrôle** à 15 jours : fait-elle un contrôle, gratuit ou non ?
   - **nom de marque « Botox »** : déjà utilisé sur le site (Botox® ou Vistabel®) ;
     à confirmer qu'il reste acceptable au regard des règles belges sur
     l'information en esthétique médicale et sur les médicaments.

## Tranchées (28/09/2026, Georges)

- **Téléphone** : le GSM +32 495 28 09 76, partout. Page rendez-vous et bouton
  de l'accueil corrigés en base (`supabase/contenu/2026-09-28-…sql`).
- **Horaires** : mercredi et vendredi 9h30-12h00 et 13h30-19h00, jeudi
  9h30-12h00 et 14h00-18h00, sur rendez-vous ; lundi et mardi fermé. Affichés
  sur la page rendez-vous et publiés en JSON-LD.
- **Carte** : pas de carte Google Maps sur la page rendez-vous (bloc retiré ;
  plus d'iframe Google autorisée par la CSP).
- **Page « à propos »** : `/docteur-jocelyne-fassotte`, telle qu'en ligne.
- **Position** : celle de la fiche Google Business Profile (50.6066396, 5.6285276),
  publiée en JSON-LD avec `hasMap` vers la fiche.
- **Maillage** : liens vers la galerie et la page de la Dre Fassotte depuis
  l'accueil et chaque page de traitement.
- **Textes et publicité des actes esthétiques** : validés.
