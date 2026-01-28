"use client";

import { useState, useMemo } from "react";
import flavorsData from "@/data/instance-flavors.json";

type Flavor = {
  planCode: string;
  name: string;
  cpu: number;
  ram: number;
  storageGb: number;
  os: string;
  brick: string;
  brickSubtype: string;
};

const flavors = flavorsData as Flavor[];

const linuxFlavors = flavors.filter((f) => f.os === "linux");

/** Identifiant unique de gamme (brick + brickSubtype) */
function gammeId(f: Flavor): string {
  return [f.brick || "", f.brickSubtype || ""].join("|");
}

/** Libellé lisible pour une gamme */
function gammeLabel(id: string): string {
  if (!id || id === "|") return "Autres";
  const [, sub] = id.split("|");
  const labels: Record<string, string> = {
    "general-purpose": "General purpose",
    cpu: "CPU",
    ram: "RAM",
    discovery: "Discovery",
    metal: "Metal",
    iops: "IOPS",
  };
  return labels[sub] || sub || "Autres";
}

/** Liste des gammes (uniques, triées), avec "Autres" en dernier */
const gammesList = (() => {
  const seen = new Set<string>();
  const list: { id: string; label: string }[] = [];
  const preferredOrder = ["general-purpose", "cpu", "ram", "discovery", "iops", "metal"];
  for (const f of linuxFlavors) {
    const id = gammeId(f);
    if (seen.has(id)) continue;
    seen.add(id);
    list.push({ id, label: gammeLabel(id) });
  }
  list.sort((a, b) => {
    const aSub = a.id.split("|")[1] || "";
    const bSub = b.id.split("|")[1] || "";
    const ai = preferredOrder.indexOf(aSub);
    const bi = preferredOrder.indexOf(bSub);
    if (ai !== -1 && bi !== -1) return ai - bi;
    if (ai !== -1) return -1;
    if (bi !== -1) return 1;
    if (a.label === "Autres") return 1;
    if (b.label === "Autres") return -1;
    return a.label.localeCompare(b.label);
  });
  return list;
})();

type FormState = {
  gammeId: string;
  flavorPlanCode: string;
  os: "linux" | "windows";
  additionalStorageGb: number;
  publicIpCount: number;
};

type ResultState = {
  breakdown: Record<string, number>;
  total: number;
  unit: string;
} | null;

export default function CostEstimator() {
  const defaultGammeId = gammesList[0]?.id ?? "";
  const defaultFlavorForGamme = (gid: string) =>
    linuxFlavors.find((f) => gammeId(f) === gid) ?? linuxFlavors[0];
  const defaultFlavor = defaultFlavorForGamme(defaultGammeId);

  const [form, setForm] = useState<FormState>({
    gammeId: defaultGammeId,
    flavorPlanCode: defaultFlavor?.planCode ?? "",
    os: "linux",
    additionalStorageGb: 0,
    publicIpCount: 1,
  });

  const [result, setResult] = useState<ResultState>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const flavorsByGamme = useMemo(
    () => linuxFlavors.filter((f) => gammeId(f) === form.gammeId),
    [form.gammeId]
  );
  const selectedFlavor =
    linuxFlavors.find((f) => f.planCode === form.flavorPlanCode) ??
    flavorsByGamme[0] ??
    defaultFlavor;

  const calculate = async () => {
    if (!selectedFlavor) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/cost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          instancePlanCode: form.flavorPlanCode,
          os: form.os,
          cpuCount: selectedFlavor.cpu,
          additionalStorageGb: form.additionalStorageGb,
          publicIpCount: form.publicIpCount,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Erreur lors du calcul");
      }
      const data = await res.json();
      setResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cost-estimator">
      <h2>Calculateur de coût – Instances Compute</h2>
      <p className="cost-estimator-intro">
        Choisissez le type d&apos;instance (CPU, RAM, stockage), l&apos;OS et les options. Les prix sont basés sur le catalogue Public Cloud (cloud.json).
      </p>

      <section className="cost-estimator-section">
        <h3>Compute</h3>
        <label>
          <span>Gamme</span>
          <select
            value={form.gammeId}
            onChange={(e) => {
              const gid = e.target.value;
              const firstInGamme = linuxFlavors.find((f) => gammeId(f) === gid);
              setForm((prev) => ({
                ...prev,
                gammeId: gid,
                flavorPlanCode: firstInGamme?.planCode ?? prev.flavorPlanCode,
              }));
            }}
          >
            {gammesList.map((g) => (
              <option key={g.id} value={g.id}>
                {g.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Type d&apos;instance</span>
          <select
            value={
              flavorsByGamme.some((f) => f.planCode === form.flavorPlanCode)
                ? form.flavorPlanCode
                : flavorsByGamme[0]?.planCode ?? ""
            }
            onChange={(e) => setForm((prev) => ({ ...prev, flavorPlanCode: e.target.value }))}
          >
            {flavorsByGamme.map((f) => (
              <option key={f.planCode} value={f.planCode}>
                {f.name} — {f.cpu} vCPU, {f.ram} Go RAM, {f.storageGb} Go stockage
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>OS préinstallé</span>
          <select
            value={form.os}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, os: e.target.value as "linux" | "windows" }))
            }
          >
            <option value="linux">Linux</option>
            <option value="windows">Windows</option>
          </select>
        </label>
      </section>

      <section className="cost-estimator-section">
        <h3>Stockage</h3>
        <p className="cost-estimator-hint">
          Stockage inclus avec l&apos;instance : <strong>{selectedFlavor?.storageGb ?? 0} Go</strong>
        </p>
        <label>
          <span>Stockage additionnel (Go)</span>
          <input
            type="number"
            min={0}
            value={form.additionalStorageGb}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                additionalStorageGb: Math.max(0, Number(e.target.value) || 0),
              }))
            }
          />
        </label>
      </section>

      <section className="cost-estimator-section">
        <h3>Réseau</h3>
        <label>
          <span>Nombre d&apos;adresses IP publiques</span>
          <input
            type="number"
            min={0}
            value={form.publicIpCount}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                publicIpCount: Math.max(0, Math.floor(Number(e.target.value) || 0)),
              }))
            }
          />
        </label>
      </section>

      <div className="cost-estimator-actions">
        <button type="button" onClick={calculate} disabled={loading}>
          {loading ? "Calcul en cours…" : "Calculer le coût"}
        </button>
      </div>

      {error && <p className="cost-estimator-error">{error}</p>}

      {result && (
        <section className="cost-estimator-section cost-estimator-result">
          <h3>Répartition du coût ({result.unit})</h3>
          <ul>
            {Object.entries(result.breakdown).map(([label, value]) => (
              <li key={label}>
                <span>{label}</span>
                <span>{value.toFixed(4)} €</span>
              </li>
            ))}
          </ul>
          <p className="cost-estimator-total">
            <strong>Total : {result.total.toFixed(4)} € / heure</strong>
          </p>
          <p className="cost-estimator-hint">
            Soit environ {(result.total * 730).toFixed(2)} € / mois (730 h).
          </p>
        </section>
      )}
    </div>
  );
}
