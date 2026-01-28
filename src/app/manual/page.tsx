'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProductSelector from '@/components/ProductSelector';
import CostSummary from '@/components/CostSummary';
import CompetitorComparison from '@/components/CompetitorComparison';
import { CartItem } from '@/lib/types';
import styles from './page.module.css';

export default function ManualConfiguration() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);

  const handleAddToCart = (item: CartItem) => {
    setCart([...cart, item]);
  };

  const handleRemoveFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const totalCost = cart.reduce((sum, item) => {
    const hourlyPrice = item.flavor.pricing.hourly || 0;
    return sum + (hourlyPrice * item.quantity * item.duration);
  }, 0);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <button className={styles.backButton} onClick={() => router.push('/')}>
            ← Retour
          </button>
          <div>
            <h1 className={styles.title}>Configuration Manuelle</h1>
            <p className={styles.subtitle}>
              Sélectionnez et configurez vos produits Public Cloud
            </p>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.grid}>
          <div className={styles.productSection}>
            <ProductSelector onAddToCart={handleAddToCart} />
          </div>

          <div className={styles.summarySection}>
            <CostSummary 
              cart={cart}
              totalCost={totalCost}
              onRemoveItem={handleRemoveFromCart}
            />
          </div>
        </div>

        <CompetitorComparison />
      </main>
    </div>
  );
}

