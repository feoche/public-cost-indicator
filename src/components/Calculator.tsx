'use client';

import { useState } from 'react';
import { CartItem, Product, Flavor } from '@/lib/types';
import styles from './Calculator.module.css';

interface CalculatorProps {
  product?: Product;
  onAddToCart: (item: CartItem) => void;
  onClose: () => void;
}

export default function Calculator({ product, onAddToCart, onClose }: CalculatorProps) {
  const [selectedFlavor, setSelectedFlavor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [duration, setDuration] = useState<number>(730); // 1 mois par défaut

  // Flavors d'exemple pour la démo
  const demoFlavors: Flavor[] = [
    {
      planCode: 'b2-7',
      invoiceName: 'B2-7 - 2 vCores, 7GB RAM',
      specs: { cpu: 2, memory: '7 GB', storage: '50 GB SSD' },
      pricing: { hourly: 0.0234, formattedPrice: '0.0234 €' }
    },
    {
      planCode: 'b2-15',
      invoiceName: 'B2-15 - 4 vCores, 15GB RAM',
      specs: { cpu: 4, memory: '15 GB', storage: '100 GB SSD' },
      pricing: { hourly: 0.0468, formattedPrice: '0.0468 €' }
    },
    {
      planCode: 'b2-30',
      invoiceName: 'B2-30 - 8 vCores, 30GB RAM',
      specs: { cpu: 8, memory: '30 GB', storage: '200 GB SSD' },
      pricing: { hourly: 0.0936, formattedPrice: '0.0936 €' }
    }
  ];

  const handleAddToCart = () => {
    if (!product || !selectedFlavor) return;

    const flavor = demoFlavors.find(f => f.planCode === selectedFlavor);
    if (!flavor) return;

    const item: CartItem = {
      product,
      flavor,
      quantity,
      duration
    };

    onAddToCart(item);
    onClose();
  };

  const calculateEstimate = () => {
    if (!selectedFlavor) return 0;
    const flavor = demoFlavors.find(f => f.planCode === selectedFlavor);
    if (!flavor || !flavor.pricing.hourly) return 0;
    return flavor.pricing.hourly * quantity * duration;
  };

  if (!product) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Configurer : {product.name}</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        </div>

        <div className={styles.content}>
          {/* Sélection du Flavor */}
          <div className={styles.section}>
            <label className={styles.label}>
              Sélectionnez une configuration :
            </label>
            <div className={styles.flavorsList}>
              {demoFlavors.map((flavor) => (
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
            <input
              type="number"
              min="1"
              max="100"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              className={styles.input}
            />
          </div>

          {/* Durée */}
          <div className={styles.section}>
            <label className={styles.label}>
              Durée d'utilisation :
            </label>
            <div className={styles.durationOptions}>
              <button
                className={`${styles.durationButton} ${duration === 730 ? styles.durationButtonActive : ''}`}
                onClick={() => setDuration(730)}
              >
                1 mois (730h)
              </button>
              <button
                className={`${styles.durationButton} ${duration === 2190 ? styles.durationButtonActive : ''}`}
                onClick={() => setDuration(2190)}
              >
                3 mois (2190h)
              </button>
              <button
                className={`${styles.durationButton} ${duration === 4380 ? styles.durationButtonActive : ''}`}
                onClick={() => setDuration(4380)}
              >
                6 mois (4380h)
              </button>
              <button
                className={`${styles.durationButton} ${duration === 8760 ? styles.durationButtonActive : ''}`}
                onClick={() => setDuration(8760)}
              >
                1 an (8760h)
              </button>
            </div>
            <input
              type="number"
              min="1"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value) || 1)}
              className={styles.input}
              placeholder="Ou entrez le nombre d'heures"
            />
          </div>

          {/* Estimation */}
          {selectedFlavor && (
            <div className={styles.estimate}>
              <div className={styles.estimateLabel}>Estimation :</div>
              <div className={styles.estimateValue}>
                {calculateEstimate().toFixed(2)} € HT
              </div>
            </div>
          )}
        </div>

        <div className={styles.footer}>
          <button className={styles.cancelButton} onClick={onClose}>
            Annuler
          </button>
          <button
            className={styles.addButton}
            onClick={handleAddToCart}
            disabled={!selectedFlavor}
          >
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
}

