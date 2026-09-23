# 📋 PHASE 4 : PLAN D'ACTION POUR 100% D'ÉDITABILITÉ

## 🎯 OBJECTIF GLOBAL

**Passer de 45% à 100% d'éditabilité du site via le CMS**

### Métriques de succès
- ✅ 100% des pages éditables sans toucher au code
- ✅ 100% des éléments visuels modifiables (couleurs, polices, images)
- ✅ Menu de navigation dynamique
- ✅ Footer personnalisable
- ✅ Traitements éditables visuellement
- ✅ Système unifié (plus de double éditeur)
- ✅ Migration complète localStorage → Supabase

---

## 📊 ÉTAT ACTUEL vs OBJECTIF

| Élément | Maintenant | Objectif | Gap |
|---------|------------|----------|-----|
| Pages custom | ✅ 100% | ✅ 100% | - |
| Pages statiques (About, Contact, etc.) | ❌ 0% | ✅ 100% | **4 pages à migrer** |
| Traitements | ⚠️ 30% | ✅ 100% | **Éditeur visuel manquant** |
| Menu navigation | ❌ 0% | ✅ 100% | **Système dynamique à créer** |
| Footer | ❌ 0% | ✅ 100% | **Système dynamique à créer** |
| Couleurs/Polices | ⚠️ 50% | ✅ 100% | **Migration Supabase** |
| Gallery images | ✅ 80% | ✅ 100% | **Finalisation** |
| **GLOBAL** | **45%** | **100%** | **55% restant** |

---

## 🌊 DÉCOUPAGE EN 5 VAGUES DE TRAVAIL

### Vue d'ensemble

```
VAGUE 1 : Nettoyage & Unification (2-3 jours)
    ↓ Système simplifié, un seul éditeur

VAGUE 2 : Migration localStorage → Supabase (1-2 jours)
    ↓ Données persistantes, site_settings fonctionnel

VAGUE 3 : Éditeur de traitements visuel (2-3 jours)
    ↓ 8 traitements éditables visuellement

VAGUE 4 : Menu & Footer dynamiques (2-3 jours)
    ↓ Navigation et footer éditables

VAGUE 5 : Migration pages statiques (3-4 jours)
    ↓ 100% du site éditable

═══════════════════════════════════════════════
TOTAL : 10-15 jours (2-3 semaines)
```

---

## 🌊 VAGUE 1 : NETTOYAGE & UNIFICATION
**Durée estimée** : 2-3 jours
**Impact** : Simplification du système, réduction de la dette technique
**Objectif** : Un seul éditeur, un seul système de rendu

### Tâche 1.1 : Supprimer PageBuilder.tsx
**Complexité** : ⭐ Simple
**Temps** : 30 min
**Dépendances** : Aucune

**Étapes** :
1. Vérifier qu'aucune page n'utilise PageBuilder
2. Supprimer `/src/components/PageBuilder.tsx`
3. Supprimer l'import dans `AdminPanel.tsx` (lignes 6, 210-221, 864-873)
4. Tester que les pages custom fonctionnent toujours

**Fichiers impactés** :
- ❌ DELETE `src/components/PageBuilder.tsx`
- 📝 EDIT `src/components/AdminPanel.tsx`

---

### Tâche 1.2 : Supprimer CustomPageRenderer.tsx
**Complexité** : ⭐⭐ Moyen
**Temps** : 1-2 heures
**Dépendances** : Tâche 1.1

**Étapes** :
1. Identifier toutes les pages utilisant CustomPageRenderer
2. Dans `DynamicPage.tsx`, supprimer la logique de fallback vers CustomPageRenderer
3. Forcer l'utilisation de BlockRenderer uniquement
4. Supprimer `/src/components/CustomPageRenderer.tsx`
5. Supprimer `/src/utils/blockAdapter.ts` (plus nécessaire)
6. Tester toutes les pages custom

**Fichiers impactés** :
- ❌ DELETE `src/components/CustomPageRenderer.tsx`
- ❌ DELETE `src/utils/blockAdapter.ts`
- 📝 EDIT `src/pages/DynamicPage.tsx`
- 📝 EDIT `src/components/admin/PageManager.tsx` (supprimer imports blockAdapter)

**Migration de données** :
```typescript
// Si des pages existent avec l'ancien format, migration SQL :
UPDATE custom_pages
SET content = [conversion vers nouveau format]
WHERE content format is old;
```

---

### Tâche 1.3 : Nettoyer AdminPanel.tsx (ancien système)
**Complexité** : ⭐⭐ Moyen
**Temps** : 2-3 heures
**Dépendances** : Tâche 1.1, 1.2

