# Guide Complet d'Implémentation du SEO Local

## 📍 Vue d'Ensemble

Ce guide détaille l'implémentation complète du SEO local pour le cabinet de médecine esthétique de la Dre Jocelyne Fassotte à Liège.

**Date de création**: 2025-10-06
**Version**: 1.0
**Statut**: Implémentation complète

---

## 📂 Structure des Fichiers Créés

### 1. Constantes et Configuration
```
src/constants/businessInfo.ts
```
Fichier central contenant toutes les informations NAP (Name, Address, Phone) et métadonnées du cabinet.

### 2. Utilitaires
```
src/utils/structuredData.ts
src/utils/localSEO.ts
```
Fonctions pour générer les données structurées et le contenu SEO local.

### 3. Composants
```
src/components/StructuredData.tsx
src/components/LocalSEO/NAPInfo.tsx
src/components/LocalSEO/GoogleBusinessProfile.tsx
src/components/LocalSEO/LocalSEOHead.tsx
```

---

## 🎯 Implémentation

### Étape 1: Informations NAP (Name, Address, Phone)

Le fichier `businessInfo.ts` centralise toutes les informations du cabinet :

```typescript
import { BUSINESS_INFO } from '../constants/businessInfo';

// Accès aux informations
BUSINESS_INFO.name              // "Cabinet Médical Dre Jocelyne Fassotte"
BUSINESS_INFO.contact.phone     // "+32 495 28 09 76"
BUSINESS_INFO.contact.email     // "doc.jofassotte@proximus.be"
BUSINESS_INFO.address.full      // Adresse complète
BUSINESS_INFO.geo.latitude      // 50.6183
BUSINESS_INFO.geo.longitude     // 5.5967
```

**✅ Avantages**:
- Source unique de vérité pour toutes les informations
- Facilite les mises à jour (un seul endroit à modifier)
- Garantit la cohérence NAP sur tout le site

---

### Étape 2: Données Structurées Schema.org

#### 2.1 Utilisation du Composant StructuredData

**Dans App.tsx ou layout principal**:
```tsx
import { HelmetProvider } from 'react-helmet-async';
import StructuredData from './components/StructuredData';

function App() {
  return (
    <HelmetProvider>
      <StructuredData type="aggregate" />
      {/* Votre contenu */}
    </HelmetProvider>
  );
}
```

#### 2.2 Types de Données Structurées Disponibles

**a) Organisation / Local Business (Global)**
```tsx
<StructuredData type="aggregate" />
```
Génère un schéma complet incluant:
- MedicalBusiness
- Physician (médecin)
- Coordonnées et horaires
- Zone de service

**b) Service Spécifique (Page de traitement)**
```tsx
<StructuredData
  type="service"
  data={{
    name: "Injection Acide Hyaluronique",
    description: "Restauration des volumes et comblement des rides",
    url: "/acide-hyaluronique-liege"
  }}
/>
```

**c) FAQ (Page avec questions/réponses)**
```tsx
<StructuredData
  type="faq"
  data={[
    {
      question: "Le traitement est-il douloureux ?",
      answer: "L'inconfort est minimal grâce à la crème anesthésiante..."
    }
  ]}
/>
```

