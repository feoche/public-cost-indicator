'use client';

import { Product } from '@/lib/types';
import styles from './ProductCatalog.module.css';

interface ProductCatalogProps {
  onSelectProduct: (product: Product) => void;
  selectedProduct?: Product;
}

export default function ProductCatalog({ onSelectProduct, selectedProduct }: ProductCatalogProps) {
  // Produits d'exemple basés sur OVHcloud
  const products: Product[] = [
    {
      id: 'instances',
      name: 'Instances',
      brick: 'Compute',
      subType: 'Pay as you go',
      useCases: ['Hébergement web', 'Applications', 'Microservices'],
      recommendations: ['Scalabilité horizontale', 'Performance garantie']
    },
    {
      id: 'gpu-instances',
      name: 'GPU Instances',
      brick: 'AI & ML',
      subType: 'Pay as you go',
      useCases: ['IA', 'Machine Learning', 'Calcul intensif'],
      recommendations: ['GPU NVIDIA', 'Haute performance']
    },
    {
      id: 'object-storage',
      name: 'Object Storage',
      brick: 'Storage',
      subType: 'Pay as you go',
      useCases: ['Stockage d\'objets', 'Backups', 'Archives'],
      recommendations: ['Grande échelle', 'Haute disponibilité']
    },
    {
      id: 'block-storage',
      name: 'Block Storage',
      brick: 'Storage',
      subType: 'Pay as you go',
      useCases: ['Stockage bloc', 'Bases de données', 'Haute performance'],
      recommendations: ['SSD/NVMe', 'Faible latence']
    },
    {
      id: 'managed-kubernetes',
      name: 'Managed Kubernetes',
      brick: 'Containers',
      subType: 'Pay as you go',
      useCases: ['Orchestration conteneurs', 'Microservices', 'Cloud Native'],
      recommendations: ['Kubernetes géré', 'Auto-scaling']
    },
    {
      id: 'managed-databases',
      name: 'Managed Databases',
      brick: 'Databases',
      subType: 'Pay as you go',
      useCases: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'],
      recommendations: ['Entièrement géré', 'Backups automatiques']
    },
    {
      id: 'load-balancer',
      name: 'Load Balancer',
      brick: 'Network',
      subType: 'Pay as you go',
      useCases: ['Distribution de charge', 'Haute disponibilité'],
      recommendations: ['HTTP/HTTPS', 'SSL/TLS']
    },
    {
      id: 'data-platform',
      name: 'Data Platform',
      brick: 'Data & Analytics',
      subType: 'Pay as you go',
      useCases: ['Analytics', 'Big Data', 'Data Lakehouse'],
      recommendations: ['Spark', 'Jupyter', 'Trino']
    }
  ];

  return (
    <div className={styles.catalog}>
      <div className={styles.header}>
        <h2 className={styles.title}>📦 Catalogue des Produits</h2>
        <p className={styles.subtitle}>Sélectionnez un produit pour le configurer</p>
      </div>

      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="🔍 Rechercher un produit..."
          className={styles.searchInput}
        />
      </div>

      <div className={styles.productsList}>
        {products.map((product) => (
          <div
            key={product.id}
            className={`${styles.productCard} ${selectedProduct?.id === product.id ? styles.productCardSelected : ''}`}
            onClick={() => onSelectProduct(product)}
          >
            <div className={styles.productHeader}>
              <h3 className={styles.productName}>{product.name}</h3>
              <span className={styles.productBrick}>{product.brick}</span>
            </div>
            
            <div className={styles.productUseCases}>
              {product.useCases.slice(0, 2).map((useCase, idx) => (
                <span key={idx} className={styles.useCase}>
                  {useCase}
                </span>
              ))}
            </div>

            {selectedProduct?.id === product.id && (
              <div className={styles.selectedIndicator}>
                ✓ Sélectionné
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

