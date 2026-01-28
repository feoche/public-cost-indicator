// Données produits OVHcloud extraites du fichier donnees-produits-cloud-complet.md

export interface ProductFlavor {
  code: string;
  name: string;
  vcpu: number;
  frequency: string;
  ram: string;
  storage: string;
  gpu?: string;
  bandwidth: string;
  pricePerHour: number;
  pricePerMonth?: number;
  planCodes: string[];
}

export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  category: 'compute' | 'storage' | 'database' | 'network';
  flavors: ProductFlavor[];
}

export const productsData: ProductCategory[] = [
  // COMPUTE - Cloud GPU
  {
    id: 'cloud-gpu',
    name: 'Cloud GPU',
    description: 'Jusqu\'à 1 000x plus rapides pour calculs parallèles. GPU NVIDIA A10, A100, H100 optimisés pour l\'IA et le machine learning.',
    category: 'compute',
    flavors: [
      {
        code: 'a10-45',
        name: 'A10-45',
        vcpu: 30,
        frequency: '3.3 GHz',
        ram: '45 Go',
        storage: '400 GiB SSD',
        gpu: 'A10 x1 (24 Go VRAM)',
        bandwidth: '8000 Mbit/s',
        pricePerHour: 0.76,
        planCodes: ['a10-45.consumption']
      },
      {
        code: 'a10-90',
        name: 'A10-90',
        vcpu: 60,
        frequency: '3.3 GHz',
        ram: '90 Go',
        storage: '400 GiB SSD',
        gpu: 'A10 x2 (24 Go VRAM)',
        bandwidth: '16000 Mbit/s',
        pricePerHour: 1.52,
        planCodes: ['a10-90.consumption']
      },
      {
        code: 'a100-180',
        name: 'A100-180',
        vcpu: 15,
        frequency: '3 GHz',
        ram: '180 Go',
        storage: '300 GiB NVMe',
        gpu: 'A100 x1 (80 Go VRAM)',
        bandwidth: '8000 Mbit/s',
        pricePerHour: 2.75,
        pricePerMonth: 1100.00,
        planCodes: ['a100-180.consumption', 'a100-180.monthly.postpaid']
      },
      {
        code: 'a100-360',
        name: 'A100-360',
        vcpu: 30,
        frequency: '3 GHz',
        ram: '360 Go',
        storage: '500 GiB NVMe',
        gpu: 'A100 x2 (80 Go VRAM)',
        bandwidth: '16000 Mbit/s',
        pricePerHour: 5.50,
        pricePerMonth: 2200.00,
        planCodes: ['a100-360.consumption', 'a100-360.monthly.postpaid']
      },
      {
        code: 'a100-720',
        name: 'A100-720',
        vcpu: 60,
        frequency: '3 GHz',
        ram: '720 Go',
        storage: '500 GiB NVMe',
        gpu: 'A100 x4 (80 Go VRAM)',
        bandwidth: '25000 Mbit/s',
        pricePerHour: 11.00,
        pricePerMonth: 4400.00,
        planCodes: ['a100-720.consumption', 'a100-720.monthly.postpaid']
      },
      {
        code: 'h100-380',
        name: 'H100-380',
        vcpu: 30,
        frequency: '3 GHz',
        ram: '380 Go',
        storage: '200 GiB + 3840 GiB NVMe',
        gpu: 'H100 x1 (80 Go VRAM)',
        bandwidth: '8000 Mbit/s',
        pricePerHour: 2.80,
        pricePerMonth: 1940.00,
        planCodes: ['h100-380.consumption', 'h100-380.monthly.postpaid']
      },
      {
        code: 'h100-760',
        name: 'H100-760',
        vcpu: 60,
        frequency: '3 GHz',
        ram: '760 Go',
        storage: '200 GiB + 3840 GiB NVMe',
        gpu: 'H100 x2 (80 Go VRAM)',
        bandwidth: '16000 Mbit/s',
        pricePerHour: 5.60,
        pricePerMonth: 3880.00,
        planCodes: ['h100-760.consumption', 'h100-760.monthly.postpaid']
      },
      {
        code: 'h100-1520',
        name: 'H100-1520',
        vcpu: 120,
        frequency: '3 GHz',
        ram: '1520 Go',
        storage: '200 GiB + 3840 GiB NVMe',
        gpu: 'H100 x4 (80 Go VRAM)',
        bandwidth: '25000 Mbit/s',
        pricePerHour: 11.20,
        pricePerMonth: 7770.00,
        planCodes: ['h100-1520.consumption', 'h100-1520.monthly.postpaid']
      },
      {
        code: 'l4-90',
        name: 'L4-90',
        vcpu: 22,
        frequency: '2.75 GHz',
        ram: '90 Go',
        storage: '400 GiB NVMe',
        gpu: 'L4 x1 (24 Go VRAM)',
        bandwidth: '8000 Mbit/s',
        pricePerHour: 0.75,
        pricePerMonth: 540.00,
        planCodes: ['l4-90.consumption', 'l4-90.monthly.postpaid']
      },
      {
        code: 'l4-180',
        name: 'L4-180',
        vcpu: 45,
        frequency: '2.75 GHz',
        ram: '180 Go',
        storage: '400 GiB NVMe',
        gpu: 'L4 x2 (24 Go VRAM)',
        bandwidth: '16000 Mbit/s',
        pricePerHour: 1.50,
        pricePerMonth: 1080.00,
        planCodes: ['l4-180.consumption', 'l4-180.monthly.postpaid']
      },
      {
        code: 'l4-360',
        name: 'L4-360',
        vcpu: 90,
        frequency: '2.75 GHz',
        ram: '360 Go',
        storage: '400 GiB NVMe',
        gpu: 'L4 x4 (24 Go VRAM)',
        bandwidth: '25000 Mbit/s',
        pricePerHour: 3.00,
        pricePerMonth: 2160.00,
        planCodes: ['l4-360.consumption', 'l4-360.monthly.postpaid']
      },
      {
        code: 'l40s-90',
        name: 'L40S-90',
        vcpu: 15,
        frequency: '2.75 GHz',
        ram: '90 Go',
        storage: '400 GiB NVMe',
        gpu: 'L40S x1 (48 Go VRAM)',
        bandwidth: '8000 Mbit/s',
        pricePerHour: 1.40,
        pricePerMonth: 1008.00,
        planCodes: ['l40s-90.consumption', 'l40s-90.monthly.postpaid']
      },
      {
        code: 'l40s-180',
        name: 'L40S-180',
        vcpu: 30,
        frequency: '2.75 GHz',
        ram: '180 Go',
        storage: '400 GiB NVMe',
        gpu: 'L40S x2 (48 Go VRAM)',
        bandwidth: '16000 Mbit/s',
        pricePerHour: 2.80,
        pricePerMonth: 2016.00,
        planCodes: ['l40s-180.consumption', 'l40s-180.monthly.postpaid']
      },
      {
        code: 'l40s-360',
        name: 'L40S-360',
        vcpu: 60,
        frequency: '2.75 GHz',
        ram: '360 Go',
        storage: '400 GiB NVMe',
        gpu: 'L40S x4 (48 Go VRAM)',
        bandwidth: '25000 Mbit/s',
        pricePerHour: 5.60,
        pricePerMonth: 4032.00,
        planCodes: ['l40s-360.consumption', 'l40s-360.monthly.postpaid']
      }
    ]
  },

  // COMPUTE - General Purpose Instances
  {
    id: 'general-purpose',
    name: 'General Purpose Instances',
    description: 'Instances polyvalentes adaptées à tous usages. Idéales pour les applications web, les microservices, les plateformes SaaS.',
    category: 'compute',
    flavors: [
      {
        code: 'b2-7',
        name: 'B2-7',
        vcpu: 2,
        frequency: '2 GHz',
        ram: '7 Go',
        storage: '50 GiB SSD',
        bandwidth: '250 Mbit/s',
        pricePerHour: 0.07,
        pricePerMonth: 24.20,
        planCodes: ['b2-7.consumption', 'b2-7.monthly.postpaid']
      },
      {
        code: 'b2-15',
        name: 'B2-15',
        vcpu: 4,
        frequency: '2 GHz',
        ram: '15 Go',
        storage: '100 GiB SSD',
        bandwidth: '250 Mbit/s',
        pricePerHour: 0.13,
        pricePerMonth: 46.20,
        planCodes: ['b2-15.consumption', 'b2-15.monthly.postpaid']
      },
      {
        code: 'b2-30',
        name: 'B2-30',
        vcpu: 8,
        frequency: '2 GHz',
        ram: '30 Go',
        storage: '200 GiB SSD',
        bandwidth: '500 Mbit/s',
        pricePerHour: 0.26,
        pricePerMonth: 93.50,
        planCodes: ['b2-30.consumption', 'b2-30.monthly.postpaid']
      },
      {
        code: 'b2-60',
        name: 'B2-60',
        vcpu: 16,
        frequency: '2 GHz',
        ram: '60 Go',
        storage: '400 GiB SSD',
        bandwidth: '1000 Mbit/s',
        pricePerHour: 0.51,
        pricePerMonth: 182.00,
        planCodes: ['b2-60.consumption', 'b2-60.monthly.postpaid']
      },
      {
        code: 'b2-120',
        name: 'B2-120',
        vcpu: 32,
        frequency: '2 GHz',
        ram: '120 Go',
        storage: '400 GiB SSD',
        bandwidth: '10000 Mbit/s',
        pricePerHour: 0.99,
        pricePerMonth: 358.00,
        planCodes: ['b2-120.consumption', 'b2-120.monthly.postpaid']
      },
      {
        code: 'b3-8',
        name: 'B3-8',
        vcpu: 2,
        frequency: '2.3 GHz',
        ram: '8 Go',
        storage: '50 GiB NVMe',
        bandwidth: '500 Mbit/s',
        pricePerHour: 0.09,
        planCodes: ['b3-8.consumption']
      },
      {
        code: 'b3-16',
        name: 'B3-16',
        vcpu: 4,
        frequency: '2.3 GHz',
        ram: '16 Go',
        storage: '100 GiB NVMe',
        bandwidth: '1000 Mbit/s',
        pricePerHour: 0.19,
        planCodes: ['b3-16.consumption']
      },
      {
        code: 'b3-32',
        name: 'B3-32',
        vcpu: 8,
        frequency: '2.3 GHz',
        ram: '32 Go',
        storage: '200 GiB NVMe',
        bandwidth: '2000 Mbit/s',
        pricePerHour: 0.37,
        planCodes: ['b3-32.consumption']
      },
      {
        code: 'b3-64',
        name: 'B3-64',
        vcpu: 16,
        frequency: '2.3 GHz',
        ram: '64 Go',
        storage: '400 GiB NVMe',
        bandwidth: '4000 Mbit/s',
        pricePerHour: 0.74,
        planCodes: ['b3-64.consumption']
      },
      {
        code: 'b3-128',
        name: 'B3-128',
        vcpu: 32,
        frequency: '2.3 GHz',
        ram: '128 Go',
        storage: '400 GiB NVMe',
        bandwidth: '8000 Mbit/s',
        pricePerHour: 0.74,
        planCodes: ['b3-128.consumption']
      },
      {
        code: 'b3-256',
        name: 'B3-256',
        vcpu: 64,
        frequency: '2.3 GHz',
        ram: '256 Go',
        storage: '400 GiB NVMe',
        bandwidth: '16000 Mbit/s',
        pricePerHour: 1.49,
        planCodes: ['b3-256.consumption']
      },
      {
        code: 'b3-512',
        name: 'B3-512',
        vcpu: 128,
        frequency: '2.3 GHz',
        ram: '512 Go',
        storage: '400 GiB NVMe',
        bandwidth: '20000 Mbit/s',
        pricePerHour: 2.98,
        planCodes: ['b3-512.consumption']
      },
      {
        code: 'b3-640',
        name: 'B3-640',
        vcpu: 160,
        frequency: '2.3 GHz',
        ram: '640 Go',
        storage: '400 GiB NVMe',
        bandwidth: '20000 Mbit/s',
        pricePerHour: 3.72,
        planCodes: ['b3-640.consumption']
      }
    ]
  },

  // STORAGE - Block Storage
  {
    id: 'block-storage',
    name: 'Block Storage (High Performance)',
    description: 'Stockage bloc haute performance pour applications nécessitant des performances élevées.',
    category: 'storage',
    flavors: [
      {
        code: 'storage-high-perf',
        name: 'High Performance Storage',
        vcpu: 0,
        frequency: 'N/A',
        ram: 'N/A',
        storage: 'Variable (réplication triple)',
        bandwidth: 'N/A',
        pricePerHour: 0.0000,
        pricePerMonth: 0.02,
        planCodes: ['storage-high-perf.consumption', 'storage-high-perf.monthly.postpaid']
      }
    ]
  },

  // DATABASE - MySQL
  {
    id: 'mysql-database',
    name: 'Managed MySQL Database',
    description: 'Base de données MySQL managée avec haute disponibilité et sauvegardes automatiques.',
    category: 'database',
    flavors: [
      {
        code: 'db1-4',
        name: 'Business DB1-4',
        vcpu: 2,
        frequency: 'N/A',
        ram: '4 Go',
        storage: '80 GiB',
        bandwidth: '250 Mbit/s',
        pricePerHour: 0.09,
        planCodes: ['databases.mysql-business-db1-4.hour.consumption']
      },
      {
        code: 'db1-7',
        name: 'Business DB1-7',
        vcpu: 2,
        frequency: 'N/A',
        ram: '7 Go',
        storage: '160 GiB',
        bandwidth: '250 Mbit/s',
        pricePerHour: 0.18,
        planCodes: ['databases.mysql-business-db1-7.hour.consumption']
      },
      {
        code: 'db1-15',
        name: 'Business DB1-15',
        vcpu: 4,
        frequency: 'N/A',
        ram: '15 Go',
        storage: '320 GiB',
        bandwidth: '250 Mbit/s',
        pricePerHour: 0.35,
        planCodes: ['databases.mysql-business-db1-15.hour.consumption']
      },
      {
        code: 'db1-30',
        name: 'Business DB1-30',
        vcpu: 8,
        frequency: 'N/A',
        ram: '30 Go',
        storage: '640 GiB',
        bandwidth: '500 Mbit/s',
        pricePerHour: 0.71,
        planCodes: ['databases.mysql-business-db1-30.hour.consumption']
      },
      {
        code: 'db1-60',
        name: 'Business DB1-60',
        vcpu: 16,
        frequency: 'N/A',
        ram: '60 Go',
        storage: '1280 GiB',
        bandwidth: '1000 Mbit/s',
        pricePerHour: 1.42,
        planCodes: ['databases.mysql-business-db1-60.hour.consumption']
      },
      {
        code: 'db1-120',
        name: 'Business DB1-120',
        vcpu: 32,
        frequency: 'N/A',
        ram: '120 Go',
        storage: '2560 GiB',
        bandwidth: '10000 Mbit/s',
        pricePerHour: 2.83,
        planCodes: ['databases.mysql-business-db1-120.hour.consumption']
      },
      {
        code: 'b3-8-db',
        name: 'Production B3-8',
        vcpu: 2,
        frequency: 'N/A',
        ram: '8 Go',
        storage: '160 GiB',
        bandwidth: '500 Mbit/s',
        pricePerHour: 0.23,
        planCodes: ['databases.mysql-production-b3-8.hour.consumption']
      },
      {
        code: 'b3-16-db',
        name: 'Production B3-16',
        vcpu: 4,
        frequency: 'N/A',
        ram: '16 Go',
        storage: '320 GiB',
        bandwidth: '1000 Mbit/s',
        pricePerHour: 0.45,
        planCodes: ['databases.mysql-production-b3-16.hour.consumption']
      },
      {
        code: 'b3-32-db',
        name: 'Production B3-32',
        vcpu: 8,
        frequency: 'N/A',
        ram: '32 Go',
        storage: '640 GiB',
        bandwidth: '2000 Mbit/s',
        pricePerHour: 0.90,
        planCodes: ['databases.mysql-production-b3-32.hour.consumption']
      },
      {
        code: 'b3-64-db',
        name: 'Production B3-64',
        vcpu: 16,
        frequency: 'N/A',
        ram: '64 Go',
        storage: '1280 GiB',
        bandwidth: '4000 Mbit/s',
        pricePerHour: 1.80,
        planCodes: ['databases.mysql-production-b3-64.hour.consumption']
      },
      {
        code: 'b3-128-db',
        name: 'Production B3-128',
        vcpu: 32,
        frequency: 'N/A',
        ram: '128 Go',
        storage: '2560 GiB',
        bandwidth: '8000 Mbit/s',
        pricePerHour: 3.61,
        planCodes: ['databases.mysql-production-b3-128.hour.consumption']
      },
      {
        code: 'b3-256-db',
        name: 'Production B3-256',
        vcpu: 64,
        frequency: 'N/A',
        ram: '256 Go',
        storage: '5120 GiB',
        bandwidth: '16000 Mbit/s',
        pricePerHour: 7.21,
        planCodes: ['databases.mysql-production-b3-256.hour.consumption']
      }
    ]
  }
];