**d) Breadcrumb (Fil d'Ariane)**
```tsx
<StructuredData
  type="breadcrumb"
  data={[
    { name: "Accueil", url: "/" },
    { name: "Traitements", url: "/traitements" },
    { name: "Acide Hyaluronique", url: "/acide-hyaluronique-liege" }
  ]}
/>
```

---

### Étape 3: Composant NAP Info

Affiche les informations de contact avec micro-données Schema.org.

#### 3.1 Variantes Disponibles

**Variante Full (Par défaut)**:
```tsx
import NAPInfo from './components/LocalSEO/NAPInfo';

<NAPInfo variant="full" showIcons={true} />
```
Affiche téléphone, email et adresse complète avec icônes.

**Variante Compact**:
```tsx
<NAPInfo variant="compact" showIcons={true} />
```
Format condensé pour footer ou sidebar.

**Variante Inline**:
```tsx
<NAPInfo variant="inline" className="text-sm text-neutral-600" />
```
Texte en ligne pour mentions légales ou footer.

#### 3.2 Exemple d'Intégration dans Contact.tsx

```tsx
import NAPInfo from '../components/LocalSEO/NAPInfo';

const Contact = () => {
  return (
    <section>
      <h2>Informations de Contact</h2>
      <NAPInfo variant="full" showIcons={true} />
    </section>
  );
};
```

---

### Étape 4: Google Business Profile Widget

Composant interactif avec carte Google Maps intégrée.

```tsx
import GoogleBusinessProfile from './components/LocalSEO/GoogleBusinessProfile';

<GoogleBusinessProfile
  showReviews={true}
  showMap={true}
  className="my-8"
/>
```

**Fonctionnalités**:
- ✅ Carte Google Maps embed
- ✅ Informations de contact cliquables
- ✅ Boutons CTA (Itinéraire, Appeler)
- ✅ Lien vers profil Google Business
- ✅ Horaires d'ouverture

**Intégration Recommandée**:
- Page Contact (obligatoire)
- Page À Propos
- Footer de chaque page (version compacte)

---

### Étape 5: Meta Tags SEO Local

Le composant `LocalSEOHead` génère automatiquement tous les meta tags nécessaires.

```tsx
import LocalSEOHead from './components/LocalSEO/LocalSEOHead';

<LocalSEOHead
  title="Injection Acide Hyaluronique"
  description="Traitement à l'acide hyaluronique à Liège par la Dre Fassotte..."
  canonicalUrl="https://www.fassotte.be/acide-hyaluronique-liege"
/>
```

**Meta Tags Générés Automatiquement**:
- ✅ Titre et description
- ✅ Canonical URL
- ✅ Geo tags (région, coordonnées)
- ✅ Open Graph (Facebook, LinkedIn)
- ✅ Twitter Cards
- ✅ Langue et locale (fr-BE)
- ✅ Robots et indexation

---

### Étape 6: Fonctions Utilitaires SEO Local

#### 6.1 Génération de Mots-clés Locaux

```typescript
import { generateLocalKeywords } from '../utils/localSEO';

const keywords = generateLocalKeywords('Acide Hyaluronique');
// Résultat: [
//   "Acide Hyaluronique Liège",
//   "Acide Hyaluronique Vaux-sous-Chèvremont",
//   "médecine esthétique Liège",
//   ...
// ]
```

#### 6.2 Génération de Titres avec Localisation

```typescript
import { generateLocationTitle } from '../utils/localSEO';

const title = generateLocationTitle('Acide Hyaluronique', true);
// "Acide Hyaluronique à Liège - Dre Jocelyne Fassotte"
```

#### 6.3 Génération de Descriptions Localisées

```typescript
import { generateLocationDescription } from '../utils/localSEO';

const desc = generateLocationDescription(
  'Injection Acide Hyaluronique',
  'Restauration naturelle des volumes du visage'
);
// Génère une description complète avec localisation et informations de contact
```

#### 6.4 Texte de Citation (NAP)

```typescript
import { generateCitationText } from '../utils/localSEO';

const citation = generateCitationText('full');
// "Cabinet Médical Dre Jocelyne Fassotte, Rue Edouard Sarlet 31..."
```

#### 6.5 Zones Desservies

```typescript
import { generateAreaServedText } from '../utils/localSEO';

const areas = generateAreaServedText();
// "Liège, Vaux-sous-Chèvremont, Chaudfontaine, Beyne-Heusay et Fléron"
```

#### 6.6 URLs Google Maps

```typescript
import {
  getGoogleMapsEmbedUrl,
  getGoogleMapsDirectionsUrl,
  getWazeUrl
} from '../utils/localSEO';

// Embed pour iframe
const embedUrl = getGoogleMapsEmbedUrl(15); // zoom niveau 15

// Directions depuis une adresse
const directionsUrl = getGoogleMapsDirectionsUrl('Bruxelles');

// Waze navigation
const wazeUrl = getWazeUrl();
```

---

## 🔧 Configuration Google Business Profile

### 1. Création du Profil

**URL**: https://business.google.com

#### Informations à Renseigner

**Nom de l'établissement**:
```
Cabinet Médical Dre Jocelyne Fassotte
```

**Catégorie principale**:
```
Médecin esthétique
```

**Catégories secondaires**:
- Cabinet médical
- Service de dermatologie
- Clinique médicale

**Adresse**:
```
Rue Edouard Sarlet 31
4051 Vaux-sous-Chèvremont
Liège, Belgique
```

**Zone de service**: 30 km autour de Liège
- Liège
- Vaux-sous-Chèvremont
- Chaudfontaine
- Beyne-Heusay
- Fléron
- Verviers
- Spa

**Téléphone**:
```
+32 495 28 09 76
```

**Site Web**:
```
https://www.fassotte.be
```

**Horaires**:
```
Lundi:    09:00 - 18:00
Mardi:    09:00 - 18:00
Mercredi: 09:00 - 18:00
Jeudi:    09:00 - 18:00
Vendredi: 09:00 - 18:00
Samedi:   Fermé
Dimanche: Fermé

Note: Sur rendez-vous uniquement
```

### 2. Optimisation du Profil

#### Photos à Ajouter (Minimum)
- ✅ Logo du cabinet (400x400 px)
- ✅ Photo de façade/extérieur
- ✅ Salle d'attente
- ✅ Cabinet de consultation
- ✅ Portrait professionnel de la Dre Fassotte
- ✅ Photos avant/après (avec consentement)

#### Description (750 caractères max)

```
Le Cabinet de Médecine Esthétique de la Dre Jocelyne Fassotte est situé à Vaux-sous-Chèvremont, près de Liège. Diplômée du CIME Paris V (Collège International de Médecine Esthétique), la Dre Fassotte propose une gamme complète de traitements non chirurgicaux : injections d'acide hyaluronique, toxine botulique, stimulateurs de collagène, fils tenseurs, peeling médical, mésolift et cosmétologie médicale. Alliant expertise médicale et sens artistique, elle offre des résultats naturels et harmonieux, personnalisés selon vos besoins. Consultations sur rendez-vous.
```

#### Services à Lister
Pour chaque service, créer une entrée avec:
- Nom du service
- Description courte
- Prix indicatif ou "Sur devis"

Exemple:
```
Service: Injection Acide Hyaluronique
Description: Restauration des volumes, comblement des rides
Prix: Sur devis après consultation
```

### 3. Posts Réguliers

Publier **au moins 1 post par semaine**:

**Types de posts recommandés**:
1. **Nouveautés**: Nouveaux traitements, techniques
2. **Éducation**: Explication d'un traitement
3. **Événements**: Formations, congrès
4. **Offres**: Promotions saisonnières
5. **Actualités**: Actualité du cabinet

**Template de post**:
```
Titre: [Ex: "Le Mésolift pour une peau éclatante"]

Contenu:
Découvrez le traitement mésolift pour revitaliser votre peau en profondeur.
Cocktail de vitamines et acides aminés pour un teint lumineux et une
hydratation intense.

📞 Prenez rendez-vous: +32 495 28 09 76
🌐 Plus d'infos: www.fassotte.be/mesolift-liege

#MédecineEsthétique #Liège #Mésolift #BeautéNaturelle
```

### 4. Gestion des Avis

#### Encourager les Avis Clients

**Email post-consultation**:
```
Objet: Merci pour votre visite au cabinet

Chère Madame/Monsieur [Nom],

Je vous remercie pour votre confiance et votre visite au cabinet.

Si vous êtes satisfait(e) de votre traitement, je vous invite à partager
votre expérience sur notre profil Google Business. Votre avis aide d'autres
personnes à nous découvrir.

Lien direct: [Lien vers la page d'avis Google]

Bien cordialement,
Dre Jocelyne Fassotte
```

#### Répondre aux Avis

**Avis Positif (Template)**:
```
Merci beaucoup [Prénom] pour votre confiance et ce retour positif !
Je suis ravie que vous soyez satisfait(e) des résultats. À bientôt
au cabinet pour votre suivi.

Dre Jocelyne Fassotte
```

**Avis Négatif (Template)**:
```
Bonjour [Prénom],

Je suis désolée que votre expérience n'ait pas été à la hauteur de vos
attentes. Je vous invite à me contacter directement au +32 495 28 09 76
afin que nous puissions en discuter et trouver une solution.

Bien cordialement,
Dre Jocelyne Fassotte
```

---

## 📊 Citations et Annuaires Locaux

### Annuaires Prioritaires (Belgique)

#### 1. Google Business Profile
**URL**: https://business.google.com
**Priorité**: ⭐⭐⭐⭐⭐ CRITIQUE

#### 2. Pages Jaunes Belgique
**URL**: https://www.pagesdor.be
**Priorité**: ⭐⭐⭐⭐⭐

#### 3. Yelp Belgique
**URL**: https://www.yelp.be
**Priorité**: ⭐⭐⭐⭐

#### 4. Doctena
**URL**: https://www.doctena.be
**Priorité**: ⭐⭐⭐⭐⭐ (Prise de RDV en ligne)

#### 5. Doctoranytime
**URL**: https://www.doctoranytime.be
**Priorité**: ⭐⭐⭐⭐

#### 6. ZorgkaartvlaamsBrabant / Sante-Liege.be
**Priorité**: ⭐⭐⭐

#### 7. Facebook Business Page
**URL**: https://www.facebook.com/business
**Priorité**: ⭐⭐⭐⭐

#### 8. LinkedIn Company Page
**URL**: https://www.linkedin.com/company
**Priorité**: ⭐⭐⭐

### Format de Citation Standard

**Utiliser EXACTEMENT les mêmes informations partout**:

```
Nom: Cabinet Médical Dre Jocelyne Fassotte
Adresse: Rue Edouard Sarlet 31, 4051 Vaux-sous-Chèvremont, Liège, Belgique
Téléphone: +32 495 28 09 76
Email: doc.jofassotte@proximus.be
Site Web: https://www.fassotte.be
```

**⚠️ CRITIQUE**: La cohérence NAP est essentielle. Utiliser TOUJOURS le même format.

---

## 🗺️ Intégration Google Maps

### Option 1: Embed Direct (Iframe)

```tsx
<iframe
  src={`https://www.google.com/maps?q=${BUSINESS_INFO.geo.latitude},${BUSINESS_INFO.geo.longitude}&hl=fr&z=15&output=embed`}
  width="100%"
  height="400"
  style={{ border: 0 }}
  allowFullScreen
  loading="lazy"
  title="Localisation du cabinet"
/>
```

### Option 2: Lien vers Google Maps

```tsx
<a
  href={BUSINESS_INFO.geo.mapUrl}
  target="_blank"
  rel="noopener noreferrer"
>
  Voir sur Google Maps
</a>
```

### Option 3: Bouton Itinéraire

```tsx
<a
  href={getGoogleMapsDirectionsUrl()}
  className="btn btn-primary"
>
  Obtenir l'itinéraire
</a>
```

---

## 📝 Contenu Localisé

### Templates de Contenu par Page

#### Page de Traitement

```tsx
import { generateLocationContent } from '../utils/localSEO';

const content = generateLocationContent({
  treatmentName: "Injection Acide Hyaluronique",
  benefits: [
    "Résultats naturels et harmonieux",
    "Technique douce et peu invasive",
    "Consultation personnalisée"
  ],
  duration: "6 à 18 mois"
});
```

**Résultat**:
```
Le cabinet de la Dre Jocelyne Fassotte propose des traitements de Injection
Acide Hyaluronique à Vaux-sous-Chèvremont et dans toute la région de Liège.

Situé à Vaux-sous-Chèvremont, notre cabinet est facilement accessible depuis
Liège, Chaudfontaine, Beyne-Heusay, Fléron et Verviers.

Nos traitements de Injection Acide Hyaluronique offrent de nombreux avantages :
• Résultats naturels et harmonieux
• Technique douce et peu invasive
• Consultation personnalisée

Durée des résultats : 6 à 18 mois

Pour prendre rendez-vous au cabinet de Vaux-sous-Chèvremont, contactez-nous
au +32 495 28 09 76 ou par email à doc.jofassotte@proximus.be.
```

#### Section "Zones Desservies"

```tsx
import { generateNearbyLocations } from '../utils/localSEO';

const NearbyLocations = () => {
  const locations = generateNearbyLocations();

  return (
    <section>
      <h2>Nos Patients Viennent de Toute la Région</h2>
      <p>
        Le cabinet est idéalement situé et facilement accessible depuis :
      </p>
      <ul>
        {locations.map(location => (
          <li key={location.name}>
            <strong>{location.name}</strong> - {location.distance}
            (environ {location.travelTime})
          </li>
        ))}
      </ul>
    </section>
  );
};
```

---

## ✅ Checklist d'Implémentation

### Phase 1: Configuration de Base (Semaine 1)

- [x] Créer `businessInfo.ts` avec toutes les informations NAP
- [x] Implémenter les données structurées Schema.org
- [x] Ajouter le composant StructuredData dans App.tsx
- [ ] Vérifier avec Google Rich Results Test
- [ ] Créer Google Business Profile
- [ ] Ajouter photos et description

### Phase 2: Composants NAP (Semaine 1-2)

- [x] Créer le composant NAPInfo
- [ ] Intégrer NAPInfo dans Footer
- [ ] Intégrer NAPInfo dans page Contact
- [ ] Vérifier cohérence NAP sur toutes les pages
- [ ] Tester les micro-données avec Google

### Phase 3: Google Business Integration (Semaine 2)

- [x] Créer composant GoogleBusinessProfile
- [ ] Intégrer dans page Contact
- [ ] Ajouter carte Google Maps
- [ ] Configurer les boutons CTA
- [ ] Tester sur mobile

### Phase 4: Meta Tags SEO (Semaine 2-3)

- [x] Créer composant LocalSEOHead
- [ ] Ajouter meta tags sur toutes les pages
- [ ] Configurer Open Graph
- [ ] Configurer Twitter Cards
- [ ] Vérifier avec validateurs

### Phase 5: Contenu Localisé (Semaine 3-4)

- [ ] Ajouter sections "Zones desservies" sur pages principales
- [ ] Optimiser titres H1 avec localisation
- [ ] Ajouter mentions locales dans descriptions
- [ ] Créer page "Accès et localisation"
- [ ] Ajouter FAQ avec contenu local

### Phase 6: Citations et Annuaires (Semaine 4-6)

- [ ] Inscrire sur Google Business Profile
- [ ] Inscrire sur Pages Jaunes Belgique
- [ ] Inscrire sur Yelp Belgique
- [ ] Inscrire sur Doctena
- [ ] Inscrire sur Doctoranytime
- [ ] Créer page Facebook Business
- [ ] Créer page LinkedIn Company

### Phase 7: Monitoring (Continue)

- [ ] Configurer Google Search Console
- [ ] Configurer Google Analytics avec filtres locaux
- [ ] Suivre positions pour mots-clés locaux
- [ ] Surveiller avis Google Business
- [ ] Publier posts réguliers (1/semaine)

---

## 📈 KPIs et Suivi

### Métriques SEO Local

**Positions Google (à suivre mensuellement)**:
- "médecine esthétique Liège"
- "acide hyaluronique Liège"
- "botox Liège"
- "médecin esthétique Liège"
- "cabinet médecine esthétique Vaux-sous-Chèvremont"

**Google Business Profile**:
- Nombre de vues du profil
- Nombre de clics sur le site web
- Nombre d'appels téléphoniques
- Demandes d'itinéraire
- Note moyenne et nombre d'avis

**Google Search Console**:
- Impressions pour requêtes locales
- CTR (taux de clics)
- Position moyenne
- Pages les plus performantes

**Google Analytics**:
- Trafic organique local
- Taux de conversion
- Durée de session
- Pages par session
- Taux de rebond

### Objectifs 3 Mois

- ✅ Top 3 Google pour "médecine esthétique Liège"
- ✅ Top 5 Google pour tous les traitements + Liège
- ✅ 20+ avis Google (note moyenne > 4.5)
- ✅ +50% trafic organique local
- ✅ Pack Local (3-Pack) Google Maps

### Objectifs 6 Mois

- ✅ #1 Google pour "médecine esthétique Liège"
- ✅ 50+ avis Google (note moyenne > 4.7)
- ✅ +100% trafic organique local
- ✅ Présence sur 10+ annuaires locaux
- ✅ 10+ posts Google Business par mois

---

## 🛠️ Outils Recommandés

### Validation et Test

1. **Google Rich Results Test**
   - URL: https://search.google.com/test/rich-results
   - Teste les données structurées

2. **Schema Markup Validator**
   - URL: https://validator.schema.org
   - Valide la syntaxe Schema.org

3. **Google Search Console**
   - URL: https://search.google.com/search-console
   - Suivi indexation et performances

4. **Google My Business Insights**
   - URL: https://business.google.com
   - Analytics du profil Google

5. **BrightLocal Citation Tracker**
   - URL: https://www.brightlocal.com
   - Suivi des citations NAP

### SEO Local

1. **Whitespark Local Citation Finder**
   - Trouve les opportunités de citations locales

2. **Moz Local**
   - Gestion centralisée des citations

3. **Yext**
   - Distribution automatisée des informations

---

## 📚 Ressources et Documentation

### Guides Google

- [Google Business Profile Help](https://support.google.com/business)
- [Local SEO Guide](https://developers.google.com/search/docs/advanced/guidelines/local-business)
- [Structured Data Guidelines](https://developers.google.com/search/docs/advanced/structured-data)

### Schema.org

- [MedicalBusiness](https://schema.org/MedicalBusiness)
- [Physician](https://schema.org/Physician)
- [PostalAddress](https://schema.org/PostalAddress)
- [GeoCoordinates](https://schema.org/GeoCoordinates)

### Bonnes Pratiques

1. **Cohérence NAP**: Utiliser EXACTEMENT le même format partout
2. **Citations de qualité**: Privilégier annuaires pertinents
3. **Avis clients**: Encourager et répondre systématiquement
4. **Contenu local**: Mentionner villes et quartiers desservis
5. **Photos**: Mettre à jour régulièrement le profil Google

---

## ⚠️ Erreurs à Éviter

### ❌ NAP Incohérent

**Mauvais**:
```
Site Web: "Dre Fassotte"
Google:   "Dr. Jocelyne Fassotte"
Yelp:     "Docteur J. Fassotte"
```

**Bon**:
```
Partout: "Cabinet Médical Dre Jocelyne Fassotte"
```

### ❌ Adresse Différente

**Mauvais**:
```
Site Web: "31 Rue Edouard Sarlet"
Google:   "Rue E. Sarlet 31"
```

**Bon**:
```
Partout: "Rue Edouard Sarlet 31"
```

### ❌ Téléphone Variable

**Mauvais**:
```
Site Web: "0495 28 09 76"
Google:   "+32 495 280 976"
```

**Bon**:
```
Partout: "+32 495 28 09 76"
```

### ❌ Données Structurées Invalides

- Toujours valider avec Google Rich Results Test
- Respecter les types Schema.org
- Inclure toutes les propriétés requises

### ❌ Profil Google Non Optimisé

- Ajouter au minimum 10 photos
- Remplir TOUTES les sections
- Publier régulièrement (minimum 1x/semaine)
- Répondre à TOUS les avis (positifs et négatifs)

---

## 🎓 Formation Continue

### Veille SEO Local

**Blogs à Suivre**:
- Moz Local Blog
- Search Engine Land (Local Search)
- BrightLocal Blog
- Google Search Central Blog

**Mises à Jour Google**:
- Suivre les Google Core Updates
- Tester les nouveautés Google Business Profile
- Adapter la stratégie selon les changements

### Optimisations Continues

**Mensuel**:
- Publier 4+ posts Google Business
- Répondre aux avis
- Analyser les KPIs
- Ajuster mots-clés

**Trimestriel**:
- Audit complet NAP
- Mise à jour photos
- Révision contenu local
- Analyse concurrence

**Annuel**:
- Audit SEO complet
- Révision stratégie
- Nouveaux annuaires
- Formation équipe

---

*Document créé le: 2025-10-06*
*Dernière mise à jour: 2025-10-06*
*Version: 1.0*
*Auteur: Équipe SEO Local*
