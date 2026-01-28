'use client';

import { useState } from 'react';
import styles from './page.module.css';
import ChatbotPanel from '@/components/ChatbotPanel';
import CompetitorComparisonModal from '@/components/CompetitorComparisonModal';
import {
    Drawer,
    DrawerContent,
    DRAWER_POSITION,
    Button,
    Select,
    SelectControl,
    SelectContent,
    Checkbox,
    CheckboxControl,
    CheckboxLabel,
    FormField,
    FormFieldLabel,
    Quantity,
    Range,
    QuantityControl,
    QuantityInput,
    Message,
    Card
} from '@ovhcloud/ods-react';

import '@ovhcloud/ods-themes/default';

import {
  productsData, 
  getFlavorByCode, 
  regions, 
  resilienceOptions, 
  backupOptions, 
  savingsPlans
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
            <Button
              className={styles.assistantButton}
              color="primary"
              variant="default"
              onClick={() => setIsChatbotOpen(true)}
            >
              <span className={styles.chatbotIcon}>✨</span>
              Aide à la configuration
            </Button>
          </div>
          
          {/* Configurations */}
          {configurations.map((config) => {
            const isActive = config.id === activeConfigId;
            return (
              <Card
                key={config.id}
                color="neutral"
                className={`${styles.configCard} ${isActive ? styles.configCardActive : ''}`}
                onClick={() => setActiveConfigId(config.id)}
              >
                <div className={styles.configHeader}>
                  <div className={styles.configHeaderLeft}>
                    <h2 className={styles.configTitle}>{config.name}</h2>
                    {isActive && <span className={styles.activeIndicator}>Active</span>}
                  </div>
                  {configurations.length > 1 && (
                    <Button
                      color="critical"
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteConfiguration(config.id);
                      }}
                      title="Supprimer cette configuration"
                    >
                      ✕ Supprimer
                    </Button>
                  )}
                </div>

              {/* Sélection de Produit */}
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Sélection de Produit</h3>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <FormField>
                      <FormFieldLabel>Gamme de Produit</FormFieldLabel>
                      <Select
                        items={[
                          { value: '', label: 'Sélectionnez un produit...' },
                          ...productsData.map((product) => ({
                            value: product.id,
                            label: `${product.name} (${product.category})`
                          }))
                        ]}
                        value={config.productId ? [config.productId] : []}
                        onValueChange={({ value }) => {
                          const newValue = value[0] || '';
                          updateConfig(config.id, 'productId', newValue);
                          updateConfig(config.id, 'flavorCode', ''); // Reset flavor when product changes
                        }}
                      >
                        <SelectControl placeholder="Sélectionnez un produit..." />
                        <SelectContent />
                      </Select>
                    </FormField>
                  </div>
                  <div className={styles.field}>
                    <FormField>
                      <FormFieldLabel>Quantité</FormFieldLabel>
                        <Quantity value={String(config.quantity)}
                                  min={1}
                                  onValueChange={({ value }) => updateConfig(config.id, 'quantity', parseInt(value) || 1)}>
                            <QuantityControl>
                                <QuantityInput />
                            </QuantityControl>
                        </Quantity>
                    </FormField>
                  </div>
                </div>

                {/* Flavor Selection */}
                {config.productId && (
                  <div className={styles.field}>
                    <FormField>
                      <FormFieldLabel>Configuration (Flavor)</FormFieldLabel>
                      <Select
                        items={[
                          { value: '', label: 'Sélectionnez une configuration...' },
                          ...(productsData
                            .find((p) => p.id === config.productId)
                            ?.flavors.map((flavor) => ({
                              value: flavor.code,
                              label: `${flavor.name} - ${flavor.vcpu} vCPU, ${flavor.ram} RAM - ${flavor.pricePerHour}€/h${flavor.pricePerMonth ? ` (${flavor.pricePerMonth}€/mois)` : ''}`
                            })) || [])
                        ]}
                        value={config.flavorCode ? [config.flavorCode] : []}
                        onValueChange={({ value }) => updateConfig(config.id, 'flavorCode', value[0] || '')}
                      >
                        <SelectControl placeholder="Sélectionnez une configuration..." />
                        <SelectContent />
                      </Select>
                    </FormField>
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
                    <FormField>
                      <FormFieldLabel>Block Storage Additionnel (GB): {config.additionalBlockStorage} GB</FormFieldLabel>
                      <Range
                        value={[config.additionalBlockStorage]}
                        min={0}
                        max={10000}
                        step={50}
                        onValueChange={({ value }) => updateConfig(config.id, 'additionalBlockStorage', value[0] || 0)}
                      />
                      <span className={styles.fieldHint}>0.02€/GB/mois</span>
                    </FormField>
                  </div>
                  <div className={styles.field}>
                    <FormField>
                      <FormFieldLabel>Stockage S3 (GB): {config.additionalS3Storage} GB</FormFieldLabel>
                      <Range
                        value={[config.additionalS3Storage]}
                        min={0}
                        max={10000}
                        step={50}
                        onValueChange={({ value }) => updateConfig(config.id, 'additionalS3Storage', value[0] || 0)}
                      />
                      <span className={styles.fieldHint}>0.01€/GB/mois</span>
                    </FormField>
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <FormField>
                      <FormFieldLabel>IP Publiques: {config.publicIPs}</FormFieldLabel>
                      <Range
                        value={[config.publicIPs]}
                        min={1}
                        max={20}
                        step={1}
                        onValueChange={({ value }) => updateConfig(config.id, 'publicIPs', value[0] || 1)}
                      />
                      <span className={styles.fieldHint}>3€/IP/mois</span>
                    </FormField>
                  </div>
                </div>
              </div>

              {/* Localisation & Résilience */}
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Localisation & Résilience</h3>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <FormField>
                      <FormFieldLabel>Région</FormFieldLabel>
                      <Select
                        items={[
                          { value: '', label: 'Sélectionnez une région...' },
                          ...regions.map((region) => ({
                            value: region.value,
                            label: region.label
                          }))
                        ]}
                        value={config.region ? [config.region] : []}
                        onValueChange={({ value }) => updateConfig(config.id, 'region', value[0] || '')}
                      >
                        <SelectControl placeholder="Sélectionnez une région..." />
                        <SelectContent />
                      </Select>
                    </FormField>
                  </div>
                  <div className={styles.field}>
                    <FormField>
                      <FormFieldLabel>Résilience</FormFieldLabel>
                      <Select
                        items={[
                          { value: '', label: 'Sélectionnez...' },
                          ...resilienceOptions.map((option) => ({
                            value: option.value,
                            label: option.label
                          }))
                        ]}
                        value={config.resilience ? [config.resilience] : []}
                        onValueChange={({ value }) => updateConfig(config.id, 'resilience', value[0] || '')}
                      >
                        <SelectControl placeholder="Sélectionnez..." />
                        <SelectContent />
                      </Select>
                    </FormField>
                  </div>
                </div>
                {config.resilience && (() => {
                  const resilienceOption = resilienceOptions.find(o => o.value === config.resilience);
                  return resilienceOption ? (
                    <Message color="information">
                      {resilienceOption.description}
                    </Message>
                  ) : null;
                })()}
              </div>

              {/* Configuration Sauvegarde */}
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Configuration Sauvegarde</h3>
                <div className={styles.subsection}>
                  <h4 className={styles.subsectionTitle}>Sauvegarde automatique (locale)</h4>
                  <div className={styles.field}>
                    <FormField>
                      <FormFieldLabel>Mode de rotation</FormFieldLabel>
                      <Select
                        items={backupOptions.map((option) => ({
                          value: option.value,
                          label: option.label
                        }))}
                        value={config.backupMode ? [config.backupMode] : []}
                        onValueChange={({ value }) => updateConfig(config.id, 'backupMode', value[0] || '')}
                      >
                        <SelectControl placeholder="Mode de rotation" />
                        <SelectContent />
                      </Select>
                      {config.backupMode !== 'none' && (
                        <span className={styles.fieldHint}>+5% du coût de base</span>
                      )}
                    </FormField>
                  </div>
                </div>
                <div className={styles.subsection}>
                  <h4 className={styles.subsectionTitle}>Backup distant</h4>
                  <FormField>
                    <Checkbox
                      checked={config.distantBackup}
                      onCheckedChange={({ checked }) => updateConfig(config.id, 'distantBackup', !!checked)}
                    >
                      <CheckboxControl />
                      <CheckboxLabel>Activer la sauvegarde distante</CheckboxLabel>
                    </Checkbox>
                    {config.distantBackup && (
                      <span className={styles.fieldHint}>+10% du coût de base</span>
                    )}
                  </FormField>
                </div>
              </div>

              {/* Souveraineté des données */}
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Souveraineté des données</h3>
                <div className={styles.field}>
                  <FormField>
                    <Select
                      items={[
                        { value: '', label: 'Sélectionnez...' },
                        { value: 'eu', label: 'Données hébergées en UE' },
                        { value: 'france', label: 'Données hébergées en France' },
                        { value: 'canada', label: 'Données hébergées au Canada' }
                      ]}
                      value={config.dataSovereignty ? [config.dataSovereignty] : []}
                      onValueChange={({ value }) => updateConfig(config.id, 'dataSovereignty', value[0] || '')}
                    >
                      <SelectControl placeholder="Sélectionnez..." />
                      <SelectContent />
                    </Select>
                  </FormField>
                </div>
              </div>

              {/* Optimisation des coûts */}
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>
                  <span className={styles.sectionIcon}>💰</span>
                  Optimisation des coûts
                </h3>
                <div className={styles.field}>
                  <FormField>
                    <FormFieldLabel>Savings Plan</FormFieldLabel>
                    <Select
                      items={savingsPlans.map((plan) => ({
                        value: plan.value,
                        label: plan.label
                      }))}
                      value={config.savingsPlan ? [config.savingsPlan] : []}
                      onValueChange={({ value }) => updateConfig(config.id, 'savingsPlan', value[0] || '')}
                    >
                      <SelectControl placeholder="Savings Plan" />
                      <SelectContent />
                    </Select>
                  </FormField>
                </div>
                {config.savingsPlan === 'none' ? (
                  <Message color="information">
                    Mode Pay-as-you-go : facturation à l&apos;usage, aucun engagement
                  </Message>
                ) : (() => {
                  const plan = savingsPlans.find(p => p.value === config.savingsPlan);
                  return plan && plan.discount > 0 ? (
                    <Message color="information">
                      Réduction de {(plan.discount * 100).toFixed(0)}% appliquée sur le coût total
                    </Message>
                  ) : null;
                })()}
              </div>
            </Card>
          );
        })}

          {/* Add Configuration Button */}
          <Button
            color="primary"
            variant="outline"
            onClick={addConfiguration}
            style={{ width: '100%', marginTop: '1rem' }}
          >
            + Ajouter une configuration
          </Button>
        </div>

        {/* Right Sidebar - Cost Estimation */}
        <aside className={styles.sidebar}>
          <Card color="neutral" className={styles.costCard}>
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
              <Button
                color="primary"
                variant="default"
                style={{ width: '100%' }}
              >
                Exporter l&apos;estimation
              </Button>
              <Button
                color="primary"
                variant="outline"
                style={{ width: '100%' }}
              >
                Enregistrer la configuration
              </Button>
            </div>
          </Card>

          {/* Comparaison concurrents */}
          <Card color="neutral" className={styles.comparisonCard}>
            <Button
              color="primary"
              variant="ghost"
              onClick={() => setIsComparisonOpen(true)}
              disabled={!activeConfig?.productId || !activeConfig?.flavorCode}
              style={{ width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span className={styles.comparisonIcon}>🔄</span>
                <div>
                  <h3 className={styles.comparisonTitle}>Comparaison concurrents</h3>
                  <p className={styles.comparisonText}>
                    {activeConfig?.productId && activeConfig?.flavorCode
                      ? 'Comparez avec AWS, Google Cloud et Azure'
                      : 'Sélectionnez d&apos;abord un produit'}
                  </p>
                </div>
              </div>
              <span className={styles.expandIcon}>›</span>
            </Button>
          </Card>
        </aside>
      </div>

      {/* Chatbot Panel - ODS Drawer */}
      <Drawer
        open={isChatbotOpen}
        onOpenChange={({ open }) => setIsChatbotOpen(open)}
      >
        <DrawerContent
          position={DRAWER_POSITION.right}
          style={{ width: 'min(480px, 100vw)', height: '100vh', overflow: 'hidden', padding: '1rem', display: 'flex' }}
        >
          <div style={{ flex: 1, minHeight: 0 }}>
            <ChatbotPanel />
          </div>
        </DrawerContent>
      </Drawer>

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
          resilience: (activeConfig?.resilience || '') as '' | 'multi-az' | 'multi-region' | 'local',
          savingsPlanDiscount: savingsPlans.find(sp => sp.value === activeConfig?.savingsPlan)?.discount || 0
        }}
      />
    </div>
  );
}

