'use client';

import { useState } from 'react';
import { CartItem, Product, Flavor } from '@/lib/types';
import styles from './ProductSelector.module.css';

interface ProductSelectorProps {
  onAddToCart: (item: CartItem) => void;
}

export default function ProductSelector({ onAddToCart }: ProductSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [selectedFlavor, setSelectedFlavor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [duration, setDuration] = useState<number>(730); // 1 mois par défaut

  // Produits disponibles
  const products: Product[] = [
    {
      id: 'instances',
      name: 'Instances',
      brick: 'Compute',
      subType: 'Pay as you go',
      useCases: ['Hébergement web', 'Applications', 'Serveurs'],
      recommendations: ['Flexible', 'Scalable']
    },
    {
      id: 'object-storage',
      name: 'Object Storage',
      brick: 'Storage',
      subType: 'Pay as you go',
      useCases: ['Backup', 'Archives', 'Médias'],
      recommendations: ['Haute disponibilité', 'Stockage illimité']
    },
    {
      id: 'block-storage',
      name: 'Block Storage',
      brick: 'Storage',
      subType: 'Pay as you go',
      useCases: ['Disques additionnels', 'Haute performance'],
      recommendations: ['IOPS élevés', 'Snapshots']
    },
    {
      id: 'load-balancer',
      name: 'Load Balancer',
      brick: 'Network',
      subType: 'Pay as you go',
      useCases: ['Distribution de charge', 'Haute disponibilité'],
      recommendations: ['SSL/TLS', 'Health checks']
    },
    {
      id: 'managed-kubernetes',
      name: 'Managed Kubernetes',
      brick: 'Containers',
      subType: 'Pay as you go',
      useCases: ['Orchestration conteneurs', 'Microservices'],
      recommendations: ['Kubernetes certifié', 'Auto-scaling']
    },
    {
      id: 'gpu-instances',
      name: 'GPU Instances',
      brick: 'AI/ML',
      subType: 'Pay as you go',
      useCases: ['Machine Learning', 'IA', 'Rendu 3D'],
      recommendations: ['NVIDIA GPUs', 'Haute performance']
    },
    {
      id: 'databases',
      name: 'Managed Databases',
      brick: 'Databases',
      subType: 'Pay as you go',
      useCases: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'],
      recommendations: ['Backups automatiques', 'Haute disponibilité']
    }
  ];

  // Flavors d'exemple par produit
  const flavorsMap: Record<string, Flavor[]> = {
    'instances': [
      {
        planCode: 'b2-7',
        invoiceName: 'B2-7 - General Purpose',
        specs: { cpu: 2, memory: '7 GB', storage: '50 GB SSD' },
        pricing: { hourly: 0.0234, formattedPrice: '0.0234 €' }
      },
      {
        planCode: 'b2-15',
        invoiceName: 'B2-15 - General Purpose',
        specs: { cpu: 4, memory: '15 GB', storage: '100 GB SSD' },
        pricing: { hourly: 0.0468, formattedPrice: '0.0468 €' }
      },
      {
        planCode: 'b2-30',
        invoiceName: 'B2-30 - General Purpose',
        specs: { cpu: 8, memory: '30 GB', storage: '200 GB SSD' },
        pricing: { hourly: 0.0936, formattedPrice: '0.0936 €' }
      },
      {
        planCode: 'c2-15',
        invoiceName: 'C2-15 - CPU Optimized',
        specs: { cpu: 4, memory: '15 GB', storage: '100 GB SSD' },
        pricing: { hourly: 0.0580, formattedPrice: '0.0580 €' }
      }
    ],
    'object-storage': [
      {
        planCode: 'storage-standard',
        invoiceName: 'Standard Storage',
        specs: { storage: 'Par GB' },
        pricing: { hourly: 0.0000116, formattedPrice: '0.0084 € / GB / mois' }
      },
      {
        planCode: 'storage-archive',
        invoiceName: 'Archive Storage',
        specs: { storage: 'Par GB' },
        pricing: { hourly: 0.0000027, formattedPrice: '0.0020 € / GB / mois' }
      }
    ],
    'block-storage': [
      {
        planCode: 'volume-classic',
        invoiceName: 'Classic Volume',
        specs: { storage: 'Par GB', iops: '3 IOPS/GB' },
        pricing: { hourly: 0.000055, formattedPrice: '0.04 € / GB / mois' }
      },
      {
        planCode: 'volume-high-speed',
        invoiceName: 'High Speed Volume',
        specs: { storage: 'Par GB', iops: '10 IOPS/GB' },
        pricing: { hourly: 0.000164, formattedPrice: '0.12 € / GB / mois' }
      }
    ],
    'load-balancer': [
      {
        planCode: 'lb-s',
        invoiceName: 'Load Balancer Small',
        specs: { connections: '10K connexions' },
        pricing: { hourly: 0.0137, formattedPrice: '0.0137 €' }
      },
      {
        planCode: 'lb-m',
        invoiceName: 'Load Balancer Medium',
        specs: { connections: '100K connexions' },
        pricing: { hourly: 0.0274, formattedPrice: '0.0274 €' }
      }
    ],
    'managed-kubernetes': [
      {
        planCode: 'k8s-node-s',
        invoiceName: 'Node Small',
        specs: { cpu: 2, memory: '4 GB' },
        pricing: { hourly: 0.0180, formattedPrice: '0.0180 €' }
      },
      {
        planCode: 'k8s-node-m',
        invoiceName: 'Node Medium',
        specs: { cpu: 4, memory: '8 GB' },
        pricing: { hourly: 0.0360, formattedPrice: '0.0360 €' }
      }
    ],
    'gpu-instances': [
      {
        planCode: 'g3-15',
        invoiceName: 'G3-15 - NVIDIA T4',
        specs: { cpu: 4, memory: '15 GB', gpu: '1x T4 16GB' },
        pricing: { hourly: 0.5500, formattedPrice: '0.5500 €' }
      },
      {
        planCode: 'g3-30',
        invoiceName: 'G3-30 - NVIDIA V100',
        specs: { cpu: 8, memory: '30 GB', gpu: '1x V100 32GB' },
        pricing: { hourly: 1.8000, formattedPrice: '1.8000 €' }
      }
    ],
    'databases': [
      {
        planCode: 'db-small',
        invoiceName: 'Database Small',
        specs: { cpu: 2, memory: '4 GB', storage: '80 GB' },
        pricing: { hourly: 0.0410, formattedPrice: '0.0410 €' }
      },
      {
        planCode: 'db-medium',
        invoiceName: 'Database Medium',
        specs: { cpu: 4, memory: '8 GB', storage: '160 GB' },
        pricing: { hourly: 0.0820, formattedPrice: '0.0820 €' }
      }
    ]
  };

  const categories = ['all', 'Compute', 'Storage', 'Network', 'Containers', 'AI/ML', 'Databases'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.brick.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.brick === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = () => {
    if (!selectedProduct || !selectedFlavor) return;

    const product = products.find(p => p.id === selectedProduct);
    const flavors = flavorsMap[selectedProduct] || [];
    const flavor = flavors.find(f => f.planCode === selectedFlavor);

    if (!product || !flavor) return;

    const item: CartItem = {
      product,
      flavor,
      quantity,
      duration
    };

    onAddToCart(item);
    
    // Reset après ajout
    setSelectedFlavor('');
    setQuantity(1);
  };

  const calculateEstimate = () => {
    if (!selectedProduct || !selectedFlavor) return 0;
    const flavors = flavorsMap[selectedProduct] || [];
    const flavor = flavors.find(f => f.planCode === selectedFlavor);
    if (!flavor || !flavor.pricing.hourly) return 0;
    return flavor.pricing.hourly * quantity * duration;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>🏗️ Sélection de Produits</h2>
        <input
          type="text"
          placeholder="Rechercher un produit..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      {/* Catégories */}
      <div className={styles.categories}>
        {categories.map(cat => (
          <button
            key={cat}
            className={`${styles.categoryButton} ${selectedCategory === cat ? styles.categoryButtonActive : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat === 'all' ? 'Tous' : cat}
          </button>
        ))}
      </div>

      {/* Liste des produits */}
      <div className={styles.productsList}>
        {filteredProducts.map(product => (
          <div
            key={product.id}
            className={`${styles.productCard} ${selectedProduct === product.id ? styles.productCardActive : ''}`}
          >
            <div 
              className={styles.productHeader}
              onClick={() => setSelectedProduct(selectedProduct === product.id ? null : product.id)}
            >
              <div>
                <h3 className={styles.productName}>{product.name}</h3>
                <span className={styles.productBrick}>{product.brick}</span>
              </div>
              <span className={styles.expandIcon}>
                {selectedProduct === product.id ? '▼' : '▶'}
              </span>
            </div>

            {selectedProduct === product.id && (
              <div className={styles.productConfig}>
                {/* Flavors */}
                <div className={styles.configSection}>
                  <label className={styles.configLabel}>Configuration :</label>
                  <div className={styles.flavorsList}>
                    {(flavorsMap[product.id] || []).map(flavor => (
                      <div
                        key={flavor.planCode}
                        className={`${styles.flavorOption} ${selectedFlavor === flavor.planCode ? styles.flavorOptionActive : ''}`}
                        onClick={() => setSelectedFlavor(flavor.planCode)}
                      >
                        <div className={styles.flavorInfo}>
                          <div className={styles.flavorName}>{flavor.invoiceName}</div>
                          <div className={styles.flavorSpecs}>
                            {flavor.specs.cpu && <span>💻 {flavor.specs.cpu} vCores</span>}
                            {flavor.specs.memory && <span>🧠 {flavor.specs.memory}</span>}
                            {flavor.specs.storage && <span>💾 {flavor.specs.storage}</span>}
                            {flavor.specs.gpu && <span>🎮 {flavor.specs.gpu}</span>}
                          </div>
                        </div>
                        <div className={styles.flavorPrice}>{flavor.pricing.formattedPrice}/h</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quantité et Durée */}
                {selectedFlavor && (
                  <>
                    <div className={styles.configRow}>
                      <div className={styles.configSection}>
                        <label className={styles.configLabel}>Quantité :</label>
                        <input
                          type="number"
                          min="1"
                          max="100"
                          value={quantity}
                          onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                          className={styles.input}
                        />
                      </div>

                      <div className={styles.configSection}>
                        <label className={styles.configLabel}>Durée :</label>
                        <select
                          value={duration}
                          onChange={(e) => setDuration(parseInt(e.target.value))}
                          className={styles.select}
                        >
                          <option value="730">1 mois (730h)</option>
                          <option value="2190">3 mois (2190h)</option>
                          <option value="4380">6 mois (4380h)</option>
                          <option value="8760">1 an (8760h)</option>
                        </select>
                      </div>
                    </div>

                    {/* Estimation et bouton */}
                    <div className={styles.addSection}>
                      <div className={styles.estimate}>
                        <span className={styles.estimateLabel}>Estimation :</span>
                        <span className={styles.estimateValue}>
                          {calculateEstimate().toFixed(2)} € HT
                        </span>
                      </div>
                      <button
                        className={styles.addButton}
                        onClick={handleAddToCart}
                      >
                        Ajouter au panier
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