**Étapes** :
1. Identifier les fonctionnalités encore utilisées dans AdminPanel
2. Migrer les fonctionnalités manquantes vers AdminDashboard si nécessaire
3. **Option A** : Supprimer complètement AdminPanel.tsx
4. **Option B** : Garder uniquement comme fallback legacy
5. S'assurer que tous les liens pointent vers AdminDashboard
6. Mettre à jour App.tsx si nécessaire

**Décision recommandée** : **Supprimer complètement** AdminPanel.tsx

**Fichiers impactés** :
- ❌ DELETE `src/components/AdminPanel.tsx` (880 lignes)
- 📝 EDIT `src/App.tsx` (supprimer import si présent)

---

### Tâche 1.4 : Supprimer la table content_blocks
**Complexité** : ⭐ Simple
**Temps** : 15 min
**Dépendances** : Aucune

**Étapes** :
1. Vérifier que la table content_blocks est vide (✅ confirmé : 0 lignes)
2. Créer une migration Supabase pour DROP la table
3. Documenter la décision dans les migrations

**Migration SQL** :
```sql
/*
  # Suppression table content_blocks inutilisée

  Cette table n'est plus nécessaire car les blocs sont stockés
  directement dans custom_pages.content (format JSONB).
*/

DROP TABLE IF EXISTS content_blocks CASCADE;
```

---

### ✅ Livrable Vague 1
- ✅ Un seul éditeur : VisualBlockEditor
- ✅ Un seul renderer : BlockRenderer
- ✅ AdminPanel supprimé, AdminDashboard unique
- ✅ Table content_blocks supprimée
- ✅ Code simplifié, maintenance facile

**Gain d'éditabilité** : 0% (pas de nouveau contenu éditable, mais système plus robuste)

---

## 🌊 VAGUE 2 : MIGRATION LOCALSTORAGE → SUPABASE
**Durée estimée** : 1-2 jours
**Impact** : Données persistantes entre appareils, synchronisation
**Objectif** : Toutes les données dans Supabase

### Tâche 2.1 : Migrer les couleurs/polices vers site_settings
**Complexité** : ⭐⭐ Moyen
**Temps** : 3-4 heures
**Dépendances** : Aucune

**Étapes** :
1. Analyser ColorThemeManager actuel (utilise localStorage ?)
2. Créer des fonctions de lecture/écriture dans site_settings
3. Définir les clés :
   - `color.primary`
   - `color.secondary`
   - `color.accent`
   - `font.heading`
   - `font.body`
4. Modifier ColorThemeManager pour utiliser Supabase
5. Créer un script de migration localStorage → Supabase (one-time)
6. Tester la synchronisation entre appareils

**Structure site_settings** :
```typescript
interface SiteSetting {
  id: uuid;
  key: string; // Ex: "color.primary"
  value: string; // Ex: "#ef4444"
  type: 'color' | 'text' | 'json';
  updated_by: string;
  updated_at: timestamptz;
}
```

**Fichiers impactés** :
- 📝 EDIT `src/components/admin/ColorThemeManager.tsx`
- 📝 EDIT `src/lib/supabase.ts` (ajouter types/fonctions)
- ✨ NEW `src/hooks/useSiteSettings.ts` (hook React)

**Migration script** :
```typescript
// One-time migration dans ColorThemeManager
const migrateLegacySettings = async () => {
  const legacy = localStorage.getItem('siteCustomization');
  if (legacy) {
    const data = JSON.parse(legacy);
    // Migrate colors
    for (const [key, value] of Object.entries(data.colors)) {
      await supabase.from('site_settings').upsert({
        key: `color.${key}`,
        value: value,
        type: 'color'
      });
    }
    // Migrate fonts
    for (const [key, value] of Object.entries(data.fonts)) {
      await supabase.from('site_settings').upsert({
        key: `font.${key}`,
        value: value,
        type: 'text'
      });
    }
    localStorage.removeItem('siteCustomization');
  }
};
```

---

### Tâche 2.2 : Créer un hook useSiteSettings global
**Complexité** : ⭐⭐ Moyen
**Temps** : 2 heures
**Dépendances** : Tâche 2.1

**Étapes** :
1. Créer `/src/hooks/useSiteSettings.ts`
2. Charger tous les settings au démarrage de l'app
3. Mettre en cache dans un Context React
4. Fournir des getters/setters typés
5. Utiliser ce hook partout dans le site

