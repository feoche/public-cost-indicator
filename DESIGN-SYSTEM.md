# OVHcloud Design System - Implémentation

Ce document décrit comment l'application respecte le [Design System OVHcloud](https://ovh.github.io/design-system/latest/).

## 🎨 Tokens de Design

Tous les tokens sont définis dans `src/app/design-tokens.css` et incluent :

### Couleurs

#### Primaires
- **Primary** : `#00a2bf` - Cyan OVHcloud (boutons principaux, liens)
- **Secondary** : `#123f6d` - Bleu foncé OVHcloud (titres, texte important)

#### Neutres
- Palette de gris de `neutral-0` (blanc) à `neutral-900` (noir profond)
- Utilisée pour les fonds, bordures, et textes secondaires

#### États
- **Success** : `#50cd89` - Actions réussies
- **Warning** : `#ffb23f` - Avertissements
- **Error** : `#f44336` - Erreurs
- **Info** : `#2196f3` - Informations

### Typographie

- **Police** : Système natif (similaire au design system OVHcloud)
- **Tailles** : De `xs` (12px) à `4xl` (36px)
- **Poids** : Regular (400), Medium (500), Semibold (600), Bold (700)

### Espacements

Échelle cohérente basée sur `rem` :
- `xs` : 4px
- `sm` : 8px
- `md` : 16px
- `lg` : 24px
- `xl` : 32px
- `2xl` : 48px
- `3xl` : 64px

### Bordures

- **Radius** : De `sm` (4px) à `2xl` (16px)
- Arrondis cohérents sur tous les composants

### Ombres

7 niveaux d'ombres (`xs` à `2xl`) pour la profondeur visuelle.

### Transitions

- **Fast** : 150ms - Interactions rapides (hover)
- **Base** : 200ms - Transitions standard
- **Slow** : 300ms - Animations complexes

## 🧩 Composants

### ProductSelector
- Cartes de produits avec bordures arrondies
- Hover states avec feedback visuel
- Boutons d'action en Primary color
- Inputs avec focus states

### CostSummary
- Cartes de panier avec fond neutre
- Total en couleur Primary
- Bouton de téléchargement en Secondary
- Indication visuelle de suppression en Error

## 📐 Layout

### Grille Responsive
- Mobile : 1 colonne
- Desktop : 2 colonnes (2:1 ratio)
- Max-width : 1280px
- Gap : `xl` (32px)

### Header
- Fond blanc avec ombre légère
- Titre en Secondary color
- Sous-titre en couleur neutre

## 🎯 Utilisation

### Ajouter une nouvelle couleur
```css
/* Dans design-tokens.css */
--ovh-color-custom: #hexcode;
```

### Utiliser dans un composant
```css
.myClass {
  color: var(--ovh-color-primary);
  padding: var(--ovh-spacing-md);
  border-radius: var(--ovh-radius-lg);
  transition: all var(--ovh-transition-base);
}
```

## 🔄 Synchronisation avec le Design System

Pour mettre à jour l'application avec de nouvelles valeurs du Design System OVHcloud :

1. Consultez la [documentation officielle](https://ovh.github.io/design-system/latest/)
2. Mettez à jour les valeurs dans `src/app/design-tokens.css`
3. Les composants hériteront automatiquement des nouvelles valeurs

## ✅ Checklist de conformité

- [x] Utilisation des couleurs OVHcloud (Primary et Secondary)
- [x] Typographie cohérente avec échelle standardisée
- [x] Espacements basés sur une échelle cohérente
- [x] Bordures arrondies uniformes
- [x] Ombres pour la profondeur
- [x] Transitions fluides
- [x] Responsive design
- [x] États hover/focus accessibles
- [x] Contraste suffisant pour l'accessibilité

## 📚 Ressources

- [Design System OVHcloud](https://ovh.github.io/design-system/latest/)
- [Documentation Zeroheight](https://zeroheight.com/6fc8a63f7/p/533db0-ovhcloud-design-system)

