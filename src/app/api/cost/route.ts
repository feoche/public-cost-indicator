/**
 * API de calcul de coût instance compute.
 * Lit docs/cloud.json (addons) et retourne le détail en €/heure.
 */

import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

/** 1 € = 100 cents = 100 000 000 micro-cents */
const MICRO_CENTS_PER_EURO = 100_000_000;

type PricingEntry = {
  price: number; // micro-cents
  intervalUnit: string;
  interval?: number;
};

function getCatalog() {
  const filePath = path.join(process.cwd(), 'docs', 'cloud.json');
  const raw = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(raw) as {
    plans?: Array<{ planCode: string; pricings?: Array<PricingEntry & { price: number }> }>;
    addons?: Array<{ planCode: string; pricings?: Array<PricingEntry & { price: number }> }>;
  };
}

function findPricing(catalog: ReturnType<typeof getCatalog>, planCode: string): PricingEntry | null {
  const plan = catalog.plans?.find((p: { planCode: string }) => p.planCode === planCode);
  const addon = catalog.addons?.find((p: { planCode: string }) => p.planCode === planCode);
  const entry = plan || addon;
  if (!entry?.pricings?.length) return null;
  const p = entry.pricings[0];
  return {
    price: p.price,
    intervalUnit: p.intervalUnit ?? 'none',
    interval: (p as { interval?: number }).interval,
  };
}

/** Prix horaire en € à partir d'une entrée pricing (prix en micro-cents). */
function hourlyEuro(p: PricingEntry): number {
  const euro = p.price / MICRO_CENTS_PER_EURO;
  if (p.intervalUnit === 'hour') return euro;
  if (p.intervalUnit === 'month') return euro / 730;
  return 0;
}

export type CostEstimateBody = {
  instancePlanCode: string;
  os: 'linux' | 'windows';
  cpuCount: number;
  additionalStorageGb: number;
  publicIpCount: number;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CostEstimateBody;
    const {
      instancePlanCode,
      os = 'linux',
      cpuCount = 0,
      additionalStorageGb = 0,
      publicIpCount = 0,
    } = body;

    const catalog = getCatalog();

    const breakdown: Record<string, number> = {};
    let total = 0;

    // Instance compute (addon)
    const instancePricing = findPricing(catalog, instancePlanCode);
    if (instancePricing) {
      const hourly = hourlyEuro(instancePricing);
      breakdown['Instance'] = hourly;
      total += hourly;
    }

    // Licence Windows (par vCore/heure) si OS Windows
    if (os === 'windows' && cpuCount > 0) {
      const winPricing = findPricing(catalog, 'instance.windows-vcore-license.hour.consumption');
      if (winPricing) {
        const hourly = hourlyEuro(winPricing) * cpuCount;
        breakdown['Licence Windows'] = hourly;
        total += hourly;
      }
    }

    // Stockage additionnel (volume block, €/GiB/heure)
    if (additionalStorageGb > 0) {
      const volPricing = findPricing(catalog, 'volume.classic.consumption');
      if (volPricing) {
        const perGbHour = volPricing.price / MICRO_CENTS_PER_EURO;
        const hourly = perGbHour * additionalStorageGb;
        breakdown['Stockage additionnel (block)'] = hourly;
        total += hourly;
      }
    }

    // Adresses IP publiques (1ère incluse, supplémentaires à 0 selon le catalogue actuel)
    if (publicIpCount > 0) {
      const ipPricing = findPricing(catalog, 'publicip.ip.hour.consumption');
      const ipHourly = ipPricing ? hourlyEuro(ipPricing) : 0;
      const ipCost = ipHourly * publicIpCount;
      breakdown['Adresses IP publiques'] = ipCost;
      total += ipCost;
    }

    return NextResponse.json({
      breakdown,
      total: Math.round(total * 1e6) / 1e6,
      unit: '€/heure',
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: 'Erreur lors du calcul du coût' },
      { status: 500 }
    );
  }
}