**Code** :
```typescript
// src/hooks/useSiteSettings.ts
export const useSiteSettings = () => {
  const [settings, setSettings] = useState<Record<string, string>>({});

  const getSetting = (key: string, defaultValue = '') => {
    return settings[key] || defaultValue;
  };

  const updateSetting = async (key: string, value: string) => {
    await supabase.from('site_settings').upsert({ key, value });
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return { getSetting, updateSetting };
};
```

**Fichiers impactés** :
- ✨ NEW `src/hooks/useSiteSettings.ts`
- ✨ NEW `src/contexts/SiteSettingsContext.tsx`
- 📝 EDIT `src/App.tsx` (wrap avec SiteSettingsProvider)

---

### Tâche 2.3 : Appliquer les couleurs/polices globalement
**Complexité** : ⭐⭐⭐ Complexe
**Temps** : 3-4 heures
**Dépendances** : Tâche 2.1, 2.2

**Étapes** :
1. Dans App.tsx ou index.html, injecter des CSS variables dynamiques
2. Utiliser useSiteSettings pour charger les couleurs
3. Appliquer via `style` ou `<style>` tag
4. Tester que les changements se propagent partout
5. Vérifier Header, Footer, Boutons, Liens, etc.

**Code** :
```typescript
// src/App.tsx
const { getSetting } = useSiteSettings();

useEffect(() => {
  const root = document.documentElement;
  root.style.setProperty('--color-primary', getSetting('color.primary', '#ef4444'));
  root.style.setProperty('--color-secondary', getSetting('color.secondary', '#3b82f6'));
  root.style.setProperty('--font-heading', getSetting('font.heading', 'Playfair Display'));
  root.style.setProperty('--font-body', getSetting('font.body', 'Inter'));
}, [getSetting]);
```

**Fichiers impactés** :
- 📝 EDIT `src/App.tsx`
- 📝 EDIT `src/index.css` (utiliser CSS variables)
- 📝 EDIT `tailwind.config.js` (utiliser CSS variables si nécessaire)

---

### Tâche 2.4 : Migrer les textes statiques vers site_settings
**Complexité** : ⭐⭐ Moyen
**Temps** : 2 heures
**Dépendances** : Tâche 2.1

**Étapes** :
1. Identifier tous les textes dans businessInfo.ts
2. Migrer vers site_settings avec clés type `info.address`, `info.phone`, etc.
3. Créer un éditeur dans AdminDashboard pour ces infos
4. Remplacer tous les imports de businessInfo par useSiteSettings

**Clés à créer** :
- `info.name` → "Dr Jocelyne Fassotte"
- `info.address` → "Rue de la Paix..."
- `info.phone` → "+32..."
- `info.email` → "contact@..."
- `info.hours.monday` → "9h-17h"
- etc.

**Fichiers impactés** :
- 📝 EDIT `src/constants/businessInfo.ts` (DEPRECATED, garder pour fallback)
- 📝 EDIT tous les composants utilisant businessInfo
- ✨ NEW `src/components/admin/BusinessInfoEditor.tsx`

---

### ✅ Livrable Vague 2
- ✅ Toutes les données dans Supabase (site_settings fonctionnel)
- ✅ Synchronisation entre appareils
- ✅ Couleurs/polices éditables et appliquées globalement
- ✅ Infos business éditables
- ✅ Plus de localStorage (sauf pour auth si nécessaire)

**Gain d'éditabilité** : +10% (couleurs, polices, infos business)
**Total cumulé** : **55%**

---

## 🌊 VAGUE 3 : ÉDITEUR DE TRAITEMENTS VISUEL
**Durée estimée** : 2-3 jours
**Impact** : 8 traitements entièrement éditables
**Objectif** : Éditeur visuel pour custom_treatments

### Tâche 3.1 : Créer TreatmentManager dans AdminDashboard
**Complexité** : ⭐⭐ Moyen
**Temps** : 2-3 heures
**Dépendances** : Aucune

**Étapes** :
1. Créer `/src/components/admin/TreatmentManager.tsx`
2. Lister tous les custom_treatments depuis Supabase
3. Afficher en grille avec : titre, slug, statut, boutons
4. Boutons : Modifier, Publier/Dépublier, Supprimer
5. Ajouter section "Traitements" dans AdminDashboard (5ème onglet)

