/*
 * Utility to fetch pricing information from the OVHcloud catalog (docs/cloud.json).
 * The JSON contains prices in micro-cents. This helper converts them to euros
 * (1 € = 100 000 000 micro-cents) and returns the price with the interval unit.
 */

import cloudData from '../../docs/cloud.json';

/** 1 € = 100 cents = 100 000 000 micro-cents */
const MICRO_CENTS_PER_EURO = 100_000_000;

type PricingInfo = {
  price: number; // € per unit (hour / GB …)
  intervalUnit: string; // "hour", "month", "none", …
} | null;

/**
 * Find a pricing entry by its planCode.
 * @param planCode The exact planCode as present in cloud.json.
 * @returns {PricingInfo} containing the price in euros and the interval unit, or null if not found.
 */
export function findPricing(planCode: string): PricingInfo {
  const plan = (cloudData as any).plans?.find((p: any) => p.planCode === planCode);
  const addon = (cloudData as any).addons?.find((p: any) => p.planCode === planCode);
  const entry = plan || addon;
  if (!entry || !entry.pricings?.length) return null;
  const priceInfo = entry.pricings[0];
  const priceEuro = priceInfo.price / MICRO_CENTS_PER_EURO; // micro-cents → €
  return {
    price: priceEuro,
    intervalUnit: priceInfo.intervalUnit ?? 'none',
  };
}
