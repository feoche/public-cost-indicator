'use client';

import { useState } from 'react';
import styles from './CompetitorComparison.module.css';

interface ComparisonData {
  category: string;
  config: string;
  ovh: number;
  aws: number;
  azure: number;
  gcp: number;
}

export default function CompetitorComparison() {
  const [selectedCategory, setSelectedCategory] = useState('compute');

  const comparisons: Record<string, ComparisonData[]> = {
    compute: [
      {
        category: 'General Purpose',
        config: '2 vCPU, 7GB RAM',
        ovh: 17.08,
        aws: 35.04,
        azure: 36.50,
        gcp: 33.21
      },
      {
        category: 'General Purpose',
        config: '4 vCPU, 15GB RAM',
        ovh: 34.16,
        aws: 70.08,
        azure: 73.00,
        gcp: 66.42
      },
      {
        category: 'General Purpose',
        config: '8 vCPU, 30GB RAM',
        ovh: 68.33,
        aws: 140.16,
        azure: 146.00,
        gcp: 132.84
      },
      {
        category: 'CPU Optimized',
        config: '4 vCPU, 15GB RAM',
        ovh: 42.34,
        aws: 85.32,
        azure: 88.00,
        gcp: 82.15
      }
    ],
    storage: [
      {
        category: 'Object Storage',
        config: '1TB Standard',
        ovh: 6.14,
        aws: 23.55,
        azure: 18.40,
        gcp: 20.48
      },
      {
        category: 'Object Storage',
        config: '1TB Archive',
        ovh: 1.46,
        aws: 1.02,
        azure: 1.02,
        gcp: 1.23
      },
      {
        category: 'Block Storage',
        config: '1TB SSD',
        ovh: 29.20,
        aws: 102.40,
        azure: 122.88,
        gcp: 170.00
      }
    ],
    gpu: [
      {
        category: 'GPU T4',
        config: '1x NVIDIA T4 16GB',
        ovh: 401.50,
        aws: 602.64,
        azure: 729.00,
        gcp: 547.20
      },
      {
        category: 'GPU V100',
        config: '1x NVIDIA V100 32GB',
        ovh: 1314.00,
        aws: 2372.40,
        azure: 2628.00,
        gcp: 2190.00
      }
    ],
    database: [
      {
        category: 'PostgreSQL',
        config: '2 vCPU, 4GB RAM',
        ovh: 29.93,
        aws: 67.89,
        azure: 73.00,
        gcp: 62.41
      },
      {
        category: 'MySQL',
        config: '4 vCPU, 8GB RAM',
        ovh: 59.86,
        aws: 135.78,
        azure: 146.00,
        gcp: 124.82
      }
    ]
  };

  const categories = [
    { id: 'compute', name: 'Instances', icon: '💻' },
    { id: 'storage', name: 'Stockage', icon: '💾' },
    { id: 'gpu', name: 'GPU / IA', icon: '🎮' },
    { id: 'database', name: 'Databases', icon: '🗄️' }
  ];

  const calculateSavings = (ovh: number, competitor: number) => {
    const savings = ((competitor - ovh) / competitor) * 100;
    return savings.toFixed(0);
  };

  const getLowestPrice = (data: ComparisonData) => {
    const prices = [data.ovh, data.aws, data.azure, data.gcp];
    return Math.min(...prices);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>📊 Comparatif des Prix</h2>
          <p className={styles.subtitle}>
            Comparez OVHcloud avec AWS, Azure et Google Cloud - Prix mensuels HT
          </p>
        </div>
      </div>

      {/* Onglets de catégories */}
      <div className={styles.tabs}>
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`${styles.tab} ${selectedCategory === cat.id ? styles.tabActive : ''}`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            <span className={styles.tabIcon}>{cat.icon}</span>
            <span className={styles.tabText}>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Tableau de comparaison */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.thConfig}>Configuration</th>
              <th className={styles.thPrice}>
                <div className={styles.providerHeader}>
                  <span className={styles.providerLogo}>🟦</span>
                  <span>OVHcloud</span>
                </div>
              </th>
              <th className={styles.thPrice}>
                <div className={styles.providerHeader}>
                  <span className={styles.providerLogo}>🟧</span>
                  <span>AWS</span>
                </div>
              </th>
              <th className={styles.thPrice}>
                <div className={styles.providerHeader}>
                  <span className={styles.providerLogo}>🔷</span>
                  <span>Azure</span>
                </div>
              </th>
              <th className={styles.thPrice}>
                <div className={styles.providerHeader}>
                  <span className={styles.providerLogo}>🔴</span>
                  <span>Google Cloud</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {comparisons[selectedCategory]?.map((item, idx) => {
              const lowestPrice = getLowestPrice(item);
              return (
                <tr key={idx} className={styles.tableRow}>
                  <td className={styles.tdConfig}>
                    <div className={styles.configName}>{item.category}</div>
                    <div className={styles.configDetails}>{item.config}</div>
                  </td>
                  <td className={`${styles.tdPrice} ${item.ovh === lowestPrice ? styles.tdBest : ''}`}>
                    <div className={styles.priceValue}>{item.ovh.toFixed(2)} €</div>
                    {item.ovh === lowestPrice && (
                      <div className={styles.bestBadge}>Meilleur prix</div>
                    )}
                  </td>
                  <td className={`${styles.tdPrice} ${item.aws === lowestPrice ? styles.tdBest : ''}`}>
                    <div className={styles.priceValue}>{item.aws.toFixed(2)} €</div>
                    {item.ovh < item.aws && (
                      <div className={styles.savingsBadge}>
                        +{calculateSavings(item.ovh, item.aws)}%
                      </div>
                    )}
                  </td>
                  <td className={`${styles.tdPrice} ${item.azure === lowestPrice ? styles.tdBest : ''}`}>
                    <div className={styles.priceValue}>{item.azure.toFixed(2)} €</div>
                    {item.ovh < item.azure && (
                      <div className={styles.savingsBadge}>
                        +{calculateSavings(item.ovh, item.azure)}%
                      </div>
                    )}
                  </td>
                  <td className={`${styles.tdPrice} ${item.gcp === lowestPrice ? styles.tdBest : ''}`}>
                    <div className={styles.priceValue}>{item.gcp.toFixed(2)} €</div>
                    {item.ovh < item.gcp && (
                      <div className={styles.savingsBadge}>
                        +{calculateSavings(item.ovh, item.gcp)}%
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Notes */}
      <div className={styles.footer}>
        <p className={styles.note}>
          ℹ️ Prix indicatifs pour la région Europe de l'Ouest (Paris pour OVHcloud). 
          Les prix peuvent varier selon la région et les promotions en cours.
        </p>
        <p className={styles.note}>
          💡 Les pourcentages indiquent l'économie réalisée en choisissant OVHcloud par rapport au concurrent.
        </p>
      </div>
    </div>
  );
}

