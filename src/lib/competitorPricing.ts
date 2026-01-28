// Données de comparaison des prix avec les concurrents
// Sources: AWS (https://aws.amazon.com/fr/), Google Cloud (https://cloud.google.com/gcp?hl=fr), Azure (https://azure.microsoft.com/fr-fr/products/)

export interface CompetitorPrice {
  provider: 'aws' | 'gcp' | 'azure';
  instanceType: string;
  pricePerHour: number;
  pricePerMonth?: number;
  url: string;
}

export interface InstanceComparison {
  vcpu: number;
  ram: string; // en Go
  competitors: CompetitorPrice[];
}

// Mapping des instances OVHcloud vers leurs équivalents chez les concurrents
// Prix approximatifs basés sur les tarifs publics (région EU/US)
export const competitorComparisons: Record<string, InstanceComparison> = {
  // General Purpose B2 series
  'b2-7': {
    vcpu: 2,
    ram: '7',
    competitors: [
      {
        provider: 'aws',
        instanceType: 't3.small',
        pricePerHour: 0.0208,
        pricePerMonth: 15.18,
        url: 'https://aws.amazon.com/fr/ec2/instance-types/t3/'
      },
      {
        provider: 'gcp',
        instanceType: 'e2-small',
        pricePerHour: 0.0168,
        pricePerMonth: 12.26,
        url: 'https://cloud.google.com/compute/vm-instance-pricing'
      },
      {
        provider: 'azure',
        instanceType: 'B2s',
        pricePerHour: 0.0416,
        pricePerMonth: 30.37,
        url: 'https://azure.microsoft.com/fr-fr/pricing/details/virtual-machines/linux/'
      }
    ]
  },
  'b2-15': {
    vcpu: 4,
    ram: '15',
    competitors: [
      {
        provider: 'aws',
        instanceType: 't3.medium',
        pricePerHour: 0.0416,
        pricePerMonth: 30.37,
        url: 'https://aws.amazon.com/fr/ec2/instance-types/t3/'
      },
      {
        provider: 'gcp',
        instanceType: 'e2-standard-2',
        pricePerHour: 0.067,
        pricePerMonth: 48.91,
        url: 'https://cloud.google.com/compute/vm-instance-pricing'
      },
      {
        provider: 'azure',
        instanceType: 'B2ms',
        pricePerHour: 0.0832,
        pricePerMonth: 60.74,
        url: 'https://azure.microsoft.com/fr-fr/pricing/details/virtual-machines/linux/'
      }
    ]
  },
  'b2-30': {
    vcpu: 8,
    ram: '30',
    competitors: [
      {
        provider: 'aws',
        instanceType: 't3.large',
        pricePerHour: 0.0832,
        pricePerMonth: 60.74,
        url: 'https://aws.amazon.com/fr/ec2/instance-types/t3/'
      },
      {
        provider: 'gcp',
        instanceType: 'e2-standard-4',
        pricePerHour: 0.134,
        pricePerMonth: 97.82,
        url: 'https://cloud.google.com/compute/vm-instance-pricing'
      },
      {
        provider: 'azure',
        instanceType: 'D2s_v3',
        pricePerHour: 0.096,
        pricePerMonth: 70.08,
        url: 'https://azure.microsoft.com/fr-fr/pricing/details/virtual-machines/linux/'
      }
    ]
  },
  'b2-60': {
    vcpu: 16,
    ram: '60',
    competitors: [
      {
        provider: 'aws',
        instanceType: 't3.xlarge',
        pricePerHour: 0.1664,
        pricePerMonth: 121.47,
        url: 'https://aws.amazon.com/fr/ec2/instance-types/t3/'
      },
      {
        provider: 'gcp',
        instanceType: 'e2-standard-8',
        pricePerHour: 0.268,
        pricePerMonth: 195.64,
        url: 'https://cloud.google.com/compute/vm-instance-pricing'
      },
      {
        provider: 'azure',
        instanceType: 'D4s_v3',
        pricePerHour: 0.192,
        pricePerMonth: 140.16,
        url: 'https://azure.microsoft.com/fr-fr/pricing/details/virtual-machines/linux/'
      }
    ]
  },
  'b2-120': {
    vcpu: 32,
    ram: '120',
    competitors: [
      {
        provider: 'aws',
        instanceType: 't3.2xlarge',
        pricePerHour: 0.3328,
        pricePerMonth: 242.94,
        url: 'https://aws.amazon.com/fr/ec2/instance-types/t3/'
      },
      {
        provider: 'gcp',
        instanceType: 'e2-standard-16',
        pricePerHour: 0.536,
        pricePerMonth: 391.28,
        url: 'https://cloud.google.com/compute/vm-instance-pricing'
      },
      {
        provider: 'azure',
        instanceType: 'D8s_v3',
        pricePerHour: 0.384,
        pricePerMonth: 280.32,
        url: 'https://azure.microsoft.com/fr-fr/pricing/details/virtual-machines/linux/'
      }
    ]
  },

  // B3 series
  'b3-8': {
    vcpu: 2,
    ram: '8',
    competitors: [
      {
        provider: 'aws',
        instanceType: 't3.small',
        pricePerHour: 0.0208,
        pricePerMonth: 15.18,
        url: 'https://aws.amazon.com/fr/ec2/instance-types/t3/'
      },
      {
        provider: 'gcp',
        instanceType: 'e2-small',
        pricePerHour: 0.0168,
        pricePerMonth: 12.26,
        url: 'https://cloud.google.com/compute/vm-instance-pricing'
      },
      {
        provider: 'azure',
        instanceType: 'B2s',
        pricePerHour: 0.0416,
        pricePerMonth: 30.37,
        url: 'https://azure.microsoft.com/fr-fr/pricing/details/virtual-machines/linux/'
      }
    ]
  },
  'b3-16': {
    vcpu: 4,
    ram: '16',
    competitors: [
      {
        provider: 'aws',
        instanceType: 't3.medium',
        pricePerHour: 0.0416,
        pricePerMonth: 30.37,
        url: 'https://aws.amazon.com/fr/ec2/instance-types/t3/'
      },
      {
        provider: 'gcp',
        instanceType: 'e2-standard-2',
        pricePerHour: 0.067,
        pricePerMonth: 48.91,
        url: 'https://cloud.google.com/compute/vm-instance-pricing'
      },
      {
        provider: 'azure',
        instanceType: 'B2ms',
        pricePerHour: 0.0832,
        pricePerMonth: 60.74,
        url: 'https://azure.microsoft.com/fr-fr/pricing/details/virtual-machines/linux/'
      }
    ]
  },
  'b3-32': {
    vcpu: 8,
    ram: '32',
    competitors: [
      {
        provider: 'aws',
        instanceType: 't3.large',
        pricePerHour: 0.0832,
        pricePerMonth: 60.74,
        url: 'https://aws.amazon.com/fr/ec2/instance-types/t3/'
      },
      {
        provider: 'gcp',
        instanceType: 'e2-standard-4',
        pricePerHour: 0.134,
        pricePerMonth: 97.82,
        url: 'https://cloud.google.com/compute/vm-instance-pricing'
      },
      {
        provider: 'azure',
        instanceType: 'D2s_v3',
        pricePerHour: 0.096,
        pricePerMonth: 70.08,
        url: 'https://azure.microsoft.com/fr-fr/pricing/details/virtual-machines/linux/'
      }
    ]
  },
  'b3-64': {
    vcpu: 16,
    ram: '64',
    competitors: [
      {
        provider: 'aws',
        instanceType: 't3.xlarge',
        pricePerHour: 0.1664,
        pricePerMonth: 121.47,
        url: 'https://aws.amazon.com/fr/ec2/instance-types/t3/'
      },
      {
        provider: 'gcp',
        instanceType: 'e2-standard-8',
        pricePerHour: 0.268,
        pricePerMonth: 195.64,
        url: 'https://cloud.google.com/compute/vm-instance-pricing'
      },
      {
        provider: 'azure',
        instanceType: 'D4s_v3',
        pricePerHour: 0.192,
        pricePerMonth: 140.16,
        url: 'https://azure.microsoft.com/fr-fr/pricing/details/virtual-machines/linux/'
      }
    ]
  },
  'b3-128': {
    vcpu: 32,
    ram: '128',
    competitors: [
      {
        provider: 'aws',
        instanceType: 't3.2xlarge',
        pricePerHour: 0.3328,
        pricePerMonth: 242.94,
        url: 'https://aws.amazon.com/fr/ec2/instance-types/t3/'
      },
      {
        provider: 'gcp',
        instanceType: 'e2-standard-16',
        pricePerHour: 0.536,
        pricePerMonth: 391.28,
        url: 'https://cloud.google.com/compute/vm-instance-pricing'
      },
      {
        provider: 'azure',
        instanceType: 'D8s_v3',
        pricePerHour: 0.384,
        pricePerMonth: 280.32,
        url: 'https://azure.microsoft.com/fr-fr/pricing/details/virtual-machines/linux/'
      }
    ]
  },

  // GPU Instances - A10
  'a10-45': {
    vcpu: 30,
    ram: '45',
    competitors: [
      {
        provider: 'aws',
        instanceType: 'g5.xlarge',
        pricePerHour: 1.006,
        pricePerMonth: 734.38,
        url: 'https://aws.amazon.com/fr/ec2/instance-types/g5/'
      },
      {
        provider: 'gcp',
        instanceType: 'a2-highgpu-1g',
        pricePerHour: 1.095,
        pricePerMonth: 799.35,
        url: 'https://cloud.google.com/compute/gpus-pricing'
      },
      {
        provider: 'azure',
        instanceType: 'NC6s v3',
        pricePerHour: 1.146,
        pricePerMonth: 836.58,
        url: 'https://azure.microsoft.com/fr-fr/pricing/details/virtual-machines/linux/'
      }
    ]
  },
  'a10-90': {
    vcpu: 60,
    ram: '90',
    competitors: [
      {
        provider: 'aws',
        instanceType: 'g5.2xlarge',
        pricePerHour: 2.012,
        pricePerMonth: 1468.76,
        url: 'https://aws.amazon.com/fr/ec2/instance-types/g5/'
      },
      {
        provider: 'gcp',
        instanceType: 'a2-highgpu-2g',
        pricePerHour: 2.190,
        pricePerMonth: 1598.70,
        url: 'https://cloud.google.com/compute/gpus-pricing'
      },
      {
        provider: 'azure',
        instanceType: 'NC12s v3',
        pricePerHour: 2.292,
        pricePerMonth: 1673.16,
        url: 'https://azure.microsoft.com/fr-fr/pricing/details/virtual-machines/linux/'
      }
    ]
  },

  // GPU Instances - A100
  'a100-180': {
    vcpu: 15,
    ram: '180',
    competitors: [
      {
        provider: 'aws',
        instanceType: 'p4d.24xlarge (1 GPU)',
        pricePerHour: 3.06,
        pricePerMonth: 2233.80,
        url: 'https://aws.amazon.com/fr/ec2/instance-types/p4/'
      },
      {
        provider: 'gcp',
        instanceType: 'a2-highgpu-1g',
        pricePerHour: 3.673,
        pricePerMonth: 2681.29,
        url: 'https://cloud.google.com/compute/gpus-pricing'
      },
      {
        provider: 'azure',
        instanceType: 'NC A100 v4',
        pricePerHour: 3.672,
        pricePerMonth: 2680.56,
        url: 'https://azure.microsoft.com/fr-fr/pricing/details/virtual-machines/linux/'
      }
    ]
  },
  'a100-360': {
    vcpu: 30,
    ram: '360',
    competitors: [
      {
        provider: 'aws',
        instanceType: 'p4d.24xlarge (2 GPU)',
        pricePerHour: 6.12,
        pricePerMonth: 4467.60,
        url: 'https://aws.amazon.com/fr/ec2/instance-types/p4/'
      },
      {
        provider: 'gcp',
        instanceType: 'a2-highgpu-2g',
        pricePerHour: 7.346,
        pricePerMonth: 5362.58,
        url: 'https://cloud.google.com/compute/gpus-pricing'
      },
      {
        provider: 'azure',
        instanceType: 'NC48ads A100 v4',
        pricePerHour: 7.344,
        pricePerMonth: 5361.12,
        url: 'https://azure.microsoft.com/fr-fr/pricing/details/virtual-machines/linux/'
      }
    ]
  },

  // GPU Instances - H100
  'h100-90': {
    vcpu: 15,
    ram: '90',
    competitors: [
      {
        provider: 'aws',
        instanceType: 'p5.48xlarge (1 GPU)',
        pricePerHour: 4.50,
        pricePerMonth: 3285.00,
        url: 'https://aws.amazon.com/fr/ec2/instance-types/p5/'
      },
      {
        provider: 'gcp',
        instanceType: 'a3-highgpu-1g',
        pricePerHour: 5.52,
        pricePerMonth: 4029.60,
        url: 'https://cloud.google.com/compute/gpus-pricing'
      },
      {
        provider: 'azure',
        instanceType: 'ND H100 v5',
        pricePerHour: 5.40,
        pricePerMonth: 3942.00,
        url: 'https://azure.microsoft.com/fr-fr/pricing/details/virtual-machines/linux/'
      }
    ]
  },
  'h100-180': {
    vcpu: 30,
    ram: '180',
    competitors: [
      {
        provider: 'aws',
        instanceType: 'p5.48xlarge (1 GPU)',
        pricePerHour: 4.50,
        pricePerMonth: 3285.00,
        url: 'https://aws.amazon.com/fr/ec2/instance-types/p5/'
      },
      {
        provider: 'gcp',
        instanceType: 'a3-highgpu-1g',
        pricePerHour: 5.52,
        pricePerMonth: 4029.60,
        url: 'https://cloud.google.com/compute/gpus-pricing'
      },
      {
        provider: 'azure',
        instanceType: 'ND H100 v5',
        pricePerHour: 5.40,
        pricePerMonth: 3942.00,
        url: 'https://azure.microsoft.com/fr-fr/pricing/details/virtual-machines/linux/'
      }
    ]
  },
  'h100-380': {
    vcpu: 30,
    ram: '380',
    competitors: [
      {
        provider: 'aws',
        instanceType: 'p5.48xlarge (1 GPU)',
        pricePerHour: 4.50,
        pricePerMonth: 3285.00,
        url: 'https://aws.amazon.com/fr/ec2/instance-types/p5/'
      },
      {
        provider: 'gcp',
        instanceType: 'a3-highgpu-1g',
        pricePerHour: 5.52,
        pricePerMonth: 4029.60,
        url: 'https://cloud.google.com/compute/gpus-pricing'
      },
      {
        provider: 'azure',
        instanceType: 'ND H100 v5',
        pricePerHour: 5.40,
        pricePerMonth: 3942.00,
        url: 'https://azure.microsoft.com/fr-fr/pricing/details/virtual-machines/linux/'
      }
    ]
  }
};

