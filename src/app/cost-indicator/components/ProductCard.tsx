import React from "react";
import styles from "./ProductCard.module.css";
import type { Plan } from "../lib/cloudData";
import { getPlanHourlyPrice, getPrimaryPricing } from "../lib/pricing";

/**
 * Props for the product card.
 * - plan: the plan object to display
 * - selected: whether this card is currently selected
 * - onSelect: callback invoked when the user selects this plan
 */
interface ProductCardProps {
  plan: Plan;
  selected: boolean;
  onSelect: (planCode: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ plan, selected, onSelect }) => {
  const primaryPricing = getPrimaryPricing(plan);
  const price = primaryPricing?.formattedPrice ?? "N/A";
  const hourlyPrice = getPlanHourlyPrice(plan);

  return (
    <div className={`${styles.card} ${selected ? styles.selected : ''}`}>
      <h3 className={styles.title}>{plan.invoiceName}</h3>
      <p className={styles.product}>Code: {plan.planCode}</p>
      <p className={styles.product}>Produit: {plan.product}</p>
      <p className={styles.price}>Prix catalogue: {price}</p>
      <p className={styles.price}>
        Prix estimé / heure: {hourlyPrice !== null ? `${hourlyPrice.toFixed(4)} €` : "N/A"}
      </p>
      <button
        className={styles.button}
        onClick={() => onSelect(plan.planCode)}
      >
        Sélectionner
      </button>
    </div>
  );
};
