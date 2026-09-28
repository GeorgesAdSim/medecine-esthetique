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

4. **Sources externes (lot 5)** — la page Botox cite désormais la notice
   officielle belge (RCP Vistabel, e-compendium.be). Trois écarts avec cette
   notice sont corrigés dans `supabase/contenu/2026-09-28-botox-sources.sql`
   (NON APPLIQUÉ, à valider par la docteure) : durée « jusqu'à environ 4 mois »
   au lieu de 4 à 6 mois ; chute de paupière = effet **fréquent** (pas « rare ») ;
   « aucun effet de rebond » retiré (non sourcé). Reste à trancher : « à partir de
   25-30 ans en prévention » (la notice parle d'adultes, sans indication préventive).
5. **Les 7 autres pages de traitement** (`docs/sources/2026-09-28-sources-traitements.md`) :
   environ un tiers des affirmations contredisent les sources officielles, dont des
   affirmations de sécurité aujourd'hui en ligne (« aucun risque allergique »,
   « tous les effets sont temporaires », « risques très rares », « sécurité prouvée »,
   « non palpables », BBL non chirurgical). Pour sourcer au plus juste, il faut
   savoir **quels produits la docteure utilise** : marques d'acide hyaluronique,
   stimulateurs (Sculptra ? Radiesse ?), type de fils (PDO ou PLLA/PLGA), mélanges
   de mésothérapie, gamme de cosmétiques — idéalement avec leur notice CE.

6. **Corrections de sécurité des 7 pages (lot 7)** — brouillon
   `supabase/contenu/2026-09-28-corrections-securite.sql` (NON APPLIQUÉ), à relire
   par la docteure. Trois choix à valider en priorité :
   - **Mésolift** : un encadré dit que la HAS et l'Inserm jugent l'efficacité non
     démontrée. C'est exact et sourcé ; à garder, reformuler ou retirer la page.
   - **Fils tenseurs** : le texte ne dit plus « en PDO » (les fils à cônes
     bidirectionnels étudiés sont en PLLA/PLGA) et parle d'un effet lifting qui
     s'atténue en quelques semaines à quelques mois. Quelle marque de fils ?
   - **Stimulateurs** : le « Brazilian Butt Lift non chirurgical » est retiré
     (mise en garde de la FDA contre les injections dans les fesses).

## Tranchées (28/09/2026, Georges)

- **Pages filles (lot 8)** : on ne parle pas du « lip flip » (ni de toxine
  botulique sur la page lèvres) ; pour les cernes, pas de refus affiché —
  l'indication se décide au cas par cas, selon la personne, ses besoins et la
  faisabilité.

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
