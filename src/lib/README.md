# Données Produits OVHcloud

Ce répertoire contient les données produits structurées pour le calculateur de coûts.

## Fichiers

### `productsData.ts`

Contient les données complètes des produits OVHcloud extraites du fichier `docs/donnees-produits-cloud-complet.md`.

#### Structure des données

```typescript
interface ProductFlavor {
  code: string;              // Code unique du flavor (ex: "b2-7")
  name: string;              // Nom du flavor (ex: "B2-7")
  vcpu: number;              // Nombre de vCPU
  frequency: string;         // Fréquence du CPU (ex: "2 GHz")
  ram: string;               // Mémoire RAM (ex: "7 Go")
  storage: string;           // Stockage (ex: "50 GiB SSD")
  gpu?: string;              // GPU (optionnel, ex: "A10 x1")
  bandwidth: string;         // Bande passante (ex: "250 Mbit/s")
  pricePerHour: number;      // Prix par heure en euros
  pricePerMonth?: number;    // Prix mensuel optionnel
  planCodes: string[];       // Codes de plan OVHcloud
}

interface ProductCategory {
  id: string;                // ID unique du produit
  name: string;              // Nom du produit
  description: string;       // Description complète
  category: 'compute' | 'storage' | 'database' | 'network';
  flavors: ProductFlavor[];  // Liste des flavors disponibles
}
```

#### Produits disponibles

1. **Cloud GPU** (`cloud-gpu`)
   - 14 flavors disponibles (A10, A100, H100, L4, L40S)
   - GPU NVIDIA pour IA et Machine Learning
   - Prix de 0.75€/h à 11.20€/h

2. **General Purpose Instances** (`general-purpose`)
   - 13 flavors disponibles (B2, B3)
   - Instances polyvalentes pour tous usages
   - Prix de 0.07€/h à 3.72€/h

3. **Block Storage** (`block-storage`)
   - Stockage haute performance
   - 0.02€/GB/mois

4. **Managed MySQL Database** (`mysql-database`)
   - 12 flavors disponibles (DB1, B3)
   - Bases de données managées
   - Prix de 0.09€/h à 7.21€/h

#### Fonctions utilitaires

```typescript
// Récupérer un produit par son ID
getProductById(id: string): ProductCategory | undefined

// Récupérer tous les produits d'une catégorie
getProductsByCategory(category: 'compute' | 'storage' | 'database' | 'network'): ProductCategory[]

// Récupérer un flavor spécifique
getFlavorByCode(productId: string, flavorCode: string): ProductFlavor | undefined
```

#### Données de configuration

- **Régions** : 6 régions disponibles (GRA, RBX, SBG, BHS, DE, UK)
- **Résilience** : 3 options (Local, Multi-AZ, Multi-Région)
- **Sauvegardes** : 4 modes (Aucune, Quotidienne, Hebdomadaire, Mensuelle)
- **Savings Plans** : 5 plans (0%, 5%, 10%, 15%, 20% de réduction)

## Utilisation dans le calculateur

Le calculateur utilise ces données pour :

1. **Sélection de produit** : Liste déroulante des produits disponibles
2. **Sélection de flavor** : Configuration spécifique basée sur le produit choisi
3. **Calcul des coûts** : Utilise les prix réels pour calculer les estimations
4. **Affichage des spécifications** : Montre les détails techniques de chaque configuration

### Exemple d'utilisation

```typescript
import { productsData, getFlavorByCode } from '@/lib/productsData';

// Obtenir un flavor spécifique
const flavor = getFlavorByCode('general-purpose', 'b2-7');
console.log(flavor?.pricePerHour); // 0.07

// Lister tous les produits Compute
const computeProducts = productsData.filter(p => p.category === 'compute');
```

## Calcul des coûts

Le coût mensuel total est calculé selon la formule :

```
Coût de base = (Prix horaire du flavor × 730 heures) × Quantité
Stockage additionnel = Block Storage GB × 0.02€ + S3 Storage GB × 0.01€
IPs = Nombre d'IPs × 3€
Sauvegarde = Coût de base × 5% (si activée) + 10% (si backup distant)
Résilience = Coût de base × 15% (Multi-AZ) ou × 30% (Multi-Région)
Réduction = Total × Pourcentage du Savings Plan

TOTAL = (Coût de base + Additionnel + IPs + Sauvegarde + Résilience) - Réduction
```

## Source des données

Les données proviennent du fichier `docs/donnees-produits-cloud-complet.md` qui combine :
- Les descriptions produits OVHcloud
- Le catalogue technique complet
- Les spécifications détaillées de chaque flavor
- Les prix officiels

**Date de génération** : 2025-01-27

