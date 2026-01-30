"use client";

import React, { useEffect, useMemo, useState } from "react";
import styles from "./page.module.css";

import type { Plan } from "./lib/cloudData";
import {
  backupPricingPerGbHour,
  blockStoragePricingPerGbHour,
  floatingIpPricePerHour,
  gatewayPricingPerHour,
  getPlanHourlyPrice,
  gpuPricingPerHour,
  loadBalancerPricingPerHour,
  objectStoragePricingPerGbHour,
} from "./lib/pricing";

interface CostIndicatorClientProps {
  plans: Plan[];
  families: string[];
  currency?: string;
  taxRate?: number;
  cataloguePrices?: Record<string, number>;
  catalogueFlavorPrices?: Record<string, number>;
}

export default function CostIndicatorClient({
  plans,
  families,
  currency = "EUR",
  taxRate,
  cataloguePrices = {},
  catalogueFlavorPrices = {},
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
  const [cpu, setCpu] = useState("");
  const [memory, setMemory] = useState("");
  const [blockStorage, setBlockStorage] = useState("0");
  const [blockStorageClass, setBlockStorageClass] = useState("classic");
  const [publicIps, setPublicIps] = useState("0");
  const [instanceBackupQty, setInstanceBackupQty] = useState("0");
  const [instanceBackupRetention, setInstanceBackupRetention] = useState("");
  const [remoteBackupEnabled, setRemoteBackupEnabled] = useState(false);
  const [remoteBackupRegion, setRemoteBackupRegion] = useState("");
  const [objectStorage, setObjectStorage] = useState("0");
  const [objectStorageClass, setObjectStorageClass] = useState("standard");
  const [fileStorage, setFileStorage] = useState("0");
  const [privateInterconnect, setPrivateInterconnect] = useState("No");
  const [location, setLocation] = useState("");
  const [region, setRegion] = useState("");
  const [resilience, setResilience] = useState("");
  const [hasSelectedResilience, setHasSelectedResilience] = useState(false);
  const [savingPlanDuration, setSavingPlanDuration] = useState("payg");
  const [savingPlanDiscount, setSavingPlanDiscount] = useState("0");
  const [gpuType, setGpuType] = useState("a10-1-gpu");
  const [gpuQty, setGpuQty] = useState("0");
  const [gpuEnabled, setGpuEnabled] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [estimatedCost, setEstimatedCost] = useState<number | null>(null);
  const [estimatedSavings, setEstimatedSavings] = useState<number | null>(null);
  const [showPresetApp, setShowPresetApp] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<
    { role: "assistant" | "user"; content: string }[]
  >([
    {
      role: "assistant",
      content:
        "Bonjour ! Je suis votre assistant pour cadrer la migration cloud d’une PME e‑commerce. Je vais poser une série de questions pour construire une recommandation.",
    },
  ]);
  const [chatStepIndex, setChatStepIndex] = useState(0);
  const [chatInstanceChoice, setChatInstanceChoice] = useState("");

  type ChatQuestion = {
    text: string;
    options?: string[];
    key?: "instanceType" | "vcpu" | "ram";
  };

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
        europe: [
          { value: "fr-sbg", label: "France (Strasbourg)" },
          { value: "fr-grv", label: "France (Gravelines)" },
          { value: "fr-par", label: "France (Paris)" },
          { value: "fr-rbx", label: "France (Roubaix)" },
          { value: "fr-mrs", label: "France (Marseille)" },
          { value: "de-fra", label: "Allemagne (Frankfurt)" },
          { value: "uk-lon", label: "Royaume‑Uni (Londres)" },
          { value: "uk-man", label: "Royaume‑Uni (Manchester)" },
          { value: "it-mil", label: "Italie (Milan)" },
          { value: "es-mad", label: "Espagne (Madrid)" },
          { value: "pt-lis", label: "Portugal (Lisbon)" },
          { value: "nl-ams", label: "Pays‑Bas (Amsterdam)" },
          { value: "be-bru", label: "Belgique (Bruxelles)" },
          { value: "ch-zrh", label: "Suisse (Zurich)" },
          { value: "se-sto", label: "Suède (Stockholm)" },
          { value: "no-osl", label: "Norvège (Oslo)" },
          { value: "fi-hel", label: "Finlande (Helsinki)" },
          { value: "dk-cph", label: "Danemark (Copenhagen)" },
          { value: "pl-waw", label: "Pologne (Varsovie)" },
          { value: "cz-prg", label: "République tchèque (Prague)" },
          { value: "ro-buc", label: "Roumanie (Bucharest)" },
          { value: "bg-sof", label: "Bulgarie (Sofia)" },
          { value: "at-vie", label: "Autriche (Vienna)" },
          { value: "ie-dub", label: "Irlande (Dublin)" },
          { value: "lu-lux", label: "Luxembourg (Luxembourg)" },
          { value: "ma-rab", label: "Maroc (Rabat)" },
        ],
        "north-america": [
          { value: "ca-bhs", label: "Canada (Beauharnois)" },
          { value: "ca-tor", label: "Canada (Toronto)" },
          { value: "us-1", label: "États‑Unis (US)" },
        ],
        "asia-pacific": [
          { value: "au-syd", label: "Australie (Sydney)" },
          { value: "in-bom", label: "Inde (Mumbai)" },
          { value: "sg-sin", label: "Singapour (Singapour)" },
        ],
      };

    const fallback = Object.values(optionsByLocation).flat();
    return optionsByLocation[location] ?? fallback;
  }, [location]);


  const planHourlyPriceByCode = useMemo(() => {
    const map: Record<string, number> = {};
    plans.forEach((plan) => {
      const price = getPlanHourlyPrice(plan);
      if (typeof price === "number") {
        map[plan.planCode] = price;
      }
    });

    Object.entries(cataloguePrices).forEach(([code, price]) => {
      map[code] = price;
    });

    return map;
  }, [plans, cataloguePrices]);

  const getPriceFromCodes = (
    codes: string[],
    fallback: number
  ): number => {
    for (const code of codes) {
      const price = planHourlyPriceByCode[code];
      if (typeof price === "number") {
        return price;
      }
    }
    return fallback;
  };

  const instanceTypePricingPerHour = useMemo(() => {
    const map: Record<
      string,
      { vcpu: number; memory: number; price: number; network: string }
    > = {};

    plans.forEach((plan) => {
      if (plan.product !== "publiccloud-instance") return;
      if (!plan.planCode.includes("consumption")) return;
      if (plan.planCode.includes("monthly")) return;

      const technical = plan.blobs?.technical;
      const name = technical?.name || plan.invoiceName;
      if (!name) return;

      const vcpu = technical?.cpu?.cores;
      const memory = technical?.memory?.size;
      const bandwidth = technical?.bandwidth?.level;
      const fallbackPrice = planHourlyPriceByCode[plan.planCode];
      const overridePrice =
        catalogueFlavorPrices[name] ??
        catalogueFlavorPrices[name.toLowerCase()];
      const price =
        typeof overridePrice === "number" ? overridePrice : fallbackPrice;

      if (!vcpu || !memory || typeof price !== "number") return;

      const network = bandwidth
        ? `${bandwidth} Mbit/s`
        : "N/A";

      const current = map[name];
      if (!current || price < current.price) {
        map[name] = { vcpu, memory, price, network };
      }
    });

    return map;
  }, [plans, planHourlyPriceByCode, catalogueFlavorPrices]);

  const instanceTypeOptions = useMemo(
    () =>
      Object.keys(instanceTypePricingPerHour).sort((a, b) =>
        a.localeCompare(b)
      ),
    [instanceTypePricingPerHour]
  );

  const mergedInstanceTypes = useMemo(() => {
    const unique = new Map<string, string>();
    const add = (name: string) => {
      const key = name.toLowerCase();
      if (!unique.has(key)) {
        unique.set(key, name);
      }
    };
    instanceTypeOptions.forEach(add);
    Object.keys(catalogueFlavorPrices ?? {}).forEach(add);
    return Array.from(unique.values()).sort((a, b) => a.localeCompare(b));
  }, [instanceTypeOptions, catalogueFlavorPrices]);

  const groupedInstanceTypes = useMemo(() => {
    const groups: Record<string, string[]> = {};
    mergedInstanceTypes.forEach((name) => {
      const prefix = name.split("-")[0] || "Autres";
      const key = prefix.toUpperCase();
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(name);
    });
    return Object.entries(groups)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([label, items]) => [label, items.sort()] as const);
  }, [mergedInstanceTypes]);

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
    const defaults: Record<string, number> = {
      payg: 0,
      "1m": 10,
      "6m": 15,
      "12m": 25,
      "24m": 35,
      "36m": 45,
    };
    setSavingPlanDiscount(String(defaults[savingPlanDuration] ?? 0));
  }, [savingPlanDuration]);

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
  const blockStorageUnit = getPriceFromCodes(
    blockStorageClass === "highSpeed"
      ? ["volume.high-speed.consumption"]
      : blockStorageClass === "highSpeedGen2"
      ? ["volume.high-speed-gen2.consumption"]
      : ["volume.classic.consumption"],
    blockStoragePricingPerGbHour[blockStorageClass] ?? 0
  );
  const blockStorageHourly = Number(blockStorage) * blockStorageUnit;
  const floatingIpHourlyPrice =
    planHourlyPriceByCode["floatingip.floatingip.hour.consumption"] ??
    floatingIpPricePerHour;
  const publicIpHourly = Number(publicIps) * floatingIpHourlyPrice;
  const objectStorageUnit = getPriceFromCodes(
    objectStorageClass === "highPerformance"
      ? ["storage-high-perf.consumption"]
      : objectStorageClass === "infrequentAccess"
      ? ["storage-standard-ia.consumption"]
      : objectStorageClass === "coldArchive"
      ? ["storage-deep-archive.consumption"]
      : ["storage-standard.consumption"],
    objectStoragePricingPerGbHour[objectStorageClass] ?? 0
  );
  const objectStorageHourly = Number(objectStorage) * objectStorageUnit;
  const fileStorageUnit = getPriceFromCodes(
    ["file-storage.standard.hour.consumption"],
    0
  );
  const fileStorageHourly = Number(fileStorage) * fileStorageUnit;
  const backupUnit = getPriceFromCodes(
    ["volume-backup.storage.hour.consumption"],
    backupPricingPerGbHour
  );
  const backupHourly = Number(instanceBackupQty) * backupUnit;
  const familyTypeHourly = (() => {
    if (!selectedType) return 0;
    if (selectedFamily === "floatingip") return floatingIpHourlyPrice;
    if (selectedFamily === "gateway") {
      if (selectedType === "gateway-s") {
        return (
          planHourlyPriceByCode["gateway.s.hour.consumption"] ??
          gatewayPricingPerHour.s
        );
      }
      if (selectedType === "gateway-m") {
        return (
          planHourlyPriceByCode["gateway.m.hour.consumption"] ??
          gatewayPricingPerHour.m
        );
      }
      if (selectedType === "gateway-l") {
        return (
          planHourlyPriceByCode["gateway.l.hour.consumption"] ??
          gatewayPricingPerHour.l
        );
      }
      if (selectedType === "gateway-xl") {
        return (
          planHourlyPriceByCode["gateway.xl.hour.consumption"] ??
          gatewayPricingPerHour.xl
        );
      }
      if (selectedType === "gateway-2xl") {
        return (
          planHourlyPriceByCode["gateway.2xl.hour.consumption"] ??
          gatewayPricingPerHour.xxl
        );
      }
    }
    if (selectedFamily === "loadbalancer" || selectedFamily === "octavia-loadbalancer") {
      if (selectedType === "load-balancer-s") {
        return (
          planHourlyPriceByCode["octavia-loadbalancer.loadbalancer-s.hour.consumption"] ??
          loadBalancerPricingPerHour.s
        );
      }
      if (selectedType === "load-balancer-m") {
        return (
          planHourlyPriceByCode["octavia-loadbalancer.loadbalancer-m.hour.consumption"] ??
          loadBalancerPricingPerHour.m
        );
      }
      if (selectedType === "load-balancer-l") {
        return (
          planHourlyPriceByCode["octavia-loadbalancer.loadbalancer-l.hour.consumption"] ??
          loadBalancerPricingPerHour.l
        );
      }
      if (selectedType === "load-balancer-xl") {
        return (
          planHourlyPriceByCode["octavia-loadbalancer.loadbalancer-xl.hour.consumption"] ??
          loadBalancerPricingPerHour.xl
        );
      }
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
    const totalBeforeSavings =
      (basePlanHourly +
        gpuHourly +
        storageCost +
        ipCost +
        objectCost +
        backupCost +
        familyTypeHourly) *
      resilienceMult;
    const total =
      (basePlanHourly +
        gpuHourly +
        storageCost +
        ipCost +
        objectCost +
        backupCost +
        familyTypeHourly) *
      resilienceMult *
      savingMult;
    const savingsAmount = totalBeforeSavings - total;
    setEstimatedCost(parseFloat(total.toFixed(3)));
    setEstimatedSavings(parseFloat(savingsAmount.toFixed(3)));
  };

  const applyEcommercePreset = () => {
    setLocation("europe");
    setRegion("fr-par");
    setResilience("3AZ");
    setHasSelectedResilience(true);
    setSelectedFamilyGroup("Compute");
    setSelectedFamily("instance");
    setSelectedType("");
    setHardwareModel("amd-epyc");
    setCpu("8");
    setMemory("32");
    setBlockStorage("200");
    setBlockStorageClass("classic");
    setPublicIps("1");
    setObjectStorage("500");
    setObjectStorageClass("standard");
    setFileStorage("0");
    setInstanceBackupQty("2");
    setInstanceBackupRetention("30");
    setRemoteBackupEnabled(true);
    setRemoteBackupRegion("fr-grv");
    setSavingPlanDuration("payg");
  };

  const chatQuestions = useMemo<ChatQuestion[]>(
    () => [
      {
        text: "Quel est l’objectif principal : migration complète ou progressive ?",
        options: ["Migration complète", "Migration progressive"],
      },
      {
        text: "Quel est le type d’organisation ?",
        options: ["Startup", "PME", "ETI"],
      },
      {
        text: "Quelle est votre infrastructure actuelle ?",
        options: ["On‑premise", "Cloud", "Mixte"],
      },
      {
        text: "Quel type de charge souhaitez‑vous migrer ?",
        options: ["Site web", "API backend", "Batch", "Mixte"],
      },
      {
        text: "Choisissez un type d’instance (ex: b3‑8).",
        key: "instanceType",
      },
      {
        text: "Sélectionnez le nombre de vCPU.",
        options: cpuOptions,
        key: "vcpu",
      },
      {
        text: "Sélectionnez la RAM (GB).",
        options: memoryOptions,
        key: "ram",
      },
      {
        text: "Niveau de disponibilité requis ?",
        options: ["99,9 %", "99,99 %"],
      },
      {
        text: "Pics de charge prévisibles ?",
        options: ["Oui (soldes, événements)", "Non", "Je ne sais pas"],
      },
      {
        text: "Souhaitez‑vous de l’auto‑scaling ?",
        options: ["Oui, trafic", "Oui, CPU", "Non"],
      },
      {
        text: "Exposition publique ?",
        options: ["Front public", "Back privé", "Mixte"],
      },
      {
        text: "Load balancer nécessaire ?",
        options: ["Oui (HA)", "Oui (trafic)", "Non"],
      },
      {
        text: "Bande passante estimée ?",
        options: ["Faible", "Modérée", "Élevée"],
      },
      {
        text: "Base de données : type ?",
        options: ["MySQL", "PostgreSQL", "Autre"],
      },
      {
        text: "Taille/charge de la base ?",
        options: ["Faible", "Modérée", "Élevée"],
      },
      {
        text: "Disponibilité base ?",
        options: ["Réplication", "Failover", "Standard"],
      },
      {
        text: "Stockage principal ?",
        options: ["Objet", "Bloc", "Fichier", "Mixte"],
      },
      {
        text: "Volume de données estimé ?",
        options: ["< 1 To", "1‑10 To", "> 10 To"],
      },
      {
        text: "Sauvegardes ?",
        options: ["Automatiques", "Rétention", "Multi‑région", "Aucune"],
      },
      {
        text: "Sécurité réseau ?",
        options: ["Firewall", "VPN", "vRack", "Standard"],
      },
      {
        text: "Conformité ?",
        options: ["RGPD", "ISO", "PCI‑DSS", "Aucune"],
      },
      {
        text: "Localisation des données ?",
        options: ["France", "Europe", "Multi‑région"],
      },
      {
        text: "Budget mensuel estimé ?",
        options: ["< 500 €", "500‑1500 €", "> 1500 €", "Je ne sais pas"],
      },
      {
        text: "Modèle de facturation préféré ?",
        options: ["Pay‑as‑you‑go", "Engagement"],
      },
      {
        text: "Prévisibilité des coûts ?",
        options: ["Fixe", "Flexible"],
      },
      {
        text: "Environnement ?",
        options: ["Prod", "Dev/Test", "Mixte"],
      },
      {
        text: "Support nécessaire ?",
        options: ["Standard", "Prioritaire", "Aucun"],
      },
      {
        text: "Délai de déploiement ?",
        options: ["Immédiat", "Semaines", "Mois"],
      },
      {
        text: "Contraintes ou informations complémentaires ?",
      },
    ],
    [cpuOptions, memoryOptions]
  );

  const proceedChat = (answer: string) => {
    const currentQuestion = chatQuestions[chatStepIndex];
    if (currentQuestion?.key === "instanceType") {
      setSelectedFamilyGroup("Compute");
      setSelectedFamily("instance");
      setSelectedType(answer);
      const details = instanceTypePricingPerHour[answer];
      if (details) {
        setCpu(String(details.vcpu));
        setMemory(String(details.memory));
      }
    }
    if (currentQuestion?.key === "vcpu") {
      setCpu(answer);
    }
    if (currentQuestion?.key === "ram") {
      setMemory(answer);
    }
    const nextMessages = [
      ...chatMessages,
      { role: "user", content: answer },
    ];
    const nextIndex = chatStepIndex + 1;
    if (nextIndex < chatQuestions.length) {
      nextMessages.push({
        role: "assistant",
        content: chatQuestions[nextIndex].text,
      });
    } else {
      nextMessages.push({
        role: "assistant",
        content:
          "Merci ! J’ai toutes les informations. Vous pouvez appliquer le preset ou ajuster la configuration manuellement.",
      });
    }
    setChatMessages(nextMessages);
    setChatStepIndex(nextIndex);
    setChatInput("");
  };

  const handleChatSend = () => {
    const trimmed = chatInput.trim();
    if (!trimmed) return;
    proceedChat(trimmed);
  };

  const startChat = () => {
    setChatMessages((current) => {
      if (current.length > 1) return current;
      return [
        ...current,
        {
          role: "assistant",
          content: chatQuestions[0].text,
        },
      ];
    });
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
            <button
              className={styles.helpButton}
              onClick={() => {
                setShowPresetApp(true);
                startChat();
              }}
            >
              Aide à la configuration
            </button>
          </section>

          <section className={styles.card}>
            <div className={styles.cardHeaderRow}>
              <h2 className={styles.cardTitle}>Configuration 1</h2>
            </div>
            <p className={styles.cardMeta}>
              Lancez l’app de cadrage pour une PME e‑commerce et appliquez un
              preset de configuration en un clic.
            </p>
            <div className={styles.configSplit}>
              <div className={styles.configColumn}>
                <div className={styles.subcard}>
                  <h3 className={styles.sectionTitle}>Localisation & Résilience</h3>
                  <div className={styles.formGrid}>
                    <div className={styles.formRow}>
                      <div className={styles.field}>
                        <label className={styles.label}>Localisation</label>
                        <select
                          className={styles.input}
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                        >
                          <option value="">Sélectionner</option>
                          <option value="europe">Europe</option>
                          <option value="north-america">Amérique du Nord</option>
                          <option value="asia-pacific">Asie‑Pacifique</option>
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
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>Résilience</label>
                      <select
                        className={styles.input}
                        value={resilience}
                        onChange={(e) => {
                          setResilience(e.target.value);
                          setHasSelectedResilience(true);
                        }}
                      >
                        <option value="">Sélectionner</option>
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
                    {hasSelectedResilience && resilience ? (
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
                    ) : null}
                    {hasSelectedResilience && region && !regionCapabilities.supports3az ? (
                      <div className={styles.warningRow}>
                        <span>⚠️ 3AZ</span>
                        <span>
                          3AZ n’est disponible que sur certaines régions (ex: Paris, Milan).
                        </span>
                      </div>
                    ) : null}
                  {hasSelectedResilience && region && !regionCapabilities.supportsLz ? (
                    <div className={styles.warningRow}>
                      <span>⚠️ Local Zone</span>
                      <span>
                        Local Zone n’est disponible que sur certaines régions (ex: Marseille, Manchester).
                      </span>
                    </div>
                  ) : null}
                  </div>
                </div>

                <div className={styles.subcard}>
                  <h3 className={styles.sectionTitle}>Configuration de l’instance</h3>
                  <div className={styles.formGrid}>
                    <div className={styles.formRow}>
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
                      <label className={styles.label}>Remise Savings Plan</label>
                      <div className={styles.inlineValue}>
                        {savingPlanDiscount}% (auto)
                      </div>
                    </div>
                    {hasSelectedResilience && resilience === "LZ" ? (
                      <div className={styles.warningRow}>
                        <span>⚠️ Savings Plan</span>
                        <span>Les ressources Local Zone ne sont pas éligibles aux Savings Plans.</span>
                      </div>
                    ) : null}
                    <div className={styles.field}>
                      <label className={styles.label}>Tarif IP flottante</label>
                      <div className={styles.inlineValue}>
                        {floatingIpHourlyPrice} €/h
                      </div>
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>Tarif Object Storage</label>
                      <div className={styles.inlineValue}>
                        {objectStorageUnit} €/GB/h
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
                      <span className={styles.hint}>
                        {blockStorageUnit} €/GB/h (cloud.json)
                      </span>
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
                      <span className={styles.hint}>
                        {fileStorageUnit} €/GB/h (cloud.json)
                      </span>
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
                      <span className={styles.hint}>
                        {objectStorageUnit} €/GB/h (cloud.json)
                      </span>
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
                    {location === "asia-pacific" ? (
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
                      <label className={styles.label}>Tarif backup</label>
                      <div className={styles.inlineValue}>
                        {backupUnit} €/GB/h
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
              <strong>
                {(estimatedCost ? estimatedCost * 1.18 : 0).toFixed(2)} € / h
              </strong>
            </div>
            <div className={styles.compareRow}>
              <span>Google Cloud</span>
              <strong>
                {(estimatedCost ? estimatedCost * 1.12 : 0).toFixed(2)} € / h
              </strong>
            </div>
            <div className={styles.compareRow}>
              <span>Microsoft Azure</span>
              <strong>
                {(estimatedCost ? estimatedCost * 1.15 : 0).toFixed(2)} € / h
              </strong>
            </div>
            <p className={styles.hint}>
              Comparaison indicative basée sur le coût OVHcloud.
            </p>
          </section>
        </aside>
      </div>
      {showPresetApp ? (
        <div
          className={styles.modalBackdrop}
          onClick={() => setShowPresetApp(false)}
        >
          <div
            className={styles.modal}
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <div>
                <div className={styles.modalTitle}>Preset IA — PME e‑commerce</div>
                <div className={styles.modalSubtitle}>
                  Chatbot de cadrage pour une migration on‑premise vers le cloud
                  public.
                </div>
              </div>
              <button
                className={styles.modalClose}
                onClick={() => setShowPresetApp(false)}
                aria-label="Fermer"
              >
                ✕
              </button>
            </div>
            <div className={styles.modalContent}>
              <section className={styles.modalCard}>
                <h3 className={styles.sectionTitle}>Conversation</h3>
                <div className={styles.chatWindow}>
                  {chatMessages.map((message, index) => (
                    <div
                      key={`${message.role}-${index}`}
                      className={
                        message.role === "assistant"
                          ? styles.chatBubble
                          : styles.chatBubbleUser
                      }
                    >
                      {message.content}
                    </div>
                  ))}
                </div>
                {chatQuestions[chatStepIndex]?.key === "instanceType" ? (
                  <div className={styles.chatSelectRow}>
                    <select
                      className={styles.chatSelect}
                      value={chatInstanceChoice}
                      onChange={(event) => setChatInstanceChoice(event.target.value)}
                    >
                      <option value="">Sélectionner un type</option>
                      {groupedInstanceTypes.map(([label, items]) => (
                        <optgroup key={label} label={label}>
                          {items.map((item) => (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                    <button
                      className={styles.secondaryButton}
                      onClick={() => {
                        if (chatInstanceChoice) {
                          proceedChat(chatInstanceChoice);
                        }
                      }}
                    >
                      Valider
                    </button>
                  </div>
                ) : chatQuestions[chatStepIndex]?.options?.length ? (
                  <div className={styles.chatChoices}>
                    {chatQuestions[chatStepIndex].options?.map((option) => (
                      <button
                        key={option}
                        className={styles.chatChoice}
                        onClick={() => proceedChat(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                ) : null}
                <div className={styles.chatInputRow}>
                  <input
                    className={styles.chatInput}
                    placeholder="Répondre à la question..."
                    value={chatInput}
                    onChange={(event) => setChatInput(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        handleChatSend();
                      }
                    }}
                  />
                  <button
                    className={styles.secondaryButton}
                    onClick={handleChatSend}
                  >
                    Envoyer
                  </button>
                </div>
                <div className={styles.chatHint}>
                  Question {Math.min(chatStepIndex + 1, chatQuestions.length)} /{" "}
                  {chatQuestions.length}
                </div>
              </section>
              <section className={styles.modalCard}>
                <h3 className={styles.sectionTitle}>Preset recommandé</h3>
                <div className={styles.presetGrid}>
                  <div>
                    <span>Localisation</span>
                    <strong>France / Europe</strong>
                  </div>
                  <div>
                    <span>Résilience</span>
                    <strong>3AZ si disponible</strong>
                  </div>
                  <div>
                    <span>Réseau</span>
                    <strong>LB + IP publiques</strong>
                  </div>
                  <div>
                    <span>Stockage</span>
                    <strong>Object + Block</strong>
                  </div>
                  <div>
                    <span>Sauvegardes</span>
                    <strong>Automatiques + distant</strong>
                  </div>
                  <div>
                    <span>Coûts</span>
                    <strong>Pay‑as‑you‑go</strong>
                  </div>
                </div>
              </section>
            </div>
            <div className={styles.modalFooter}>
              <button
                className={styles.outlineButton}
                onClick={() => setShowPresetApp(false)}
              >
                Fermer
              </button>
              <button
                className={styles.primaryButton}
                onClick={() => {
                  applyEcommercePreset();
                  setShowPresetApp(false);
                }}
              >
                Appliquer le preset
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
