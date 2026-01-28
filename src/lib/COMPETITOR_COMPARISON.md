# Comparaison avec les Concurrents

Cette fonctionnalité permet de comparer les coûts OVHcloud avec les équivalents chez AWS, Google Cloud et Azure.

## Sources de données

Les prix de comparaison sont basés sur les tarifs publics officiels des fournisseurs cloud :

- **AWS** : [https://aws.amazon.com/fr/](https://aws.amazon.com/fr/)
- **Google Cloud** : [https://cloud.google.com/gcp?hl=fr](https://cloud.google.com/gcp?hl=fr)
- **Azure** : [https://azure.microsoft.com/fr-fr/products/](https://azure.microsoft.com/fr-fr/products/)

## Fichiers

### `competitorPricing.ts`

Contient les données de comparaison pour chaque type d'instance OVHcloud.

#### Structure des données

```typescript
interface CompetitorPrice {
  provider: 'aws' | 'gcp' | 'azure';
  instanceType: string;         // Nom de l'instance équivalente
  pricePerHour: number;         // Prix horaire en euros
  pricePerMonth?: number;       // Prix mensuel (optionnel)
  url: string;                  // Lien vers la page de tarification
}

interface InstanceComparison {
  vcpu: number;                 // Nombre de vCPU
  ram: string;                  // Mémoire RAM en Go
  competitors: CompetitorPrice[]; // Liste des équivalents concurrents
}
```

## Équivalences d'instances

### General Purpose (B2/B3)

| OVHcloud | vCPU | RAM | AWS | Google Cloud | Azure |
|----------|------|-----|-----|--------------|-------|
| B2-7 | 2 | 7 Go | t3.small | e2-small | B2s |
| B2-15 | 4 | 15 Go | t3.medium | e2-standard-2 | B2ms |
| B2-30 | 8 | 30 Go | t3.large | e2-standard-4 | D2s_v3 |
| B2-60 | 16 | 60 Go | t3.xlarge | e2-standard-8 | D4s_v3 |
| B2-120 | 32 | 120 Go | t3.2xlarge | e2-standard-16 | D8s_v3 |

### GPU Instances

| OVHcloud | GPU | vCPU | RAM | AWS | Google Cloud | Azure |
|----------|-----|------|-----|-----|--------------|-------|
| A100-180 | A100 x1 | 15 | 180 Go | p4d.24xlarge | a2-highgpu-1g | NC A100 v4 |
| A100-360 | A100 x2 | 30 | 360 Go | p4d.24xlarge | a2-highgpu-2g | NC48ads A100 v4 |
| H100-380 | H100 x1 | 30 | 380 Go | p5.48xlarge | a3-highgpu-1g | ND H100 v5 |

## Fonctionnalités

### 1. Comparaison des prix

La fonction `getCompetitorComparison(flavorCode)` retourne les équivalents pour un flavor OVHcloud donné.

```typescript
import { getCompetitorComparison } from '@/lib/competitorPricing';

const comparison = getCompetitorComparison('b2-7');
// Retourne les équivalents AWS t3.small, GCP e2-small, Azure B2s
```

### 2. Calcul des économies

La fonction `calculateSavings()` calcule les économies réalisées par rapport aux concurrents.

```typescript
import { calculateSavings } from '@/lib/competitorPricing';

const savings = calculateSavings(24.20, 30.37);
// { savings: 6.17, percentage: 20.3 }
```

### 3. Affichage de la comparaison

Le composant `CompetitorComparisonModal` affiche une comparaison détaillée :

- Configuration actuelle (OVHcloud)
- Équivalents chez chaque concurrent (AWS, GCP, Azure)
- Prix mensuel pour chaque option
- Économies réalisées avec OVHcloud
- Liens vers les pages de tarification officielles

## Exemple de comparaison

Pour une instance **B2-15** (4 vCPU, 15 Go RAM) :

```
OVHcloud B2-15:          46.20 €/mois  ✅ Votre choix
AWS t3.medium:           30.37 €/mois  ❌ Plus cher de 52%
Google Cloud e2-standard-2: 48.91 €/mois  ❌ Plus cher de 6%
Azure B2ms:              60.74 €/mois  ❌ Plus cher de 31%

💰 Économies: Jusqu'à 14.54 €/mois par rapport à Azure
```

## Notes importantes

### Précision des prix

- Les prix sont basés sur les tarifs publics disponibles en janvier 2026
- Les prix peuvent varier selon :
  - La région géographique
  - Les engagements (réservations, savings plans)
  - Les volumes d'utilisation
  - Les remises négociées

### Limitations

- Comparaison non disponible pour tous les types d'instances
- Focus sur les instances General Purpose et GPU
- Les équivalences sont approximatives (spécifications légèrement différentes)

### Recommandations

- Vérifier les prix actuels sur les sites officiels
- Prendre en compte les coûts additionnels :
  - Transfert de données
  - Stockage
  - Support
  - Services managés
- Considérer les différences de performances et de SLA

## Mise à jour des données

Les prix doivent être mis à jour régulièrement en consultant les sources officielles :

1. **AWS EC2 Pricing** : [aws.amazon.com/ec2/pricing/](https://aws.amazon.com/ec2/pricing/)
2. **Google Cloud Compute Pricing** : [cloud.google.com/compute/pricing](https://cloud.google.com/compute/pricing)
3. **Azure VM Pricing** : [azure.microsoft.com/pricing/details/virtual-machines/](https://azure.microsoft.com/pricing/details/virtual-machines/)
4. **OVHcloud Pricing** : [ovhcloud.com/fr/public-cloud/prices/](https://www.ovhcloud.com/fr/public-cloud/prices/)

## Utilisation dans le calculateur

1. Sélectionnez un produit et une configuration
2. Cliquez sur "Comparaison concurrents" dans la sidebar
3. Visualisez les équivalents et les économies
4. Cliquez sur les liens pour accéder aux pages officielles

La comparaison prend en compte automatiquement :
- La quantité d'instances configurées
- Le coût mensuel total (730h par mois)
- Les économies potentielles en pourcentage

## Support

Pour ajouter de nouvelles comparaisons ou mettre à jour les prix, modifiez le fichier `competitorPricing.ts` en suivant la structure existante.

