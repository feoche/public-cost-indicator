// Central configuration state and JSON snapshot utilities
"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type BillingType = "hourly" | "monthly";
export type StorageType = "ssd" | "hdd" | "nvme";
export interface CloudConfig {
  projectName: string;
  region: string;
  flavor: string;
  vcpu: number;
  ramGB: number;
  storageType: StorageType;
  storageGB: number;
  osImage: string;
  bandwidthMbps: number;
  quantity: number;
  billing: BillingType;
  backups: boolean;
  monitoring: boolean;
  ipv4: number;
  autoscaling: boolean;
  notes: string;
  tags: string;
}

export interface ConfigStore {
  config: CloudConfig;
  set: <K extends keyof CloudConfig>(key: K, value: CloudConfig[K]) => void;
  patch: (partial: Partial<CloudConfig>) => void;
  toJSON: () => string;
  fromJSON: (json: string) => void;
}

const defaultConfig: CloudConfig = {
  projectName: "",
  region: "GRA5 (France)",
  flavor: "a10-1-gpu",
  vcpu: 8,
  ramGB: 32,
  storageType: "ssd",
  storageGB: 120,
  osImage: "Ubuntu 24.04",
  bandwidthMbps: 100,
  quantity: 1,
  billing: "hourly",
  backups: false,
  monitoring: true,
  ipv4: 1,
  autoscaling: false,
  notes: "",
  tags: "",
};

export const useConfigStore = create<ConfigStore>()(
  persist(
    (set: any, get: any) => ({
      config: defaultConfig,
      set: <K extends keyof CloudConfig>(key: K, value: CloudConfig[K]) => set((s: { config: CloudConfig }) => ({ config: { ...s.config, [key]: value } })),
      patch: (partial: Partial<CloudConfig>) => set((s: { config: CloudConfig }) => ({ config: { ...s.config, ...partial } })),
      toJSON: () => JSON.stringify(get().config),
      fromJSON: (json: string) => {
        try {
          const data = JSON.parse(json) as Partial<CloudConfig>;
          set((s: { config: CloudConfig }) => ({ config: { ...s.config, ...data } }));
        } catch (e) {
          console.error("Invalid configuration JSON", e);
        }
      },
    }),
    {
      name: "pc-config-store",
      version: 1,
      partialize: (state) => ({ config: state.config }),
      storage: createJSONStorage(() => localStorage),
    }
  )
);
