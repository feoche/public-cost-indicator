// src/app/cost-indicator/lib/cloudData.ts
// ------------------------------------------------------------
// Chargement et typage du catalogue OVHcloud présent dans docs/cloud.json
// ------------------------------------------------------------

// Le projet utilise TypeScript et le tsconfig.json autorise l'import de JSON.
// Si ce n'est pas le cas, vous pouvez remplacer l'import par une lecture dynamique
// avec `fs.readFileSync`.

// ------------------------------------------------------------------
// Types dérivés du format de cloud.json
// ------------------------------------------------------------------
export interface Quantity {
  min: number;
  max: number | null;
}

export interface Repeat {
  min: number;
  max: number | null;
}

export interface Pricing {
  phase: number;
  capacities: string[];
  commitment: number;
  description: string;
  interval: number;
  intervalUnit: string;
  quantity: Quantity;
  repeat: Repeat;
  price: number; // price expressed in centimes (ex. 1000000 = 0.01 €)
  formattedPrice: string;
  tax: number;
  mode: string;
  strategy: string;
  mustBeCompleted: boolean;
  type: string;
  promotions: any[];
  engagementConfiguration: any | null;
}

export interface Configuration {
  name: string;
  isCustom: boolean;
  isMandatory: boolean;
  values: string[];
}

export interface AddonFamily {
  name: string;
  exclusive: boolean;
  mandatory: boolean;
  addons: string[];
  default: any;
}

export interface Plan {
  planCode: string;
  invoiceName: string;
  addonFamilies: AddonFamily[];
  product: string;
  pricingType: string;
  consumptionConfiguration: any | null;
  pricings: Pricing[];
  configurations: Configuration[];
  family: string | null;
  blobs: any | null;
}

export interface CloudCatalog {
  catalogId: number;
  locale: {
    currencyCode: string;
    subsidiary: string;
    taxRate: number;
  };
  plans: Plan[];
}

// ------------------------------------------------------------------
// Chargement du fichier JSON
// ------------------------------------------------------------------
// Grâce à la prise en charge des imports JSON, le contenu est disponible à la compilation.
// Si vous utilisez `esModuleInterop` ou `resolveJsonModule` dans tsconfig.json, l'import suivant fonctionne.
import * as fs from "fs";
import * as path from "path";

// Resolve the JSON file relative to the project root (four levels up from this file)
const rawData = fs.readFileSync(path.resolve(process.cwd(), "docs/cloud.json"), "utf8");
const rawCatalog = JSON.parse(rawData);

// Typescript considère le type comme any ; nous le castons vers notre interface.
const catalog: CloudCatalog = rawCatalog as unknown as CloudCatalog;

/**
 * Retourne la liste des plans disponibles dans le catalogue.
 */
export function getPlans(): Plan[] {
  return catalog.plans ?? [];
}

/**
 * Retourne les familles d'addons (catégories) présentes dans le catalogue.
 * Utilisé pour alimenter le filtre de catégorie du UI.
 */
export function getAddonFamilies(): string[] {
  const families = new Set<string>();
  catalog.plans.forEach((plan) => {
    plan.addonFamilies?.forEach((family) => families.add(family.name));
  });
  return Array.from(families).sort();
}

/**
 * Recherche un plan par son `planCode`.
 * Retourne `undefined` si aucun plan ne correspond.
 */
export function findPlanByCode(planCode: string): Plan | undefined {
  return catalog.plans.find((p) => p.planCode === planCode);
}

export function getCatalogLocale(): CloudCatalog["locale"] {
  return catalog.locale;
}

export default catalog;
