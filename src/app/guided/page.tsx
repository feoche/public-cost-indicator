'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Chatbot from '@/components/Chatbot';
import CostSummary from '@/components/CostSummary';
import { CartItem } from '@/lib/types';
import styles from './page.module.css';

export default function GuidedConfiguration() {
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
            <h1 className={styles.title}>Configuration Guidée</h1>
            <p className={styles.subtitle}>
              Notre assistant IA vous aide à choisir les meilleurs produits
            </p>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.grid}>
          <div className={styles.chatbotSection}>
            <Chatbot 
              onProductSelect={(product) => {
                // Logique pour ajouter au panier depuis le chatbot
                console.log('Produit sélectionné:', product);
              }}
              cart={cart}
              onClose={() => {}}
            />
          </div>

          <div className={styles.summarySection}>
            <CostSummary 
              cart={cart}
              totalCost={totalCost}
              onRemoveItem={handleRemoveFromCart}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

