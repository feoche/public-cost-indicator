import type { Plan, Pricing } from "./cloudData";

const PRICE_DIVISOR = 100_000_000;

export function planPriceToEur(price?: number): number {
  if (!price) {
    return 0;
  }

  return price / PRICE_DIVISOR;
}

export function getPrimaryPricing(plan?: Plan): Pricing | undefined {
  return plan?.pricings?.[0];
}

export function getPlanHourlyPrice(plan?: Plan): number | null {
  const pricing = getPrimaryPricing(plan);
  if (!pricing) {
    return null;
  }

  const base = planPriceToEur(pricing.price);
  const unit = pricing.intervalUnit?.toLowerCase();

  if (!unit || unit === "none") {
    if (pricing.description?.toLowerCase().includes("hour")) {
      return base;
    }
    return base;
  }

  if (unit === "hour") return base;
  if (unit === "day") return base / 24;
  if (unit === "week") return base / (7 * 24);
  if (unit === "month") return base / (30 * 24);
  if (unit === "year") return base / (365 * 24);

  return base;
}

export const gpuPricingPerHour: Record<string, number> = {
  "a10-1-gpu": 0.9,
  "a100-1-gpu": 3.0,
  "ai1-1-gpu": 1.93,
  "ai1-le-1-gpu": 0.9,
  "h100-1-gpu": 3.1,
  "l4-1-gpu": 0.83,
  "l40s-1-gpu": 1.55,
  "ai1-1-cpu": 0.03,
};

export const blockStoragePricingPerGbHour: Record<string, number> = {
  classic: 0.000059,
  highSpeed: 0.000131,
  highSpeedGen2: 0.000131,
};

export const objectStoragePricingPerGbHour: Record<string, number> = {
  standard: 0.0000275,
  highPerformance: 0.000025,
  infrequentAccess: 0.00000548,
  swift: 0.000015,
  coldArchive: 0.00000228,
};

export const backupPricingPerGbHour = 0.000028;
export const floatingIpPricePerHour = 0.0025;

export const loadBalancerPricingPerHour: Record<string, number> = {
  s: 0.0083,
  m: 0.0208,
  l: 0.0556,
  xl: 0.2083,
};

export const gatewayPricingPerHour: Record<string, number> = {
  s: 0.0028,
  m: 0.0111,
  l: 0.0486,
  xl: 0.1667,
  xxl: 0.4167,
};

export const instanceTypePricingPerHour: Record<
  string,
  { vcpu: number; memory: number; price: number; network: string }
