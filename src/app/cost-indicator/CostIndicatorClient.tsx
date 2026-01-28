"use client";

import React, { useEffect, useMemo, useState } from "react";
import styles from "./page.module.css";

import type { Plan } from "./lib/cloudData";
import { CostSummary } from "./components/CostSummary";
import {
  backupPricingPerGbHour,
  blockStoragePricingPerGbHour,
  floatingIpPricePerHour,
  gatewayPricingPerHour,
  gpuPricingPerHour,
  instanceTypePricingPerHour,
  loadBalancerPricingPerHour,
  objectStoragePricingPerGbHour,
} from "./lib/pricing";

interface CostIndicatorClientProps {
  plans: Plan[];
  families: string[];
  currency?: string;
  taxRate?: number;
}

export default function CostIndicatorClient({
  plans,
  families,
  currency = "EUR",
  taxRate,
}: CostIndicatorClientProps) {
  const gpuProfileDetails: Record<
    string,
    { vcpu: string; memory: string }
  > = {
    "a10-1-gpu": { vcpu: "28", memory: "40" },
    "a100-1-gpu": { vcpu: "13", memory: "160" },
    "ai1-1-gpu": { vcpu: "13", memory: "40" },
    "ai1-le-1-gpu": { vcpu: "13", memory: "40" },
    "h100-1-gpu": { vcpu: "28", memory: "350" },
    "l4-1-gpu": { vcpu: "20", memory: "80" },
    "l40s-1-gpu": { vcpu: "13", memory: "80" },
    "ai1-1-cpu": { vcpu: "1", memory: "4" },
  };

  const cpuOptions = Array.from(
    new Set([
      "1",
      "2",
      "4",
      "8",
      "13",
      "16",
      "20",
      "28",
      "32",
      "64",
    ])
  );
  const memoryOptions = Array.from(
    new Set([
      "4",
      "8",
      "16",
      "32",
      "40",
      "64",
      "80",
      "128",
      "160",
      "256",
      "350",
    ])
  );
  const storageOptions = ["50", "100", "200", "500", "1000", "2000", "5000"];
  const ipOptions = ["0", "1", "2", "3", "5", "10"];
  const backupOptions = ["0", "1", "2", "5", "10"];

  const [selectedFamilyGroup, setSelectedFamilyGroup] = useState("");
  const [selectedFamily, setSelectedFamily] = useState<string>("");
  const [hardwareModel, setHardwareModel] = useState("");
  const [instanceProfile, setInstanceProfile] = useState("");
  const [cpu, setCpu] = useState("");
  const [memory, setMemory] = useState("");
  const [blockStorage, setBlockStorage] = useState("0");
  const [blockStorageClass, setBlockStorageClass] = useState("classic");
  const [publicIps, setPublicIps] = useState("0");
  const [instanceBackupQty, setInstanceBackupQty] = useState("0");
  const [instanceBackupRetention, setInstanceBackupRetention] = useState("");
  const [volumeBackupQty, setVolumeBackupQty] = useState("0");
  const [volumeBackupRetention, setVolumeBackupRetention] = useState("");
  const [remoteBackupEnabled, setRemoteBackupEnabled] = useState(false);
  const [remoteBackupRegion, setRemoteBackupRegion] = useState("");
  const [objectStorage, setObjectStorage] = useState("0");
  const [objectStorageClass, setObjectStorageClass] = useState("standard");
  const [fileStorage, setFileStorage] = useState("0");
  const [privateInterconnect, setPrivateInterconnect] = useState("No");
  const [location, setLocation] = useState("");
  const [region, setRegion] = useState("");
  const [dataSovereignty, setDataSovereignty] = useState("EU");
  const [resilience, setResilience] = useState("1AZ");
  const [savingPlanDuration, setSavingPlanDuration] = useState("payg");
  const [savingPlanDiscount, setSavingPlanDiscount] = useState("0");
  const [savingPlanAuto, setSavingPlanAuto] = useState(true);
  const [gpuType, setGpuType] = useState("a10-1-gpu");
  const [gpuQty, setGpuQty] = useState("0");
  const [gpuEnabled, setGpuEnabled] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [estimatedCost, setEstimatedCost] = useState<number | null>(null);
  const [estimatedSavings, setEstimatedSavings] = useState<number | null>(null);

  const filteredPlans = useMemo(() => {
    if (!selectedFamily) {
      return plans;
    }

    return plans.filter((plan) =>
      plan.addonFamilies?.some((fam) => fam.name === selectedFamily)
    );
  }, [plans, selectedFamily]);

  const familyGroups = useMemo(() => {
    const remaining = new Set(families);
    const groups: { label: string; items: string[] }[] = [];

    const take = (label: string, predicate: (name: string) => boolean) => {
      const items = Array.from(remaining).filter(predicate).sort();
      items.forEach((item) => remaining.delete(item));
      if (items.length) {
        groups.push({ label, items });
      }
    };

    take("Compute", (name) => ["instance", "bandwidth_instance"].includes(name));
    take(
      "Storage",
      (name) =>
        ["storage", "volume", "volume-backup", "snapshot", "share", "coldarchive"].includes(name)
    );
    take(
      "Network",
      (name) =>
        [
          "publicip",
          "floatingip",
          "gateway",
          "loadbalancer",
          "octavia-loadbalancer",
        ].includes(name)
    );
    take("AI", (name) => name.startsWith("ai-"));
    take(
      "Data",
      (name) =>
        [
          "databases",
          "dataplatform",
          "data-integration",
          "data-processing-job",
          "data-processing-spark-notebook",
        ].includes(name)
    );
    take(
      "Kubernetes",
      (name) => ["mks", "option-managed-kubernetes", "rancher"].includes(name)
    );
    take(
      "Security & Compliance",
      (name) => ["certification", "certification-hds"].includes(name)
    );
    take("Other", (name) => remaining.has(name));

    return groups;
  }, [families]);

  const familyOptions = useMemo(() => {
    const group = familyGroups.find(
      (entry) => entry.label === selectedFamilyGroup
    );
    return group ? group.items : [];
  }, [familyGroups, selectedFamilyGroup]);

  const regionCapabilities = useMemo(() => {
    const supports3azRegions = new Set(["fr-par", "it-mil"]);
    const supportsLzRegions = new Set(["fr-mrs", "uk-man"]);
    return {
      supports3az: supports3azRegions.has(region),
      supportsLz: supportsLzRegions.has(region),
    };
  }, [region]);

  const resilienceOptions = useMemo(
    () => [
      { value: "1AZ", label: "1AZ" },
      {
        value: "LZ",
        label: "Local Zone (LZ)",
        disabled: !regionCapabilities.supportsLz,
      },
      {
        value: "3AZ",
        label: "3AZ (Multi‑zone)",
        disabled: !regionCapabilities.supports3az,
      },
    ],
    [regionCapabilities.supports3az, regionCapabilities.supportsLz]
  );

  const regionOptions = useMemo(() => {
    const optionsByLocation: Record<string, { value: string; label: string }[]> =
      {
        germany: [{ value: "de-fra", label: "Allemagne (Frankfurt)" }],
        australia: [{ value: "au-syd", label: "Australie (Sydney)" }],
        austria: [{ value: "at-vie", label: "Autriche (Vienna)" }],
        belgium: [{ value: "be-bru", label: "Belgique (Bruxelles)" }],
        bulgaria: [{ value: "bg-sof", label: "Bulgarie (Sofia)" }],
        canada: [
          { value: "ca-bhs", label: "Canada (Beauharnois)" },
          { value: "ca-tor", label: "Canada (Toronto)" },
        ],
        czechia: [{ value: "cz-prg", label: "République tchèque (Prague)" }],
        denmark: [{ value: "dk-cph", label: "Danemark (Copenhagen)" }],
        spain: [{ value: "es-mad", label: "Espagne (Madrid)" }],
        finland: [{ value: "fi-hel", label: "Finlande (Helsinki)" }],
        france: [
          { value: "fr-sbg", label: "France (Strasbourg)" },
          { value: "fr-grv", label: "France (Gravelines)" },
          { value: "fr-par", label: "France (Paris)" },
          { value: "fr-rbx", label: "France (Roubaix)" },
          { value: "fr-mrs", label: "France (Marseille)" },
        ],
        ireland: [{ value: "ie-dub", label: "Irlande (Dublin)" }],
        india: [{ value: "in-bom", label: "Inde (Mumbai)" }],
        uk: [
          { value: "uk-lon", label: "Royaume‑Uni (Londres)" },
          { value: "uk-man", label: "Royaume‑Uni (Manchester)" },
        ],
        italy: [{ value: "it-mil", label: "Italie (Milan)" }],
        poland: [{ value: "pl-waw", label: "Pologne (Varsovie)" }],
        luxembourg: [{ value: "lu-lux", label: "Luxembourg (Luxembourg)" }],
        morocco: [{ value: "ma-rab", label: "Maroc (Rabat)" }],
        netherlands: [{ value: "nl-ams", label: "Pays‑Bas (Amsterdam)" }],
        norway: [{ value: "no-osl", label: "Norvège (Oslo)" }],
        portugal: [{ value: "pt-lis", label: "Portugal (Lisbon)" }],
        romania: [{ value: "ro-buc", label: "Roumanie (Bucharest)" }],
        sweden: [{ value: "se-sto", label: "Suède (Stockholm)" }],
        switzerland: [{ value: "ch-zrh", label: "Suisse (Zurich)" }],
        singapore: [{ value: "sg-sin", label: "Singapour (Singapour)" }],
        us: [{ value: "us-1", label: "États‑Unis (US)" }],
      };

    const fallback = Object.values(optionsByLocation).flat();
    return optionsByLocation[location] ?? fallback;
  }, [location]);

  const instanceProfileGroups = useMemo(() => {
    const profiles = new Set<string>();
    plans.forEach((plan) => {
      plan.addonFamilies?.forEach((family) => {
        if (family.name === "instance") {
          family.addons?.forEach((addon) => profiles.add(addon));
        }
      });
    });

    const groups: Record<string, string[]> = {};
    Array.from(profiles).forEach((profile) => {
      const prefix = profile.split("-")[0] ?? "other";
      if (!groups[prefix]) {
        groups[prefix] = [];
      }
      groups[prefix].push(profile);
    });

    return Object.entries(groups)
      .map(([label, items]) => ({
        label: label.toUpperCase(),
        items: items.sort(),
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [plans]);

  const instanceTypeOptions = useMemo(
    () =>
      Object.keys(instanceTypePricingPerHour).sort((a, b) =>
        a.localeCompare(b)
      ),
    []
  );

  const typeOptions = useMemo(() => {
    if (selectedFamily === "instance") {
      return instanceTypeOptions;
    }
    if (selectedFamily === "floatingip") {
      return ["floating-ip"];
    }
    if (selectedFamily === "gateway") {
      return ["gateway-s", "gateway-m", "gateway-l", "gateway-xl", "gateway-2xl"];
    }
    if (selectedFamily === "loadbalancer" || selectedFamily === "octavia-loadbalancer") {
      return ["load-balancer-s", "load-balancer-m", "load-balancer-l", "load-balancer-xl"];
    }
    return [];
  }, [instanceTypeOptions, selectedFamily]);

  const selectedInstanceDetails =
    selectedFamily === "instance" && selectedType
      ? instanceTypePricingPerHour[selectedType]
      : null;

  useEffect(() => {
    const details = gpuProfileDetails[gpuType];
    if (details) {
      setCpu(details.vcpu);
      setMemory(details.memory);
    }
  }, [gpuType]);

  useEffect(() => {
    if (location === "france") {
      setDataSovereignty("FR");
    } else if (location === "germany") {
      setDataSovereignty("DE");
    } else if (location === "switzerland") {
      setDataSovereignty("CH");
    } else if (location) {
      setDataSovereignty("EU");
    }
    setRegion("");
  }, [location]);

  useEffect(() => {
    if (resilience === "3AZ" && !regionCapabilities.supports3az) {
      setResilience("1AZ");
    }
    if (resilience === "LZ" && !regionCapabilities.supportsLz) {
      setResilience("1AZ");
    }
  }, [regionCapabilities.supports3az, regionCapabilities.supportsLz, resilience]);

  useEffect(() => {
    if (!savingPlanAuto) return;
    const defaults: Record<string, number> = {
      payg: 0,
      "1m": 10,
      "6m": 15,
      "12m": 25,
      "24m": 35,
      "36m": 45,
    };
    setSavingPlanDiscount(String(defaults[savingPlanDuration] ?? 0));
  }, [savingPlanDuration, savingPlanAuto]);

  useEffect(() => {
    if (!selectedFamilyGroup || location) return;
    setLocation("france");
  }, [selectedFamilyGroup, location]);

  useEffect(() => {
    if (region || regionOptions.length === 0) return;
    const preferred =
      selectedFamilyGroup === "AI"
        ? "fr-grv"
        : selectedFamilyGroup === "Network"
        ? "fr-par"
        : selectedFamilyGroup === "Storage"
        ? "fr-par"
        : selectedFamilyGroup === "Compute"
        ? "fr-par"
        : regionOptions[0]?.value;
    if (preferred && regionOptions.some((opt) => opt.value === preferred)) {
      setRegion(preferred);
    } else if (regionOptions[0]?.value) {
      setRegion(regionOptions[0].value);
    }
  }, [region, regionOptions, selectedFamilyGroup]);

  const instancePrice = selectedInstanceDetails?.price ?? 0;
  const basePlanHourly = instancePrice;
  const gpuUnitPrice = gpuPricingPerHour[gpuType] ?? 0;
  const gpuHourly = gpuEnabled ? gpuUnitPrice * Number(gpuQty || 0) : 0;
  const blockStorageUnit =
    blockStoragePricingPerGbHour[blockStorageClass] ?? 0;
  const blockStorageHourly = Number(blockStorage) * blockStorageUnit;
  const publicIpHourly = Number(publicIps) * floatingIpPricePerHour;
  const objectStorageHourly =
    Number(objectStorage) *
    (objectStoragePricingPerGbHour[objectStorageClass] ?? 0);
  const fileStorageHourly = 0;
  const backupHourly =
    (Number(instanceBackupQty) + Number(volumeBackupQty)) *
    backupPricingPerGbHour;
  const familyTypeHourly = (() => {
    if (!selectedType) return 0;
    if (selectedFamily === "floatingip") return floatingIpPricePerHour;
    if (selectedFamily === "gateway") {
      if (selectedType === "gateway-s") return gatewayPricingPerHour.s;
      if (selectedType === "gateway-m") return gatewayPricingPerHour.m;
      if (selectedType === "gateway-l") return gatewayPricingPerHour.l;
      if (selectedType === "gateway-xl") return gatewayPricingPerHour.xl;
      if (selectedType === "gateway-2xl") return gatewayPricingPerHour.xxl;
    }
    if (selectedFamily === "loadbalancer" || selectedFamily === "octavia-loadbalancer") {
      if (selectedType === "load-balancer-s") return loadBalancerPricingPerHour.s;
      if (selectedType === "load-balancer-m") return loadBalancerPricingPerHour.m;
      if (selectedType === "load-balancer-l") return loadBalancerPricingPerHour.l;
      if (selectedType === "load-balancer-xl") return loadBalancerPricingPerHour.xl;
    }
    return 0;
  })();

  const estimateCost = () => {
    const storageCost = blockStorageHourly + fileStorageHourly;
    const ipCost = publicIpHourly;
    const objectCost = objectStorageHourly;
    const backupCost = backupHourly;
    const resilienceMult =
      resilience === "3AZ" ? 1.25 : resilience === "LZ" ? 1.1 : 1.0;
    const discountRate =
      savingPlanDuration === "payg"
        ? 0
        : Math.min(Math.max(Number(savingPlanDiscount) || 0, 0), 54);
    const savingMult = 1 - discountRate / 100;
    const sovereigntyMult =
      dataSovereignty === "EU"
        ? 1.0
        : dataSovereignty === "FR"
        ? 1.05
        : dataSovereignty === "DE"
        ? 1.07
        : 1.1;
    const totalBeforeSavings =
      (basePlanHourly +
        gpuHourly +
        storageCost +
        ipCost +
        objectCost +
        backupCost +
        familyTypeHourly) *
      resilienceMult *
      sovereigntyMult;
    const total =
      (basePlanHourly +
        gpuHourly +
        storageCost +
        ipCost +
        objectCost +
        backupCost +
        familyTypeHourly) *
      resilienceMult *
      savingMult *
      sovereigntyMult;
    const savingsAmount = totalBeforeSavings - total;
    setEstimatedCost(parseFloat(total.toFixed(3)));
    setEstimatedSavings(parseFloat(savingsAmount.toFixed(3)));
  };

  return (
    <div className={styles.container}>
      <header className={styles.topBar}>
        <div className={styles.topBarLeft}>
          <div className={styles.logoBubble}>☁️</div>
          <div>
            <div className={styles.appTitle}>Cloud Cost Indicator</div>
            <div className={styles.appSubtitle}>
              Estimez vos coûts d’infrastructure cloud
            </div>
          </div>
        </div>
      </header>

      <div className={styles.layout}>
        <div className={styles.main}>
          <section className={styles.helpCard}>
            <div>
              <h2 className={styles.helpTitle}>
                OVHcloud — créez votre infrastructure de A à Z
              </h2>
              <p className={styles.helpSubtitle}>
                Nous vous aidons à dimensionner une infrastructure claire et
                souveraine, avec les références du catalogue OVHcloud.
              </p>
            </div>
            <button className={styles.helpButton}>
              Aide à la configuration
            </button>
          </section>

          <section className={styles.card}>
            <div className={styles.cardHeaderRow}>
              <h2 className={styles.cardTitle}>Configuration 1</h2>
            </div>
            <div className={styles.configSplit}>
              <div className={styles.configColumn}>
                <div className={styles.subcard}>
                  <h3 className={styles.sectionTitle}>Localisation & Résilience</h3>
                  <div className={styles.formGrid}>
                    <div className={styles.field}>
                      <label className={styles.label}>Localisation</label>
                      <select
                        className={styles.input}
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      >
                        <option value="">Sélectionner</option>
                        <option value="france">France</option>
                        <option value="germany">Allemagne</option>
                        <option value="australia">Australie</option>
                        <option value="austria">Autriche</option>
                        <option value="belgium">Belgique</option>
                        <option value="bulgaria">Bulgarie</option>
                        <option value="canada">Canada</option>
                        <option value="czechia">République tchèque</option>
                        <option value="denmark">Danemark</option>
                        <option value="spain">Espagne</option>
                        <option value="finland">Finlande</option>
                        <option value="ireland">Irlande</option>
                        <option value="india">Inde</option>
                        <option value="italy">Italie</option>
                        <option value="luxembourg">Luxembourg</option>
                        <option value="morocco">Maroc</option>
                        <option value="netherlands">Pays‑Bas</option>
                        <option value="norway">Norvège</option>
                        <option value="poland">Pologne</option>
                        <option value="portugal">Portugal</option>
                        <option value="romania">Roumanie</option>
                        <option value="uk">Royaume‑Uni</option>
                        <option value="sweden">Suède</option>
                        <option value="switzerland">Suisse</option>
                        <option value="singapore">Singapour</option>
                        <option value="us">États‑Unis</option>
                      </select>
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>Région</label>
                      <select
                        className={styles.input}
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                      >
                        <option value="">Sélectionner</option>
                        {regionOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>Souveraineté</label>
                      <select
                        className={styles.input}
                        value={dataSovereignty}
                        onChange={(e) => setDataSovereignty(e.target.value)}
                      >
                        <option value="EU">UE (RGPD)</option>
                        <option value="FR">France uniquement</option>
                        <option value="DE">Allemagne</option>
                        <option value="CH">Suisse</option>
                      </select>
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>Résilience</label>
                      <select
                        className={styles.input}
                        value={resilience}
                        onChange={(e) => setResilience(e.target.value)}
                      >
                        {resilienceOptions.map((option) => (
                          <option
                            key={option.value}
                            value={option.value}
                            disabled={option.disabled}
                          >
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className={styles.infoRow}>
                      <span>
                        {resilience === "3AZ"
                          ? "🌐 3AZ"
                          : resilience === "LZ"
                          ? "📍 Local Zone"
                          : "📦 1AZ"}
                      </span>
                      <span>
                        {resilience === "3AZ"
                          ? "Déploiement multi‑zone pour une meilleure résilience."
                          : resilience === "LZ"
                          ? "Déploiement Local Zone au plus près des utilisateurs."
                          : "Déploiement standard dans une seule zone (99.9% SLA)."}
                      </span>
                    </div>
                    {region && !regionCapabilities.supports3az ? (
                      <div className={styles.warningRow}>
                        <span>⚠️ 3AZ</span>
                        <span>
                          3AZ n’est disponible que sur certaines régions (ex: Paris, Milan).
                        </span>
                      </div>
                    ) : null}
                  {region && !regionCapabilities.supportsLz ? (
                    <div className={styles.warningRow}>
                      <span>⚠️ Local Zone</span>
                      <span>
                        Local Zone n’est disponible que sur certaines régions (ex: Marseille, Manchester).
                      </span>
                    </div>
                  ) : null}
                  </div>
                </div>

                <div className={styles.formGrid}>
                  <div className={styles.field}>
                    <label className={styles.label}>Gamme</label>
                    <select
                      className={styles.input}
                      value={selectedFamilyGroup}
                      onChange={(e) => {
                        setSelectedFamilyGroup(e.target.value);
                        setSelectedFamily("");
                        setSelectedType("");
                      }}
                    >
                      <option value="">Toutes</option>
                      {familyGroups.map((group) => (
                        <option key={group.label} value={group.label}>
                          {group.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Ressource</label>
                    <select
                      className={styles.input}
                      value={selectedFamily}
                      onChange={(e) => {
                        setSelectedFamily(e.target.value);
                        setSelectedType("");
                      }}
                    >
                      <option value="">Sélectionner une famille</option>
                      {familyOptions.map((family) => (
                        <option key={family} value={family}>
                          {family}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className={styles.subcard}>
                  <h3 className={styles.sectionTitle}>Configuration de l’instance</h3>
                  <div className={styles.formGrid}>
                    <div className={styles.field}>
                      <label className={styles.label}>Modèle Hardware</label>
                      <select
                        className={styles.input}
                        value={hardwareModel}
                        onChange={(e) => setHardwareModel(e.target.value)}
                      >
                        <option value="">Sélectionner</option>
                        <option value="intel-xeon-gold">Intel Xeon Gold</option>
                        <option value="amd-epyc">AMD EPYC</option>
                        <option value="nvidia-gpu">NVIDIA GPU</option>
                      </select>
                    </div>
                    {selectedFamily === "instance" ? (
                      <div className={styles.field}>
                        <label className={styles.label}>Type d’instance</label>
                        <select
                          className={styles.input}
                          value={selectedType}
                          disabled={!region}
                          onChange={(e) => {
                            const type = e.target.value;
                            setSelectedType(type);
                            const details = instanceTypePricingPerHour[type];
                            if (details) {
                              setCpu(String(details.vcpu));
                              setMemory(String(details.memory));
                            }
                          }}
                        >
                          <option value="">Sélectionner un type</option>
                          {typeOptions.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                        {!region ? (
                          <span className={styles.hint}>
                            Sélectionne d’abord une région pour afficher les types.
                          </span>
                        ) : null}
                      </div>
                    ) : typeOptions.length ? (
                      <div className={styles.field}>
                        <label className={styles.label}>Type de ressource</label>
                        <select
                          className={styles.input}
                          value={selectedType}
                          disabled={!region}
                          onChange={(e) => setSelectedType(e.target.value)}
                        >
                          <option value="">Sélectionner un type</option>
                          {typeOptions.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                        {!region ? (
                          <span className={styles.hint}>
                            Sélectionne d’abord une région pour afficher les types.
                          </span>
                        ) : null}
                      </div>
                    ) : null}
                    <div className={styles.field}>
                      <label className={styles.label}>Profil OVHcloud</label>
                      <select
                        className={styles.input}
                        value={instanceProfile}
                        onChange={(e) => setInstanceProfile(e.target.value)}
                      >
                        <option value="">Sélectionner un profil</option>
                        {instanceProfileGroups.map((group) => (
                          <optgroup key={group.label} label={group.label}>
                            {group.items.map((profile) => (
                              <option key={profile} value={profile}>
                                {profile}
                              </option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                      <span className={styles.hint}>
                        Profils issus des add-ons OVHcloud.
                      </span>
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>CPU (Cores)</label>
                      <select
                        className={styles.input}
                        value={cpu}
                        onChange={(e) => setCpu(e.target.value)}
                      >
                        <option value="">Sélectionner</option>
                        {cpuOptions.map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>Mémoire (GB)</label>
                      <select
                        className={styles.input}
                        value={memory}
                        onChange={(e) => setMemory(e.target.value)}
                      >
                        <option value="">Sélectionner</option>
                        {memoryOptions.map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                      <span className={styles.hint}>
                        Valeurs GPU pré-remplies depuis le PDF.
                      </span>
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>Accélération GPU</label>
                      <label className={styles.checkboxRow}>
                        <input
                          type="checkbox"
                          checked={gpuEnabled}
                          onChange={(e) => setGpuEnabled(e.target.checked)}
                        />
                        Activer des GPU
                      </label>
                    </div>
                    {gpuEnabled ? (
                      <>
                        <div className={styles.field}>
                          <label className={styles.label}>Type d’instance GPU</label>
                          <select
                            className={styles.input}
                            value={gpuType}
                            onChange={(e) => setGpuType(e.target.value)}
                          >
                            {Object.keys(gpuPricingPerHour).map((type) => (
                              <option key={type} value={type}>
                                {type} — {gpuPricingPerHour[type].toFixed(2)} €/h
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className={styles.field}>
                          <label className={styles.label}>Quantité GPU</label>
                          <select
                            className={styles.input}
                            value={gpuQty}
                            onChange={(e) => setGpuQty(e.target.value)}
                          >
                            {backupOptions.map((value) => (
                              <option key={value} value={value}>
                                {value}
                              </option>
                            ))}
                          </select>
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>

                <div className={styles.subcard}>
                  <h3 className={styles.sectionTitle}>Optimisation des coûts</h3>
                  <div className={styles.formGrid}>
                    <div className={styles.field}>
                      <label className={styles.label}>Savings Plan</label>
                      <select
                        className={styles.input}
                        value={savingPlanDuration}
                        onChange={(e) => {
                          setSavingPlanDuration(e.target.value);
                          setSavingPlanAuto(true);
                        }}
                      >
                        <option value="payg">Pay‑as‑you‑go</option>
                        <option value="1m">Engagement 1 mois</option>
                        <option value="6m">Engagement 6 mois</option>
                        <option value="12m">Engagement 12 mois</option>
                        <option value="24m">Engagement 24 mois</option>
                        <option value="36m">Engagement 36 mois</option>
                      </select>
                      <span className={styles.hint}>
                        Mode Pay‑as‑you‑go : facturé à l’usage, aucun engagement.
                      </span>
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>Remise Savings Plan (%)</label>
                      <input
                        className={styles.input}
                        type="number"
                        min="0"
                        max="54"
                        step="1"
                        value={savingPlanDiscount}
                        onChange={(e) => {
                          setSavingPlanDiscount(e.target.value);
                          setSavingPlanAuto(false);
                        }}
                        disabled={savingPlanDuration === "payg"}
                      />
                      <span className={styles.hint}>
                        Remise auto selon la durée, ajustable si besoin (max 54%).
                      </span>
                    </div>
                    {resilience === "LZ" ? (
                      <div className={styles.warningRow}>
                        <span>⚠️ Savings Plan</span>
                        <span>Les ressources Local Zone ne sont pas éligibles aux Savings Plans.</span>
                      </div>
                    ) : null}
                    <div className={styles.field}>
                      <label className={styles.label}>Tarif IP flottante</label>
                      <div className={styles.inlineValue}>
                        {floatingIpPricePerHour} €/h
                      </div>
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>Tarif Object Storage</label>
                      <div className={styles.inlineValue}>
                        {objectStoragePricingPerGbHour[objectStorageClass] ?? 0} €/GB/h
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.configColumn}>
                <div className={styles.subcard}>
                  <h3 className={styles.sectionTitle}>Options & Stockage</h3>
                  <div className={styles.formGrid}>
                    <div className={styles.field}>
                      <label className={styles.label}>Block Storage (GB)</label>
                      <select
                        className={styles.input}
                        value={blockStorage}
                        onChange={(e) => setBlockStorage(e.target.value)}
                      >
                        {storageOptions.map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>Classe Block Storage</label>
                      <select
                        className={styles.input}
                        value={blockStorageClass}
                        onChange={(e) => setBlockStorageClass(e.target.value)}
                      >
                        <option value="classic">Classic</option>
                        <option value="highSpeed">High Speed</option>
                        <option value="highSpeedGen2">High Speed Gen2</option>
                      </select>
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>File Storage (GB)</label>
                      <select
                        className={styles.input}
                        value={fileStorage}
                        onChange={(e) => setFileStorage(e.target.value)}
                      >
                        {storageOptions.map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>Stockage S3 (GB)</label>
                      <select
                        className={styles.input}
                        value={objectStorage}
                        onChange={(e) => setObjectStorage(e.target.value)}
                      >
                        {storageOptions.map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>Classe Object Storage</label>
                      <select
                        className={styles.input}
                        value={objectStorageClass}
                        onChange={(e) => setObjectStorageClass(e.target.value)}
                      >
                        <option value="standard">Standard</option>
                        <option value="highPerformance">High Performance</option>
                        <option value="infrequentAccess">Infrequent Access</option>
                        <option value="swift">Swift</option>
                        <option value="coldArchive">Cold Archive</option>
                      </select>
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>IP Publiques</label>
                      <select
                        className={styles.input}
                        value={publicIps}
                        onChange={(e) => setPublicIps(e.target.value)}
                      >
                        {ipOptions.map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                    </div>
                    {["india", "singapore", "australia"].includes(location) ? (
                      <div className={styles.infoRow}>
                        <span>ℹ️ Trafic sortant</span>
                        <span>
                          Le trafic public sortant peut être facturé en région APAC.
                        </span>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className={styles.subcard}>
                  <h3 className={styles.sectionTitle}>Configuration Sauvegarde</h3>
                  <div className={styles.formGrid}>
                    <div className={styles.field}>
                      <label className={styles.label}>Sauvegarde automatique (GB)</label>
                      <select
                        className={styles.input}
                        value={instanceBackupQty}
                        onChange={(e) => setInstanceBackupQty(e.target.value)}
                      >
                        {backupOptions.map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>Mode de rotation</label>
                      <select
                        className={styles.input}
                        value={instanceBackupRetention}
                        onChange={(e) => setInstanceBackupRetention(e.target.value)}
                      >
                        <option value="">Sélectionner</option>
                        <option value="7">7 jours</option>
                        <option value="14">14 jours</option>
                        <option value="30">30 jours</option>
                        <option value="90">90 jours</option>
                      </select>
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>Backup distant</label>
                      <label className={styles.checkboxRow}>
                        <input
                          type="checkbox"
                          checked={remoteBackupEnabled}
                          onChange={(e) => {
                            setRemoteBackupEnabled(e.target.checked);
                            if (!e.target.checked) {
                              setRemoteBackupRegion("");
                            }
                          }}
                        />
                        Activer le backup distant
                      </label>
                    </div>
                    {remoteBackupEnabled ? (
                      <div className={styles.field}>
                        <label className={styles.label}>Région backup</label>
                        <select
                          className={styles.input}
                          value={remoteBackupRegion}
                          onChange={(e) => setRemoteBackupRegion(e.target.value)}
                        >
                          <option value="">Sélectionner</option>
                          {regionOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : null}
                    <div className={styles.field}>
                      <label className={styles.label}>Backup distant (GB)</label>
                      <select
                        className={styles.input}
                        value={volumeBackupQty}
                        onChange={(e) => setVolumeBackupQty(e.target.value)}
                      >
                        {backupOptions.map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>Tarif backup</label>
                      <div className={styles.inlineValue}>
                        {backupPricingPerGbHour} €/GB/h
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <aside className={styles.sidebar}>
          <section className={styles.card}>
            <h2 className={styles.cardTitle}>Estimation des coûts</h2>
            <div className={styles.summaryRow}>
              <span>Configuration 1</span>
              <strong>{(estimatedCost ?? 0).toFixed(2)} €</strong>
            </div>
            <div className={styles.summaryMeta}>
              <div>
                <span>Devise</span>
                <strong>{currency}</strong>
              </div>
              {selectedFamily ? (
                <div>
                  <span>Ressource</span>
                  <strong>{selectedFamily}</strong>
                </div>
              ) : null}
              {selectedType ? (
                <div>
                  <span>Type</span>
                  <strong>{selectedType}</strong>
                </div>
              ) : null}
              {typeof taxRate === "number" && (
                <div>
                  <span>TVA</span>
                  <strong>{taxRate}%</strong>
                </div>
              )}
            </div>
            {selectedInstanceDetails && (
              <div className={styles.summaryMeta}>
                <div>
                  <span>vCPU</span>
                  <strong>{selectedInstanceDetails.vcpu}</strong>
                </div>
                <div>
                  <span>RAM</span>
                  <strong>{selectedInstanceDetails.memory} GB</strong>
                </div>
                <div>
                  <span>Réseau</span>
                  <strong>{selectedInstanceDetails.network}</strong>
                </div>
                <div>
                  <span>Prix / heure</span>
                  <strong>{selectedInstanceDetails.price} €</strong>
                </div>
              </div>
            )}
            <div className={styles.summaryBox}>
              <div className={styles.summaryLabel}>TOTAL MENSUEL</div>
              <div className={styles.summaryTotal}>
                {(estimatedCost ? estimatedCost * 24 * 30 : 0).toFixed(2)} €
              </div>
              <div className={styles.summaryHint}>
                Estimation annuelle :{" "}
                {(estimatedCost ? estimatedCost * 24 * 365 : 0).toFixed(2)} €
              </div>
            </div>
            <button onClick={estimateCost} className={styles.button}>
              Estimer le coût horaire (€)
            </button>
            <div className={styles.actionRow}>
              <button className={styles.primaryButton}>
                Exporter l’estimation
              </button>
              <button className={styles.outlineButton}>
                Enregistrer la configuration
              </button>
            </div>
            {estimatedSavings !== null && (
              <div className={styles.result}>
                Économie Savings Plan : {estimatedSavings.toFixed(2)} €/h
              </div>
            )}
          </section>
          <section className={styles.card}>
            <div className={styles.compareHeader}>
              <h2 className={styles.cardTitle}>Comparaison concurrents</h2>
            </div>
            <div className={styles.compareRow}>
              <span>AWS</span>
              <a
                className={styles.compareLink}
                href="https://aws.amazon.com/ec2/pricing/"
                target="_blank"
                rel="noreferrer"
              >
                Voir les prix
              </a>
            </div>
            <div className={styles.compareRow}>
              <span>Google Cloud</span>
              <a
                className={styles.compareLink}
                href="https://cloud.google.com/compute/pricing"
                target="_blank"
                rel="noreferrer"
              >
                Voir les prix
              </a>
            </div>
            <div className={styles.compareRow}>
              <span>Microsoft Azure</span>
              <a
                className={styles.compareLink}
                href="https://azure.microsoft.com/pricing/details/virtual-machines/"
                target="_blank"
                rel="noreferrer"
              >
                Voir les prix
              </a>
            </div>
            <p className={styles.hint}>
              Liens directs vers les pages de tarification des fournisseurs.
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}
