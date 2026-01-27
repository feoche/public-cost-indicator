import { useState, useEffect } from "react";

// Pricing dataset derived from cloud.json. Only a subset shown here for illustration.
const gpuPricing: Record<string, number> = {
  "a10-1-gpu": 5000000,
  "a100-1-gpu": 5000000,
  "h100-1-gpu": 5000000,
  "l4-1-gpu": 5000000,
  "l40s-1-gpu": 5000000,
};

export default function CostEstimator() {
  const [instanceType, setInstanceType] = useState<string>("a10-1-gpu");
  const [quantity, setQuantity] = useState<number>(1);
  const [volumeGB, setVolumeGB] = useState<number>(0);
  const [ipv4Count, setIpv4Count] = useState<number>(0);
  const [cost, setCost] = useState<number>(0);

  useEffect(() => {
    const instancePricePerMin = gpuPricing[instanceType] || 0;
    const instanceCostPerHour = (instancePricePerMin * 60) / 1_000_000; // € per hour
    const instanceTotal = instanceCostPerHour * quantity;
    const volumeCost = volumeGB * 0.4; // placeholder per GB per hour
    const ipv4Cost = ipv4Count * 0.01; // placeholder per IPv4 per hour
    setCost(instanceTotal + volumeCost + ipv4Cost);
  }, [instanceType, quantity, volumeGB, ipv4Count]);

  return (
    <div>
      <h2>GPU Cost Estimator (Paris 2)</h2>
      <label>
        Instance type:
        <select value={instanceType} onChange={e => setInstanceType(e.target.value)}>
          {Object.keys(gpuPricing).map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Quantity:
        <input type="number" min="1" value={quantity} onChange={e => setQuantity(Number(e.target.value))} />
      </label>
      <br />
      <label>
        Volume (GB):
        <input type="number" min="0" value={volumeGB} onChange={e => setVolumeGB(Number(e.target.value))} />
      </label>
      <br />
      <label>
        IPv4 count (0‑5):
        <input type="number" min="0" max="5" value={ipv4Count} onChange={e => setIpv4Count(Number(e.target.value))} />
      </label>
      <h3>Total Estimate per hour: €{cost.toFixed(2)}</h3>
    </div>
  );
}