// Fonction pour obtenir la comparaison d'un flavor
export function getCompetitorComparison(flavorCode: string): InstanceComparison | null {
  return competitorComparisons[flavorCode] || null;
}

// Coûts additionnels standardisés (approximatifs, basés sur les tarifs moyens)
export const additionalCosts = {
  blockStorage: {
    ovh: 0.02,      // €/GB/mois
    aws: 0.10,      // EBS gp3
    gcp: 0.04,      // Persistent Disk SSD
    azure: 0.12     // Premium SSD
  },
  s3Storage: {
    ovh: 0.01,      // €/GB/mois
    aws: 0.023,     // S3 Standard
    gcp: 0.020,     // Cloud Storage Standard
    azure: 0.018    // Blob Storage Hot
  },
  publicIP: {
    ovh: 3,         // €/IP/mois
    aws: 3.65,      // Elastic IP
    gcp: 7.30,      // Static IP
    azure: 2.92     // Public IP
  },
  backup: {
    ovh: 0.05,      // 5% du coût de base
    aws: 0.05,      // AWS Backup
    gcp: 0.05,      // Persistent Disk Snapshots
    azure: 0.05     // Azure Backup
  },
  multiAZ: {
    ovh: 0.15,      // 15% supplémentaire
    aws: 0.15,      // Multi-AZ
    gcp: 0.15,      // Multi-zone
    azure: 0.15     // Availability Zones
  },
  multiRegion: {
    ovh: 0.30,      // 30% supplémentaire
    aws: 0.40,      // Multi-Region
    gcp: 0.40,      // Multi-region
    azure: 0.40     // Geo-replication
  }
};