> = {
  "b3-8": { vcpu: 2, memory: 8, price: 0.0512, network: "500 Mbit/s / 4 Gbit/s max" },
  "b3-16": { vcpu: 4, memory: 16, price: 0.1023, network: "1 Gbit/s / 4 Gbit/s max" },
  "b3-32": { vcpu: 8, memory: 32, price: 0.2046, network: "2 Gbit/s / 4 Gbit/s max" },
  "b3-64": { vcpu: 16, memory: 64, price: 0.4092, network: "4 Gbit/s / 4 Gbit/s max" },
  "b3-128": { vcpu: 32, memory: 128, price: 0.7439, network: "8 Gbit/s / 8 Gbit/s max" },
  "b3-256": { vcpu: 64, memory: 256, price: 1.4878, network: "16 Gbit/s / 16 Gbit/s max" },
  "b3-512": { vcpu: 128, memory: 512, price: 2.9756, network: "20 Gbit/s / 20 Gbit/s max" },
  "b3-640": { vcpu: 160, memory: 640, price: 3.7195, network: "20 Gbit/s / 20 Gbit/s max" },
  "b2-7": { vcpu: 2, memory: 7, price: 0.0681, network: "250 Mbit/s garanti / 300 Mbit/s max" },
  "b2-15": { vcpu: 4, memory: 15, price: 0.129, network: "250 Mbit/s garanti / 1 Gbit/s max" },
  "b2-30": { vcpu: 8, memory: 30, price: 0.261, network: "500 Mbit/s garanti / 2 Gbit/s max" },
  "b2-60": { vcpu: 16, memory: 60, price: 0.505, network: "1 Gbit/s garanti / 4 Gbit/s max" },
  "b2-120": { vcpu: 32, memory: 120, price: 0.993, network: "10 Gbit/s / 4 Gbit/s max" },
  "c3-4": { vcpu: 2, memory: 4, price: 0.0415, network: "250 Mbit/s / 4 Gbit/s max" },
  "c3-8": { vcpu: 4, memory: 8, price: 0.083, network: "500 Mbit/s / 4 Gbit/s max" },
  "c3-16": { vcpu: 8, memory: 16, price: 0.1659, network: "1 Gbit/s / 4 Gbit/s max" },
  "c3-32": { vcpu: 16, memory: 32, price: 0.3318, network: "2 Gbit/s / 4 Gbit/s max" },
  "c3-64": { vcpu: 32, memory: 64, price: 0.6637, network: "4 Gbit/s / 4 Gbit/s max" },
  "c3-128": { vcpu: 64, memory: 128, price: 1.3274, network: "8 Gbit/s / 8 Gbit/s max" },
  "c3-256": { vcpu: 128, memory: 256, price: 2.6547, network: "20 Gbit/s / 20 Gbit/s max" },
  "c3-320": { vcpu: 160, memory: 320, price: 3.3184, network: "20 Gbit/s / 20 Gbit/s max" },
  "c2-7": { vcpu: 2, memory: 7, price: 0.0978, network: "250 Mbit/s garanti / 300 Mbit/s max" },
  "c2-15": { vcpu: 4, memory: 15, price: 0.19, network: "250 Mbit/s garanti / 1 Gbit/s max" },
  "c2-30": { vcpu: 8, memory: 30, price: 0.383, network: "500 Mbit/s garanti / 2 Gbit/s max" },
  "c2-60": { vcpu: 16, memory: 60, price: 0.749, network: "1 Gbit/s garanti / 4 Gbit/s max" },
  "c2-120": { vcpu: 32, memory: 120, price: 1.48, network: "10 Gbit/s / 4 Gbit/s max" },
  "r3-16": { vcpu: 2, memory: 16, price: 0.0602, network: "500 Mbit/s / 4 Gbit/s max" },
  "r3-32": { vcpu: 4, memory: 32, price: 0.1203, network: "1 Gbit/s / 4 Gbit/s max" },
  "r3-64": { vcpu: 8, memory: 64, price: 0.2407, network: "2 Gbit/s / 4 Gbit/s max" },
  "r3-128": { vcpu: 16, memory: 128, price: 0.4813, network: "4 Gbit/s / 4 Gbit/s max" },
  "r3-256": { vcpu: 32, memory: 256, price: 0.9627, network: "8 Gbit/s / 8 Gbit/s max" },
  "r3-512": { vcpu: 64, memory: 512, price: 1.9254, network: "20 Gbit/s / 20 Gbit/s max" },
  "r3-1024": { vcpu: 128, memory: 1024, price: 3.8508, network: "20 Gbit/s / 20 Gbit/s max" },
  "r2-15": { vcpu: 2, memory: 15, price: 0.0978, network: "250 Mbit/s garanti / 1 Gbit/s max" },
  "r2-30": { vcpu: 2, memory: 30, price: 0.113, network: "250 Mbit/s garanti / 1 Gbit/s max" },
  "r2-60": { vcpu: 4, memory: 60, price: 0.22, network: "250 Mbit/s garanti / 2 Gbit/s max" },
  "r2-120": { vcpu: 8, memory: 120, price: 0.443, network: "1 Gbit/s garanti / 4 Gbit/s max" },
  "r2-240": { vcpu: 16, memory: 240, price: 0.871, network: "10 Gbit/s / 4 Gbit/s max" },
  "i1-45": { vcpu: 8, memory: 45, price: 0.439, network: "1 Gbit/s garanti / 2 Gbit/s max" },
  "i1-90": { vcpu: 16, memory: 90, price: 0.879, network: "2 Gbit/s garanti / 4 Gbit/s max" },
  "i1-180": { vcpu: 32, memory: 180, price: 1.76, network: "8 Gbit/s garanti / 4 Gbit/s max" },
  "d2-2": { vcpu: 1, memory: 2, price: 0.0099, network: "100 Mbit/s / 100 Mbit/s max" },
  "d2-4": { vcpu: 2, memory: 4, price: 0.0198, network: "250 Mbit/s / 250 Mbit/s max" },
  "d2-8": { vcpu: 4, memory: 8, price: 0.0357, network: "500 Mbit/s / 500 Mbit/s max" },
  "bm-s1": { vcpu: 4, memory: 32, price: 0.5, network: "1 Gbit/s garanti / 2 Gbit/s max" },
  "bm-m1": { vcpu: 8, memory: 64, price: 0.85, network: "1 Gbit/s garanti / 2 Gbit/s max" },
  "bm-l1": { vcpu: 16, memory: 128, price: 1.45, network: "1 Gbit/s garanti / 2 Gbit/s max" },
  "l40s-90": { vcpu: 15, memory: 90, price: 1.4, network: "8 Gbit/s / 8 Gbit/s max" },
  "l40s-180": { vcpu: 30, memory: 180, price: 2.8, network: "16 Gbit/s / 16 Gbit/s max" },
  "l40s-360": { vcpu: 60, memory: 360, price: 5.6, network: "25 Gbit/s / 25 Gbit/s max" },
  "a10-45": { vcpu: 30, memory: 45, price: 0.76, network: "8 Gbit/s / 8 Gbit/s max" },
  "a10-90": { vcpu: 60, memory: 90, price: 1.52, network: "16 Gbit/s / 16 Gbit/s max" },
  "a10-180": { vcpu: 120, memory: 180, price: 3.04, network: "25 Gbit/s / 25 Gbit/s max" },
  "a100-180": { vcpu: 15, memory: 180, price: 2.75, network: "8 Gbit/s / 8 Gbit/s max" },
  "a100-360": { vcpu: 30, memory: 360, price: 5.5, network: "16 Gbit/s / 16 Gbit/s max" },
  "a100-720": { vcpu: 60, memory: 720, price: 11, network: "25 Gbit/s / 25 Gbit/s max" },
  "h100-380": { vcpu: 30, memory: 380, price: 2.8, network: "8 Gbit/s / 8 Gbit/s max" },
  "h100-760": { vcpu: 60, memory: 760, price: 5.6, network: "16 Gbit/s / 16 Gbit/s max" },
  "h100-1520": { vcpu: 120, memory: 1520, price: 11.2, network: "25 Gbit/s / 25 Gbit/s max" },
  "l4-90": { vcpu: 22, memory: 90, price: 0.75, network: "8 Gbit/s / 8 Gbit/s max" },
  "l4-180": { vcpu: 45, memory: 180, price: 1.5, network: "16 Gbit/s / 16 Gbit/s max" },
  "l4-360": { vcpu: 90, memory: 360, price: 3, network: "25 Gbit/s / 25 Gbit/s max" },
  "rtx5000-28": { vcpu: 4, memory: 28, price: 0.36, network: "2 Gbit/s / 4 Gbit/s max" },
  "rtx5000-56": { vcpu: 8, memory: 56, price: 0.72, network: "4 Gbit/s / 4 Gbit/s max" },
  "rtx5000-84": { vcpu: 16, memory: 84, price: 1.08, network: "10 Gbit/s / 10 Gbit/s max" },
  "t1-le-45": { vcpu: 8, memory: 45, price: 0.7, network: "2 Gbit/s garanti / 4 Gbit/s max" },
  "t1-le-90": { vcpu: 16, memory: 90, price: 1.4, network: "4 Gbit/s garanti / 4 Gbit/s max" },
  "t1-le-180": { vcpu: 32, memory: 180, price: 2.8, network: "10 Gbit/s / 4 Gbit/s max" },
  "t2-le-45": { vcpu: 15, memory: 45, price: 0.8, network: "2 Gbit/s garanti / 4 Gbit/s max" },
  "t2-le-90": { vcpu: 30, memory: 90, price: 1.6, network: "4 Gbit/s garanti / 4 Gbit/s max" },
  "t2-le-180": { vcpu: 60, memory: 180, price: 3.2, network: "10 Gbit/s / 4 Gbit/s max" },
};