**Interface** :
```
┌────────────────────────────────────────────┐
│ Gestionnaire de Traitements               │
│ [+ Nouveau Traitement]                     │
├────────────────────────────────────────────┤
│ ┌────────────┐  ┌────────────┐           │
│ │ Botox      │  │ Acide      │           │
│ │ /botox     │  │ Hyaluro... │           │
│ │ [✅ Actif] │  │ [✅ Actif] │           │
│ │ [Modifier] │  │ [Modifier] │           │
│ └────────────┘  └────────────┘           │
│                                            │
│ [... 6 autres traitements ...]            │
└────────────────────────────────────────────┘
```

**Fichiers impactés** :
- ✨ NEW `src/components/admin/TreatmentManager.tsx`
- 📝 EDIT `src/components/admin/AdminDashboard.tsx` (ajouter onglet)

---

### Tâche 3.2 : Adapter VisualBlockEditor pour traitements
**Complexité** : ⭐⭐⭐ Complexe
**Temps** : 4-5 heures
**Dépendances** : Tâche 3.1

**Étapes** :
1. Analyser la structure de custom_treatments.content (jsonb)
2. Vérifier si compatible avec VisualBlockEditor actuel
3. **Option A** : Réutiliser VisualBlockEditor tel quel
4. **Option B** : Créer TreatmentBlockEditor (variante spécialisée)
5. Ajouter des blocs spécifiques aux traitements :
   - Zones de traitement
   - Avant/Après
   - Contre-indications
   - Durée/Prix
6. Implémenter l'édition dans TreatmentManager

**Blocs spécifiques traitements** :
- `treatment-zones` → Carte des zones traitables
- `treatment-pricing` → Grille de prix
- `treatment-contraindications` → Liste des contre-indications
- `before-after` → Gallery avant/après

**Fichiers impactés** :
- 📝 EDIT `src/components/admin/VisualBlockEditor.tsx` (ajouter types de blocs)
- 📝 EDIT `src/components/BlockRenderer.tsx` (render nouveaux blocs)
- 📝 EDIT `src/components/admin/TreatmentManager.tsx`

---

### Tâche 3.3 : Connecter TreatmentManager à Supabase
**Complexité** : ⭐⭐ Moyen
**Temps** : 2 heures
**Dépendances** : Tâche 3.1

**Étapes** :
1. Implémenter CRUD complet pour custom_treatments :
   - `loadTreatments()`
   - `createTreatment(data)`
   - `updateTreatment(id, data)`
   - `deleteTreatment(id)`
   - `toggleActive(id)`
2. Ajouter gestion des erreurs et loading states
3. Tester toutes les opérations

**Fichiers impactés** :
- 📝 EDIT `src/components/admin/TreatmentManager.tsx`
- 📝 EDIT `src/lib/supabase.ts` (types CustomTreatment)

---

### Tâche 3.4 : Migrer les pages de traitements hardcodées
**Complexité** : ⭐⭐⭐ Complexe
**Temps** : 3-4 heures
**Dépendances** : Tâche 3.2, 3.3

**Étapes** :
1. Identifier les traitements hardcodés :
   - Botox.tsx
   - HyaluronicAcid.tsx
   - Peeling.tsx
   - Mesolift.tsx
   - FilsTenseurs.tsx
   - CollagenStimulator.tsx
   - LiquidLift.tsx
2. Pour chaque traitement :
   - Créer une entrée dans custom_treatments
   - Convertir le contenu HTML en blocs BlockRenderer
   - Ajouter métadonnées SEO
   - Uploader images dans Supabase Storage
3. Supprimer les fichiers .tsx hardcodés
4. Créer DynamicTreatmentPage.tsx (comme DynamicPage)
5. Mettre à jour le routing dans App.tsx

**Migration exemple (Botox.tsx → custom_treatments)** :
```typescript
{
  slug: 'botox',
  title: 'Botox - Toxine Botulique',
  subtitle: 'Traitement anti-rides par excellence',
  description: 'Le botox...',
  duration: '15-20 minutes',
  meta_title: 'Botox Liège | Dr Jocelyne Fassotte',
  meta_description: '...',
  featured_image: 'https://...',
  content: [
    {
      id: 'hero-1',
      type: 'hero',
      order: 0,
      content: {
        title: 'Botox - Toxine Botulique',
        subtitle: 'Traitement anti-rides...',
        backgroundImage: '...'
      }
    },
    {
      id: 'text-1',
      type: 'text',
      order: 1,
      content: {
        content: 'Le Botox est un traitement...'
      }
    },
    // ... autres blocs
  ],
  is_active: true
}
```

