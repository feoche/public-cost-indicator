'use client';

import { useState, useEffect } from 'react';
import { CartItem, Product, Flavor } from '@/lib/types';
import styles from './ProductConfigurator.module.css';

interface ProductConfiguratorProps {
  product?: Product;
  onAddToCart: (item: CartItem) => void;
}

export default function ProductConfigurator({ product, onAddToCart }: ProductConfiguratorProps) {
  const [selectedFlavor, setSelectedFlavor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [duration, setDuration] = useState<number>(730); // 1 mois par défaut

  // Reset quand le produit change
  useEffect(() => {
    setSelectedFlavor('');
    setQuantity(1);
    setDuration(730);
  }, [product?.id]);

  // Flavors d'exemple
  const flavors: Flavor[] = [
    {
      planCode: 'b2-7',
      invoiceName: 'B2-7 - Basique',
      specs: { cpu: 2, memory: '7 GB', storage: '50 GB SSD' },
      pricing: { hourly: 0.0234, formattedPrice: '0.0234 €' }
    },
    {
      planCode: 'b2-15',
      invoiceName: 'B2-15 - Standard',
      specs: { cpu: 4, memory: '15 GB', storage: '100 GB SSD' },
      pricing: { hourly: 0.0468, formattedPrice: '0.0468 €' }
    },
    {
      planCode: 'b2-30',
      invoiceName: 'B2-30 - Performance',
      specs: { cpu: 8, memory: '30 GB', storage: '200 GB SSD' },
      pricing: { hourly: 0.0936, formattedPrice: '0.0936 €' }
    },
    {
      planCode: 'b2-60',
      invoiceName: 'B2-60 - Haute Performance',
      specs: { cpu: 16, memory: '60 GB', storage: '400 GB SSD' },
      pricing: { hourly: 0.1872, formattedPrice: '0.1872 €' }
    }
  ];

  const handleAddToCart = () => {
    if (!product || !selectedFlavor) return;

    const flavor = flavors.find(f => f.planCode === selectedFlavor);
    if (!flavor) return;

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
    setDuration(730);
  };

  const calculateEstimate = () => {
    if (!selectedFlavor) return 0;
    const flavor = flavors.find(f => f.planCode === selectedFlavor);
    if (!flavor || !flavor.pricing.hourly) return 0;
    return flavor.pricing.hourly * quantity * duration;
  };

  if (!product) {
    return (
      <div className={styles.configurator}>
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>⚙️</div>
          <h3 className={styles.emptyTitle}>Aucun produit sélectionné</h3>
          <p className={styles.emptyText}>
            Sélectionnez un produit dans le catalogue pour le configurer
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.configurator}>
      <div className={styles.header}>
        <h2 className={styles.title}>⚙️ Configuration</h2>
        <div className={styles.productBadge}>
          <span className={styles.productName}>{product.name}</span>
          <span className={styles.productBrick}>{product.brick}</span>
        </div>
      </div>

      <div className={styles.content}>
        {/* Sélection du Flavor */}
        <div className={styles.section}>
          <label className={styles.label}>
            Configuration :
          </label>
          <div className={styles.flavorsList}>
            {flavors.map((flavor) => (
              <div
                key={flavor.planCode}
                className={`${styles.flavorCard} ${selectedFlavor === flavor.planCode ? styles.flavorCardSelected : ''}`}
                onClick={() => setSelectedFlavor(flavor.planCode)}
              >
                <div className={styles.flavorHeader}>
                  <h4 className={styles.flavorName}>{flavor.invoiceName}</h4>
                  <span className={styles.flavorPrice}>{flavor.pricing.formattedPrice}/h</span>
                </div>
                <div className={styles.flavorSpecs}>
                  {flavor.specs.cpu && <span>💻 {flavor.specs.cpu} vCores</span>}
                  {flavor.specs.memory && <span>🧠 {flavor.specs.memory}</span>}
                  {flavor.specs.storage && <span>💾 {flavor.specs.storage}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quantité */}
        <div className={styles.section}>
          <label className={styles.label}>
            Quantité :
          </label>
          <div className={styles.quantityControl}>
            <button
              className={styles.quantityButton}
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              −
            </button>
            <input
              type="number"
              min="1"
              max="100"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className={styles.quantityInput}
            />
            <button
              className={styles.quantityButton}
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>
        </div>

        {/* Durée */}
        <div className={styles.section}>
          <label className={styles.label}>
            Durée d'utilisation :
          </label>
          <div className={styles.durationGrid}>
            <button
              className={`${styles.durationButton} ${duration === 730 ? styles.durationButtonActive : ''}`}
              onClick={() => setDuration(730)}
            >
              1 mois
              <span className={styles.durationHours}>730h</span>
            </button>
            <button
              className={`${styles.durationButton} ${duration === 2190 ? styles.durationButtonActive : ''}`}
              onClick={() => setDuration(2190)}
            >
              3 mois
              <span className={styles.durationHours}>2190h</span>
            </button>
            <button
              className={`${styles.durationButton} ${duration === 4380 ? styles.durationButtonActive : ''}`}
              onClick={() => setDuration(4380)}
            >
              6 mois
              <span className={styles.durationHours}>4380h</span>
            </button>
            <button
              className={`${styles.durationButton} ${duration === 8760 ? styles.durationButtonActive : ''}`}
              onClick={() => setDuration(8760)}
            >
              1 an
              <span className={styles.durationHours}>8760h</span>
            </button>
          </div>
          <input
            type="number"
            min="1"
            value={duration}
            onChange={(e) => setDuration(Math.max(1, parseInt(e.target.value) || 1))}
            className={styles.customDurationInput}
            placeholder="Ou entrez le nombre d'heures"
          />
        </div>

        {/* Estimation */}
        {selectedFlavor && (
          <div className={styles.estimateBox}>
            <div className={styles.estimateLabel}>Coût estimé :</div>
            <div className={styles.estimateValue}>
              {calculateEstimate().toFixed(2)} € HT
            </div>
          </div>
        )}

        {/* Bouton Ajouter */}
        <button
          className={styles.addButton}
          onClick={handleAddToCart}
          disabled={!selectedFlavor}
        >
          ➕ Ajouter au panier
        </button>
      </div>
    </div>
  );
}

