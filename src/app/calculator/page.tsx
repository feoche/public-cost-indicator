'use client';

import { useState } from 'react';
import styles from './page.module.css';
import ChatbotModal from '@/components/ChatbotModal';
import CompetitorComparisonModal from '@/components/CompetitorComparisonModal';
import { 
  productsData, 
  getFlavorByCode, 
  regions, 
  resilienceOptions, 
  backupOptions, 
  savingsPlans,
  ProductFlavor
} from '@/lib/productsData';

interface Configuration {
  id: string;
  name: string;
  // Product Selection
  productId: string;
  flavorCode: string;
  quantity: number;
  // Localisation
  region: string;
  resilience: string;
  // Additional Storage
  additionalBlockStorage: number; // GB
  additionalS3Storage: number; // GB
  publicIPs: number;
  // Sauvegarde
  backupMode: string;
  distantBackup: boolean;
  // Souveraineté
  dataSovereignty: string;
  // Optimisation
  savingsPlan: string;
}

export default function CalculatorPage() {
  const [configurations, setConfigurations] = useState<Configuration[]>([
    {
      id: '1',
      name: 'Configuration 1',
      productId: '',
      flavorCode: '',
      quantity: 1,
      region: '',
      resilience: '',
      additionalBlockStorage: 0,
      additionalS3Storage: 0,
      publicIPs: 1,
      backupMode: 'none',
      distantBackup: false,
      dataSovereignty: '',
      savingsPlan: 'none'
    }
  ]);

  const [activeConfigId, setActiveConfigId] = useState('1');
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);

  const activeConfig = configurations.find(c => c.id === activeConfigId);

  const updateConfig = (configId: string, field: keyof Configuration, value: string | boolean | number) => {
    setConfigurations(configs =>
      configs.map(config =>
        config.id === configId
          ? { ...config, [field]: value }
          : config
      )
    );
  };

  const addConfiguration = () => {
    const newId = (configurations.length + 1).toString();
    const newConfig: Configuration = {
      id: newId,
      name: `Configuration ${newId}`,
      productId: '',
      flavorCode: '',
      quantity: 1,
      region: '',
      resilience: '',
      additionalBlockStorage: 0,
      additionalS3Storage: 0,
      publicIPs: 1,
      backupMode: 'none',
      distantBackup: false,
      dataSovereignty: '',
      savingsPlan: 'none'
    };
    setConfigurations([...configurations, newConfig]);
    setActiveConfigId(newId);
  };

  const deleteConfiguration = (id: string) => {
    if (configurations.length === 1) return;
    setConfigurations(configs => configs.filter(c => c.id !== id));
    if (activeConfigId === id) {
      setActiveConfigId(configurations[0].id);
    }
  };

  // Calcul des coûts basé sur les données réelles pour une configuration donnée
  const calculateMonthlyCostForConfig = (config: Configuration) => {
    if (!config) return 0;
    
    // Coût de base de l'instance/produit
    let baseCost = 0;
    if (config.productId && config.flavorCode) {
      const flavor = getFlavorByCode(config.productId, config.flavorCode);
      if (flavor) {
        // Utiliser le prix mensuel s'il existe, sinon calculer depuis le prix horaire
        const monthlyCost = flavor.pricePerMonth || (flavor.pricePerHour * 730);
        baseCost = monthlyCost * config.quantity;
      }
    }
    
    // Coûts additionnels
    const additionalStorageCost = config.additionalBlockStorage * 0.02; // 0.02€/GB/mois
    const s3StorageCost = config.additionalS3Storage * 0.01; // 0.01€/GB/mois
    const ipCost = config.publicIPs * 3; // 3€/IP/mois
    
    // Coût de sauvegarde
    let backupCost = 0;
    if (config.backupMode !== 'none' && config.backupMode) {
      backupCost = baseCost * 0.05; // 5% du coût de base
    }
    if (config.distantBackup) {
      backupCost += baseCost * 0.10; // 10% supplémentaire pour backup distant
    }
    
    // Coût de résilience
    let resilienceCost = 0;
    if (config.resilience === 'multi-az') {
      resilienceCost = baseCost * 0.15; // 15% pour Multi-AZ
    } else if (config.resilience === 'multi-region') {
      resilienceCost = baseCost * 0.30; // 30% pour Multi-Région
    }
    
    // Total avant réduction
    const totalBeforeDiscount = baseCost + additionalStorageCost + s3StorageCost + ipCost + backupCost + resilienceCost;
    
    // Application du savings plan
    let discount = 0;
    const savingsPlan = savingsPlans.find(sp => sp.value === config.savingsPlan);
    if (savingsPlan) {
      discount = totalBeforeDiscount * savingsPlan.discount;
    }
    
    return totalBeforeDiscount - discount;
  };

  const calculateMonthlyCost = () => {
    return activeConfig ? calculateMonthlyCostForConfig(activeConfig) : 0;
  };

  const monthlyCost = calculateMonthlyCost();
  const annualCost = monthlyCost * 12;

  // Calcul détaillé des coûts pour l'affichage pour une configuration donnée
  const getCostBreakdownForConfig = (config: Configuration) => {
    if (!config) return null;
    
    let baseCost = 0;
    let flavorName = '';
    if (config.productId && config.flavorCode) {
      const flavor = getFlavorByCode(config.productId, config.flavorCode);
      if (flavor) {
        const monthlyCost = flavor.pricePerMonth || (flavor.pricePerHour * 730);
        baseCost = monthlyCost * config.quantity;
        flavorName = flavor.name;
      }
    }
    
    const additionalStorageCost = config.additionalBlockStorage * 0.02;
    const s3StorageCost = config.additionalS3Storage * 0.01;
    const ipCost = config.publicIPs * 3;
    
    let backupCost = 0;
    if (config.backupMode !== 'none' && config.backupMode) {
      backupCost = baseCost * 0.05;
    }
    if (config.distantBackup) {
      backupCost += baseCost * 0.10;
    }
    
    let resilienceCost = 0;
    if (config.resilience === 'multi-az') {
      resilienceCost = baseCost * 0.15;
    } else if (config.resilience === 'multi-region') {
      resilienceCost = baseCost * 0.30;
    }
    
    const totalBeforeDiscount = baseCost + additionalStorageCost + s3StorageCost + ipCost + backupCost + resilienceCost;
    
    let discount = 0;
    const savingsPlan = savingsPlans.find(sp => sp.value === config.savingsPlan);
    if (savingsPlan) {
      discount = totalBeforeDiscount * savingsPlan.discount;
    }
    
    return {
      flavorName,
      baseCost,
      additionalStorageCost,
      s3StorageCost,
      ipCost,
      backupCost,
      resilienceCost,
      totalBeforeDiscount,
      discount
    };
  };

  const getCostBreakdown = () => {
    return activeConfig ? getCostBreakdownForConfig(activeConfig) : null;
  };

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>📊</span>
            <div>
              <h1 className={styles.title}>Cloud Cost Indicator</h1>
              <p className={styles.subtitle}>Estimez vos coûts d'infrastructure cloud</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className={styles.container}>
        <div className={styles.mainContent}>
          {/* Assistant Section */}
          <div className={styles.assistantSection}>
            <p className={styles.assistantDescription}>
              Nous vous aidons à dimensionner une infrastructure claire et souveraine
            </p>
            <button 
              className={styles.assistantButton}
              onClick={() => setIsChatbotOpen(true)}
            >
              <span className={styles.chatbotIcon}>✨</span>
              Aide à la configuration
            </button>
          </div>
          
          {/* Configurations */}
          {configurations.map((config) => {
            const isActive = config.id === activeConfigId;
            return (
              <div 
                key={config.id} 
                className={`${styles.configCard} ${isActive ? styles.configCardActive : ''}`}
                onClick={() => setActiveConfigId(config.id)}
              >
                <div className={styles.configHeader}>
                  <div className={styles.configHeaderLeft}>
                    <h2 className={styles.configTitle}>{config.name}</h2>
                    {isActive && <span className={styles.activeIndicator}>Active</span>}
                  </div>
                  {configurations.length > 1 && (
                    <button
                      className={styles.deleteConfigButton}
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteConfiguration(config.id);
                      }}
                      title="Supprimer cette configuration"
                    >
                      ✕ Supprimer
                    </button>
                  )}
                </div>

              {/* Sélection de Produit */}
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Sélection de Produit</h3>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label className={styles.label}>Gamme de Produit</label>
                    <select
                      className={styles.select}
                      value={config.productId}
                      onChange={(e) => {
                        updateConfig(config.id, 'productId', e.target.value);
                        updateConfig(config.id, 'flavorCode', ''); // Reset flavor when product changes
                      }}
                    >
                      <option value="">Sélectionnez un produit...</option>
                      {productsData.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.name} ({product.category})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Quantité</label>
                    <input
                      type="number"
                      min="1"
                      className={styles.input}
                      value={config.quantity}
                      onChange={(e) => updateConfig(config.id, 'quantity', parseInt(e.target.value) || 1)}
                    />
                  </div>
                </div>

                {/* Flavor Selection */}
                {config.productId && (
                  <div className={styles.field}>
                    <label className={styles.label}>Configuration (Flavor)</label>
                    <select
                      className={styles.select}
                      value={config.flavorCode}
                      onChange={(e) => updateConfig(config.id, 'flavorCode', e.target.value)}
                    >
                      <option value="">Sélectionnez une configuration...</option>
                      {productsData
                        .find((p) => p.id === config.productId)
                        ?.flavors.map((flavor) => (
                          <option key={flavor.code} value={flavor.code}>
                            {flavor.name} - {flavor.vcpu} vCPU, {flavor.ram} RAM - {flavor.pricePerHour}€/h
                            {flavor.pricePerMonth && ` (${flavor.pricePerMonth}€/mois)`}
                          </option>
                        ))}
                    </select>
                  </div>
                )}

                {/* Display Selected Flavor Details */}
                {config.productId && config.flavorCode && (() => {
                  const flavor = getFlavorByCode(config.productId, config.flavorCode);
                  return flavor ? (
                    <div className={styles.flavorDetails}>
                      <h4 className={styles.flavorDetailsTitle}>Spécifications de la configuration sélectionnée:</h4>
                      <div className={styles.flavorSpecs}>
                        <div className={styles.specItem}>
                          <span className={styles.specLabel}>💻 CPU:</span>
                          <span className={styles.specValue}>{flavor.vcpu} vCPU @ {flavor.frequency}</span>
                        </div>
                        <div className={styles.specItem}>
                          <span className={styles.specLabel}>🧠 RAM:</span>
                          <span className={styles.specValue}>{flavor.ram}</span>
                        </div>
                        <div className={styles.specItem}>
                          <span className={styles.specLabel}>💾 Stockage:</span>
                          <span className={styles.specValue}>{flavor.storage}</span>
                        </div>
                        {flavor.gpu && (
                          <div className={styles.specItem}>
                            <span className={styles.specLabel}>🎮 GPU:</span>
                            <span className={styles.specValue}>{flavor.gpu}</span>
                          </div>
                        )}
                        <div className={styles.specItem}>
                          <span className={styles.specLabel}>📶 Bande passante:</span>
                          <span className={styles.specValue}>{flavor.bandwidth}</span>
                        </div>
                      </div>
                    </div>
                  ) : null;
                })()}
              </div>

              {/* Ressources Additionnelles */}
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Ressources Additionnelles</h3>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label className={styles.label}>Block Storage Additionnel (GB)</label>
                    <input
                      type="number"
                      min="0"
                      className={styles.input}
                      value={config.additionalBlockStorage}
                      onChange={(e) => updateConfig(config.id, 'additionalBlockStorage', parseInt(e.target.value) || 0)}
                      placeholder="0"
                    />
                    <span className={styles.fieldHint}>0.02€/GB/mois</span>
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Stockage S3 (GB)</label>
                    <input
                      type="number"
                      min="0"
                      className={styles.input}
                      value={config.additionalS3Storage}
                      onChange={(e) => updateConfig(config.id, 'additionalS3Storage', parseInt(e.target.value) || 0)}
                      placeholder="0"
                    />
                    <span className={styles.fieldHint}>0.01€/GB/mois</span>
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label className={styles.label}>IP Publiques</label>
                    <input
                      type="number"
                      min="1"
                      className={styles.input}
                      value={config.publicIPs}
                      onChange={(e) => updateConfig(config.id, 'publicIPs', parseInt(e.target.value) || 1)}
                      placeholder="1"
                    />
                    <span className={styles.fieldHint}>3€/IP/mois</span>
                  </div>
                </div>
              </div>

              {/* Localisation & Résilience */}
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Localisation & Résilience</h3>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label className={styles.label}>Région</label>
                    <select
                      className={styles.select}
                      value={config.region}
                      onChange={(e) => updateConfig(config.id, 'region', e.target.value)}
                    >
                      <option value="">Sélectionnez une région...</option>
                      {regions.map((region) => (
                        <option key={region.value} value={region.value}>
                          {region.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Résilience</label>
                    <select
                      className={styles.select}
                      value={config.resilience}
                      onChange={(e) => updateConfig(config.id, 'resilience', e.target.value)}
                    >
                      <option value="">Sélectionnez...</option>
                      {resilienceOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {config.resilience && (() => {
                  const resilienceOption = resilienceOptions.find(o => o.value === config.resilience);
                  return resilienceOption ? (
                    <div className={styles.infoBox}>
                      <span className={styles.infoIcon}>💡</span>
                      <span className={styles.infoText}>
                        {resilienceOption.description}
                      </span>
                    </div>
                  ) : null;
                })()}
              </div>

              {/* Configuration Sauvegarde */}
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Configuration Sauvegarde</h3>
                <div className={styles.subsection}>
                  <h4 className={styles.subsectionTitle}>Sauvegarde automatique (locale)</h4>
                  <div className={styles.field}>
                    <label className={styles.label}>Mode de rotation</label>
                    <select
                      className={styles.select}
                      value={config.backupMode}
                      onChange={(e) => updateConfig(config.id, 'backupMode', e.target.value)}
                    >
                      {backupOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {config.backupMode !== 'none' && (
                      <span className={styles.fieldHint}>+5% du coût de base</span>
                    )}
                  </div>
                </div>
                <div className={styles.subsection}>
                  <h4 className={styles.subsectionTitle}>Backup distant</h4>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={config.distantBackup}
                      onChange={(e) => updateConfig(config.id, 'distantBackup', e.target.checked)}
                    />
                    Activer la sauvegarde distante
                  </label>
                  {config.distantBackup && (
                    <span className={styles.fieldHint}>+10% du coût de base</span>
                  )}
                </div>
              </div>

              {/* Souveraineté des données */}
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Souveraineté des données</h3>
                <div className={styles.field}>
                  <select
                    className={styles.select}
                    value={config.dataSovereignty}
                    onChange={(e) => updateConfig(config.id, 'dataSovereignty', e.target.value)}
                  >
                    <option value="">Sélectionnez...</option>
                    <option value="eu">Données hébergées en UE</option>
                    <option value="france">Données hébergées en France</option>
                    <option value="canada">Données hébergées au Canada</option>
                  </select>
                </div>
              </div>

              {/* Optimisation des coûts */}
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>
                  <span className={styles.sectionIcon}>💰</span>
                  Optimisation des coûts
                </h3>
                <div className={styles.field}>
                  <label className={styles.label}>Savings Plan</label>
                  <select
                    className={styles.select}
                    value={config.savingsPlan}
                    onChange={(e) => updateConfig(config.id, 'savingsPlan', e.target.value)}
                  >
                    {savingsPlans.map((plan) => (
                      <option key={plan.value} value={plan.value}>
                        {plan.label}
                      </option>
                    ))}
                  </select>
                </div>
                {config.savingsPlan === 'none' ? (
                  <div className={styles.infoBox}>
                    <span className={styles.infoIcon}>ℹ️</span>
                    <span className={styles.infoText}>
                      Mode Pay-as-you-go : facturation à l'usage, aucun engagement
                    </span>
                  </div>
                ) : (() => {
                  const plan = savingsPlans.find(p => p.value === config.savingsPlan);
                  return plan && plan.discount > 0 ? (
                    <div className={styles.infoBox}>
                      <span className={styles.infoIcon}>💰</span>
                      <span className={styles.infoText}>
                        Réduction de {(plan.discount * 100).toFixed(0)}% appliquée sur le coût total
                      </span>
                    </div>
                  ) : null;
                })()}
              </div>
            </div>
          );
        })}

          {/* Add Configuration Button */}
          <button className={styles.addConfigButton} onClick={addConfiguration}>
            + Ajouter une configuration
          </button>
        </div>

        {/* Right Sidebar - Cost Estimation */}
        <aside className={styles.sidebar}>
          <div className={styles.costCard}>
            <h2 className={styles.costTitle}>Estimation des coûts</h2>
            
            {/* Liste de toutes les configurations */}
            {configurations.map((config, index) => {
              const configMonthlyCost = calculateMonthlyCostForConfig(config);
              const configAnnualCost = configMonthlyCost * 12;
              const breakdown = getCostBreakdownForConfig(config);
              const isActive = config.id === activeConfigId;

              return (
                <div key={config.id}>
                  {index > 0 && <div className={styles.configSeparator} />}
                  
                  <div 
                    className={`${styles.configSection} ${isActive ? styles.configSectionActive : ''}`}
                    onClick={() => setActiveConfigId(config.id)}
                  >
                    <div className={styles.configSectionHeader}>
                      <h3 className={styles.configSectionTitle}>{config.name}</h3>
                      {isActive && <span className={styles.activeBadge}>Active</span>}
                    </div>

                    {/* Cost Breakdown */}
                    {breakdown && breakdown.baseCost > 0 ? (
                      <div className={styles.costBreakdown}>
                        <div className={styles.breakdownList}>
                          {breakdown.baseCost > 0 && (
                            <div className={styles.breakdownItem}>
                              <span className={styles.breakdownLabel}>
                                {breakdown.flavorName} × {config.quantity}
                              </span>
                              <span className={styles.breakdownValue}>{breakdown.baseCost.toFixed(2)} €</span>
                            </div>
                          )}
                          {breakdown.additionalStorageCost > 0 && (
                            <div className={styles.breakdownItem}>
                              <span className={styles.breakdownLabel}>Block Storage ({config.additionalBlockStorage} GB)</span>
                              <span className={styles.breakdownValue}>{breakdown.additionalStorageCost.toFixed(2)} €</span>
                            </div>
                          )}
                          {breakdown.s3StorageCost > 0 && (
                            <div className={styles.breakdownItem}>
                              <span className={styles.breakdownLabel}>Stockage S3 ({config.additionalS3Storage} GB)</span>
                              <span className={styles.breakdownValue}>{breakdown.s3StorageCost.toFixed(2)} €</span>
                            </div>
                          )}
                          {breakdown.ipCost > 0 && (
                            <div className={styles.breakdownItem}>
                              <span className={styles.breakdownLabel}>IP Publiques ({config.publicIPs})</span>
                              <span className={styles.breakdownValue}>{breakdown.ipCost.toFixed(2)} €</span>
                            </div>
                          )}
                          {breakdown.backupCost > 0 && (
                            <div className={styles.breakdownItem}>
                              <span className={styles.breakdownLabel}>Sauvegardes</span>
                              <span className={styles.breakdownValue}>{breakdown.backupCost.toFixed(2)} €</span>
                            </div>
                          )}
                          {breakdown.resilienceCost > 0 && (
                            <div className={styles.breakdownItem}>
                              <span className={styles.breakdownLabel}>Résilience</span>
                              <span className={styles.breakdownValue}>{breakdown.resilienceCost.toFixed(2)} €</span>
                            </div>
                          )}
                          {breakdown.discount > 0 && (
                            <div className={styles.breakdownItem} style={{color: 'var(--ovh-color-success)'}}>
                              <span className={styles.breakdownLabel}>Réduction (Savings Plan)</span>
                              <span className={styles.breakdownValue}>-{breakdown.discount.toFixed(2)} €</span>
                            </div>
                          )}
                        </div>
                        
                        <div className={styles.configSubtotal}>
                          <span className={styles.subtotalLabel}>Sous-total :</span>
                          <span className={styles.subtotalValue}>{configMonthlyCost.toFixed(2)} € / mois</span>
                        </div>
                      </div>
                    ) : (
                      <div className={styles.emptyState}>
                        <span className={styles.emptyIcon}>📊</span>
                        <p className={styles.emptyText}>Aucun produit sélectionné</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Total de toutes les configurations */}
            <div className={styles.totalSection}>
              <div className={styles.costDisplay}>
                <div className={styles.monthlyLabel}>TOTAL MENSUEL</div>
                <div className={styles.monthlyCost}>
                  {configurations.reduce((sum, config) => sum + calculateMonthlyCostForConfig(config), 0).toFixed(2)} €
                </div>
                <div className={styles.annualInfo}>
                  Estimation annuelle : {(configurations.reduce((sum, config) => sum + calculateMonthlyCostForConfig(config), 0) * 12).toFixed(2)} €
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className={styles.costActions}>
              <button className={styles.primaryButton}>
                Exporter l'estimation
              </button>
              <button className={styles.secondaryButton}>
                Enregistrer la configuration
              </button>
            </div>
          </div>

          {/* Comparaison concurrents */}
          <div className={styles.comparisonCard}>
            <button 
              className={styles.comparisonButton}
              onClick={() => setIsComparisonOpen(true)}
              disabled={!activeConfig?.productId || !activeConfig?.flavorCode}
            >
              <span className={styles.comparisonIcon}>🔄</span>
              <div className={styles.comparisonContent}>
                <h3 className={styles.comparisonTitle}>Comparaison concurrents</h3>
                <p className={styles.comparisonText}>
                  {activeConfig?.productId && activeConfig?.flavorCode
                    ? 'Comparez avec AWS, Google Cloud et Azure'
                    : 'Sélectionnez d\'abord un produit'}
                </p>
              </div>
              <span className={styles.expandIcon}>›</span>
            </button>
          </div>
        </aside>
      </div>

      {/* Chatbot Modal */}
      <ChatbotModal
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
      />

      {/* Competitor Comparison Modal */}
      <CompetitorComparisonModal
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
        flavor={activeConfig?.productId && activeConfig?.flavorCode 
          ? getFlavorByCode(activeConfig.productId, activeConfig.flavorCode) || null
          : null
        }
        ovhMonthlyCost={monthlyCost}
        infrastructureConfig={{
          quantity: activeConfig?.quantity || 1,
          additionalBlockStorage: activeConfig?.additionalBlockStorage || 0,
          additionalS3Storage: activeConfig?.additionalS3Storage || 0,
          publicIPs: activeConfig?.publicIPs || 1,
          hasBackup: activeConfig?.backupMode !== 'none' && !!activeConfig?.backupMode,
          hasDistantBackup: activeConfig?.distantBackup || false,
          resilience: activeConfig?.resilience || '',
          savingsPlanDiscount: savingsPlans.find(sp => sp.value === activeConfig?.savingsPlan)?.discount || 0
        }}
      />
    </div>
  );
}

