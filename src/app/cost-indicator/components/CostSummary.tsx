import React from "react";
import type { Plan } from "../lib/cloudData";
import { getPlanHourlyPrice, getPrimaryPricing } from "../lib/pricing";
import styles from "./CostSummary.module.css";

/**
 * Simple summary component showing the selected plan's basic information and price.
 */
interface CostSummaryProps {
  plan?: Plan;
}

export const CostSummary: React.FC<CostSummaryProps> = ({ plan }) => {
  if (!plan) {
    return <div className={styles.container}>Aucun plan sélectionné.</div>;
  }

  const pricing = getPrimaryPricing(plan);
  const price = pricing?.formattedPrice ?? "Prix indisponible";
  const hourlyPrice = getPlanHourlyPrice(plan);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Résumé du coût</h3>
      <p><strong>Plan :</strong> {plan.planCode}</p>
      <p><strong>Produit :</strong> {plan.invoiceName}</p>
      <p><strong>Type :</strong> {plan.product}</p>
      <p><strong>Prix catalogue :</strong> {price}</p>
      <p>
        <strong>Prix estimé / heure :</strong>{" "}
        {hourlyPrice !== null ? `${hourlyPrice.toFixed(4)} €` : "N/A"}
      </p>
    </div>
  );
};
