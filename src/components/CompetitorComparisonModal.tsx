'use client';

import { useState } from 'react';
import styles from './CompetitorComparisonModal.module.css';
import { 
  getCompetitorComparison, 
  calculateSavings, 
  providerInfo,
  calculateInfrastructureCost,
  InfrastructureConfig
} from '@/lib/competitorPricing';
import { ProductFlavor } from '@/lib/productsData';

interface CompetitorComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  flavor: ProductFlavor | null;
  ovhMonthlyCost: number;
  infrastructureConfig: InfrastructureConfig;
}

export default function CompetitorComparisonModal({
  isOpen,
  onClose,
  flavor,
  ovhMonthlyCost,
  infrastructureConfig
}: CompetitorComparisonModalProps) {
  if (!isOpen || !flavor) return null;

  const comparison = getCompetitorComparison(flavor.code);
  
  // Calculer le coût de l'instance de base OVH (avant ajouts)
  const ovhBaseMonthlyCost = (flavor.pricePerMonth || flavor.pricePerHour * 730) * infrastructureConfig.quantity;
  
  // Calculer les coûts complets pour OVH
  const ovhFullCost = calculateInfrastructureCost(
    flavor.pricePerMonth || flavor.pricePerHour * 730,
    infrastructureConfig,
    'ovh'
  );

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Comparaison avec les concurrents</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        </div>

        <div className={styles.content}>
          {/* Configuration actuelle */}
          <div className={styles.currentConfig}>
            <h3 className={styles.sectionTitle}>Configuration d'infrastructure</h3>
            <div className={styles.configDetails}>
              <div className={styles.configItem}>
                <span className={styles.configLabel}>Instance:</span>
                <span className={styles.configValue}>{flavor.name} × {infrastructureConfig.quantity}</span>
              </div>
              <div className={styles.configItem}>
                <span className={styles.configLabel}>Ressources:</span>
                <span className={styles.configValue}>{flavor.vcpu} vCPU • {flavor.ram} RAM</span>
              </div>
              {infrastructureConfig.additionalBlockStorage > 0 && (
                <div className={styles.configItem}>
                  <span className={styles.configLabel}>Block Storage:</span>
                  <span className={styles.configValue}>{infrastructureConfig.additionalBlockStorage} GB</span>
                </div>
              )}
              {infrastructureConfig.additionalS3Storage > 0 && (
                <div className={styles.configItem}>
                  <span className={styles.configLabel}>Stockage S3:</span>
                  <span className={styles.configValue}>{infrastructureConfig.additionalS3Storage} GB</span>
                </div>
              )}
              {infrastructureConfig.publicIPs > 0 && (
                <div className={styles.configItem}>
                  <span className={styles.configLabel}>IPs Publiques:</span>
                  <span className={styles.configValue}>{infrastructureConfig.publicIPs}</span>
                </div>
              )}
              {infrastructureConfig.resilience && infrastructureConfig.resilience !== 'local' && (
                <div className={styles.configItem}>
                  <span className={styles.configLabel}>Résilience:</span>
                  <span className={styles.configValue}>
                    {infrastructureConfig.resilience === 'multi-az' ? 'Multi-AZ' : 'Multi-Région'}
                  </span>
                </div>
              )}
              {(infrastructureConfig.hasBackup || infrastructureConfig.hasDistantBackup) && (
                <div className={styles.configItem}>
                  <span className={styles.configLabel}>Sauvegardes:</span>
                  <span className={styles.configValue}>
                    {infrastructureConfig.hasDistantBackup ? 'Locale + Distante' : 'Locale'}
                  </span>
                </div>
              )}
            </div>
          </div>

          {comparison ? (
            <>
              <div className={styles.comparisonGrid}>
                {/* OVHcloud */}
                <div className={`${styles.providerCard} ${styles.ovhCard}`}>
                  <div className={styles.providerHeader}>
                    <span className={styles.providerLogo}>{providerInfo.ovh.logo}</span>
                    <h4 className={styles.providerName}>{providerInfo.ovh.name}</h4>
                    <span className={styles.badge}>Votre choix</span>
                  </div>
                  <div className={styles.providerDetails}>
                    <div className={styles.instanceType}>{flavor.name}</div>
                    <div className={styles.specs}>
                      {flavor.vcpu} vCPU • {flavor.ram} RAM
                    </div>
                  </div>
                  <div className={styles.costBreakdown}>
                    <div className={styles.costLine}>
                      <span>Instances ({infrastructureConfig.quantity}×)</span>
                      <span>{ovhFullCost.baseCost.toFixed(2)} €</span>
                    </div>
                    {ovhFullCost.storageCost > 0 && (
                      <div className={styles.costLine}>
                        <span>Block Storage</span>
                        <span>{ovhFullCost.storageCost.toFixed(2)} €</span>
                      </div>
                    )}
                    {ovhFullCost.s3Cost > 0 && (
                      <div className={styles.costLine}>
                        <span>Stockage S3</span>
                        <span>{ovhFullCost.s3Cost.toFixed(2)} €</span>
                      </div>
                    )}
                    {ovhFullCost.ipCost > 0 && (
                      <div className={styles.costLine}>
                        <span>IPs Publiques</span>
                        <span>{ovhFullCost.ipCost.toFixed(2)} €</span>
                      </div>
                    )}
                    {ovhFullCost.backupCost > 0 && (
                      <div className={styles.costLine}>
                        <span>Sauvegardes</span>
                        <span>{ovhFullCost.backupCost.toFixed(2)} €</span>
                      </div>
                    )}
                    {ovhFullCost.resilienceCost > 0 && (
                      <div className={styles.costLine}>
                        <span>Résilience</span>
                        <span>{ovhFullCost.resilienceCost.toFixed(2)} €</span>
                      </div>
                    )}
                  </div>
                  <div className={styles.pricing}>
                    <div className={styles.priceLabel}>Coût total mensuel</div>
                    <div className={styles.priceValue}>{ovhFullCost.totalWithDiscount.toFixed(2)} €</div>
                    {infrastructureConfig.savingsPlanDiscount > 0 && (
                      <div className={styles.priceDetail}>
                        Avec {(infrastructureConfig.savingsPlanDiscount * 100).toFixed(0)}% de réduction
                      </div>
                    )}
                  </div>
                </div>

                {/* Competitors */}
                {comparison.competitors.map((competitor) => {
                  const competitorBasePrice = competitor.pricePerMonth || competitor.pricePerHour * 730;
                  const competitorFullCost = calculateInfrastructureCost(
                    competitorBasePrice,
                    infrastructureConfig,
                    competitor.provider
                  );
                  
                  const savings = calculateSavings(ovhFullCost.totalWithDiscount, competitorFullCost.totalWithDiscount);
                  
                  return (
                    <div key={competitor.provider} className={styles.providerCard}>
                      <div className={styles.providerHeader}>
                        <span className={styles.providerLogo}>{providerInfo[competitor.provider].logo}</span>
                        <h4 className={styles.providerName}>{providerInfo[competitor.provider].name}</h4>
                      </div>
                      <div className={styles.providerDetails}>
                        <div className={styles.instanceType}>{competitor.instanceType}</div>
                        <div className={styles.specs}>
                          {comparison.vcpu} vCPU • {comparison.ram} Go RAM
                        </div>
                      </div>
                      <div className={styles.costBreakdown}>
                        <div className={styles.costLine}>
                          <span>Instances ({infrastructureConfig.quantity}×)</span>
                          <span>{competitorFullCost.baseCost.toFixed(2)} €</span>
                        </div>
                        {competitorFullCost.storageCost > 0 && (
                          <div className={styles.costLine}>
                            <span>Block Storage</span>
                            <span>{competitorFullCost.storageCost.toFixed(2)} €</span>
                          </div>
                        )}
                        {competitorFullCost.s3Cost > 0 && (
                          <div className={styles.costLine}>
                            <span>Stockage S3</span>
                            <span>{competitorFullCost.s3Cost.toFixed(2)} €</span>
                          </div>
                        )}
                        {competitorFullCost.ipCost > 0 && (
                          <div className={styles.costLine}>
                            <span>IPs Publiques</span>
                            <span>{competitorFullCost.ipCost.toFixed(2)} €</span>
                          </div>
                        )}
                        {competitorFullCost.backupCost > 0 && (
                          <div className={styles.costLine}>
                            <span>Sauvegardes</span>
                            <span>{competitorFullCost.backupCost.toFixed(2)} €</span>
                          </div>
                        )}
                        {competitorFullCost.resilienceCost > 0 && (
                          <div className={styles.costLine}>
                            <span>Résilience</span>
                            <span>{competitorFullCost.resilienceCost.toFixed(2)} €</span>
                          </div>
                        )}
                      </div>
                      <div className={styles.pricing}>
                        <div className={styles.priceLabel}>Coût total mensuel</div>
                        <div className={styles.priceValue}>{competitorFullCost.totalWithDiscount.toFixed(2)} €</div>
                        {infrastructureConfig.savingsPlanDiscount > 0 && (
                          <div className={styles.priceDetail}>
                            Avec {(infrastructureConfig.savingsPlanDiscount * 100).toFixed(0)}% de réduction
                          </div>
                        )}
                      </div>
                      {savings.savings > 0 ? (
                        <div className={styles.moreCostly}>
                          <span className={styles.moreCostlyLabel}>⚠️ Plus cher</span>
                          <span className={styles.moreCostlyAmount}>
                            +{savings.savings.toFixed(2)} € / mois ({savings.percentage.toFixed(0)}%)
                          </span>
                          <span className={styles.moreCostlySubtext}>
                            que OVHcloud
                          </span>
                        </div>
                      ) : savings.savings < 0 && (
                        <div className={styles.savings}>
                          <span className={styles.savingsLabel}>✓ Moins cher</span>
                          <span className={styles.savingsAmount}>
                            -{Math.abs(savings.savings).toFixed(2)} € / mois ({Math.abs(savings.percentage).toFixed(0)}%)
                          </span>
                          <span className={styles.savingsSubtext}>
                            que OVHcloud
                          </span>
                        </div>
                      )}
                      <a 
                        href={competitor.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles.providerLink}
                      >
                        Voir sur {providerInfo[competitor.provider].name} →
                      </a>
                    </div>
                  );
                })}
              </div>

              {/* Summary */}
              {(() => {
                const savingsData = comparison.competitors.map(c => {
                  const competitorCost = calculateInfrastructureCost(
                    c.pricePerMonth || c.pricePerHour * 730,
                    infrastructureConfig,
                    c.provider
                  );
                  return {
                    provider: c.provider,
                    savings: calculateSavings(ovhFullCost.totalWithDiscount, competitorCost.totalWithDiscount).savings
                  };
                });
                
                const maxDifference = Math.max(...savingsData.map(s => s.savings));
                const minDifference = Math.min(...savingsData.map(s => s.savings));
                const mostExpensiveCompetitor = savingsData.find(s => s.savings === maxDifference);
                const cheapestCompetitor = savingsData.find(s => s.savings === minDifference);
                const allMoreExpensive = savingsData.every(s => s.savings > 0);
                const allCheaper = savingsData.every(s => s.savings < 0);
                const mixed = !allMoreExpensive && !allCheaper;
                
                if (allMoreExpensive) {
                  return (
                    <div className={styles.summaryWarning}>
                      <div className={styles.summaryIcon}>⚠️</div>
                      <div className={styles.summaryContent}>
                        <h4 className={styles.summaryTitle}>Tous les concurrents sont plus chers</h4>
                        <p className={styles.summaryText}>
                          Le concurrent le plus cher est {providerInfo[mostExpensiveCompetitor?.provider || 'aws'].name} avec{' '}
                          <strong>+{maxDifference.toFixed(2)} €/mois</strong> de différence, soit{' '}
                          <strong>+{(maxDifference * 12).toFixed(2)} €/an</strong>.
                        </p>
                      </div>
                    </div>
                  );
                } else if (allCheaper) {
                  return (
                    <div className={styles.summary}>
                      <div className={styles.summaryIcon}>💰</div>
                      <div className={styles.summaryContent}>
                        <h4 className={styles.summaryTitle}>Tous les concurrents sont moins chers</h4>
                        <p className={styles.summaryText}>
                          Le concurrent le moins cher est {providerInfo[cheapestCompetitor?.provider || 'aws'].name} avec{' '}
                          <strong>{Math.abs(minDifference).toFixed(2)} €/mois</strong> de différence, soit{' '}
                          <strong>{(Math.abs(minDifference) * 12).toFixed(2)} €/an</strong>.
                          Cependant, OVHcloud offre d'autres avantages : souveraineté des données, support francophone, et conformité RGPD.
                        </p>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div className={styles.summaryMixed}>
                      <div className={styles.summaryIcon}>📊</div>
                      <div className={styles.summaryContent}>
                        <h4 className={styles.summaryTitle}>Comparaison mixte des coûts</h4>
                        <p className={styles.summaryText}>
                          {providerInfo[mostExpensiveCompetitor?.provider || 'aws'].name} est plus cher de{' '}
                          <strong>+{maxDifference.toFixed(2)} €/mois</strong>.
                          {' '}{providerInfo[cheapestCompetitor?.provider || 'gcp'].name} est moins cher de{' '}
                          <strong>{Math.abs(minDifference).toFixed(2)} €/mois</strong>.
                        </p>
                      </div>
                    </div>
                  );
                }
              })()}

              <div className={styles.disclaimer}>
                <span className={styles.disclaimerIcon}>ℹ️</span>
                <span className={styles.disclaimerText}>
                  Prix basés sur les tarifs publics disponibles sur{' '}
                  <a href="https://aws.amazon.com/fr/" target="_blank" rel="noopener noreferrer">AWS</a>,{' '}
                  <a href="https://cloud.google.com/gcp?hl=fr" target="_blank" rel="noopener noreferrer">Google Cloud</a> et{' '}
                  <a href="https://azure.microsoft.com/fr-fr/products/" target="_blank" rel="noopener noreferrer">Azure</a>.
                  Les prix peuvent varier selon les régions et les engagements.
                </span>
              </div>
            </>
          ) : (
            <div className={styles.noComparison}>
              <div className={styles.noComparisonIcon}>📊</div>
              <h3 className={styles.noComparisonTitle}>Comparaison non disponible</h3>
              <p className={styles.noComparisonText}>
                La comparaison avec les concurrents n'est pas encore disponible pour ce type d'instance.
              </p>
              <p className={styles.noComparisonSubtext}>
                Contactez-nous pour plus d'informations sur les équivalences et les tarifs.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