// Configuration d'infrastructure pour comparaison
export interface InfrastructureConfig {
  quantity: number;
  additionalBlockStorage: number;  // GB
  additionalS3Storage: number;     // GB
  publicIPs: number;
  hasBackup: boolean;
  hasDistantBackup: boolean;
  resilience: 'local' | 'multi-az' | 'multi-region' | '';
  savingsPlanDiscount: number;     // 0 à 0.20
}

// Calculer le coût total d'infrastructure pour un provider
export function calculateInfrastructureCost(
  instanceMonthlyCost: number,
  config: InfrastructureConfig,
  provider: 'ovh' | 'aws' | 'gcp' | 'azure'
): {
  baseCost: number;
  storageCost: number;
  s3Cost: number;
  ipCost: number;
  backupCost: number;
  resilienceCost: number;
  total: number;
  totalWithDiscount: number;
} {
  const baseCost = instanceMonthlyCost * config.quantity;
  
  const storageCost = config.additionalBlockStorage * additionalCosts.blockStorage[provider];
  const s3Cost = config.additionalS3Storage * additionalCosts.s3Storage[provider];
  const ipCost = config.publicIPs * additionalCosts.publicIP[provider];
  
  let backupCost = 0;
  if (config.hasBackup) {
    backupCost = baseCost * additionalCosts.backup[provider];
  }
  if (config.hasDistantBackup) {
    backupCost += baseCost * 0.10; // 10% supplémentaire pour backup distant
  }
  
  let resilienceCost = 0;
  if (config.resilience === 'multi-az') {
    resilienceCost = baseCost * additionalCosts.multiAZ[provider];
  } else if (config.resilience === 'multi-region') {
    resilienceCost = baseCost * additionalCosts.multiRegion[provider];
  }
  
  const total = baseCost + storageCost + s3Cost + ipCost + backupCost + resilienceCost;
  const totalWithDiscount = total * (1 - config.savingsPlanDiscount);
  
  return {
    baseCost,
    storageCost,
    s3Cost,
    ipCost,
    backupCost,
    resilienceCost,
    total,
    totalWithDiscount
  };
}

// Fonction pour calculer les économies par rapport aux concurrents
export function calculateSavings(ovhPrice: number, competitorPrice: number): {
  savings: number;
  percentage: number;
} {
  const savings = competitorPrice - ovhPrice;
  const percentage = competitorPrice > 0 ? ((savings / competitorPrice) * 100) : 0;
  return { savings, percentage };
}

export const providerInfo = {
  aws: {
    name: 'AWS',
    logo: '☁️',
    color: '#FF9900',
    website: 'https://aws.amazon.com/fr/'
  },
  gcp: {
    name: 'Google Cloud',
    logo: '☁️',
    color: '#4285F4',
    website: 'https://cloud.google.com/gcp?hl=fr'
  },
  azure: {
    name: 'Azure',
    logo: '☁️',
    color: '#0078D4',
    website: 'https://azure.microsoft.com/fr-fr/products/'
  },
  ovh: {
    name: 'OVHcloud',
    logo: '☁️',
    color: '#00a2bf',
    website: 'https://www.ovhcloud.com/fr/'
  }
};

