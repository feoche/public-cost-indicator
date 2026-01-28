// src/app/price-comparator/page.tsx
// ------------------------------------------------------------
// Page Next.js affichant une comparaison des prix entre OVHcloud, AWS, Azure et GCP.
// Utilise les données du catalogue OVH (docs/cloud.json) via le module cloudData.
// ------------------------------------------------------------

import React from "react";
import { getPlans, Plan } from "@/app/cost-indicator/lib/cloudData";
import styles from "./page.module.css";

// Génère un prix fictif pour les fournisseurs concurrents basé sur le prix OVH.
function generateMockPrice(ovhPriceCents: number, factor: number): string {
  const price = Math.round(ovhPriceCents * factor) / 100; // convert to euros
  return price.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
}

export default async function PriceComparatorPage() {
  const plans: Plan[] = getPlans();

  // Sélection simplifiée : on ne montre que les 10 premiers plans pour éviter un tableau trop long.
  const displayedPlans = plans.slice(0, 10);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Comparateur de prix Cloud</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Produit</th>
            <th>OVHcloud</th>
            <th>AWS</th>
            <th>Azure</th>
            <th>Google Cloud</th>
          </tr>
        </thead>
        <tbody>
          {displayedPlans.map((plan) => {
            const ovhPriceCents = plan.pricings[0]?.price ?? 0;
            return (
              <tr key={plan.planCode}>
                <td>{plan.invoiceName}</td>
                <td>{plan.pricings[0]?.formattedPrice ?? "-"}</td>
                <td>{generateMockPrice(ovhPriceCents, 1.2)}</td>
                <td>{generateMockPrice(ovhPriceCents, 1.15)}</td>
                <td>{generateMockPrice(ovhPriceCents, 1.1)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
