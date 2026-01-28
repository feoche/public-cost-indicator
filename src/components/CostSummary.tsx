'use client';

import { CartItem } from '@/lib/types';
import styles from './CostSummary.module.css';

interface CostSummaryProps {
  cart: CartItem[];
  totalCost: number;
  onRemoveItem: (index: number) => void;
}

export default function CostSummary({ cart, totalCost, onRemoveItem }: CostSummaryProps) {
  return (
    <div className={styles.summary}>
      <h2 className={styles.title}>
        📊 Estimation des Coûts
      </h2>

      {cart.length === 0 ? (
        <div className={styles.emptyState}>
          <p className={styles.emptyText}>Aucun produit sélectionné</p>
          <p className={styles.emptySubtext}>Utilisez le chatbot pour commencer</p>
        </div>
      ) : (
        <>
          <div className={styles.itemsList}>
            {cart.map((item, index) => {
              const itemCost = (item.flavor.pricing.hourly || 0) * item.quantity * item.duration;
              return (
                <div key={index} className={styles.item}>
                  <div className={styles.itemHeader}>
                    <div className={styles.itemInfo}>
                      <h3 className={styles.itemName}>
                        {item.product.name}
                      </h3>
                      <p className={styles.itemFlavor}>{item.flavor.invoiceName}</p>
                    </div>
                    <button
                      onClick={() => onRemoveItem(index)}
                      className={styles.removeButton}
                      title="Supprimer"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <div className={styles.itemDetails}>
                    <div className={styles.detailRow}>
                      <span>Quantité:</span>
                      <span className={styles.detailValue}>{item.quantity}</span>
                    </div>
                    <div className={styles.detailRow}>
                      <span>Durée:</span>
                      <span className={styles.detailValue}>{item.duration}h</span>
                    </div>
                    <div className={styles.detailRow}>
                      <span>Prix/h:</span>
                      <span className={styles.detailValue}>{item.flavor.pricing.formattedPrice}</span>
                    </div>
                  </div>
                  
                  <div className={styles.itemTotal}>
                    <span className={styles.subtotalLabel}>Sous-total:</span>
                    <span className={styles.subtotalValue}>
                      {itemCost.toFixed(2)} €
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.totalSection}>
            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>Total:</span>
              <span className={styles.totalValue}>
                {totalCost.toFixed(2)} € HT
              </span>
            </div>
            
            <div className={styles.taxInfo}>
              <p>+ TVA (20%): {(totalCost * 0.2).toFixed(2)} €</p>
              <p className={styles.totalTTC}>
                Total TTC: {(totalCost * 1.2).toFixed(2)} €
              </p>
            </div>

            <button className={styles.downloadButton}>
              Télécharger le devis
            </button>
          </div>
        </>
      )}
    </div>
  );
}