**Fichiers impactés** :
- ❌ DELETE 7 fichiers : Botox.tsx, HyaluronicAcid.tsx, etc.
- ✨ NEW `src/pages/DynamicTreatmentPage.tsx`
- 📝 EDIT `src/App.tsx` (routing)
- 📝 EDIT `src/pages/Treatments.tsx` (charger depuis Supabase)

---

### ✅ Livrable Vague 3
- ✅ 8 traitements éditables visuellement
- ✅ TreatmentManager dans AdminDashboard
- ✅ Blocs spécifiques aux traitements
- ✅ Plus de fichiers .tsx hardcodés pour les traitements
- ✅ Routing dynamique pour /traitements/*

**Gain d'éditabilité** : +20% (8 traitements + page Treatments)
**Total cumulé** : **75%**

---

## 🌊 VAGUE 4 : MENU & FOOTER DYNAMIQUES
**Durée estimée** : 2-3 jours
**Impact** : Navigation et footer entièrement éditables
**Objectif** : Menu et footer dans Supabase, éditables via CMS

### Tâche 4.1 : Migrer le menu hardcodé vers menu_items
**Complexité** : ⭐⭐ Moyen
**Temps** : 2-3 heures
**Dépendances** : Aucune

**Étapes** :
1. Analyser le menu actuel dans Header.tsx
2. Créer des entrées dans menu_items pour chaque lien
3. Structure hiérarchique (parent_id pour sous-menus)
4. Ajouter order_index pour l'ordre d'affichage

**Données à migrer** :
```sql
INSERT INTO menu_items (name, href, parent_id, order_index, is_visible) VALUES
  ('Accueil', '/', NULL, 0, true),
  ('Traitements', '/traitements', NULL, 1, true),
    ('Botox', '/traitements/botox', [parent_id_traitements], 0, true),
    ('Acide Hyaluronique', '/traitements/acide-hyaluronique', [parent_id_traitements], 1, true),
    -- ... autres sous-menus
  ('Galerie', '/galerie', NULL, 2, true),
  ('À Propos', '/about', NULL, 3, true),
  ('Contact', '/contact', NULL, 4, true);
```

**Fichiers impactés** :
- 📝 EDIT `src/lib/supabase.ts` (types MenuItem)
- 📝 SQL migration pour peupler menu_items

---

### Tâche 4.2 : Connecter Header.tsx à menu_items
**Complexité** : ⭐⭐⭐ Complexe
**Temps** : 3-4 heures
**Dépendances** : Tâche 4.1

**Étapes** :
1. Dans Header.tsx, remplacer le menu hardcodé
2. Charger menu_items depuis Supabase au mount
3. Construire la hiérarchie (menus parent/enfant)
4. Rendre les liens dynamiquement
5. Gérer le cache (React Query ou SWR ?)
6. Tester navigation, sous-menus, responsive

**Code** :
```typescript
// src/components/Header.tsx
const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

useEffect(() => {
  const loadMenu = async () => {
    const { data } = await supabase
      .from('menu_items')
      .select('*')
      .eq('is_visible', true)
      .order('order_index');
    setMenuItems(buildMenuHierarchy(data));
  };
  loadMenu();
}, []);

const buildMenuHierarchy = (items: MenuItem[]) => {
  // Construire arbre parent/enfant
  const parentItems = items.filter(i => !i.parent_id);
  return parentItems.map(parent => ({
    ...parent,
    children: items.filter(i => i.parent_id === parent.id)
  }));
};
```

**Fichiers impactés** :
- 📝 EDIT `src/components/Header.tsx`
- 📝 EDIT `src/lib/supabase.ts`

---

### Tâche 4.3 : Finaliser MenuEditor dans AdminDashboard
**Complexité** : ⭐⭐⭐ Complexe
**Temps** : 4-5 heures
**Dépendances** : Tâche 4.1, 4.2

**Étapes** :
1. Analyser MenuEditor existant (déjà créé dans Phase 3)
2. Implémenter CRUD complet :
   - Ajouter item (parent ou enfant)
   - Modifier item (nom, lien)
   - Supprimer item
   - Réorganiser (drag & drop)
   - Visibilité on/off
3. Interface avec :
   - Liste hiérarchique des items
   - Boutons d'action
   - Formulaire d'édition
4. Tester toutes les opérations

**Interface MenuEditor** :
```
┌─────────────────────────────────────────┐
│ Éditeur de Menu                         │
│ [+ Ajouter un lien]                     │
├─────────────────────────────────────────┤
│ ☰ Accueil           [👁️][✏️][🗑️]     │
│ ☰ Traitements       [👁️][✏️][🗑️]     │
│   ↳ Botox           [👁️][✏️][🗑️]     │
│   ↳ Acide Hyaluro.. [👁️][✏️][🗑️]     │
│ ☰ Galerie           [👁️][✏️][🗑️]     │
│ ☰ À Propos          [👁️][✏️][🗑️]     │
│ ☰ Contact           [👁️][✏️][🗑️]     │
└─────────────────────────────────────────┘
```

**Fichiers impactés** :
- 📝 EDIT `src/components/admin/MenuEditor.tsx`

---

### Tâche 4.4 : Créer FooterEditor et connecter Footer.tsx
**Complexité** : ⭐⭐⭐ Complexe
**Temps** : 4-5 heures
**Dépendances** : Tâche 2.1 (site_settings)

**Étapes** :
1. Analyser Footer.tsx actuel
2. Identifier les éléments éditables :
   - Texte de présentation
   - Liens réseaux sociaux
   - Liens légaux
   - Adresse, téléphone, email
   - Horaires
3. Sauvegarder dans site_settings avec clés type :
   - `footer.about.text`
   - `footer.social.facebook`
   - `footer.social.instagram`
   - `footer.legal.privacy`
   - `footer.legal.terms`
4. Créer FooterEditor dans AdminDashboard
5. Connecter Footer.tsx pour lire depuis site_settings

**Clés site_settings pour footer** :
```
footer.about.title = "Dr Jocelyne Fassotte"
footer.about.text = "Médecine esthétique..."
footer.social.facebook = "https://..."
footer.social.instagram = "https://..."
footer.legal.privacy = "/politique-confidentialite"
footer.legal.terms = "/mentions-legales"
footer.contact.address = "..."
footer.contact.phone = "..."
footer.contact.email = "..."
```

**Fichiers impactés** :
- ✨ NEW `src/components/admin/FooterEditor.tsx`
- 📝 EDIT `src/components/Footer.tsx`
- 📝 EDIT `src/components/admin/AdminDashboard.tsx` (ajouter FooterEditor)

---

### ✅ Livrable Vague 4
- ✅ Menu de navigation dynamique et éditable
- ✅ Footer entièrement éditable
- ✅ MenuEditor fonctionnel avec drag & drop
- ✅ FooterEditor pour tous les éléments du footer
- ✅ Plus de liens hardcodés

**Gain d'éditabilité** : +10% (menu + footer)
**Total cumulé** : **85%**

---

## 🌊 VAGUE 5 : MIGRATION PAGES STATIQUES
**Durée estimée** : 3-4 jours
**Impact** : 4 pages principales éditables
**Objectif** : 100% du site éditable

### Tâche 5.1 : Migrer About.tsx vers custom_pages
**Complexité** : ⭐⭐⭐ Complexe
**Temps** : 3-4 heures
**Dépendances** : Vague 1 (système unifié)

**Étapes** :
1. Analyser About.tsx actuel
2. Identifier les sections :
   - Hero banner
   - Présentation Dr Fassotte
   - Diplômes & formations
   - Philosophie
   - Valeurs
3. Convertir chaque section en blocs BlockRenderer
4. Créer entrée dans custom_pages avec slug: 'about'
5. Supprimer About.tsx
6. Mettre à jour routing dans App.tsx → /about vers DynamicPage

**Blocs pour About** :
```typescript
[
  { type: 'hero', content: { title: 'Dr Jocelyne Fassotte', ... } },
  { type: 'image-text', content: { image: '...', text: '...' } },
  { type: 'heading', content: { text: 'Diplômes et Formations' } },
  { type: 'text', content: { content: '...' } },
  { type: 'features', content: { items: [...valeurs...] } },
  // ...
]
```

**Fichiers impactés** :
- ❌ DELETE `src/pages/About.tsx`
- 📝 EDIT `src/App.tsx` (routing)
- 📝 SQL insert dans custom_pages

---

### Tâche 5.2 : Migrer Contact.tsx vers custom_pages
**Complexité** : ⭐⭐⭐ Complexe
**Temps** : 3-4 heures
**Dépendances** : Vague 1

**Étapes** :
1. Analyser Contact.tsx actuel
2. Identifier les sections :
   - Formulaire de contact (composant React → garder)
   - Informations de contact
   - Carte Google Maps
   - Horaires
3. **Problème** : Formulaire de contact est interactif
4. **Solution** : Créer un bloc type `contact-form` spécial
5. Convertir le reste en blocs standards
6. Créer entrée custom_pages avec slug: 'contact'
7. Supprimer Contact.tsx

**Nouveau type de bloc** : `contact-form`
```typescript
{
  type: 'contact-form',
  content: {
    title: 'Prendre rendez-vous',
    submitButtonText: 'Envoyer',
    successMessage: 'Message envoyé !',
    fields: ['name', 'email', 'phone', 'message']
  }
}
```

**Fichiers impactés** :
- ❌ DELETE `src/pages/Contact.tsx`
- 📝 EDIT `src/components/BlockRenderer.tsx` (ajouter case 'contact-form')
- 📝 EDIT `src/components/admin/VisualBlockEditor.tsx` (ajouter type)
- ✨ NEW `src/components/blocks/ContactFormBlock.tsx`
- 📝 EDIT `src/App.tsx` (routing)

---

### Tâche 5.3 : Migrer Gallery.tsx vers custom_pages
**Complexité** : ⭐⭐ Moyen
**Temps** : 2-3 heures
**Dépendances** : Vague 1

**Étapes** :
1. Analyser Gallery.tsx actuel
2. La page charge déjà depuis gallery_images (Supabase)
3. **Option A** : Laisser Gallery.tsx comme page spéciale
4. **Option B** : Migrer vers custom_pages avec bloc type `gallery-grid`
5. Recommandation : **Option B** pour cohérence
6. Créer entrée custom_pages avec slug: 'galerie'
7. Utiliser bloc type `gallery` (déjà dans BlockRenderer)

**Blocs pour Gallery** :
```typescript
[
  { type: 'hero', content: { title: 'Galerie Photos', ... } },
  { type: 'text', content: { content: 'Découvrez nos résultats...' } },
  { type: 'gallery', content: { source: 'supabase', table: 'gallery_images' } }
]
```

**Fichiers impactés** :
- ❌ DELETE `src/pages/Gallery.tsx`
- 📝 EDIT `src/components/BlockRenderer.tsx` (améliorer bloc gallery)
- 📝 EDIT `src/App.tsx` (routing)

---

### Tâche 5.4 : Migrer Treatments.tsx vers custom_pages
**Complexité** : ⭐⭐ Moyen
**Temps** : 2 heures
**Dépendances** : Vague 3 (traitements éditables)

**Étapes** :
1. Analyser Treatments.tsx actuel
2. La page liste déjà les traitements (hardcodés + custom_treatments)
3. Migrer vers custom_pages avec slug: 'traitements'
4. Utiliser bloc type `treatments` (déjà dans BlockRenderer)
5. Supprimer Treatments.tsx

**Blocs pour Treatments** :
```typescript
[
  { type: 'hero', content: { title: 'Nos Traitements', ... } },
  { type: 'text', content: { content: 'Découvrez notre gamme...' } },
  { type: 'treatments', content: { source: 'supabase', display: 'grid' } }
]
```

**Fichiers impactés** :
- ❌ DELETE `src/pages/Treatments.tsx`
- 📝 EDIT `src/components/BlockRenderer.tsx` (bloc treatments charge de Supabase)
- 📝 EDIT `src/App.tsx` (routing)

---

### Tâche 5.5 : Migrer Home.tsx vers custom_pages
**Complexité** : ⭐⭐⭐ Complexe
**Temps** : 4-5 heures
**Dépendances** : Toutes les tâches précédentes

**Étapes** :
1. Analyser Home.tsx actuel (la page la plus complexe)
2. Identifier toutes les sections :
   - Hero banner
   - Présentation
   - Traitements phares
   - Philosophie
   - Témoignages
   - Call-to-action
3. Vérifier si une entrée existe déjà (slug: 'accueil' ou 'home')
4. Convertir toutes les sections en blocs
5. **Ne PAS supprimer Home.tsx** → le garder comme fallback
6. Router / vers DynamicPage avec slug 'accueil'

**Blocs pour Home** :
```typescript
[
  { type: 'hero', content: { ... } },
  { type: 'text', content: { ... } },
  { type: 'features', content: { items: [...traitements phares...] } },
  { type: 'image-text', content: { ... } },
  { type: 'treatments', content: { featured: true, limit: 3 } },
  { type: 'cta', content: { ... } }
]
```

**Fichiers impactés** :
- 📝 EDIT `src/pages/Home.tsx` (garder comme fallback)
- 📝 EDIT `src/App.tsx` (routing prioritaire vers DynamicPage)
- 📝 SQL insert dans custom_pages

---

### Tâche 5.6 : Créer des pages légales éditables
**Complexité** : ⭐⭐ Moyen
**Temps** : 2 heures
**Dépendances** : Vague 1

**Étapes** :
1. Créer page "Politique de confidentialité" via PageManager
2. Créer page "Mentions légales" via PageManager
3. Créer page "CGU" si nécessaire
4. Ajouter liens dans Footer vers ces pages
5. Vérifier conformité RGPD

**Pages à créer** :
- `/politique-confidentialite`
- `/mentions-legales`
- `/conditions-generales`

**Fichiers impactés** :
- 📝 SQL inserts dans custom_pages (via PageManager UI)
- 📝 EDIT `src/components/Footer.tsx` (liens vers ces pages)

---

### ✅ Livrable Vague 5
- ✅ About, Contact, Gallery, Treatments migrés vers custom_pages
- ✅ Home éditable via CMS
- ✅ Pages légales éditables
- ✅ Plus de pages .tsx hardcodées (sauf fallbacks)
- ✅ **100% du site éditable via CMS**

**Gain d'éditabilité** : +15% (4 pages statiques + légales)
**Total cumulé** : **🎯 100%**

---

## 📊 RÉCAPITULATIF DES GAINS

| Vague | Tâches principales | Gain | Total cumulé |
|-------|-------------------|------|--------------|
| **Vague 1** | Nettoyage & Unification | 0% | 45% |
| **Vague 2** | Migration localStorage → Supabase | +10% | 55% |
| **Vague 3** | Éditeur de traitements visuel | +20% | 75% |
| **Vague 4** | Menu & Footer dynamiques | +10% | 85% |
| **Vague 5** | Migration pages statiques | +15% | **100%** |

---

## 🔧 OUTILS ET TECHNOLOGIES

### Existants (à conserver)
- ✅ Supabase (database + storage)
- ✅ React + TypeScript
- ✅ TailwindCSS
- ✅ Lucide Icons
- ✅ VisualBlockEditor
- ✅ BlockRenderer

### À ajouter
- React Query ou SWR (cache des données Supabase)
- react-beautiful-dnd (drag & drop pour MenuEditor)
- React Hook Form (formulaires admin)

---

## 🚀 ORDRE D'EXÉCUTION RECOMMANDÉ

### Sprint 1 (Semaine 1)
- ✅ Vague 1 : Nettoyage & Unification (3 jours)
- ✅ Vague 2 : Migration localStorage (2 jours)

**Livrable fin Sprint 1** : Système CMS unifié, données persistantes

---

### Sprint 2 (Semaine 2)
- ✅ Vague 3 : Éditeur de traitements (3 jours)
- ✅ Vague 4 : Menu & Footer (2 jours)

**Livrable fin Sprint 2** : Traitements éditables, navigation dynamique

---

### Sprint 3 (Semaine 3)
- ✅ Vague 5 : Migration pages statiques (4 jours)
- ✅ Tests finaux, documentation (1 jour)

**Livrable fin Sprint 3** : **Site 100% éditable**

---

## 📋 CHECKLIST FINALE

### Fonctionnalités
- [ ] Toutes les pages éditables sans code
- [ ] Tous les traitements éditables visuellement
- [ ] Menu de navigation éditable
- [ ] Footer éditable
- [ ] Couleurs/polices éditables et appliquées globalement
- [ ] Images uploadables et gérables
- [ ] Système de blocs flexible (13+ types)
- [ ] Prévisualisation en temps réel
- [ ] Publication/dépublication de contenu
- [ ] SEO éditable (meta descriptions, titles)

### Technique
- [ ] Un seul système d'édition (VisualBlockEditor)
- [ ] Un seul système de rendu (BlockRenderer)
- [ ] Toutes les données dans Supabase
- [ ] RLS activé sur toutes les tables
- [ ] Cache optimisé (React Query)
- [ ] Code nettoyé (plus de fichiers legacy)
- [ ] Documentation à jour
- [ ] Tests de régression passés

### Expérience utilisateur
- [ ] Interface admin intuitive
- [ ] Temps de chargement < 3s
- [ ] Responsive (mobile, tablet, desktop)
- [ ] Accessibilité (WCAG AA)
- [ ] SEO optimisé (100% sur Lighthouse)

---

## 🎯 NEXT STEPS

**Êtes-vous prêt à commencer la VAGUE 1 ?**

Je peux :
1. ✅ Commencer immédiatement par la Tâche 1.1 (Supprimer PageBuilder.tsx)
2. 📝 Créer des tickets détaillés pour chaque tâche
3. 🔍 Faire un audit de code avant de commencer
4. 💬 Discuter de la priorisation ou des modifications au plan

**Quelle est votre décision ?**
