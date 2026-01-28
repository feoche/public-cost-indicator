/*
 * Cost calculation based on user input and pricing data from cloud.json.
 * All prices are stored in the JSON as micro-cents; they are converted to euros
 * (1 € = 100 000 000 micro-cents). Returns a per-product breakdown (€/hour) and the total.
 */

type FormState = {
  cpu: number; // number of vCPU cores
  ram: number; // GB of RAM
  os: string; // OS selection (currently not used for pricing lookup)
  blockGB: number; // additional block storage in GB
  publicIpCount: number;
  instanceBackupQty: number;
  instanceBackupRetention: number; // days
  volumeBackupQty: number;
  volumeBackupRetention: number; // days
  s3GB: number; // object storage GB
  privateNet: boolean;
};

type Breakdown = {
  compute: number;
  blockStorage: number;
  publicIP: number;
  instanceBackup: number;
  volumeBackup: number;
  objectStorage: number;
  privateNetwork: number;
};

import { findPricing } from './getPricing';

/** 1 € = 100 000 000 micro-cents */
const MICRO_CENTS_PER_EURO = 100_000_000;
const microCentsToEuro = (microCents: number) => microCents / MICRO_CENTS_PER_EURO;

/**
 * Helper to get an hourly price from a plan.
 * If the plan is monthly, we convert to hourly by dividing by 730 (average hours per month).
 */
function getHourlyPrice(planCode: string): number {
  const info = findPricing(planCode);
  if (!info) return 0;
  const priceEuro = microCentsToEuro(info.price);
  if (info.intervalUnit === 'hour') return priceEuro;
  if (info.intervalUnit === 'month') return priceEuro / 730; // rough conversion
  // "none" or other units are treated as a one‑time cost – we ignore for hourly estimate.
  return 0;
}

/**
 * Main calculation function.
 */
export function calculateCost(state: FormState): { breakdown: Breakdown; total: number } {
  // ----- Compute (CPU + RAM) -----
  // For simplicity we use a generic compute plan. In a real app you would map (cpu,ram,os) to a concrete planCode.
  const computeHourly = getHourlyPrice('t2-180.monthly.postpaid'); // placeholder plan code
  const computeCost = computeHourly * state.cpu * state.ram; // naive multiplication

  // ----- Block storage -----
  const blockHourly = getHourlyPrice('block-storage-standard');
  const blockCost = blockHourly * state.blockGB;

  // ----- Public IP (publicip.ip.hour.consumption) -----
  const ipHourly = getHourlyPrice('publicip.ip.hour.consumption');
  const ipCost = ipHourly * state.publicIpCount;

  // ----- Instance backups -----
  const instBackupHourly = getHourlyPrice('instance-backup');
  const dayFactor = 1 / 24; // convert daily retention to hourly pricing
  const instBackupCost =
    instBackupHourly * state.instanceBackupQty * state.instanceBackupRetention * dayFactor;

  // ----- Volume backups -----
  const volBackupHourly = getHourlyPrice('volume-backup');
  const volBackupCost =
    volBackupHourly * state.volumeBackupQty * state.volumeBackupRetention * dayFactor;

  // ----- Object storage (S3) -----
  const s3Hourly = getHourlyPrice('file-storage.standard.hour.consumption');
  const s3Cost = s3Hourly * state.s3GB;

  // ----- Private interconnection -----
  const privateHourly = getHourlyPrice('private-network');
  const privateCost = state.privateNet ? privateHourly : 0;

  const breakdown: Breakdown = {
    compute: computeCost,
    blockStorage: blockCost,
    publicIP: ipCost,
    instanceBackup: instBackupCost,
    volumeBackup: volBackupCost,
    objectStorage: s3Cost,
    privateNetwork: privateCost,
  };

  const total = Object.values(breakdown).reduce((a, b) => a + b, 0);

  return { breakdown, total };
}
