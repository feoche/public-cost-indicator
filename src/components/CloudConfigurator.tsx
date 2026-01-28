"use client";
import { useMemo } from "react";
import CostEstimator from "./CostEstimator";
import {
  Button,
  Input,
  Select,
  SelectControl,
  SelectContent,
  FormField,
  FormFieldLabel,
  Textarea,
  Range,
  Card,
  Checkbox,
  CheckboxControl,
  CheckboxLabel,
} from "../ods";
import { useConfigStore } from "../state/configStore";

const regions = ["GRA5 (France)", "SBG (France)", "DE (Germany)", "UK (United Kingdom)", "CA (Canada)", "US (East)"];
const flavors = [
  { id: "a10-1-gpu", vcpu: 8, ramGB: 32 },
  { id: "a100-1-gpu", vcpu: 16, ramGB: 64 },
  { id: "h100-1-gpu", vcpu: 24, ramGB: 128 },
  { id: "l4-1-gpu", vcpu: 8, ramGB: 32 },
  { id: "l40s-1-gpu", vcpu: 32, ramGB: 256 },
];

export default function CloudConfigurator() {
  const { config: cfg, set, patch, toJSON, fromJSON } = useConfigStore();

  const onFlavorChange = (id: string) => {
    const f = flavors.find((it) => it.id === id) ?? flavors[0];
    patch({ flavor: id, vcpu: f.vcpu, ramGB: f.ramGB });
  };

  const hourlyCost = useMemo(() => {
    const storageUnit = cfg.storageType === "nvme" ? 0.02 : cfg.storageType === "ssd" ? 0.01 : 0.005; // €/GB/hr
    const storage = cfg.storageGB * storageUnit;
    const bw = (cfg.bandwidthMbps / 1000) * 0.02; // €/hr rough
    const addons = (cfg.backups ? 0.05 : 0) + (cfg.monitoring ? 0.02 : 0) + (cfg.autoscaling ? 0.03 : 0);
    const ipv4 = cfg.ipv4 * 0.01; // €/hr per IPv4
    return (storage + bw + addons + ipv4) * cfg.quantity;
  }, [cfg]);

  return (
    <section aria-labelledby="config-title" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Card>
        <header style={{ padding: "0.75rem 1rem", borderBottom: "1px solid #e5e5e5" }}>
          <h2 id="config-title">Public Cloud Configurator</h2>
          <p style={{ fontSize: "0.9rem", color: "#666" }}>Configure your instance with full control over flavor, storage, network, and options.</p>
        </header>

        <form
          aria-describedby="config-help"
          style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "1rem", padding: "1rem", overflowY: "auto" }}
          onSubmit={(e) => e.preventDefault()}
        >
          <p id="config-help" style={{ gridColumn: "1/-1", fontSize: "0.9rem", color: "#666" }}>
            Fields marked * are required. Your selections update the live estimate.
          </p>

          <FormField>
            <FormFieldLabel>Project name*</FormFieldLabel>
            <Input placeholder="My AI Project" required value={cfg.projectName} onChange={(e) => set("projectName", e.target.value)} />
          </FormField>

          <FormField>
            <FormFieldLabel>Region*</FormFieldLabel>
            <Select items={regions.map((r) => ({ label: r, value: r }))} value={[cfg.region]} onValueChange={({ value }) => set("region", value[0] ?? cfg.region)}>
              <SelectControl placeholder="Select region" />
              <SelectContent />
            </Select>
          </FormField>

          <FormField>
            <FormFieldLabel>Flavor (GPU)*</FormFieldLabel>
            <Select items={flavors.map((f) => ({ label: f.id, value: f.id }))} value={[cfg.flavor]} onValueChange={({ value }) => onFlavorChange(value[0] ?? flavors[0].id)}>
              <SelectControl placeholder="Select flavor" />
              <SelectContent />
            </Select>
          </FormField>

          <Card style={{ gridColumn: "1/-1", padding: "0.75rem" }}>
            <h3 style={{ marginBottom: "0.5rem" }}>Compute details</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "0.75rem" }}>
              <FormField>
                <FormFieldLabel>vCPU</FormFieldLabel>
                <Input type="number" min={1} value={String(cfg.vcpu)} onChange={(e) => set("vcpu", Number(e.target.value || 1))} />
              </FormField>
              <FormField>
                <FormFieldLabel>RAM (GB)</FormFieldLabel>
                <Input type="number" min={1} value={String(cfg.ramGB)} onChange={(e) => set("ramGB", Number(e.target.value || 1))} />
              </FormField>
            </div>
          </Card>

          <Card style={{ gridColumn: "1/-1", padding: "0.75rem" }}>
            <h3 style={{ marginBottom: "0.5rem" }}>Storage</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "0.75rem" }}>
              <FormField>
                <FormFieldLabel>Type</FormFieldLabel>
                <Select
                  items={[{ label: "SSD", value: "ssd" }, { label: "HDD", value: "hdd" }, { label: "NVMe", value: "nvme" }]}
                  value={[cfg.storageType]}
                  onValueChange={({ value }) => set("storageType", (value[0] as any) ?? cfg.storageType)}
                >
                  <SelectControl placeholder="Select storage" />
                  <SelectContent />
                </Select>
              </FormField>
              <FormField>
                <FormFieldLabel>Size (GB)</FormFieldLabel>
                <Input type="number" min={1} value={String(cfg.storageGB)} onChange={(e) => set("storageGB", Number(e.target.value || 1))} />
              </FormField>
              <FormField>
                <FormFieldLabel>OS Image</FormFieldLabel>
                <Select
                  items={[
                    { label: "Ubuntu 24.04", value: "Ubuntu 24.04" },
                    { label: "Debian 12", value: "Debian 12" },
                    { label: "CentOS Stream 9", value: "CentOS Stream 9" },
                    { label: "Rocky Linux 9", value: "Rocky Linux 9" },
                  ]}
                  value={[cfg.osImage]}
                  onValueChange={({ value }) => set("osImage", value[0] ?? cfg.osImage)}
                >
                  <SelectControl placeholder="Select OS image" />
                  <SelectContent />
                </Select>
              </FormField>
            </div>
          </Card>

          <Card style={{ gridColumn: "1/-1", padding: "0.75rem" }}>
            <h3 style={{ marginBottom: "0.5rem" }}>Network</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "0.75rem" }}>
              <FormField>
                <FormFieldLabel>Bandwidth (Mbps)</FormFieldLabel>
                <Range min={10} max={2000} step={10} value={[cfg.bandwidthMbps]} onValueChange={({ value }) => set("bandwidthMbps", Number(value[0] ?? cfg.bandwidthMbps))} />
              </FormField>
              <FormField>
                <FormFieldLabel>IPv4 addresses</FormFieldLabel>
                <Input type="number" min={0} max={5} value={String(cfg.ipv4)} onChange={(e) => set("ipv4", Number(e.target.value || 0))} />
              </FormField>
              <FormField>
                <FormFieldLabel>Quantity</FormFieldLabel>
                <Input type="number" min={1} value={String(cfg.quantity)} onChange={(e) => set("quantity", Number(e.target.value || 1))} />
              </FormField>
            </div>
          </Card>

          <Card style={{ gridColumn: "1/-1", padding: "0.75rem" }}>
            <h3 style={{ marginBottom: "0.5rem" }}>Options</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "0.75rem" }}>
              <Checkbox checked={cfg.backups} onCheckedChange={({ checked }) => set("backups", !!checked)}>
                <CheckboxControl />
                <CheckboxLabel>Backups</CheckboxLabel>
              </Checkbox>
              <Checkbox checked={cfg.monitoring} onCheckedChange={({ checked }) => set("monitoring", !!checked)}>
                <CheckboxControl />
                <CheckboxLabel>Monitoring</CheckboxLabel>
              </Checkbox>
              <Checkbox checked={cfg.autoscaling} onCheckedChange={({ checked }) => set("autoscaling", !!checked)}>
                <CheckboxControl />
                <CheckboxLabel>Auto-scaling</CheckboxLabel>
              </Checkbox>
            </div>
          </Card>

          <FormField style={{ gridColumn: "1/-1" }}>
            <FormFieldLabel>Billing*</FormFieldLabel>
            <Select
              items={[{ label: "Hourly", value: "hourly" }, { label: "Monthly", value: "monthly" }]}
              value={[cfg.billing]}
              onValueChange={({ value }) => set("billing", (value[0] as any) ?? cfg.billing)}
            >
              <SelectControl placeholder="Select billing" />
              <SelectContent />
            </Select>
          </FormField>

          <FormField style={{ gridColumn: "1/-1" }}>
            <FormFieldLabel>Tags</FormFieldLabel>
            <Input placeholder="team:ai, env:prod" value={cfg.tags} onChange={(e) => set("tags", e.target.value)} />
          </FormField>

          <FormField style={{ gridColumn: "1/-1" }}>
            <FormFieldLabel>Notes</FormFieldLabel>
            <Textarea rows={3} placeholder="Purpose, constraints, etc." value={cfg.notes} onChange={(e) => set("notes", e.target.value)} />
          </FormField>

          <div style={{ gridColumn: "1/-1", display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "1rem" }}>
            <Card style={{ padding: "0.75rem" }}>
              <h3 style={{ marginBottom: "0.5rem" }}>Live estimate (add-ons)</h3>
              <p>
                Add-ons & network estimated per hour: <strong>€{hourlyCost.toFixed(2)}</strong>
              </p>
              <small>This excludes base GPU/compute cost, shown on the right.</small>
            </Card>
            <Card style={{ padding: "0.75rem" }}>
              <CostEstimator />
            </Card>
          </div>

          <div style={{ gridColumn: "1/-1", display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
            <Button color="neutral" variant="outline" type="reset" onClick={() => patch({ ...defaultResetValues })}>
              Reset
            </Button>
            <Button color="primary" variant="default" type="button" onClick={() => navigator.clipboard.writeText(toJSON())}>
              Copy JSON
            </Button>
            <Button
              color="primary"
              variant="default"
              type="button"
              onClick={() => {
                const json = prompt("Paste configuration JSON");
                if (json) fromJSON(json);
              }}
            >
              Import JSON
            </Button>
            <Button color="primary" variant="default" type="submit">
              Save configuration
            </Button>
          </div>
        </form>
      </Card>
    </section>
  );
}

const defaultResetValues = {
  projectName: "",
  region: "GRA5 (France)",
  flavor: "a10-1-gpu",
  vcpu: 8,
  ramGB: 32,
  storageType: "ssd" as const,
  storageGB: 120,
  osImage: "Ubuntu 24.04",
  bandwidthMbps: 100,
  quantity: 1,
  billing: "hourly" as const,
  backups: false,
  monitoring: true,
  ipv4: 1,
  autoscaling: false,
  notes: "",
  tags: "",
};