// Fonctions utilitaires
export function getProductById(id: string): ProductCategory | undefined {
  return productsData.find(p => p.id === id);
}

export function getProductsByCategory(category: 'compute' | 'storage' | 'database' | 'network'): ProductCategory[] {
  return productsData.filter(p => p.category === category);
}

export function getFlavorByCode(productId: string, flavorCode: string): ProductFlavor | undefined {
  const product = getProductById(productId);
  return product?.flavors.find(f => f.code === flavorCode);
}

export const productCategories = [
  { value: 'compute', label: 'Compute' },
  { value: 'storage', label: 'Storage' },
  { value: 'database', label: 'Database' },
  { value: 'network', label: 'Network' }
];

export const regions = [
  { value: 'gra', label: 'GRA - Gravelines (France)' },
  { value: 'rbx', label: 'RBX - Roubaix (France)' },
  { value: 'sbg', label: 'SBG - Strasbourg (France)' },
  { value: 'bhs', label: 'BHS - Beauharnois (Canada)' },
  { value: 'de', label: 'DE - Frankfurt (Allemagne)' },
  { value: 'uk', label: 'UK - London (Royaume-Uni)' }
];

export const resilienceOptions = [
  { value: 'local', label: 'Local (LAZ) - 99.9% SLA', description: 'Déploiement standard dans une seule zone' },
  { value: 'multi-az', label: 'Multi-AZ - 99.95% SLA', description: 'Réplication sur plusieurs zones de disponibilité' },
  { value: 'multi-region', label: 'Multi-Région - 99.99% SLA', description: 'Réplication sur plusieurs régions géographiques' }
];

export const backupOptions = [
  { value: 'none', label: 'Aucune sauvegarde' },
  { value: 'daily', label: 'Quotidienne (7 jours de rétention)' },
  { value: 'weekly', label: 'Hebdomadaire (4 semaines de rétention)' },
  { value: 'monthly', label: 'Mensuelle (12 mois de rétention)' }
];

export const savingsPlans = [
  { value: 'none', label: 'Pay-as-you-go (aucun engagement)', discount: 0 },
  { value: '1month', label: '1 mois - 5% de réduction', discount: 0.05 },
  { value: '6months', label: '6 mois - 10% de réduction', discount: 0.10 },
  { value: '12months', label: '12 mois - 15% de réduction', discount: 0.15 },
  { value: '36months', label: '36 mois - 20% de réduction', discount: 0.20 }
];

