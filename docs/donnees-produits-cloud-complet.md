# Catalogue Complet des Produits OVHcloud Public Cloud - Enrichi

Ce document combine les informations des pages produits OVHcloud et du catalogue technique pour fournir une vue complète de chaque produit avec :
- Use cases
- Types de clients
- Recommandations d'usage
- Flavors disponibles
- Spécifications techniques détaillées
- Plan codes
- Prix

**Date de génération:** 2025-01-27
**Sources:** 
- `ovhcloud-public-cloud-contenu.md` (descriptions produits)
- `docs/catalogue-produits-complet.md` (spécifications techniques)

---

## Compute

### Cloud GPU

**URL:** https://www.ovhcloud.com/fr/public-cloud/instances/gpu/

**Description:**
Jusqu'à 1 000x plus rapides pour calculs parallèles. GPU NVIDIA A10, A100, H100 optimisés pour l'IA et le machine learning.

**Recommandation d'usage:**
Instances GPU idéales pour l'entraînement de modèles d'IA, le fine-tuning, l'inférence en temps réel ou par batch, et les calculs scientifiques intensifs nécessitant une accélération matérielle.

**Use Cases Client:**
1. **AI Model Training & Fine-Tuning:** Train and fine-tune large ML and deep learning models efficiently, with predictable performance and optimized cost.
2. **AI Inference:** Run real-time or batch inference workloads with low latency and controlled costs, integrated with cloud-native architectures.

**Types de clients cibles:**
- Entreprises développant des modèles d'IA/ML
- Startups tech spécialisées en intelligence artificielle
- Organisations de recherche et développement
- Équipes data science nécessitant des ressources GPU
- Entreprises avec workloads de calcul intensif (rendu 3D, simulations)

**Flavors Disponibles:**

| Flavor | vCPU | Fréquence | RAM | GPU | VRAM | Stockage | RAID | Bande passante | Prix |
|--------|------|-----------|-----|-----|------|----------|------|----------------|------|
| a10-45 | 30 | 3.3 GHz | 45 Go | A10 x1 | 24 Go | 400 GiB SSD | local | 8000 Mbit/s | 0.76 € / heure |
| a10-90 | 60 | 3.3 GHz | 90 Go | A10 x2 | 24 Go | 400 GiB SSD | local | 16000 Mbit/s | 1.52 € / heure |
| a100-180 | 15 | 3 GHz | 180 Go | A100 x1 | 80 Go | 300 GiB NVMe | local | 8000 Mbit/s | 2.75 € / heure ou 1100.00 € / mois |
| a100-360 | 30 | 3 GHz | 360 Go | A100 x2 | 80 Go | 500 GiB NVMe | local | 16000 Mbit/s | 5.50 € / heure ou 2200.00 € / mois |
| a100-720 | 60 | 3 GHz | 720 Go | A100 x4 | 80 Go | 500 GiB NVMe | local | 25000 Mbit/s | 11.00 € / heure ou 4400.00 € / mois |
| h100-1520 | 120 | 3 GHz | 1520 Go | H100 x4 | 80 Go | 200 GiB + 3840 GiB NVMe | local | 25000 Mbit/s | 11.20 € / heure ou 7770.00 € / mois |
| h100-380 | 30 | 3 GHz | 380 Go | H100 x1 | 80 Go | 200 GiB + 3840 GiB NVMe | local | 8000 Mbit/s | 2.80 € / heure ou 1940.00 € / mois |
| h100-760 | 60 | 3 GHz | 760 Go | H100 x2 | 80 Go | 200 GiB + 3840 GiB NVMe | local | 16000 Mbit/s | 5.60 € / heure ou 3880.00 € / mois |
| l4-90 | 22 | 2.75 GHz | 90 Go | L4 x1 | 24 Go | 400 GiB NVMe | local | 8000 Mbit/s | 0.75 € / heure ou 540.00 € / mois |
| l4-180 | 45 | 2.75 GHz | 180 Go | L4 x2 | 24 Go | 400 GiB NVMe | local | 16000 Mbit/s | 1.50 € / heure ou 1080.00 € / mois |
| l4-360 | 90 | 2.75 GHz | 360 Go | L4 x4 | 24 Go | 400 GiB NVMe | local | 25000 Mbit/s | 3.00 € / heure ou 2160.00 € / mois |
| l40s-90 | 15 | 2.75 GHz | 90 Go | L40S x1 | 48 Go | 400 GiB NVMe | local | 8000 Mbit/s | 1.40 € / heure ou 1008.00 € / mois |
| l40s-180 | 30 | 2.75 GHz | 180 Go | L40S x2 | 48 Go | 400 GiB NVMe | local | 16000 Mbit/s | 2.80 € / heure ou 2016.00 € / mois |
| l40s-360 | 60 | 2.75 GHz | 360 Go | L40S x4 | 48 Go | 400 GiB NVMe | local | 25000 Mbit/s | 5.60 € / heure ou 4032.00 € / mois |

**Détails Techniques par Flavor:**

#### a10-45
- **Plan Codes:** `a10-45.consumption`
- **Prix:** 0.76 € / heure
- **Spécifications:**
  - CPU: 30 vCPU @ 3.3 GHz (vCore)
  - Mémoire: 45 Go
  - GPU: A10 x1 (24 Go VRAM)
  - Stockage: 400 GiB SSD
  - RAID: local
  - Bande passante: 8000 Mbit/s

#### a10-90
- **Plan Codes:** `a10-90.consumption`
- **Prix:** 1.52 € / heure
- **Spécifications:**
  - CPU: 60 vCPU @ 3.3 GHz (vCore)
  - Mémoire: 90 Go
  - GPU: A10 x2 (24 Go VRAM)
  - Stockage: 400 GiB SSD
  - RAID: local
  - Bande passante: 16000 Mbit/s

#### a100-180
- **Plan Codes:** `a100-180.consumption`, `a100-180.monthly.postpaid`
- **Prix:** 2.75 € / heure, 1100.00 € / mois
- **Spécifications:**
  - CPU: 15 vCPU @ 3 GHz (vCore)
  - Mémoire: 180 Go
  - GPU: A100 x1 (80 Go VRAM)
  - Stockage: 300 GiB NVMe
  - RAID: local
  - Bande passante: 8000 Mbit/s

#### a100-360
- **Plan Codes:** `a100-360.consumption`, `a100-360.monthly.postpaid`
- **Prix:** 5.50 € / heure, 2200.00 € / mois
- **Spécifications:**
  - CPU: 30 vCPU @ 3 GHz (vCore)
  - Mémoire: 360 Go
  - GPU: A100 x2 (80 Go VRAM)
  - Stockage: 500 GiB NVMe
  - RAID: local
  - Bande passante: 16000 Mbit/s

#### a100-720
- **Plan Codes:** `a100-720.consumption`, `a100-720.monthly.postpaid`
- **Prix:** 11.00 € / heure, 4400.00 € / mois
- **Spécifications:**
  - CPU: 60 vCPU @ 3 GHz (vCore)
  - Mémoire: 720 Go
  - GPU: A100 x4 (80 Go VRAM)
  - Stockage: 500 GiB NVMe
  - RAID: local
  - Bande passante: 25000 Mbit/s

#### h100-1520
- **Plan Codes:** `h100-1520.consumption`, `h100-1520.monthly.postpaid`
- **Prix:** 11.20 € / heure, 7770.00 € / mois
- **Spécifications:**
  - CPU: 120 vCPU @ 3 GHz (vCore)
  - Mémoire: 1520 Go
  - GPU: H100 x4 (80 Go VRAM)
  - Stockage: 200 GiB + 3840 GiB NVMe Passthrough
  - RAID: local
  - Bande passante: 25000 Mbit/s

#### h100-380
- **Plan Codes:** `h100-380.consumption`, `h100-380.monthly.postpaid`
- **Prix:** 2.80 € / heure, 1940.00 € / mois
- **Spécifications:**
  - CPU: 30 vCPU @ 3 GHz (vCore)
  - Mémoire: 380 Go
  - GPU: H100 x1 (80 Go VRAM)
  - Stockage: 200 GiB + 3840 GiB NVMe Passthrough
  - RAID: local
  - Bande passante: 8000 Mbit/s

#### h100-760
- **Plan Codes:** `h100-760.consumption`, `h100-760.monthly.postpaid`
- **Prix:** 5.60 € / heure, 3880.00 € / mois
- **Spécifications:**
  - CPU: 60 vCPU @ 3 GHz (vCore)
  - Mémoire: 760 Go
  - GPU: H100 x2 (80 Go VRAM)
  - Stockage: 200 GiB + 3840 GiB NVMe Passthrough
  - RAID: local
  - Bande passante: 16000 Mbit/s

#### l4-90
- **Plan Codes:** `l4-90.consumption`, `l4-90.monthly.postpaid`
- **Prix:** 0.75 € / heure, 540.00 € / mois
- **Spécifications:**
  - CPU: 22 vCPU @ 2.75 GHz (vCore)
  - Mémoire: 90 Go
  - GPU: L4 x1 (24 Go VRAM)
  - Stockage: 400 GiB NVMe
  - RAID: local
  - Bande passante: 8000 Mbit/s

#### l4-180
- **Plan Codes:** `l4-180.consumption`, `l4-180.monthly.postpaid`
- **Prix:** 1.50 € / heure, 1080.00 € / mois
- **Spécifications:**
  - CPU: 45 vCPU @ 2.75 GHz (vCore)
  - Mémoire: 180 Go
  - GPU: L4 x2 (24 Go VRAM)
  - Stockage: 400 GiB NVMe
  - RAID: local
  - Bande passante: 16000 Mbit/s

#### l4-360
- **Plan Codes:** `l4-360.consumption`, `l4-360.monthly.postpaid`
- **Prix:** 3.00 € / heure, 2160.00 € / mois
- **Spécifications:**
  - CPU: 90 vCPU @ 2.75 GHz (vCore)
  - Mémoire: 360 Go
  - GPU: L4 x4 (24 Go VRAM)
  - Stockage: 400 GiB NVMe
  - RAID: local
  - Bande passante: 25000 Mbit/s

#### l40s-90
- **Plan Codes:** `l40s-90.consumption`, `l40s-90.monthly.postpaid`
- **Prix:** 1.40 € / heure, 1008.00 € / mois
- **Spécifications:**
  - CPU: 15 vCPU @ 2.75 GHz (vCore)
  - Mémoire: 90 Go
  - GPU: L40S x1 (48 Go VRAM)
  - Stockage: 400 GiB NVMe
  - RAID: local
  - Bande passante: 8000 Mbit/s

#### l40s-180
- **Plan Codes:** `l40s-180.consumption`, `l40s-180.monthly.postpaid`
- **Prix:** 2.80 € / heure, 2016.00 € / mois
- **Spécifications:**
  - CPU: 30 vCPU @ 2.75 GHz (vCore)
  - Mémoire: 180 Go
  - GPU: L40S x2 (48 Go VRAM)
  - Stockage: 400 GiB NVMe
  - RAID: local
  - Bande passante: 16000 Mbit/s

#### l40s-360
- **Plan Codes:** `l40s-360.consumption`, `l40s-360.monthly.postpaid`
- **Prix:** 5.60 € / heure, 4032.00 € / mois
- **Spécifications:**
  - CPU: 60 vCPU @ 2.75 GHz (vCore)
  - Mémoire: 360 Go
  - GPU: L40S x4 (48 Go VRAM)
  - Stockage: 400 GiB NVMe
  - RAID: local
  - Bande passante: 25000 Mbit/s

---

### General Purpose Instances

**URL:** https://www.ovhcloud.com/fr/public-cloud/instances/

**Description:**
La puissance des machines virtuelles pour tous vos usages. Bénéficiez de la fiabilité, de la flexibilité et de la réversibilité du cloud pour tous vos projets de modernisation d'applications et de déploiements cloud native.

**Recommandation d'usage:**
Instances polyvalentes adaptées à tous usages. Facturation à l'heure sans engagement. API complète, Terraform, SDK. Idéales pour les applications web, les microservices, les plateformes SaaS, e-commerce, marketplaces et APIs.

**Use Cases Client:**
1. **Cloud-Native & Containerized Applications:** Optimized foundation for Kubernetes workloads, microservices and CI/CD pipelines.
2. **Scalable Web & API Platforms:** Run customer-facing applications with predictable performance and cost control. Ideal for SaaS, e-commerce, marketplaces and APIs.
3. **Data Processing & AI Inference:** Efficient compute and GPU instances for data analytics, ML inference and batch processing.

**Types de clients cibles:**
- Startups et PME développant des applications web
- Entreprises avec applications cloud-native
- Développeurs d'APIs et microservices
- Équipes DevOps utilisant Kubernetes
- Organisations avec besoins de scalabilité

**Flavors Disponibles:**

| Flavor | vCPU | Fréquence | RAM | Stockage | RAID | Bande passante | Prix |
|--------|------|-----------|-----|----------|------|----------------|------|
| b2-7 | 2 | 2 GHz | 7 Go | 50 GiB SSD | local | 250 Mbit/s | 0.07 € / heure ou 24.20 € / mois |
| b2-15 | 4 | 2 GHz | 15 Go | 100 GiB SSD | local | 250 Mbit/s | 0.13 € / heure ou 46.20 € / mois |
| b2-30 | 8 | 2 GHz | 30 Go | 200 GiB SSD | local | 500 Mbit/s | 0.26 € / heure ou 93.50 € / mois |
| b2-60 | 16 | 2 GHz | 60 Go | 400 GiB SSD | local | 1000 Mbit/s | 0.51 € / heure ou 182.00 € / mois |
| b2-120 | 32 | 2 GHz | 120 Go | 400 GiB SSD | local | 10000 Mbit/s | 0.99 € / heure ou 358.00 € / mois |
| b3-8 | 2 | 2.3 GHz | 8 Go | 50 GiB NVMe | local | 500 Mbit/s | 0.09 € / heure ou 0.05 € / heure |
| b3-16 | 4 | 2.3 GHz | 16 Go | 100 GiB NVMe | local | 1000 Mbit/s | 0.19 € / heure ou 0.10 € / heure ou 0.09 € / heure |
| b3-32 | 8 | 2.3 GHz | 32 Go | 200 GiB NVMe | local | 2000 Mbit/s | 0.37 € / heure ou 0.20 € / heure ou 0.19 € / heure |
| b3-64 | 16 | 2.3 GHz | 64 Go | 400 GiB NVMe | local | 4000 Mbit/s | 0.74 € / heure ou 0.41 € / heure ou 0.37 € / heure |
| b3-128 | 32 | 2.3 GHz | 128 Go | 400 GiB NVMe | local | 8000 Mbit/s | 0.74 € / heure |
| b3-256 | 64 | 2.3 GHz | 256 Go | 400 GiB NVMe | local | 16000 Mbit/s | 1.49 € / heure |
| b3-512 | 128 | 2.3 GHz | 512 Go | 400 GiB NVMe | local | 20000 Mbit/s | 2.98 € / heure |
| b3-640 | 160 | 2.3 GHz | 640 Go | 400 GiB NVMe | local | 20000 Mbit/s | 3.72 € / heure |

**Détails Techniques par Flavor:**

#### b2-7
- **Plan Codes:** `b2-7.consumption`, `b2-7.monthly.postpaid`
- **Prix:** 0.07 € / heure, 24.20 € / mois
- **Spécifications:**
  - CPU: 2 vCPU @ 2 GHz (vCore)
  - Mémoire: 7 Go
  - Stockage: 50 GiB SSD (2000 IOPS)
  - RAID: local
  - Bande passante: 250 Mbit/s

#### b2-15
- **Plan Codes:** `b2-15.consumption`, `b2-15.monthly.postpaid`
- **Prix:** 0.13 € / heure, 46.20 € / mois
- **Spécifications:**
  - CPU: 4 vCPU @ 2 GHz (vCore)
  - Mémoire: 15 Go
  - Stockage: 100 GiB SSD (5000 IOPS)
  - RAID: local
  - Bande passante: 250 Mbit/s

#### b2-30
- **Plan Codes:** `b2-30.consumption`, `b2-30.monthly.postpaid`
- **Prix:** 0.26 € / heure, 93.50 € / mois
- **Spécifications:**
  - CPU: 8 vCPU @ 2 GHz (vCore)
  - Mémoire: 30 Go
  - Stockage: 200 GiB SSD (10000 IOPS)
  - RAID: local
  - Bande passante: 500 Mbit/s

#### b2-60
- **Plan Codes:** `b2-60.consumption`, `b2-60.monthly.postpaid`
- **Prix:** 0.51 € / heure, 182.00 € / mois
- **Spécifications:**
  - CPU: 16 vCPU @ 2 GHz (vCore)
  - Mémoire: 60 Go
  - Stockage: 400 GiB SSD (12000 IOPS)
  - RAID: local
  - Bande passante: 1000 Mbit/s

#### b2-120
- **Plan Codes:** `b2-120.consumption`, `b2-120.monthly.postpaid`
- **Prix:** 0.99 € / heure, 358.00 € / mois
- **Spécifications:**
  - CPU: 32 vCPU @ 2 GHz (vCore)
  - Mémoire: 120 Go
  - Stockage: 400 GiB SSD (12000 IOPS)
  - RAID: local
  - Bande passante: 10000 Mbit/s (illimitée)

#### b3-8
- **Plan Codes:** `b3-8.consumption.LZ.AF`, `b3-8.consumption.LZ.EU`, `b3-8.consumption`, `b3-8.consumption.3AZ`, `b3-8.consumption.LZ.EUROZONE`
- **Prix:** 0.09 € / heure, 0.05 € / heure
- **Spécifications:**
  - CPU: 2 vCPU @ 2.3 GHz (vCore)
  - Mémoire: 8 Go
  - Stockage: 50 GiB NVMe
  - RAID: local
  - Bande passante: 500 Mbit/s

#### b3-16
- **Plan Codes:** `b3-16.consumption.LZ.AF`, `b3-16.consumption.LZ.EU`, `b3-16.consumption`, `b3-16.consumption.3AZ`, `b3-16.consumption.LZ.EUROZONE`
- **Prix:** 0.19 € / heure, 0.10 € / heure, 0.09 € / heure
- **Spécifications:**
  - CPU: 4 vCPU @ 2.3 GHz (vCore)
  - Mémoire: 16 Go
  - Stockage: 100 GiB NVMe
  - RAID: local
  - Bande passante: 1000 Mbit/s

#### b3-32
- **Plan Codes:** `b3-32.consumption.LZ.AF`, `b3-32.consumption.LZ.EU`, `b3-32.consumption`, `b3-32.consumption.3AZ`, `b3-32.consumption.LZ.EUROZONE`
- **Prix:** 0.37 € / heure, 0.20 € / heure, 0.19 € / heure
- **Spécifications:**
  - CPU: 8 vCPU @ 2.3 GHz (vCore)
  - Mémoire: 32 Go
  - Stockage: 200 GiB NVMe
  - RAID: local
  - Bande passante: 2000 Mbit/s

#### b3-64
- **Plan Codes:** `b3-64.consumption.LZ.AF`, `b3-64.consumption.LZ.EU`, `b3-64.consumption`, `b3-64.consumption.3AZ`, `b3-64.consumption.LZ.EUROZONE`
- **Prix:** 0.74 € / heure, 0.41 € / heure, 0.37 € / heure
- **Spécifications:**
  - CPU: 16 vCPU @ 2.3 GHz (vCore)
  - Mémoire: 64 Go
  - Stockage: 400 GiB NVMe
  - RAID: local
  - Bande passante: 4000 Mbit/s

#### b3-128
- **Plan Codes:** `b3-128.consumption`, `b3-128.consumption.3AZ`
- **Prix:** 0.74 € / heure
- **Spécifications:**
  - CPU: 32 vCPU @ 2.3 GHz (vCore)
  - Mémoire: 128 Go
  - Stockage: 400 GiB NVMe
  - RAID: local
  - Bande passante: 8000 Mbit/s

#### b3-256
- **Plan Codes:** `b3-256.consumption`, `b3-256.consumption.3AZ`
- **Prix:** 1.49 € / heure
- **Spécifications:**
  - CPU: 64 vCPU @ 2.3 GHz (vCore)
  - Mémoire: 256 Go
  - Stockage: 400 GiB NVMe
  - RAID: local
  - Bande passante: 16000 Mbit/s

#### b3-512
- **Plan Codes:** `b3-512.consumption`, `b3-512.consumption.3AZ`
- **Prix:** 2.98 € / heure
- **Spécifications:**
  - CPU: 128 vCPU @ 2.3 GHz (vCore)
  - Mémoire: 512 Go
  - Stockage: 400 GiB NVMe
  - RAID: local
  - Bande passante: 20000 Mbit/s

#### b3-640
- **Plan Codes:** `b3-640.consumption`, `b3-640.consumption.3AZ`
- **Prix:** 3.72 € / heure
- **Spécifications:**
  - CPU: 160 vCPU @ 2.3 GHz (vCore)
  - Mémoire: 640 Go
  - Stockage: 400 GiB NVMe
  - RAID: local
  - Bande passante: 20000 Mbit/s

---

## Storage

### Archive Storage

**URL:** https://www.ovhcloud.com/fr/public-cloud/storage/archive/

**Description:**
Solution de stockage d'archivage longue durée pour données rarement consultées.

**Recommandation d'usage:**
Idéal pour l'archivage de données à long terme, la conformité réglementaire, les sauvegardes et les données qui nécessitent une conservation mais un accès peu fréquent.

**Use Cases Client:**
1. **Containerised applications:** Deploying persistent storage for containerized environments, emphasizing secure, resilient infrastructure supported by triple data replication.
2. **Critical applications:** High fault tolerance, redundancy, and performance for critical applications like high-transaction analytics and data processing.
3. **Hosting relational databases:** Relational databases (e.g., MySQL, PostgreSQL) benefit from Block Storage fast performance and direct access to data blocks.

**Types de clients cibles:**
- Entreprises avec besoins d'archivage réglementaire
- Organisations nécessitant une conservation longue durée
- Entreprises avec stratégies de backup/restore
- Secteurs réglementés (santé, finance, juridique)

**Flavors Disponibles:**

| Flavor | Spécifications Techniques | Prix |
|--------|---------------------------|------|
| archive-replicated | N/A | 0.0000 € / heure ou 0.0024 € / mois |
| bandwidth-archive-in | N/A | 0.01 € / heure |
| bandwidth-archive-out | N/A | Gratuit / heure |

**Détails Techniques par Flavor:**

#### archive-replicated
- **Plan Codes:** `archive.consumption`, `archive.monthly.postpaid`
- **Prix:** 0.0000 € / heure, 0.0024 € / mois
- **Spécifications:** Stockage archive avec réplication

#### bandwidth-archive-in
- **Plan Codes:** `bandwidth_archive_in.consumption`
- **Prix:** 0.01 € / heure
- **Spécifications:** Bande passante entrante pour archive

#### bandwidth-archive-out
- **Plan Codes:** `bandwidth_archive_out.consumption`
- **Prix:** Gratuit / heure
- **Spécifications:** Bande passante sortante pour archive

---

### Block Storage (High Performance)

**URL:** https://www.ovhcloud.com/fr/public-cloud/storage/block-storage/

**Description:**
Stockage bloc haute performance pour applications nécessitant des performances élevées et un accès direct aux blocs de données.

**Recommandation d'usage:**
Parfait pour les bases de données relationnelles, les applications critiques nécessitant de hautes performances, et les environnements containerisés nécessitant un stockage persistant.

**Use Cases Client:**
1. **Containerised applications:** Deploying persistent storage for containerized environments, emphasizing secure, resilient infrastructure supported by triple data replication.
2. **Critical applications:** High fault tolerance, redundancy, and performance for critical applications like high-transaction analytics and data processing.
3. **Hosting relational databases:** Relational databases (e.g., MySQL, PostgreSQL) benefit from Block Storage fast performance and direct access to data blocks.

**Types de clients cibles:**
- Entreprises avec bases de données critiques
- Applications nécessitant haute performance I/O
- Environnements containerisés (Kubernetes, Docker)
- Applications transactionnelles haute charge

**Flavors Disponibles:**

| Flavor | Spécifications Techniques | Prix |
|--------|---------------------------|------|
| high-storage-replicated | N/A | 0.0000 € / heure ou 0.02 € / mois |
| bandwidth-instance-in | N/A | Gratuit / heure |
| bandwidth-instance-out | N/A | Gratuit / heure |
| bandwidth-internal-vrack-in | N/A | Gratuit / heure |
| bandwidth-internal-vrack-out | N/A | Gratuit / heure |

**Détails Techniques par Flavor:**

#### high-storage-replicated
- **Plan Codes:** `storage-high-perf.consumption`, `storage-high-perf.monthly.postpaid`
- **Prix:** 0.0000 € / heure, 0.02 € / mois
- **Spécifications:** Stockage haute performance avec réplication triple

#### bandwidth-instance-in
- **Plan Codes:** `bandwidth_storage-high-perf_in.consumption`
- **Prix:** Gratuit / heure
- **Spécifications:** Bande passante entrante depuis instance

#### bandwidth-instance-out
- **Plan Codes:** `bandwidth_storage-high-perf_out.consumption`
- **Prix:** Gratuit / heure
- **Spécifications:** Bande passante sortante vers instance

---

### Object Storage (Standard)

**URL:** https://www.ovhcloud.com/fr/public-cloud/storage/object-storage/

**Description:**
Stockage objet standard avec API S3 pour le stockage de données non structurées, fichiers, backups et archives.

**Recommandation d'usage:**
Idéal pour le stockage de fichiers statiques, backups, archives, médias, et données nécessitant un accès via API S3.

**Use Cases Client:**
1. **Containerised applications:** Deploying persistent storage for containerized environments, emphasizing secure, resilient infrastructure supported by triple data replication.
2. **Critical applications:** High fault tolerance, redundancy, and performance for critical applications like high-transaction analytics and data processing.
3. **Hosting relational databases:** Relational databases (e.g., MySQL, PostgreSQL) benefit from Block Storage fast performance and direct access to data blocks.

**Types de clients cibles:**
- Applications nécessitant stockage objet scalable
- Backups et archives
- Distribution de contenu statique
- Applications utilisant API S3

**Flavors Disponibles:**

| Flavor | Spécifications Techniques | Prix |
|--------|---------------------------|------|
| storage-replicated | N/A | 0.0000 € / heure ou 0.01 € / mois |
| bandwidth-storage-in | N/A | Gratuit / heure |
| bandwidth-storage-out | N/A | Gratuit / heure |

**Détails Techniques par Flavor:**

#### storage-replicated
- **Plan Codes:** `storage.consumption`, `storage.monthly.postpaid`
- **Prix:** 0.0000 € / heure, 0.01 € / mois
- **Spécifications:** Stockage objet standard avec réplication triple

#### bandwidth-storage-in
- **Plan Codes:** `bandwidth_storage_in.consumption`
- **Prix:** Gratuit / heure
- **Spécifications:** Bande passante entrante

#### bandwidth-storage-out
- **Plan Codes:** `bandwidth_storage.consumption`
- **Prix:** Gratuit / heure
- **Spécifications:** Bande passante sortante

---

### Standard Object Storage - S3 API - 3AZ

**URL:** https://www.ovhcloud.com/fr/public-cloud/storage/object-storage/

**Description:**
Stockage objet standard avec API S3 et réplication sur 3 zones de disponibilité pour haute disponibilité.

**Recommandation d'usage:**
Parfait pour les applications critiques nécessitant une haute disponibilité avec réplication multi-zones.

**Use Cases Client:**
1. **Containerised applications:** Deploying persistent storage for containerized environments, emphasizing secure, resilient infrastructure supported by triple data replication.
2. **Critical applications:** High fault tolerance, redundancy, and performance for critical applications like high-transaction analytics and data processing.
3. **Hosting relational databases:** Relational databases (e.g., MySQL, PostgreSQL) benefit from Block Storage fast performance and direct access to data blocks.

**Types de clients cibles:**
- Applications critiques nécessitant haute disponibilité
- Données nécessitant réplication multi-zones
- Applications utilisant API S3 avec résilience

**Flavors Disponibles:**

| Flavor | Spécifications Techniques | Prix |
|--------|---------------------------|------|
| storage-standard-3AZ | N/A | Gratuit / heure |
| bandwidth_storage-standard-3AZ_in | N/A | Gratuit / heure |
| bandwidth_storage-standard-3AZ_out | N/A | Gratuit / heure |
| bandwidth_storage-standard-3AZ_in_internal | N/A | Gratuit / heure |
| bandwidth_storage-standard-3AZ_out_internal | N/A | Gratuit / heure |

**Détails Techniques par Flavor:**

#### storage-standard-3AZ
- **Plan Codes:** `storage-standard-3AZ.consumption`
- **Prix:** Gratuit / heure
- **Spécifications:** Stockage objet standard avec réplication 3 zones

---

### Standard Object Storage - S3 API

**URL:** https://www.ovhcloud.com/fr/public-cloud/storage/object-storage/

**Description:**
Stockage objet standard avec API S3 pour le stockage de données avec réplication standard.

**Recommandation d'usage:**
Idéal pour le stockage de fichiers, backups et données nécessitant un accès via API S3.

**Use Cases Client:**
1. **Containerised applications:** Deploying persistent storage for containerized environments, emphasizing secure, resilient infrastructure supported by triple data replication.
2. **Critical applications:** High fault tolerance, redundancy, and performance for critical applications like high-transaction analytics and data processing.
3. **Hosting relational databases:** Relational databases (e.g., MySQL, PostgreSQL) benefit from Block Storage fast performance and direct access to data blocks.

**Types de clients cibles:**
- Applications nécessitant stockage objet
- Backups et archives
- Distribution de contenu

**Flavors Disponibles:**

| Flavor | Spécifications Techniques | Prix |
|--------|---------------------------|------|
| storage-replicated | N/A | 0.0000 € / heure ou 0.01 € / mois |
| bandwidth-instance-in | N/A | Gratuit / heure |
| bandwidth-instance-out | N/A | Gratuit / heure |
| bandwidth-internal-vrack-in | N/A | Gratuit / heure |
| bandwidth-internal-vrack-out | N/A | Gratuit / heure |

**Détails Techniques par Flavor:**

#### storage-replicated
- **Plan Codes:** `storage-standard.consumption.LZ.AF`, `storage-standard.consumption`, `storage-standard.monthly.postpaid`, `storage-standard.consumption.LZ.EU`, `storage-standard.consumption.LZ`
- **Prix:** 0.0000 € / heure, 0.01 € / mois
- **Spécifications:** Stockage objet standard avec réplication

---

### Cold Archive

**URL:** https://www.ovhcloud.com/fr/public-cloud/storage/cold-archive/

**Description:**
Stockage archive à froid pour données rarement consultées, avec coûts de stockage très bas et coûts de restauration.

**Recommandation d'usage:**
Idéal pour les archives long terme, conformité réglementaire, backups de sauvegarde, données rarement consultées.

**Use Cases Client:**
1. **Containerised applications:** Deploying persistent storage for containerized environments, emphasizing secure, resilient infrastructure supported by triple data replication.
2. **Critical applications:** High fault tolerance, redundancy, and performance for critical applications like high-transaction analytics and data processing.
3. **Hosting relational databases:** Relational databases (e.g., MySQL, PostgreSQL) benefit from Block Storage fast performance and direct access to data blocks.

**Types de clients cibles:**
- Archives long terme
- Conformité réglementaire
- Backups de sauvegarde
- Données rarement consultées

**Flavors Disponibles:**

| Flavor | Spécifications Techniques | Prix |
|--------|---------------------------|------|
| coldarchive.archive.hour | N/A | 0.0000 € / heure |
| coldarchive.restore.unit | N/A | 0.0049 € / heure |

**Détails Techniques par Flavor:**

#### coldarchive.archive.hour
- **Plan Codes:** `coldarchive.archive.hour.consumption`
- **Prix:** 0.0000 € / heure
- **Spécifications:** Stockage archive à froid

#### coldarchive.restore.unit
- **Plan Codes:** `coldarchive.restore.unit.consumption`
- **Prix:** 0.0049 € / heure
- **Spécifications:** Restauration depuis archive

---

### Infrequent Access Object Storage

**URL:** https://www.ovhcloud.com/fr/public-cloud/storage/object-storage/

**Description:**
Stockage objet pour accès peu fréquent, avec coûts de stockage réduits et coûts de récupération.

**Recommandation d'usage:**
Parfait pour les données consultées occasionnellement, backups, logs archivés, données de conformité.

**Use Cases Client:**
1. **Containerised applications:** Deploying persistent storage for containerized environments, emphasizing secure, resilient infrastructure supported by triple data replication.
2. **Critical applications:** High fault tolerance, redundancy, and performance for critical applications like high-transaction analytics and data processing.
3. **Hosting relational databases:** Relational databases (e.g., MySQL, PostgreSQL) benefit from Block Storage fast performance and direct access to data blocks.

**Types de clients cibles:**
- Données consultées occasionnellement
- Backups et logs archivés
- Données de conformité
- Archives avec accès occasionnel

**Flavors Disponibles:**

| Flavor | Spécifications Techniques | Prix |
|--------|---------------------------|------|
| storage-standard-ia | N/A | 0.0000 € / heure |
| retrieval_storage-standard-ia | N/A | 0.0040 € / heure |
| retrieval_storage-standard-ia-3AZ | N/A | 0.0040 € / heure |
| bandwidth-instance-in | N/A | Gratuit / heure |
| bandwidth-instance-out | N/A | Gratuit / heure |

**Détails Techniques par Flavor:**

#### storage-standard-ia
- **Plan Codes:** `storage-standard-ia-3AZ.consumption`, `storage-standard-ia.consumption`
- **Prix:** 0.0000 € / heure
- **Spécifications:** Stockage accès peu fréquent

#### retrieval_storage-standard-ia
- **Plan Codes:** `retrieval_storage-standard-ia.consumption`
- **Prix:** 0.0040 € / heure
- **Spécifications:** Récupération de données

---

### Cold Archive V2

**URL:** https://www.ovhcloud.com/fr/public-cloud/storage/cold-archive/

**Description:**
Stockage archive à froid version 2 pour données très rarement consultées, avec coûts de stockage minimaux.

**Recommandation d'usage:**
Idéal pour les archives très long terme, conformité réglementaire, backups de sauvegarde ultimes.

**Use Cases Client:**
1. **Containerised applications:** Deploying persistent storage for containerized environments, emphasizing secure, resilient infrastructure supported by triple data replication.
2. **Critical applications:** High fault tolerance, redundancy, and performance for critical applications like high-transaction analytics and data processing.
3. **Hosting relational databases:** Relational databases (e.g., MySQL, PostgreSQL) benefit from Block Storage fast performance and direct access to data blocks.

**Types de clients cibles:**
- Archives très long terme
- Conformité réglementaire
- Backups de sauvegarde ultimes

**Flavors Disponibles:**

| Flavor | Spécifications Techniques | Prix |
|--------|---------------------------|------|
| storage-replicated | N/A | 0.0000 € / heure |
| retrieval_storage-standard-ia-3AZ | N/A | 0.01 € / heure |

**Détails Techniques par Flavor:**

#### storage-replicated
- **Plan Codes:** `storage-deep-archive-3AZ.consumption`
- **Prix:** 0.0000 € / heure
- **Spécifications:** Stockage archive profond

#### retrieval_storage-standard-ia-3AZ
- **Plan Codes:** `deep-archive-restore-3AZ.consumption`
- **Prix:** 0.01 € / heure
- **Spécifications:** Restauration depuis archive profond

---

### Block Storage Volumes

**URL:** https://www.ovhcloud.com/fr/public-cloud/storage/block-storage/

**Description:**
Volumes de stockage bloc attachables aux instances pour stockage persistant avec différentes classes de performance.

**Recommandation d'usage:**
Parfait pour les bases de données, applications nécessitant stockage persistant, volumes attachables dynamiquement.

**Use Cases Client:**
1. **Containerised applications:** Deploying persistent storage for containerized environments, emphasizing secure, resilient infrastructure supported by triple data replication.
2. **Critical applications:** High fault tolerance, redundancy, and performance for critical applications like high-transaction analytics and data processing.
3. **Hosting relational databases:** Relational databases (e.g., MySQL, PostgreSQL) benefit from Block Storage fast performance and direct access to data blocks.

**Types de clients cibles:**
- Bases de données nécessitant stockage persistant
- Applications avec volumes attachables
- Environnements nécessitant flexibilité de stockage

**Flavors Disponibles:**

| Flavor | Spécifications Techniques | Prix |
|--------|---------------------------|------|
| volume.classic | IOPS: 250 | 0.0001 € / heure ou 0.04 € / mois |
| volume.high-speed | IOPS: 3000 | 0.0002 € / heure ou 0.0001 € / heure ou 0.09 € / mois |
| volume.high-speed-gen2 | Bande passante: 0.5 Mbit/s, IOPS: 30 | 0.0001 € / heure ou 0.0002 € / heure ou 0.09 € / mois |

**Détails Techniques par Flavor:**

#### volume.classic
- **Plan Codes:** `volume.classic.consumption.LZ.AF`, `volume.classic.consumption.LZ`, `volume.classic.consumption.LZ.EU`, `volume.classic.consumption`, `volume.classic.monthly.postpaid`, `volume.classic-multiattach.consumption.3AZ`, `volume.classic.consumption.3AZ`
- **Prix:** 0.0001 € / heure, 0.04 € / mois
- **Spécifications:**
  - **IOPS:** 250

#### volume.high-speed
- **Plan Codes:** `volume.high-speed.consumption.LZ.AF`, `volume.high-speed.consumption.LZ`, `volume.high-speed.consumption`, `volume.high-speed.monthly.postpaid`, `volume.high-speed.consumption.LZ.EU`, `volume.high-speed.consumption.3AZ`
- **Prix:** 0.0002 € / heure, 0.0001 € / heure, 0.09 € / mois
- **Spécifications:**
  - **IOPS:** 3000

#### volume.high-speed-gen2
- **Plan Codes:** `volume.high-speed-gen2.consumption.3AZ`, `volume.high-speed-gen2.consumption.LZ.AF`, `volume.high-speed-gen2.consumption.LZ.EU`, `volume.high-speed-gen2.consumption.LZ`, `volume.high-speed-gen2.consumption`, `volume.high-speed-gen2.monthly.postpaid`
- **Prix:** 0.0001 € / heure, 0.0002 € / heure, 0.09 € / mois
- **Spécifications:**
  - **Bande passante:** 0.5 Mbit/s
  - **IOPS:** 30

---

### Volume Snapshots

**URL:** https://www.ovhcloud.com/fr/public-cloud/storage/block-storage/

**Description:**
Snapshots de volumes pour sauvegardes instantanées et restauration de volumes de stockage bloc.

**Recommandation d'usage:**
Idéal pour les sauvegardes de volumes, points de restauration, copies de volumes pour tests.

**Use Cases Client:**
1. **Containerised applications:** Deploying persistent storage for containerized environments, emphasizing secure, resilient infrastructure supported by triple data replication.
2. **Critical applications:** High fault tolerance, redundancy, and performance for critical applications like high-transaction analytics and data processing.
3. **Hosting relational databases:** Relational databases (e.g., MySQL, PostgreSQL) benefit from Block Storage fast performance and direct access to data blocks.

**Types de clients cibles:**
- Sauvegardes de volumes
- Points de restauration
- Copies de volumes pour tests

**Flavors Disponibles:**

| Flavor | Spécifications Techniques | Prix |
|--------|---------------------------|------|
| volume.snapshot | N/A | 0.0001 € / heure ou 0.04 € / mois |

**Détails Techniques par Flavor:**

#### volume.snapshot
- **Plan Codes:** `volume.snapshot.consumption`, `volume.snapshot.monthly.postpaid`, `volume.snapshot.consumption.LZ.AF`, `volume.snapshot.consumption.LZ.EU`, `volume.snapshot.consumption.LZ`, `volume.snapshot.consumption.3AZ`
- **Prix:** 0.0001 € / heure, 0.04 € / mois
- **Spécifications:** Snapshot de volume de stockage bloc

---

## Database

### Managed Databases - MySQL

**URL:** https://www.ovhcloud.com/fr/public-cloud/databases/mysql/

**Description:**
Base de données MySQL managée avec haute disponibilité, sauvegardes automatiques et scaling vertical.

**Recommandation d'usage:**
Idéal pour les applications web, e-commerce, CMS (WordPress, Drupal), et toute application nécessitant une base de données relationnelle MySQL avec gestion simplifiée.

**Use Cases Client:**
1. **Managing High Volumes of Structured Data:** SQL engines provide high-performance, reliable transactional data storage with ACID compliance, ensuring data integrity for all transactions.
2. **Multimedia data organization & analysis:** When it is crucial to organize multiple types of data and deliver it fast to end users in a personalized way, NoSQL engines will provide higher performance and scalability.
3. **Managing Real-Time Data and Caching:** In-memory databases (IMDBs) offer ultra-fast data access by storing data directly in RAM instead of traditional disk-based storage. This architecture enables low-latency real-time processing and immediate data retrieval.

**Types de clients cibles:**
- Développeurs d'applications web
- E-commerce et marketplaces
- CMS et sites web dynamiques
- Applications nécessitant bases de données relationnelles
- Startups et PME

**Flavors Disponibles:**

| Flavor | vCPU | RAM | Stockage | Bande passante | Prix |
|--------|------|-----|----------|----------------|------|
| Business DB1-4 | 2 | 4 Go | 80 GiB | 250 Mbit/s | 0.09 € / heure |
| Business DB1-7 | 2 | 7 Go | 160 GiB | 250 Mbit/s | 0.18 € / heure ou 0.17 € / heure |
| Business DB1-15 | 4 | 15 Go | 320 GiB | 250 Mbit/s | 0.35 € / heure |
| Business DB1-30 | 8 | 30 Go | 640 GiB | 500 Mbit/s | 0.71 € / heure ou 0.69 € / heure |
| Business DB1-60 | 16 | 60 Go | 1280 GiB | 1000 Mbit/s | 1.42 € / heure ou 1.39 € / heure |
| Business DB1-120 | 32 | 120 Go | 2560 GiB | 10000 Mbit/s | 2.83 € / heure ou 2.78 € / heure |
| Production B3-8 | 2 | 8 Go | 160 GiB | 500 Mbit/s | 0.23 € / heure ou 0.21 € / heure |
| Production B3-16 | 4 | 16 Go | 320 GiB | 1000 Mbit/s | 0.45 € / heure ou 0.43 € / heure |
| Production B3-32 | 8 | 32 Go | 640 GiB | 2000 Mbit/s | 0.90 € / heure ou 0.85 € / heure |
| Production B3-64 | 16 | 64 Go | 1280 GiB | 4000 Mbit/s | 1.80 € / heure ou 1.70 € / heure |
| Production B3-128 | 32 | 128 Go | 2560 GiB | 8000 Mbit/s | 3.61 € / heure ou 3.41 € / heure |
| Production B3-256 | 64 | 256 Go | 5120 GiB | 16000 Mbit/s | 7.21 € / heure ou 6.81 € / heure |

**Détails Techniques par Flavor:**

#### Business DB1-4
- **Plan Codes:** `databases.mysql-business-db1-4.hour.consumption`, `databases.mysql-business-db1-4.hour.consumption.apac`
- **Prix:** 0.09 € / heure
- **Spécifications:**
  - CPU: 2 vCPU
  - Mémoire: 4 Go
  - Stockage: 80 GiB
  - Bande passante: 250 Mbit/s

#### Business DB1-7
- **Plan Codes:** `databases.mysql-business-db1-7.hour.consumption`, `databases.mysql-business-db1-7.hour.consumption.apac`
- **Prix:** 0.18 € / heure, 0.17 € / heure
- **Spécifications:**
  - CPU: 2 vCPU
  - Mémoire: 7 Go
  - Stockage: 160 GiB
  - Bande passante: 250 Mbit/s

#### Business DB1-15
- **Plan Codes:** `databases.mysql-business-db1-15.hour.consumption`, `databases.mysql-business-db1-15.hour.consumption.apac`
- **Prix:** 0.35 € / heure
- **Spécifications:**
  - CPU: 4 vCPU
  - Mémoire: 15 Go
  - Stockage: 320 GiB
  - Bande passante: 250 Mbit/s

#### Business DB1-30
- **Plan Codes:** `databases.mysql-business-db1-30.hour.consumption`, `databases.mysql-business-db1-30.hour.consumption.apac`
- **Prix:** 0.71 € / heure, 0.69 € / heure
- **Spécifications:**
  - CPU: 8 vCPU
  - Mémoire: 30 Go
  - Stockage: 640 GiB
  - Bande passante: 500 Mbit/s

#### Business DB1-60
- **Plan Codes:** `databases.mysql-business-db1-60.hour.consumption`, `databases.mysql-business-db1-60.hour.consumption.apac`
- **Prix:** 1.42 € / heure, 1.39 € / heure
- **Spécifications:**
  - CPU: 16 vCPU
  - Mémoire: 60 Go
  - Stockage: 1280 GiB
  - Bande passante: 1000 Mbit/s

#### Business DB1-120
- **Plan Codes:** `databases.mysql-business-db1-120.hour.consumption`, `databases.mysql-business-db1-120.hour.consumption.apac`
- **Prix:** 2.83 € / heure, 2.78 € / heure
- **Spécifications:**
  - CPU: 32 vCPU
  - Mémoire: 120 Go
  - Stockage: 2560 GiB
  - Bande passante: 10000 Mbit/s

#### Production B3-8
- **Plan Codes:** `databases.mysql-production-b3-8.hour.consumption`, `databases.mysql-production-b3-8.hour.consumption.apac`
- **Prix:** 0.23 € / heure, 0.21 € / heure
- **Spécifications:**
  - CPU: 2 vCPU
  - Mémoire: 8 Go
  - Stockage: 160 GiB
  - Bande passante: 500 Mbit/s

#### Production B3-16
- **Plan Codes:** `databases.mysql-production-b3-16.hour.consumption`, `databases.mysql-production-b3-16.hour.consumption.apac`
- **Prix:** 0.45 € / heure, 0.43 € / heure
- **Spécifications:**
  - CPU: 4 vCPU
  - Mémoire: 16 Go
  - Stockage: 320 GiB
  - Bande passante: 1000 Mbit/s

#### Production B3-32
- **Plan Codes:** `databases.mysql-production-b3-32.hour.consumption`, `databases.mysql-production-b3-32.hour.consumption.apac`
- **Prix:** 0.90 € / heure, 0.85 € / heure
- **Spécifications:**
  - CPU: 8 vCPU
  - Mémoire: 32 Go
  - Stockage: 640 GiB
  - Bande passante: 2000 Mbit/s

#### Production B3-64
- **Plan Codes:** `databases.mysql-production-b3-64.hour.consumption`, `databases.mysql-production-b3-64.hour.consumption.apac`
- **Prix:** 1.80 € / heure, 1.70 € / heure
- **Spécifications:**
  - CPU: 16 vCPU
  - Mémoire: 64 Go
  - Stockage: 1280 GiB
  - Bande passante: 4000 Mbit/s

#### Production B3-128
- **Plan Codes:** `databases.mysql-production-b3-128.hour.consumption`, `databases.mysql-production-b3-128.hour.consumption.apac`
- **Prix:** 3.61 € / heure, 3.41 € / heure
- **Spécifications:**
  - CPU: 32 vCPU
  - Mémoire: 128 Go
  - Stockage: 2560 GiB
  - Bande passante: 8000 Mbit/s

#### Production B3-256
- **Plan Codes:** `databases.mysql-production-b3-256.hour.consumption`, `databases.mysql-production-b3-256.hour.consumption.apac`
- **Prix:** 7.21 € / heure, 6.81 € / heure
- **Spécifications:**
  - CPU: 64 vCPU
  - Mémoire: 256 Go
  - Stockage: 5120 GiB
  - Bande passante: 16000 Mbit/s

---

---

### Metal Instances (Bare Metal)

**URL:** https://www.ovhcloud.com/fr/public-cloud/instances/metal/

**Description:**
Instances bare metal dédiées pour des performances maximales et un contrôle total de l'infrastructure.

**Recommandation d'usage:**
Idéales pour les workloads nécessitant des performances dédiées, la conformité réglementaire, ou des applications nécessitant un accès direct au matériel.

**Use Cases Client:**
1. **Cloud-Native & Containerized Applications:** Optimized foundation for Kubernetes workloads, microservices and CI/CD pipelines.
2. **Scalable Web & API Platforms:** Run customer-facing applications with predictable performance and cost control. Ideal for SaaS, e-commerce, marketplaces and APIs.
3. **Data Processing & AI Inference:** Efficient compute and GPU instances for data analytics, ML inference and batch processing.

**Types de clients cibles:**
- Entreprises nécessitant des performances dédiées
- Applications avec besoins de conformité réglementaire
- Workloads nécessitant un accès direct au matériel
- Organisations avec besoins de sécurité renforcée

**Flavors Disponibles:**

| Flavor | vCPU | Fréquence | RAM | Stockage | Bande passante | Prix |
|--------|------|-----------|-----|----------|----------------|------|
| bm-l1 | 16 | 3.1 GHz | 128 Go | 960 GiB SSD | 1000 Mbit/s | 1.45 € / heure ou 520.00 € / mois |
| bm-m1 | 8 | 3.7 GHz | 64 Go | 960 GiB SSD | 1000 Mbit/s | 0.85 € / heure ou 300.00 € / mois |
| bm-s1 | 4 | 4 GHz | 32 Go | 960 GiB SSD | 1000 Mbit/s | 0.50 € / heure ou 170.00 € / mois |

**Détails Techniques par Flavor:**

#### bm-l1
- **Plan Codes:** `bm-l1.consumption`, `bm-l1.monthly.postpaid`
- **Prix:** 1.45 € / heure, 520.00 € / mois
- **Spécifications:**
  - CPU: 16 vCPU @ 3.1 GHz (EPYC 7371)
  - Mémoire: 128 Go
  - Stockage: 960 GiB SSD
  - Bande passante: 1000 Mbit/s

#### bm-m1
- **Plan Codes:** `bm-m1.consumption`, `bm-m1.monthly.postpaid`
- **Prix:** 0.85 € / heure, 300.00 € / mois
- **Spécifications:**
  - CPU: 8 vCPU @ 3.7 GHz (Xeon-E 2288G)
  - Mémoire: 64 Go
  - Stockage: 960 GiB SSD
  - Bande passante: 1000 Mbit/s

#### bm-s1
- **Plan Codes:** `bm-s1.consumption`, `bm-s1.monthly.postpaid`
- **Prix:** 0.50 € / heure, 170.00 € / mois
- **Spécifications:**
  - CPU: 4 vCPU @ 4 GHz (Xeon-E 2274G)
  - Mémoire: 32 Go
  - Stockage: 960 GiB SSD
  - Bande passante: 1000 Mbit/s

---

### CPU Optimized Instances

**URL:** https://www.ovhcloud.com/fr/public-cloud/instances/

**Description:**
Instances optimisées pour les charges de travail nécessitant beaucoup de CPU.

**Recommandation d'usage:**
Idéales pour les applications nécessitant beaucoup de CPU : calculs intensifs, traitement de données, encoding vidéo, simulations.

**Use Cases Client:**
1. **Cloud-Native & Containerized Applications:** Optimized foundation for Kubernetes workloads, microservices and CI/CD pipelines.
2. **Scalable Web & API Platforms:** Run customer-facing applications with predictable performance and cost control. Ideal for SaaS, e-commerce, marketplaces and APIs.
3. **Data Processing & AI Inference:** Efficient compute and GPU instances for data analytics, ML inference and batch processing.

**Types de clients cibles:**
- Applications nécessitant beaucoup de CPU
- Calculs intensifs et HPC
- Traitement de données volumineuses
- Encoding vidéo et transcodage

**Flavors Disponibles:**

| Flavor | vCPU | Fréquence | RAM | Stockage | RAID | Bande passante | Prix |
|--------|------|-----------|-----|----------|------|----------------|------|
| c2-7 | 2 | 3 GHz | 7 Go | 50 GiB SSD | local | 250 Mbit/s | 0.10 € / heure ou 35.20 € / mois |
| c2-15 | 4 | 3 GHz | 15 Go | 100 GiB SSD | local | 250 Mbit/s | 0.19 € / heure ou 68.20 € / mois |
| c2-30 | 8 | 3 GHz | 30 Go | 200 GiB SSD | local | 500 Mbit/s | 0.38 € / heure ou 138.00 € / mois |
| c2-60 | 16 | 3 GHz | 60 Go | 400 GiB SSD | local | 1000 Mbit/s | 0.75 € / heure ou 270.00 € / mois |
| c2-120 | 32 | 3 GHz | 120 Go | 400 GiB SSD | local | 10000 Mbit/s | 1.48 € / heure ou 534.00 € / mois |
| c3-4 | 2 | 2.3 GHz | 4 Go | 50 GiB NVMe | local | 250 Mbit/s | 0.04 € / heure |
| c3-8 | 4 | 2.3 GHz | 8 Go | 100 GiB NVMe | local | 500 Mbit/s | 0.08 € / heure |
| c3-16 | 8 | 2.3 GHz | 16 Go | 200 GiB NVMe | local | 1000 Mbit/s | 0.17 € / heure |
| c3-32 | 16 | 2.3 GHz | 32 Go | 400 GiB NVMe | local | 2000 Mbit/s | 0.33 € / heure |
| c3-64 | 32 | 2.3 GHz | 64 Go | 400 GiB NVMe | local | 4000 Mbit/s | 0.66 € / heure |
| c3-128 | 64 | 2.3 GHz | 128 Go | 400 GiB NVMe | local | 8000 Mbit/s | 1.33 € / heure |
| c3-256 | 128 | 2.3 GHz | 256 Go | 400 GiB NVMe | local | 20000 Mbit/s | 2.65 € / heure |
| c3-320 | 160 | 2.3 GHz | 320 Go | 400 GiB NVMe | local | 20000 Mbit/s | 3.32 € / heure |

**Détails Techniques par Flavor:**

#### c2-7
- **Plan Codes:** `c2-7.consumption`, `c2-7.monthly.postpaid`
- **Prix:** 0.10 € / heure, 35.20 € / mois
- **Spécifications:**
  - CPU: 2 vCPU @ 3 GHz (vCore)
  - Mémoire: 7 Go
  - Stockage: 50 GiB SSD (2000 IOPS)
  - RAID: local
  - Bande passante: 250 Mbit/s

#### c2-15
- **Plan Codes:** `c2-15.consumption`, `c2-15.monthly.postpaid`
- **Prix:** 0.19 € / heure, 68.20 € / mois
- **Spécifications:**
  - CPU: 4 vCPU @ 3 GHz (vCore)
  - Mémoire: 15 Go
  - Stockage: 100 GiB SSD (5000 IOPS)
  - RAID: local
  - Bande passante: 250 Mbit/s

#### c2-30
- **Plan Codes:** `c2-30.consumption`, `c2-30.monthly.postpaid`
- **Prix:** 0.38 € / heure, 138.00 € / mois
- **Spécifications:**
  - CPU: 8 vCPU @ 3 GHz (vCore)
  - Mémoire: 30 Go
  - Stockage: 200 GiB SSD (10000 IOPS)
  - RAID: local
  - Bande passante: 500 Mbit/s

#### c2-60
- **Plan Codes:** `c2-60.consumption`, `c2-60.monthly.postpaid`
- **Prix:** 0.75 € / heure, 270.00 € / mois
- **Spécifications:**
  - CPU: 16 vCPU @ 3 GHz (vCore)
  - Mémoire: 60 Go
  - Stockage: 400 GiB SSD (10000 IOPS)
  - RAID: local
  - Bande passante: 1000 Mbit/s

#### c2-120
- **Plan Codes:** `c2-120.consumption`, `c2-120.monthly.postpaid`
- **Prix:** 1.48 € / heure, 534.00 € / mois
- **Spécifications:**
  - CPU: 32 vCPU @ 3 GHz (vCore)
  - Mémoire: 120 Go
  - Stockage: 400 GiB SSD (10000 IOPS)
  - RAID: local
  - Bande passante: 10000 Mbit/s (illimitée)

#### c3-4
- **Plan Codes:** `c3-4.consumption`
- **Prix:** 0.04 € / heure
- **Spécifications:**
  - CPU: 2 vCPU @ 2.3 GHz (vCore)
  - Mémoire: 4 Go
  - Stockage: 50 GiB NVMe
  - RAID: local
  - Bande passante: 250 Mbit/s

#### c3-8
- **Plan Codes:** `c3-8.consumption`
- **Prix:** 0.08 € / heure
- **Spécifications:**
  - CPU: 4 vCPU @ 2.3 GHz (vCore)
  - Mémoire: 8 Go
  - Stockage: 100 GiB NVMe
  - RAID: local
  - Bande passante: 500 Mbit/s

#### c3-16
- **Plan Codes:** `c3-16.consumption`
- **Prix:** 0.17 € / heure
- **Spécifications:**
  - CPU: 8 vCPU @ 2.3 GHz (vCore)
  - Mémoire: 16 Go
  - Stockage: 200 GiB NVMe
  - RAID: local
  - Bande passante: 1000 Mbit/s

#### c3-32
- **Plan Codes:** `c3-32.consumption`
- **Prix:** 0.33 € / heure
- **Spécifications:**
  - CPU: 16 vCPU @ 2.3 GHz (vCore)
  - Mémoire: 32 Go
  - Stockage: 400 GiB NVMe
  - RAID: local
  - Bande passante: 2000 Mbit/s

#### c3-64
- **Plan Codes:** `c3-64.consumption`
- **Prix:** 0.66 € / heure
- **Spécifications:**
  - CPU: 32 vCPU @ 2.3 GHz (vCore)
  - Mémoire: 64 Go
  - Stockage: 400 GiB NVMe
  - RAID: local
  - Bande passante: 4000 Mbit/s

#### c3-128
- **Plan Codes:** `c3-128.consumption`
- **Prix:** 1.33 € / heure
- **Spécifications:**
  - CPU: 64 vCPU @ 2.3 GHz (vCore)
  - Mémoire: 128 Go
  - Stockage: 400 GiB NVMe
  - RAID: local
  - Bande passante: 8000 Mbit/s

#### c3-256
- **Plan Codes:** `c3-256.consumption`
- **Prix:** 2.65 € / heure
- **Spécifications:**
  - CPU: 128 vCPU @ 2.3 GHz (vCore)
  - Mémoire: 256 Go
  - Stockage: 400 GiB NVMe
  - RAID: local
  - Bande passante: 20000 Mbit/s

#### c3-320
- **Plan Codes:** `c3-320.consumption`
- **Prix:** 3.32 € / heure
- **Spécifications:**
  - CPU: 160 vCPU @ 2.3 GHz (vCore)
  - Mémoire: 320 Go
  - Stockage: 400 GiB NVMe
  - RAID: local
  - Bande passante: 20000 Mbit/s

---

### RAM Optimized Instances

**URL:** https://www.ovhcloud.com/fr/public-cloud/instances/

**Description:**
Instances optimisées pour les charges de travail nécessitant beaucoup de RAM.

**Recommandation d'usage:**
Idéales pour les bases de données en mémoire, le cache distribué, l'analyse de données volumineuses, et les applications nécessitant beaucoup de mémoire.

**Use Cases Client:**
1. **Cloud-Native & Containerized Applications:** Optimized foundation for Kubernetes workloads, microservices and CI/CD pipelines.
2. **Scalable Web & API Platforms:** Run customer-facing applications with predictable performance and cost control. Ideal for SaaS, e-commerce, marketplaces and APIs.
3. **Data Processing & AI Inference:** Efficient compute and GPU instances for data analytics, ML inference and batch processing.

**Types de clients cibles:**
- Bases de données en mémoire (Redis, Memcached)
- Applications nécessitant beaucoup de RAM
- Analyse de données volumineuses
- Cache distribué

**Flavors Disponibles:**

| Flavor | vCPU | Fréquence | RAM | Stockage | RAID | Bande passante | Prix |
|--------|------|-----------|-----|----------|------|----------------|------|
| r2-15 | 2 | 2.2 GHz | 15 Go | 50 GiB SSD | local | 250 Mbit/s | 0.10 € / heure ou 35.20 € / mois |
| r2-30 | 2 | 2.2 GHz | 30 Go | 50 GiB SSD | local | 250 Mbit/s | 0.11 € / heure ou 40.70 € / mois |
| r2-60 | 4 | 2.2 GHz | 60 Go | 100 GiB SSD | local | 250 Mbit/s | 0.22 € / heure ou 79.20 € / mois |
| r2-120 | 8 | 2.2 GHz | 120 Go | 200 GiB SSD | local | 1000 Mbit/s | 0.44 € / heure ou 160.00 € / mois |
| r2-240 | 16 | 2.2 GHz | 240 Go | 400 GiB SSD | local | 10000 Mbit/s | 0.87 € / heure ou 314.00 € / mois |
| r3-16 | 2 | 2.3 GHz | 16 Go | 50 GiB NVMe | local | 500 Mbit/s | 0.06 € / heure |
| r3-32 | 4 | 2.3 GHz | 32 Go | 100 GiB NVMe | local | 1000 Mbit/s | 0.12 € / heure |
| r3-64 | 8 | 2.3 GHz | 64 Go | 200 GiB NVMe | local | 2000 Mbit/s | 0.24 € / heure |
| r3-128 | 16 | 2.3 GHz | 128 Go | 400 GiB NVMe | local | 4000 Mbit/s | 0.48 € / heure |
| r3-256 | 32 | 2.3 GHz | 256 Go | 400 GiB NVMe | local | 8000 Mbit/s | 0.96 € / heure |
| r3-512 | 64 | 2.3 GHz | 512 Go | 400 GiB NVMe | local | 20000 Mbit/s | 1.93 € / heure |
| r3-1024 | 128 | 2.3 GHz | 1024 Go | 400 GiB NVMe | local | 20000 Mbit/s | 3.85 € / heure |

**Détails Techniques par Flavor:**

#### r2-15
- **Plan Codes:** `r2-15.consumption`, `r2-15.monthly.postpaid`
- **Prix:** 0.10 € / heure, 35.20 € / mois
- **Spécifications:**
  - CPU: 2 vCPU @ 2.2 GHz (vCore)
  - Mémoire: 15 Go
  - Stockage: 50 GiB SSD (4000 IOPS)
  - RAID: local
  - Bande passante: 250 Mbit/s

#### r2-30
- **Plan Codes:** `r2-30.consumption`, `r2-30.monthly.postpaid`
- **Prix:** 0.11 € / heure, 40.70 € / mois
- **Spécifications:**
  - CPU: 2 vCPU @ 2.2 GHz (vCore)
  - Mémoire: 30 Go
  - Stockage: 50 GiB SSD (4000 IOPS)
  - RAID: local
  - Bande passante: 250 Mbit/s

#### r2-60
- **Plan Codes:** `r2-60.consumption`, `r2-60.monthly.postpaid`
- **Prix:** 0.22 € / heure, 79.20 € / mois
- **Spécifications:**
  - CPU: 4 vCPU @ 2.2 GHz (vCore)
  - Mémoire: 60 Go
  - Stockage: 100 GiB SSD (6000 IOPS)
  - RAID: local
  - Bande passante: 250 Mbit/s

#### r2-120
- **Plan Codes:** `r2-120.consumption`, `r2-120.monthly.postpaid`
- **Prix:** 0.44 € / heure, 160.00 € / mois
- **Spécifications:**
  - CPU: 8 vCPU @ 2.2 GHz (vCore)
  - Mémoire: 120 Go
  - Stockage: 200 GiB SSD (8000 IOPS)
  - RAID: local
  - Bande passante: 1000 Mbit/s

#### r2-240
- **Plan Codes:** `r2-240.consumption`, `r2-240.monthly.postpaid`
- **Prix:** 0.87 € / heure, 314.00 € / mois
- **Spécifications:**
  - CPU: 16 vCPU @ 2.2 GHz (vCore)
  - Mémoire: 240 Go
  - Stockage: 400 GiB SSD (10000 IOPS)
  - RAID: local
  - Bande passante: 10000 Mbit/s (illimitée)

#### r3-16
- **Plan Codes:** `r3-16.consumption`, `r3-16.consumption.3AZ`
- **Prix:** 0.06 € / heure
- **Spécifications:**
  - CPU: 2 vCPU @ 2.3 GHz (vCore)
  - Mémoire: 16 Go
  - Stockage: 50 GiB NVMe
  - RAID: local
  - Bande passante: 500 Mbit/s

#### r3-32
- **Plan Codes:** `r3-32.consumption`, `r3-32.consumption.3AZ`
- **Prix:** 0.12 € / heure
- **Spécifications:**
  - CPU: 4 vCPU @ 2.3 GHz (vCore)
  - Mémoire: 32 Go
  - Stockage: 100 GiB NVMe
  - RAID: local
  - Bande passante: 1000 Mbit/s

#### r3-64
- **Plan Codes:** `r3-64.consumption`, `r3-64.consumption.3AZ`
- **Prix:** 0.24 € / heure
- **Spécifications:**
  - CPU: 8 vCPU @ 2.3 GHz (vCore)
  - Mémoire: 64 Go
  - Stockage: 200 GiB NVMe
  - RAID: local
  - Bande passante: 2000 Mbit/s

#### r3-128
- **Plan Codes:** `r3-128.consumption`, `r3-128.consumption.3AZ`
- **Prix:** 0.48 € / heure
- **Spécifications:**
  - CPU: 16 vCPU @ 2.3 GHz (vCore)
  - Mémoire: 128 Go
  - Stockage: 400 GiB NVMe
  - RAID: local
  - Bande passante: 4000 Mbit/s

#### r3-256
- **Plan Codes:** `r3-256.consumption`, `r3-256.consumption.3AZ`
- **Prix:** 0.96 € / heure
- **Spécifications:**
  - CPU: 32 vCPU @ 2.3 GHz (vCore)
  - Mémoire: 256 Go
  - Stockage: 400 GiB NVMe
  - RAID: local
  - Bande passante: 8000 Mbit/s (illimitée)

#### r3-512
- **Plan Codes:** `r3-512.consumption`, `r3-512.consumption.3AZ`
- **Prix:** 1.93 € / heure
- **Spécifications:**
  - CPU: 64 vCPU @ 2.3 GHz (vCore)
  - Mémoire: 512 Go
  - Stockage: 400 GiB NVMe
  - RAID: local
  - Bande passante: 20000 Mbit/s (illimitée)

#### r3-1024
- **Plan Codes:** `r3-1024.consumption`, `r3-1024.consumption.3AZ`
- **Prix:** 3.85 € / heure
- **Spécifications:**
  - CPU: 128 vCPU @ 2.3 GHz (vCore)
  - Mémoire: 1024 Go
  - Stockage: 400 GiB NVMe
  - RAID: local
  - Bande passante: 20000 Mbit/s (illimitée)

---

### IOPS Optimized Instances

**URL:** https://www.ovhcloud.com/fr/public-cloud/instances/

**Description:**
Instances optimisées pour les charges de travail nécessitant de hautes performances I/O.

**Recommandation d'usage:**
Idéales pour les bases de données transactionnelles, les applications nécessitant de hautes performances I/O, et les workloads nécessitant un accès disque rapide.

**Use Cases Client:**
1. **Cloud-Native & Containerized Applications:** Optimized foundation for Kubernetes workloads, microservices and CI/CD pipelines.
2. **Scalable Web & API Platforms:** Run customer-facing applications with predictable performance and cost control. Ideal for SaaS, e-commerce, marketplaces and APIs.
3. **Data Processing & AI Inference:** Efficient compute and GPU instances for data analytics, ML inference and batch processing.

**Types de clients cibles:**
- Bases de données transactionnelles
- Applications nécessitant hautes performances I/O
- Workloads nécessitant accès disque rapide

**Flavors Disponibles:**

| Flavor | vCPU | Fréquence | RAM | Stockage | Bande passante | Prix |
|--------|------|-----------|-----|----------|----------------|------|
| i1-45 | 8 | 2.2 GHz | 45 Go | 50 GiB SSD | 1000 Mbit/s | 0.44 € / heure ou 220.00 € / mois |
| i1-90 | 16 | 2.2 GHz | 90 Go | 50 GiB SSD | 2000 Mbit/s | 0.88 € / heure ou 440.00 € / mois |
| i1-180 | 32 | 2.2 GHz | 180 Go | 50 GiB SSD | 8000 Mbit/s | 1.76 € / heure ou 880.00 € / mois |

**Détails Techniques par Flavor:**

#### i1-45
- **Plan Codes:** `i1-45.consumption`, `i1-45.monthly.postpaid`
- **Prix:** 0.44 € / heure, 220.00 € / mois
- **Spécifications:**
  - CPU: 8 vCPU @ 2.2 GHz (vCore)
  - Mémoire: 45 Go
  - Stockage: 50 GiB SSD (2000 IOPS)
  - Bande passante: 1000 Mbit/s

#### i1-90
- **Plan Codes:** `i1-90.consumption`, `i1-90.monthly.postpaid`
- **Prix:** 0.88 € / heure, 440.00 € / mois
- **Spécifications:**
  - CPU: 16 vCPU @ 2.2 GHz (vCore)
  - Mémoire: 90 Go
  - Stockage: 50 GiB SSD (2000 IOPS)
  - Bande passante: 2000 Mbit/s

#### i1-180
- **Plan Codes:** `i1-180.consumption`, `i1-180.monthly.postpaid`
- **Prix:** 1.76 € / heure, 880.00 € / mois
- **Spécifications:**
  - CPU: 32 vCPU @ 2.2 GHz (vCore)
  - Mémoire: 180 Go
  - Stockage: 50 GiB SSD (2000 IOPS)
  - Bande passante: 8000 Mbit/s

---

### Discovery Instances

**URL:** https://www.ovhcloud.com/fr/public-cloud/instances/

**Description:**
Instances découverte à petit prix pour tester et développer.

**Recommandation d'usage:**
Idéales pour les environnements de développement, de test, et les projets nécessitant des ressources minimales.

**Use Cases Client:**
1. **Cloud-Native & Containerized Applications:** Optimized foundation for Kubernetes workloads, microservices and CI/CD pipelines.
2. **Scalable Web & API Platforms:** Run customer-facing applications with predictable performance and cost control. Ideal for SaaS, e-commerce, marketplaces and APIs.
3. **Data Processing & AI Inference:** Efficient compute and GPU instances for data analytics, ML inference and batch processing.

**Types de clients cibles:**
- Développeurs et startups
- Environnements de développement/test
- Projets nécessitant ressources minimales

**Flavors Disponibles:**

| Flavor | vCPU | Fréquence | RAM | Stockage | RAID | Bande passante | Prix |
|--------|------|-----------|-----|----------|------|----------------|------|
| d2-2 | 1 | 2 GHz | 2 Go | 25 GiB | local | 100 Mbit/s | 0.01 € / heure ou 5.49 € / mois |
| d2-4 | 2 | 2 GHz | 4 Go | 50 GiB | local | 250 Mbit/s | 0.02 € / heure ou 11.00 € / mois |
| d2-8 | 4 | 2 GHz | 8 Go | 50 GiB | local | 500 Mbit/s | 0.04 € / heure ou 19.80 € / mois |

**Détails Techniques par Flavor:**

#### d2-2
- **Plan Codes:** `d2-2.consumption`, `d2-2.monthly.postpaid`
- **Prix:** 0.01 € / heure, 5.49 € / mois
- **Spécifications:**
  - CPU: 1 vCPU @ 2 GHz (vCore)
  - Mémoire: 2 Go
  - Stockage: 25 GiB
  - RAID: local
  - Bande passante: 100 Mbit/s

#### d2-4
- **Plan Codes:** `d2-4.consumption`, `d2-4.monthly.postpaid`
- **Prix:** 0.02 € / heure, 11.00 € / mois
- **Spécifications:**
  - CPU: 2 vCPU @ 2 GHz (vCore)
  - Mémoire: 4 Go
  - Stockage: 50 GiB
  - RAID: local
  - Bande passante: 250 Mbit/s

#### d2-8
- **Plan Codes:** `d2-8.consumption`, `d2-8.monthly.postpaid`
- **Prix:** 0.04 € / heure, 19.80 € / mois
- **Spécifications:**
  - CPU: 4 vCPU @ 2 GHz (vCore)
  - Mémoire: 8 Go
  - Stockage: 50 GiB
  - RAID: local
  - Bande passante: 500 Mbit/s

---

### Managed Databases - PostgreSQL

**URL:** https://www.ovhcloud.com/fr/public-cloud/databases/postgresql/

**Description:**
Base de données PostgreSQL managée avec haute disponibilité, sauvegardes automatiques et scaling vertical.

**Recommandation d'usage:**
Idéal pour les applications nécessitant une base de données relationnelle PostgreSQL avec gestion simplifiée, haute disponibilité et performances optimisées.

**Use Cases Client:**
1. **Managing High Volumes of Structured Data:** SQL engines provide high-performance, reliable transactional data storage with ACID compliance, ensuring data integrity for all transactions.
2. **Multimedia data organization & analysis:** When it is crucial to organize multiple types of data and deliver it fast to end users in a personalized way, NoSQL engines will provide higher performance and scalability.
3. **Managing Real-Time Data and Caching:** In-memory databases (IMDBs) offer ultra-fast data access by storing data directly in RAM instead of traditional disk-based storage. This architecture enables low-latency real-time processing and immediate data retrieval.

**Types de clients cibles:**
- Développeurs d'applications nécessitant PostgreSQL
- Applications avec besoins de haute disponibilité
- Projets nécessitant bases de données relationnelles avancées
- Startups et PME

**Flavors Disponibles:**

| Flavor | vCPU | RAM | Stockage | Bande passante | Prix |
|--------|------|-----|----------|----------------|------|
| Business DB1-4 | 2 | 4 Go | 80 GiB | 250 Mbit/s | 0.09 € / heure |
| Business DB1-7 | 2 | 7 Go | 160 GiB | 250 Mbit/s | 0.18 € / heure ou 0.17 € / heure |
| Business DB1-15 | 4 | 15 Go | 320 GiB | 250 Mbit/s | 0.35 € / heure |
| Business DB1-30 | 8 | 30 Go | 640 GiB | 500 Mbit/s | 0.71 € / heure ou 0.69 € / heure |
| Business DB1-60 | 16 | 60 Go | 1280 GiB | 1000 Mbit/s | 1.42 € / heure ou 1.39 € / heure |
| Business DB1-120 | 32 | 120 Go | 2560 GiB | 10000 Mbit/s | 2.83 € / heure ou 2.78 € / heure |
| Production B3-8 | 2 | 8 Go | 160 GiB | 500 Mbit/s | 0.23 € / heure ou 0.21 € / heure |
| Production B3-16 | 4 | 16 Go | 320 GiB | 1000 Mbit/s | 0.45 € / heure ou 0.43 € / heure |
| Production B3-32 | 8 | 32 Go | 640 GiB | 2000 Mbit/s | 0.90 € / heure ou 0.85 € / heure |
| Production B3-64 | 16 | 64 Go | 1280 GiB | 4000 Mbit/s | 1.80 € / heure ou 1.70 € / heure |
| Production B3-128 | 32 | 128 Go | 2560 GiB | 8000 Mbit/s | 3.61 € / heure ou 3.41 € / heure |
| Production B3-256 | 64 | 256 Go | 5120 GiB | 16000 Mbit/s | 7.21 € / heure ou 6.81 € / heure |
| Enterprise DB1-4 | 2 | 4 Go | 80 GiB | 250 Mbit/s | 0.09 € / heure |
| Enterprise DB1-7 | 2 | 7 Go | 160 GiB | 250 Mbit/s | 0.18 € / heure ou 0.17 € / heure |
| Enterprise DB1-15 | 4 | 15 Go | 320 GiB | 250 Mbit/s | 0.35 € / heure |
| Enterprise DB1-30 | 8 | 30 Go | 640 GiB | 500 Mbit/s | 0.71 € / heure ou 0.69 € / heure |
| Enterprise DB1-60 | 16 | 60 Go | 1280 GiB | 1000 Mbit/s | 1.42 € / heure ou 1.39 € / heure |
| Enterprise DB1-120 | 32 | 120 Go | 2560 GiB | 10000 Mbit/s | 2.84 € / heure ou 2.78 € / heure |
| Advanced B3-8 | 2 | 8 Go | 160 GiB | 500 Mbit/s | 0.24 € / heure ou 0.23 € / heure |
| Advanced B3-16 | 4 | 16 Go | 320 GiB | 1000 Mbit/s | 0.49 € / heure ou 0.46 € / heure |
| Advanced B3-32 | 8 | 32 Go | 640 GiB | 2000 Mbit/s | 0.97 € / heure ou 0.92 € / heure |
| Advanced B3-64 | 16 | 64 Go | 1280 GiB | 4000 Mbit/s | 1.94 € / heure ou 1.84 € / heure |
| Advanced B3-128 | 32 | 128 Go | 2560 GiB | 8000 Mbit/s | 3.89 € / heure ou 3.67 € / heure |
| Advanced B3-256 | 64 | 256 Go | 5120 GiB | 16000 Mbit/s | 7.77 € / heure ou 7.34 € / heure |
| Essential DB1-4 | 2 | 4 Go | 80 GiB | 250 Mbit/s | 0.08 € / heure ou 0.07 € / heure |
| Essential DB1-7 | 2 | 7 Go | 160 GiB | 250 Mbit/s | 0.15 € / heure ou 0.13 € / heure |
| Essential DB1-15 | 4 | 15 Go | 320 GiB | 250 Mbit/s | 0.30 € / heure ou 0.27 € / heure |
| Essential DB1-30 | 8 | 30 Go | 640 GiB | 500 Mbit/s | 0.59 € / heure ou 0.54 € / heure |

**Note:** Les détails techniques complets pour chaque flavor PostgreSQL sont similaires à ceux de MySQL. Consultez le catalogue complet pour les plan codes spécifiques.

---

### Managed Databases - MongoDB

**URL:** https://www.ovhcloud.com/fr/public-cloud/databases/mongodb/

**Description:**
Base de données MongoDB managée avec haute disponibilité, sauvegardes automatiques et scaling vertical.

**Recommandation d'usage:**
Idéal pour les applications nécessitant une base de données NoSQL MongoDB avec gestion simplifiée, haute disponibilité et performances optimisées.

**Use Cases Client:**
1. **Managing High Volumes of Structured Data:** SQL engines provide high-performance, reliable transactional data storage with ACID compliance, ensuring data integrity for all transactions.
2. **Multimedia data organization & analysis:** When it is crucial to organize multiple types of data and deliver it fast to end users in a personalized way, NoSQL engines will provide higher performance and scalability.
3. **Managing Real-Time Data and Caching:** In-memory databases (IMDBs) offer ultra-fast data access by storing data directly in RAM instead of traditional disk-based storage. This architecture enables low-latency real-time processing and immediate data retrieval.

**Types de clients cibles:**
- Développeurs d'applications nécessitant MongoDB
- Applications avec données non structurées
- Projets nécessitant bases de données NoSQL
- Startups et PME

**Flavors Disponibles:**

| Flavor | vCPU | RAM | Stockage | Bande passante | Prix |
|--------|------|-----|----------|----------------|------|
| Business DB1-2 | 1 | 2 Go | 40 GiB | 100 Mbit/s | 0.03 € / heure |
| Business DB1-4 | 2 | 4 Go | 80 GiB | 250 Mbit/s | 0.06 € / heure |
| Business DB1-7 | 2 | 7 Go | 160 GiB | 250 Mbit/s | 0.11 € / heure |
| Business DB1-15 | 4 | 15 Go | 320 GiB | 250 Mbit/s | 0.23 € / heure |
| Business DB1-30 | 8 | 30 Go | 640 GiB | 500 Mbit/s | 0.45 € / heure |
| Business DB1-60 | 16 | 60 Go | 1280 GiB | 1000 Mbit/s | 0.90 € / heure |
| Business DB1-120 | 32 | 120 Go | 2560 GiB | 10000 Mbit/s | 1.81 € / heure |
| Enterprise DB1-15 | 4 | 15 Go | 320 GiB | 250 Mbit/s | 0.81 € / heure |
| Enterprise DB1-30 | 8 | 30 Go | 640 GiB | 500 Mbit/s | 1.64 € / heure |
| Enterprise DB1-60 | 16 | 60 Go | 1280 GiB | 1000 Mbit/s | 3.27 € / heure |
| Enterprise DB1-120 | 32 | 120 Go | 2560 GiB | 10000 Mbit/s | 6.54 € / heure |
| Essential DB1-2 | 1 | 2 Go | 40 GiB | 100 Mbit/s | 0.03 € / heure |
| Essential DB1-4 | 2 | 4 Go | 80 GiB | 250 Mbit/s | 0.06 € / heure |
| Essential DB1-7 | 2 | 7 Go | 160 GiB | 250 Mbit/s | 0.11 € / heure |
| Essential DB1-15 | 4 | 15 Go | 320 GiB | 250 Mbit/s | 0.23 € / heure |
| Essential DB1-30 | 8 | 30 Go | 640 GiB | 500 Mbit/s | 0.45 € / heure |
| Essential DB1-60 | 16 | 60 Go | 1280 GiB | 1000 Mbit/s | 0.90 € / heure |
| Essential DB1-120 | 32 | 120 Go | 2560 GiB | 10000 Mbit/s | 1.81 € / heure |
| Production DB2-2 | 1 | 2 Go | 10 GiB | 100 Mbit/s | 0.03 € / heure ou 0.02 € / heure |
| Production DB2-4 | 2 | 4 Go | 20 GiB | 250 Mbit/s | 0.05 € / heure |
| Production DB2-7 | 2 | 7 Go | 40 GiB | 250 Mbit/s | 0.12 € / heure |
| Production DB2-15 | 4 | 15 Go | 80 GiB | 250 Mbit/s | 0.24 € / heure ou 0.23 € / heure |
| Production DB2-30 | 8 | 30 Go | 160 GiB | 500 Mbit/s | 0.47 € / heure ou 0.46 € / heure |
| Production DB2-60 | 16 | 60 Go | 320 GiB | 1000 Mbit/s | 0.93 € / heure ou 0.91 € / heure |
| Production B3-8 | 2 | 8 Go | 40 GiB | 500 Mbit/s | 0.12 € / heure ou 0.11 € / heure |
| Production B3-16 | 4 | 16 Go | 80 GiB | 1000 Mbit/s | 0.23 € / heure ou 0.22 € / heure |
| Production B3-32 | 8 | 32 Go | 160 GiB | 2000 Mbit/s | 0.46 € / heure ou 0.43 € / heure |
| Production B3-64 | 16 | 64 Go | 320 GiB | 4000 Mbit/s | 0.91 € / heure ou 0.86 € / heure |
| Production B3-128 | 32 | 128 Go | 640 GiB | 8000 Mbit/s | 1.84 € / heure ou 1.73 € / heure |
| Production B3-256 | 64 | 256 Go | 1280 GiB | 16000 Mbit/s | 3.67 € / heure ou 3.47 € / heure |
| Discovery DB2-FREE | N/A | N/A | 0.5 GiB | N/A | Gratuit / heure |

**Note:** Les détails techniques complets pour chaque flavor MongoDB sont disponibles dans le catalogue complet. MongoDB propose également des versions Enterprise avec des fonctionnalités avancées.

---

### Managed Databases - Redis

**URL:** https://www.ovhcloud.com/fr/public-cloud/databases/redis/

**Description:**
Base de données Redis managée (cache en mémoire) avec haute disponibilité et sauvegardes automatiques.

**Recommandation d'usage:**
Idéal pour le cache, les sessions, les queues de messages, et les applications nécessitant un accès ultra-rapide aux données en mémoire.

**Use Cases Client:**
1. **Managing High Volumes of Structured Data:** SQL engines provide high-performance, reliable transactional data storage with ACID compliance, ensuring data integrity for all transactions.
2. **Multimedia data organization & analysis:** When it is crucial to organize multiple types of data and deliver it fast to end users in a personalized way, NoSQL engines will provide higher performance and scalability.
3. **Managing Real-Time Data and Caching:** In-memory databases (IMDBs) offer ultra-fast data access by storing data directly in RAM instead of traditional disk-based storage. This architecture enables low-latency real-time processing and immediate data retrieval.

**Types de clients cibles:**
- Applications nécessitant cache haute performance
- Systèmes de sessions distribuées
- Queues de messages
- Applications temps réel

**Flavors Disponibles:**

| Flavor | vCPU | RAM | Bande passante | Prix |
|--------|------|-----|----------------|------|
| Business DB1-4 | 2 | 4 Go | 250 Mbit/s | 0.07 € / heure |
| Business DB1-7 | 2 | 7 Go | 250 Mbit/s | 0.15 € / heure |
| Business DB1-15 | 4 | 15 Go | 250 Mbit/s | 0.23 € / heure |
| Business DB1-30 | 8 | 30 Go | 500 Mbit/s | 0.46 € / heure ou 0.44 € / heure |
| Business DB1-60 | 16 | 60 Go | 1000 Mbit/s | 0.91 € / heure ou 0.89 € / heure |
| Business DB1-120 | 32 | 120 Go | 10000 Mbit/s | 1.82 € / heure ou 1.77 € / heure |
| Production B3-8 | 2 | 8 Go | 500 Mbit/s | 0.15 € / heure ou 0.14 € / heure |
| Production B3-16 | 4 | 16 Go | 1000 Mbit/s | 0.33 € / heure ou 0.31 € / heure |
| Production B3-32 | 8 | 32 Go | 2000 Mbit/s | 0.67 € / heure ou 0.63 € / heure |
| Production B3-64 | 16 | 64 Go | 4000 Mbit/s | 1.34 € / heure ou 1.26 € / heure |
| Production B3-128 | 32 | 128 Go | 8000 Mbit/s | 2.68 € / heure ou 2.52 € / heure |
| Production B3-256 | 64 | 256 Go | 16000 Mbit/s | 5.35 € / heure ou 5.03 € / heure |

**Note:** Redis est une base de données en mémoire, donc le stockage n'est pas applicable. Les détails techniques complets sont disponibles dans le catalogue complet.

---

### Managed Databases - Kafka

**URL:** https://www.ovhcloud.com/fr/public-cloud/databases/kafka/

**Description:**
Plateforme de streaming de données Apache Kafka managée avec haute disponibilité et scaling automatique.

**Recommandation d'usage:**
Idéal pour le streaming de données en temps réel, l'ingestion de données, les pipelines de données, et les architectures event-driven.

**Use Cases Client:**
1. **Managing High Volumes of Structured Data:** SQL engines provide high-performance, reliable transactional data storage with ACID compliance, ensuring data integrity for all transactions.
2. **Multimedia data organization & analysis:** When it is crucial to organize multiple types of data and deliver it fast to end users in a personalized way, NoSQL engines will provide higher performance and scalability.
3. **Managing Real-Time Data and Caching:** In-memory databases (IMDBs) offer ultra-fast data access by storing data directly in RAM instead of traditional disk-based storage. This architecture enables low-latency real-time processing and immediate data retrieval.

**Types de clients cibles:**
- Applications nécessitant streaming de données
- Pipelines de données en temps réel
- Architectures event-driven
- Ingestion de données volumineuses

**Flavors Disponibles:**

| Flavor | vCPU | RAM | Stockage | Bande passante | Prix |
|--------|------|-----|----------|----------------|------|
| Business DB1-4 | 2 | 4 Go | 480 GiB | 250 Mbit/s | 0.15 € / heure |
| Business DB1-7 | 2 | 7 Go | 960 GiB | 250 Mbit/s | 0.30 € / heure ou 0.29 € / heure |
| Business DB1-15 | 4 | 15 Go | 1920 GiB | 250 Mbit/s | 0.56 € / heure ou 0.55 € / heure |
| Business DB1-30 | 8 | 30 Go | 3840 GiB | 500 Mbit/s | 1.09 € / heure ou 1.07 € / heure |
| Business DB1-60 | 16 | 60 Go | 7680 GiB | 1000 Mbit/s | 2.18 € / heure ou 2.14 € / heure |
| Enterprise DB1-7 | 2 | 7 Go | 1920 GiB | 250 Mbit/s | 0.30 € / heure ou 0.29 € / heure |
| Enterprise DB1-15 | 4 | 15 Go | 3840 GiB | 250 Mbit/s | 0.56 € / heure ou 0.55 € / heure |
| Enterprise DB1-30 | 8 | 30 Go | 7680 GiB | 500 Mbit/s | 1.09 € / heure ou 1.07 € / heure |
| Enterprise DB1-60 | 16 | 60 Go | 15360 GiB | 1000 Mbit/s | 2.18 € / heure ou 2.14 € / heure |
| Advanced B3-8 | 2 | 8 Go | 320 GiB | 500 Mbit/s | 0.28 € / heure ou 0.27 € / heure |
| Advanced B3-16 | 4 | 16 Go | 640 GiB | 1000 Mbit/s | 0.56 € / heure ou 0.53 € / heure |
| Advanced B3-32 | 8 | 32 Go | 1280 GiB | 2000 Mbit/s | 1.12 € / heure ou 1.06 € / heure |
| Production B3-8 | 2 | 8 Go | 320 GiB | 500 Mbit/s | 0.28 € / heure ou 0.27 € / heure |
| Production B3-16 | 4 | 16 Go | 640 GiB | 1000 Mbit/s | 0.56 € / heure ou 0.53 € / heure |
| Production B3-32 | 8 | 32 Go | 1280 GiB | 2000 Mbit/s | 1.12 € / heure ou 1.06 € / heure |

**Note:** Kafka nécessite beaucoup de stockage pour les logs. Les détails techniques complets sont disponibles dans le catalogue complet.

---

### Managed Databases - OpenSearch

**URL:** https://www.ovhcloud.com/fr/public-cloud/databases/opensearch/

**Description:**
Moteur de recherche et d'analyse OpenSearch managé avec haute disponibilité et scaling automatique.

**Recommandation d'usage:**
Idéal pour la recherche full-text, l'analyse de logs, la visualisation de données, et les applications nécessitant des capacités de recherche avancées.

**Use Cases Client:**
1. **Managing High Volumes of Structured Data:** SQL engines provide high-performance, reliable transactional data storage with ACID compliance, ensuring data integrity for all transactions.
2. **Multimedia data organization & analysis:** When it is crucial to organize multiple types of data and deliver it fast to end users in a personalized way, NoSQL engines will provide higher performance and scalability.
3. **Managing Real-Time Data and Caching:** In-memory databases (IMDBs) offer ultra-fast data access by storing data directly in RAM instead of traditional disk-based storage. This architecture enables low-latency real-time processing and immediate data retrieval.

**Types de clients cibles:**
- Applications nécessitant recherche full-text
- Analyse de logs et monitoring
- Visualisation de données
- Applications de recherche avancées

**Flavors Disponibles:**

| Flavor | vCPU | RAM | Stockage | Bande passante | Prix |
|--------|------|-----|----------|----------------|------|
| Business DB1-7 | 2 | 7 Go | 240 GiB | 250 Mbit/s | 0.16 € / heure |
| Business DB1-15 | 4 | 15 Go | 480 GiB | 250 Mbit/s | 0.33 € / heure ou 0.32 € / heure |
| Business DB1-30 | 8 | 30 Go | 960 GiB | 500 Mbit/s | 0.66 € / heure ou 0.65 € / heure |
| Business DB1-60 | 16 | 60 Go | 1920 GiB | 1000 Mbit/s | 1.32 € / heure ou 1.30 € / heure |
| Business DB1-120 | 32 | 120 Go | 3840 GiB | 10000 Mbit/s | 2.65 € / heure ou 2.60 € / heure |
| Enterprise DB1-7 | 2 | 7 Go | 480 GiB | 250 Mbit/s | 0.17 € / heure ou 0.16 € / heure |
| Enterprise DB1-15 | 4 | 15 Go | 960 GiB | 250 Mbit/s | 0.33 € / heure |
| Enterprise DB1-30 | 8 | 30 Go | 1920 GiB | 500 Mbit/s | 0.66 € / heure ou 0.65 € / heure |
| Enterprise DB1-60 | 16 | 60 Go | 3840 GiB | 1000 Mbit/s | 1.33 € / heure ou 1.30 € / heure |
| Enterprise DB1-120 | 32 | 120 Go | 7680 GiB | 10000 Mbit/s | 2.66 € / heure ou 2.60 € / heure |
| Production B3-8 | 2 | 8 Go | 80 GiB | 500 Mbit/s | 0.18 € / heure ou 0.17 € / heure |
| Production B3-16 | 4 | 16 Go | 160 GiB | 1000 Mbit/s | 0.36 € / heure ou 0.34 € / heure |
| Production B3-32 | 8 | 32 Go | 320 GiB | 2000 Mbit/s | 0.73 € / heure ou 0.69 € / heure |
| Production B3-64 | 16 | 64 Go | 640 GiB | 4000 Mbit/s | 1.46 € / heure ou 1.38 € / heure |

**Note:** OpenSearch nécessite beaucoup de stockage pour les index. Les détails techniques complets sont disponibles dans le catalogue complet.

---

### Managed Databases - Grafana Essential

**URL:** https://www.ovhcloud.com/fr/public-cloud/databases/grafana/

**Description:**
Plateforme de visualisation et monitoring Grafana managée pour visualiser et analyser les métriques et logs.

**Recommandation d'usage:**
Idéal pour le monitoring d'infrastructure, visualisation de métriques, dashboards personnalisés, alerting.

**Use Cases Client:**
1. **Managing High Volumes of Structured Data:** SQL engines provide high-performance, reliable transactional data storage with ACID compliance, ensuring data integrity for all transactions.
2. **Multimedia data organization & analysis:** When it is crucial to organize multiple types of data and deliver it fast to end users in a personalized way, NoSQL engines will provide higher performance and scalability.
3. **Managing Real-Time Data and Caching:** In-memory databases (IMDBs) offer ultra-fast data access by storing data directly in RAM instead of traditional disk-based storage. This architecture enables low-latency real-time processing and immediate data retrieval.

**Types de clients cibles:**
- Monitoring d'infrastructure
- Visualisation de métriques
- Dashboards personnalisés
- Alerting et notifications

**Flavors Disponibles:**

| Flavor | vCPU | RAM | Bande passante | Prix |
|--------|------|-----|----------------|------|
| Essential DB1-4 | 2 | 4 Go | 250 Mbit/s | 0.06 € / heure |
| Essential DB1-7 | 2 | 7 Go | 250 Mbit/s | 0.12 € / heure |

---

### Managed Databases - Grafana Business

**URL:** https://www.ovhcloud.com/fr/public-cloud/databases/grafana/

**Description:**
Plateforme de visualisation et monitoring Grafana Business managée avec fonctionnalités avancées.

**Recommandation d'usage:**
Parfait pour les environnements de production nécessitant monitoring avancé, alerting, et haute disponibilité.

**Use Cases Client:**
1. **Managing High Volumes of Structured Data:** SQL engines provide high-performance, reliable transactional data storage with ACID compliance, ensuring data integrity for all transactions.
2. **Multimedia data organization & analysis:** When it is crucial to organize multiple types of data and deliver it fast to end users in a personalized way, NoSQL engines will provide higher performance and scalability.
3. **Managing Real-Time Data and Caching:** In-memory databases (IMDBs) offer ultra-fast data access by storing data directly in RAM instead of traditional disk-based storage. This architecture enables low-latency real-time processing and immediate data retrieval.

**Types de clients cibles:**
- Environnements de production
- Monitoring avancé
- Alerting et notifications
- Haute disponibilité

**Flavors Disponibles:**

| Flavor | vCPU | RAM | Bande passante | Prix |
|--------|------|-----|----------------|------|
| Production B3-8 | 2 | 8 Go | 500 Mbit/s | 0.13 € / heure ou 0.12 € / heure |

---

### Managed Databases - Kafka Connect Business

**URL:** https://www.ovhcloud.com/fr/public-cloud/databases/kafka/

**Description:**
Kafka Connect Business managé pour connecter Kafka à des systèmes externes et intégrer des données.

**Recommandation d'usage:**
Idéal pour l'intégration de données, connecteurs vers bases de données, systèmes de fichiers, et autres sources de données.

**Use Cases Client:**
1. **Managing High Volumes of Structured Data:** SQL engines provide high-performance, reliable transactional data storage with ACID compliance, ensuring data integrity for all transactions.
2. **Multimedia data organization & analysis:** When it is crucial to organize multiple types of data and deliver it fast to end users in a personalized way, NoSQL engines will provide higher performance and scalability.
3. **Managing Real-Time Data and Caching:** In-memory databases (IMDBs) offer ultra-fast data access by storing data directly in RAM instead of traditional disk-based storage. This architecture enables low-latency real-time processing and immediate data retrieval.

**Types de clients cibles:**
- Intégration de données
- Connecteurs vers bases de données
- Systèmes de fichiers
- Sources de données externes

**Flavors Disponibles:**

| Flavor | vCPU | RAM | Bande passante | Prix |
|--------|------|-----|----------------|------|
| Business DB1-7 | 2 | 7 Go | 250 Mbit/s | 0.21 € / heure |
| Business DB1-15 | 4 | 15 Go | 250 Mbit/s | 0.41 € / heure ou 0.40 € / heure |
| Business DB1-30 | 8 | 30 Go | 500 Mbit/s | 0.72 € / heure ou 0.71 € / heure |
| Production B3-8 | 2 | 8 Go | 500 Mbit/s | 0.20 € / heure ou 0.19 € / heure |
| Production B3-16 | 4 | 16 Go | 1000 Mbit/s | 0.41 € / heure ou 0.39 € / heure |
| Production B3-32 | 8 | 32 Go | 2000 Mbit/s | 0.74 € / heure ou 0.70 € / heure |

---

### Managed Databases - Kafka Connect Enterprise

**URL:** https://www.ovhcloud.com/fr/public-cloud/databases/kafka/

**Description:**
Kafka Connect Enterprise managé avec fonctionnalités avancées pour intégration de données entreprise.

**Recommandation d'usage:**
Parfait pour les environnements entreprise nécessitant intégration de données avancée et haute disponibilité.

**Use Cases Client:**
1. **Managing High Volumes of Structured Data:** SQL engines provide high-performance, reliable transactional data storage with ACID compliance, ensuring data integrity for all transactions.
2. **Multimedia data organization & analysis:** When it is crucial to organize multiple types of data and deliver it fast to end users in a personalized way, NoSQL engines will provide higher performance and scalability.
3. **Managing Real-Time Data and Caching:** In-memory databases (IMDBs) offer ultra-fast data access by storing data directly in RAM instead of traditional disk-based storage. This architecture enables low-latency real-time processing and immediate data retrieval.

**Types de clients cibles:**
- Environnements entreprise
- Intégration de données avancée
- Haute disponibilité
- Connecteurs avancés

**Flavors Disponibles:**

| Flavor | vCPU | RAM | Bande passante | Prix |
|--------|------|-----|----------------|------|
| Enterprise DB1-7 | 2 | 7 Go | 250 Mbit/s | 0.21 € / heure |
| Enterprise DB1-15 | 4 | 15 Go | 250 Mbit/s | 0.41 € / heure ou 0.40 € / heure |
| Enterprise DB1-30 | 8 | 30 Go | 500 Mbit/s | 0.72 € / heure ou 0.71 € / heure |
| Advanced B3-8 | 2 | 8 Go | 500 Mbit/s | 0.20 € / heure ou 0.19 € / heure |
| Advanced B3-16 | 4 | 16 Go | 1000 Mbit/s | 0.41 € / heure ou 0.39 € / heure |
| Advanced B3-32 | 8 | 32 Go | 2000 Mbit/s | 0.74 € / heure ou 0.70 € / heure |

---

### Managed Databases - Kafka Connect Essential

**URL:** https://www.ovhcloud.com/fr/public-cloud/databases/kafka/

**Description:**
Kafka Connect Essential managé pour intégration de données avec fonctionnalités de base.

**Recommandation d'usage:**
Idéal pour les environnements de développement et tests nécessitant intégration de données basique.

**Use Cases Client:**
1. **Managing High Volumes of Structured Data:** SQL engines provide high-performance, reliable transactional data storage with ACID compliance, ensuring data integrity for all transactions.
2. **Multimedia data organization & analysis:** When it is crucial to organize multiple types of data and deliver it fast to end users in a personalized way, NoSQL engines will provide higher performance and scalability.
3. **Managing Real-Time Data and Caching:** In-memory databases (IMDBs) offer ultra-fast data access by storing data directly in RAM instead of traditional disk-based storage. This architecture enables low-latency real-time processing and immediate data retrieval.

**Types de clients cibles:**
- Environnements de développement
- Tests et intégration
- Connecteurs de base

**Flavors Disponibles:**

| Flavor | vCPU | RAM | Bande passante | Prix |
|--------|------|-----|----------------|------|
| Essential DB1-4 | 2 | 4 Go | 250 Mbit/s | 0.11 € / heure ou 0.10 € / heure |
| Essential DB1-7 | 2 | 7 Go | 250 Mbit/s | 0.21 € / heure |
| Essential DB1-15 | 4 | 15 Go | 250 Mbit/s | 0.40 € / heure ou 0.39 € / heure |
| Essential DB1-30 | 8 | 30 Go | 500 Mbit/s | 0.72 € / heure ou 0.71 € / heure |

---

### Managed Databases - Kafka MirrorMaker Business

**URL:** https://www.ovhcloud.com/fr/public-cloud/databases/kafka/

**Description:**
Kafka MirrorMaker Business managé pour répliquer des données Kafka entre clusters et régions.

**Recommandation d'usage:**
Idéal pour la réplication de données Kafka, backup de clusters, et synchronisation multi-régions.

**Use Cases Client:**
1. **Managing High Volumes of Structured Data:** SQL engines provide high-performance, reliable transactional data storage with ACID compliance, ensuring data integrity for all transactions.
2. **Multimedia data organization & analysis:** When it is crucial to organize multiple types of data and deliver it fast to end users in a personalized way, NoSQL engines will provide higher performance and scalability.
3. **Managing Real-Time Data and Caching:** In-memory databases (IMDBs) offer ultra-fast data access by storing data directly in RAM instead of traditional disk-based storage. This architecture enables low-latency real-time processing and immediate data retrieval.

**Types de clients cibles:**
- Réplication de données Kafka
- Backup de clusters
- Synchronisation multi-régions
- Disaster recovery

**Flavors Disponibles:**

| Flavor | vCPU | RAM | Bande passante | Prix |
|--------|------|-----|----------------|------|
| Business DB1-4 | 2 | 4 Go | 250 Mbit/s | 0.11 € / heure |
| Business DB1-7 | 2 | 7 Go | 250 Mbit/s | 0.21 € / heure |
| Business DB1-15 | 4 | 15 Go | 250 Mbit/s | 0.41 € / heure ou 0.40 € / heure |
| Business DB1-30 | 8 | 30 Go | 500 Mbit/s | 0.72 € / heure ou 0.71 € / heure |
| Production B3-8 | 2 | 8 Go | 500 Mbit/s | 0.20 € / heure ou 0.19 € / heure |
| Production B3-16 | 4 | 16 Go | 1000 Mbit/s | 0.41 € / heure ou 0.39 € / heure |
| Production B3-32 | 8 | 32 Go | 2000 Mbit/s | 0.74 € / heure ou 0.70 € / heure |

---

### Managed Databases - Kafka MirrorMaker Enterprise

**URL:** https://www.ovhcloud.com/fr/public-cloud/databases/kafka/

**Description:**
Kafka MirrorMaker Enterprise managé avec fonctionnalités avancées pour réplication entreprise.

**Recommandation d'usage:**
Parfait pour les environnements entreprise nécessitant réplication avancée et haute disponibilité.

**Use Cases Client:**
1. **Managing High Volumes of Structured Data:** SQL engines provide high-performance, reliable transactional data storage with ACID compliance, ensuring data integrity for all transactions.
2. **Multimedia data organization & analysis:** When it is crucial to organize multiple types of data and deliver it fast to end users in a personalized way, NoSQL engines will provide higher performance and scalability.
3. **Managing Real-Time Data and Caching:** In-memory databases (IMDBs) offer ultra-fast data access by storing data directly in RAM instead of traditional disk-based storage. This architecture enables low-latency real-time processing and immediate data retrieval.

**Types de clients cibles:**
- Environnements entreprise
- Réplication avancée
- Haute disponibilité
- Disaster recovery avancé

**Flavors Disponibles:**

| Flavor | vCPU | RAM | Bande passante | Prix |
|--------|------|-----|----------------|------|
| Enterprise DB1-7 | 2 | 7 Go | 250 Mbit/s | 0.21 € / heure |
| Enterprise DB1-15 | 4 | 15 Go | 250 Mbit/s | 0.41 € / heure ou 0.40 € / heure |
| Enterprise DB1-30 | 8 | 30 Go | 500 Mbit/s | 0.72 € / heure ou 0.71 € / heure |
| Advanced B3-8 | 2 | 8 Go | 500 Mbit/s | 0.20 € / heure ou 0.19 € / heure |
| Advanced B3-16 | 4 | 16 Go | 1000 Mbit/s | 0.41 € / heure ou 0.39 € / heure |
| Advanced B3-32 | 8 | 32 Go | 2000 Mbit/s | 0.74 € / heure ou 0.70 € / heure |

---

### Managed Databases - Kafka MirrorMaker Essential

**URL:** https://www.ovhcloud.com/fr/public-cloud/databases/kafka/

**Description:**
Kafka MirrorMaker Essential managé pour réplication de base entre clusters Kafka.

**Recommandation d'usage:**
Idéal pour les environnements de développement et tests nécessitant réplication basique.

**Use Cases Client:**
1. **Managing High Volumes of Structured Data:** SQL engines provide high-performance, reliable transactional data storage with ACID compliance, ensuring data integrity for all transactions.
2. **Multimedia data organization & analysis:** When it is crucial to organize multiple types of data and deliver it fast to end users in a personalized way, NoSQL engines will provide higher performance and scalability.
3. **Managing Real-Time Data and Caching:** In-memory databases (IMDBs) offer ultra-fast data access by storing data directly in RAM instead of traditional disk-based storage. This architecture enables low-latency real-time processing and immediate data retrieval.

**Types de clients cibles:**
- Environnements de développement
- Tests et réplication basique

**Flavors Disponibles:**

| Flavor | vCPU | RAM | Bande passante | Prix |
|--------|------|-----|----------------|------|
| Essential DB1-4 | 2 | 4 Go | 250 Mbit/s | 0.11 € / heure ou 0.10 € / heure |
| Essential DB1-7 | 2 | 7 Go | 250 Mbit/s | 0.21 € / heure |
| Essential DB1-15 | 4 | 15 Go | 250 Mbit/s | 0.40 € / heure ou 0.39 € / heure |
| Essential DB1-30 | 8 | 30 Go | 500 Mbit/s | 0.72 € / heure ou 0.71 € / heure |

---

### Managed Databases - MongoDB Discovery

**URL:** https://www.ovhcloud.com/fr/public-cloud/databases/mongodb/

**Description:**
MongoDB Discovery managé gratuit pour découvrir et tester MongoDB sans engagement.

**Recommandation d'usage:**
Parfait pour découvrir MongoDB, tests, développement, et projets de démonstration.

**Use Cases Client:**
1. **Managing High Volumes of Structured Data:** SQL engines provide high-performance, reliable transactional data storage with ACID compliance, ensuring data integrity for all transactions.
2. **Multimedia data organization & analysis:** When it is crucial to organize multiple types of data and deliver it fast to end users in a personalized way, NoSQL engines will provide higher performance and scalability.
3. **Managing Real-Time Data and Caching:** In-memory databases (IMDBs) offer ultra-fast data access by storing data directly in RAM instead of traditional disk-based storage. This architecture enables low-latency real-time processing and immediate data retrieval.

**Types de clients cibles:**
- Découverte de MongoDB
- Tests et développement
- Projets de démonstration
- Apprentissage

**Flavors Disponibles:**

| Flavor | Stockage | Prix |
|--------|----------|------|
| Discovery DB2-FREE | 0.5 GiB | Gratuit / heure |

---

### Managed Databases - MongoDB Enterprise

**URL:** https://www.ovhcloud.com/fr/public-cloud/databases/mongodb/

**Description:**
MongoDB Enterprise managé avec fonctionnalités avancées pour environnements entreprise.

**Recommandation d'usage:**
Idéal pour les environnements de production entreprise nécessitant haute disponibilité, sécurité avancée, et support.

**Use Cases Client:**
1. **Managing High Volumes of Structured Data:** SQL engines provide high-performance, reliable transactional data storage with ACID compliance, ensuring data integrity for all transactions.
2. **Multimedia data organization & analysis:** When it is crucial to organize multiple types of data and deliver it fast to end users in a personalized way, NoSQL engines will provide higher performance and scalability.
3. **Managing Real-Time Data and Caching:** In-memory databases (IMDBs) offer ultra-fast data access by storing data directly in RAM instead of traditional disk-based storage. This architecture enables low-latency real-time processing and immediate data retrieval.

**Types de clients cibles:**
- Environnements de production entreprise
- Haute disponibilité
- Sécurité avancée
- Support entreprise

**Flavors Disponibles:**

| Flavor | vCPU | RAM | Stockage | Bande passante | Prix |
|--------|------|-----|----------|----------------|------|
| Enterprise DB1-15 | 4 | 15 Go | 320 GiB | 250 Mbit/s | 0.81 € / heure |
| Enterprise DB1-30 | 8 | 30 Go | 640 GiB | 500 Mbit/s | 1.64 € / heure |
| Enterprise DB1-60 | 16 | 60 Go | 1280 GiB | 1000 Mbit/s | 3.27 € / heure |
| Enterprise DB1-120 | 32 | 120 Go | 2560 GiB | 10000 Mbit/s | 6.54 € / heure |

---

### Managed Databases - MongoDB Essential

**URL:** https://www.ovhcloud.com/fr/public-cloud/databases/mongodb/

**Description:**
MongoDB Essential managé pour environnements de développement et tests avec fonctionnalités de base.

**Recommandation d'usage:**
Parfait pour le développement, tests, et environnements non-critiques nécessitant MongoDB.

**Use Cases Client:**
1. **Managing High Volumes of Structured Data:** SQL engines provide high-performance, reliable transactional data storage with ACID compliance, ensuring data integrity for all transactions.
2. **Multimedia data organization & analysis:** When it is crucial to organize multiple types of data and deliver it fast to end users in a personalized way, NoSQL engines will provide higher performance and scalability.
3. **Managing Real-Time Data and Caching:** In-memory databases (IMDBs) offer ultra-fast data access by storing data directly in RAM instead of traditional disk-based storage. This architecture enables low-latency real-time processing and immediate data retrieval.

**Types de clients cibles:**
- Développement et tests
- Environnements non-critiques
- Projets de démonstration

**Flavors Disponibles:**

| Flavor | vCPU | RAM | Stockage | Bande passante | Prix |
|--------|------|-----|----------|----------------|------|
| Essential DB1-2 | 1 | 2 Go | 40 GiB | 100 Mbit/s | 0.03 € / heure |
| Essential DB1-4 | 2 | 4 Go | 80 GiB | 250 Mbit/s | 0.06 € / heure |
| Essential DB1-7 | 2 | 7 Go | 160 GiB | 250 Mbit/s | 0.11 € / heure |
| Essential DB1-15 | 4 | 15 Go | 320 GiB | 250 Mbit/s | 0.23 € / heure |
| Essential DB1-30 | 8 | 30 Go | 640 GiB | 500 Mbit/s | 0.45 € / heure |
| Essential DB1-60 | 16 | 60 Go | 1280 GiB | 1000 Mbit/s | 0.90 € / heure |
| Essential DB1-120 | 32 | 120 Go | 2560 GiB | 10000 Mbit/s | 1.81 € / heure |

---

### Managed Databases - MongoDB Advanced

**URL:** https://www.ovhcloud.com/fr/public-cloud/databases/mongodb/

**Description:**
MongoDB Advanced managé avec fonctionnalités avancées pour environnements de production.

**Recommandation d'usage:**
Idéal pour les environnements de production nécessitant performances élevées et fonctionnalités avancées.

**Use Cases Client:**
1. **Managing High Volumes of Structured Data:** SQL engines provide high-performance, reliable transactional data storage with ACID compliance, ensuring data integrity for all transactions.
2. **Multimedia data organization & analysis:** When it is crucial to organize multiple types of data and deliver it fast to end users in a personalized way, NoSQL engines will provide higher performance and scalability.
3. **Managing Real-Time Data and Caching:** In-memory databases (IMDBs) offer ultra-fast data access by storing data directly in RAM instead of traditional disk-based storage. This architecture enables low-latency real-time processing and immediate data retrieval.

**Types de clients cibles:**
- Environnements de production
- Performances élevées
- Fonctionnalités avancées
- Scaling automatique

**Flavors Disponibles:**

| Flavor | vCPU | RAM | Stockage | Bande passante | Prix |
|--------|------|-----|----------|----------------|------|
| Advanced DB2-15 | 4 | 15 Go | 80 GiB | 250 Mbit/s | 0.72 € / heure ou 0.71 € / heure |
| Advanced DB2-30 | 8 | 30 Go | 160 GiB | 500 Mbit/s | 1.44 € / heure ou 1.42 € / heure |
| Advanced DB2-60 | 16 | 60 Go | 320 GiB | 1000 Mbit/s | 2.87 € / heure ou 2.83 € / heure |
| Advanced DB2-120 | 32 | 120 Go | 640 GiB | 10000 Mbit/s | 5.73 € / heure ou 5.67 € / heure |
| Advanced B3-16 | 4 | 16 Go | 80 GiB | 1000 Mbit/s | 0.24 € / heure ou 0.22 € / heure |
| Advanced B3-32 | 8 | 32 Go | 160 GiB | 2000 Mbit/s | 0.46 € / heure ou 0.43 € / heure |
| Advanced B3-64 | 16 | 64 Go | 320 GiB | 4000 Mbit/s | 0.92 € / heure ou 0.86 € / heure |
| Advanced B3-128 | 32 | 128 Go | 640 GiB | 8000 Mbit/s | 1.85 € / heure ou 1.74 € / heure |
| Advanced B3-256 | 64 | 256 Go | 1280 GiB | 16000 Mbit/s | 3.70 € / heure ou 3.48 € / heure |

---

### Managed Databases - MongoDB Production

**URL:** https://www.ovhcloud.com/fr/public-cloud/databases/mongodb/

**Description:**
MongoDB Production managé avec haute disponibilité et réplication pour environnements de production critiques.

**Recommandation d'usage:**
Parfait pour les environnements de production critiques nécessitant haute disponibilité, réplication, et performances optimales.

**Use Cases Client:**
1. **Managing High Volumes of Structured Data:** SQL engines provide high-performance, reliable transactional data storage with ACID compliance, ensuring data integrity for all transactions.
2. **Multimedia data organization & analysis:** When it is crucial to organize multiple types of data and deliver it fast to end users in a personalized way, NoSQL engines will provide higher performance and scalability.
3. **Managing Real-Time Data and Caching:** In-memory databases (IMDBs) offer ultra-fast data access by storing data directly in RAM instead of traditional disk-based storage. This architecture enables low-latency real-time processing and immediate data retrieval.

**Types de clients cibles:**
- Environnements de production critiques
- Haute disponibilité
- Réplication automatique
- Performances optimales

**Flavors Disponibles:**

| Flavor | vCPU | RAM | Stockage | Bande passante | Prix |
|--------|------|-----|----------|----------------|------|
| Production DB2-2 | 1 | 2 Go | 10 GiB | 100 Mbit/s | 0.03 € / heure ou 0.02 € / heure |
| Production DB2-4 | 2 | 4 Go | 20 GiB | 250 Mbit/s | 0.05 € / heure |
| Production DB2-7 | 2 | 7 Go | 40 GiB | 250 Mbit/s | 0.12 € / heure |
| Production DB2-15 | 4 | 15 Go | 80 GiB | 250 Mbit/s | 0.24 € / heure ou 0.23 € / heure |
| Production DB2-30 | 8 | 30 Go | 160 GiB | 500 Mbit/s | 0.47 € / heure ou 0.46 € / heure |
| Production DB2-60 | 16 | 60 Go | 320 GiB | 1000 Mbit/s | 0.93 € / heure ou 0.91 € / heure |
| Production B3-8 | 2 | 8 Go | 40 GiB | 500 Mbit/s | 0.12 € / heure ou 0.11 € / heure |
| Production B3-16 | 4 | 16 Go | 80 GiB | 1000 Mbit/s | 0.23 € / heure ou 0.22 € / heure |
| Production B3-32 | 8 | 32 Go | 160 GiB | 2000 Mbit/s | 0.46 € / heure ou 0.43 € / heure |
| Production B3-64 | 16 | 64 Go | 320 GiB | 4000 Mbit/s | 0.91 € / heure ou 0.86 € / heure |
| Production B3-128 | 32 | 128 Go | 640 GiB | 8000 Mbit/s | 1.84 € / heure ou 1.73 € / heure |
| Production B3-256 | 64 | 256 Go | 1280 GiB | 16000 Mbit/s | 3.67 € / heure ou 3.47 € / heure |

---

## Network

### Network Bandwidth

**URL:** https://www.ovhcloud.com/fr/public-cloud/network/

**Description:**
Bande passante réseau publique pour les instances, permettant la communication avec Internet.

**Recommandation d'usage:**
Nécessaire pour toutes les instances nécessitant un accès Internet public.

**Use Cases Client:**
1. **Public network bandwidth for instances**

**Types de clients cibles:**
- Toutes les instances avec accès Internet
- Applications nécessitant communication publique

**Flavors Disponibles:**

| Flavor | Spécifications Techniques | Prix |
|--------|---------------------------|------|
| bandwidth-instance-in | N/A | Gratuit / heure |
| bandwidth-instance-out | N/A | Gratuit / heure |

**Détails Techniques par Flavor:**

#### bandwidth-instance-in
- **Plan Codes:** `bandwidth_instance_in.consumption`, `bandwidth_instance_in.consumption.3AZ`
- **Prix:** Gratuit / heure
- **Spécifications:** Bande passante entrante depuis Internet

#### bandwidth-instance-out
- **Plan Codes:** `bandwidth_instance_out.consumption`, `bandwidth_instance_out.consumption.3AZ`, `bandwidth_instance_out.consumption.SGP1`, `bandwidth_instance_out.consumption.SYD1`
- **Prix:** Gratuit / heure
- **Spécifications:** Bande passante sortante vers Internet

---

### Private Network Bandwidth

**URL:** https://www.ovhcloud.com/fr/public-cloud/network/

**Description:**
Bande passante réseau privée pour les instances dans vRack, permettant la communication privée entre instances.

**Recommandation d'usage:**
Idéal pour la communication privée entre instances, réseaux isolés, architectures multi-tiers.

**Use Cases Client:**
1. **Private network bandwidth for instances in vRack**

**Types de clients cibles:**
- Instances dans vRack
- Communication privée entre instances
- Architectures multi-tiers isolées

**Flavors Disponibles:**

| Flavor | Spécifications Techniques | Prix |
|--------|---------------------------|------|
| bandwidth-instance-vrack-in | N/A | Gratuit / heure |
| bandwidth-instance-vrack-out | N/A | Gratuit / heure |

**Détails Techniques par Flavor:**

#### bandwidth-instance-vrack-in
- **Plan Codes:** `bandwidth_instance_vrack_in.consumption`, `bandwidth_instance_vrack_in.consumption.3AZ`
- **Prix:** Gratuit / heure
- **Spécifications:** Bande passante entrante depuis vRack

#### bandwidth-instance-vrack-out
- **Plan Codes:** `bandwidth_instance_vrack_out.consumption`, `bandwidth_instance_vrack_out.consumption.3AZ`
- **Prix:** Gratuit / heure
- **Spécifications:** Bande passante sortante vers vRack

---

## AI

### AI Training

**URL:** https://www.ovhcloud.com/fr/public-cloud/ai-training/

**Description:**
Service d'entraînement de modèles d'IA avec GPU NVIDIA optimisés pour le machine learning et le deep learning.

**Recommandation d'usage:**
Idéal pour l'entraînement de modèles d'IA à grande échelle, le fine-tuning, la recherche en IA, et les workloads nécessitant des GPU.

**Use Cases Client:**
1. **AI Notebooks:** Data exploration, analysis and visualisation. Model Prototyping and Experimentation. AI Proof of Concept.
2. **AI Training:** Large scale Model Training. Model Fine-Tuning and Optimization. AI Research and Experimentation.
3. **AI Deploy:** Application AI Inference. Enterprise AI APIs. Operational Automation.
4. **AI Endpoints:** AI-Enhanced Applications. Predictable, High Throughput Services. Bulk AI Workloads.

**Types de clients cibles:**
- Entreprises développant des modèles d'IA
- Équipes de recherche en IA/ML
- Data scientists nécessitant GPU
- Startups tech spécialisées en IA

**Flavors Disponibles:**

| Flavor | vCPU | RAM | GPU | VRAM | Bande passante | Prix |
|--------|------|-----|-----|------|----------------|------|
| a10-1-gpu | 28 | 40 Go | NVIDIA Ampere A10 x1 | 24 Go | 5000 Mbit/s | 0.02 € / heure |
| a100-1-gpu | 13 | 160 Go | NVIDIA Ampere A100 x1 | 80 Go | 1500 Mbit/s | 0.05 € / heure |
| h100-1-gpu | 28 | 350 Go | NVIDIA Hopper H100 x1 | 80 Go | 5000 Mbit/s | 0.05 € / heure |
| l4-1-gpu | 20 | 80 Go | NVIDIA Ada Lovelace L4 x1 | 24 Go | 5000 Mbit/s | 0.01 € / heure |
| l40s-1-gpu | 13 | 80 Go | NVIDIA Ada Lovelace L40S x1 | 48 Go | 5000 Mbit/s | 0.03 € / heure |
| ai1-1-GPU | 13 | 40 Go | NVIDIA Tesla V100S x1 | 32 Go | 1500 Mbit/s | 0.03 € / heure |
| ai1-le-1-GPU | 13 | 40 Go | NVIDIA Tesla V100S x1 | 32 Go | 1500 Mbit/s | 0.02 € / heure |
| ai1-1-CPU | 1 | 4 Go | N/A | N/A | 500 Mbit/s | 0.0006 € / heure |

**Note:** Les détails techniques complets pour chaque flavor AI Training sont disponibles dans le catalogue complet.

---

### AI Deploy

**URL:** https://www.ovhcloud.com/fr/public-cloud/ai-deploy/

**Description:**
Service de déploiement de modèles d'IA pour l'inférence en production avec scaling automatique.

**Recommandation d'usage:**
Idéal pour déployer des modèles d'IA en production, créer des APIs d'inférence, et automatiser des processus opérationnels avec l'IA.

**Use Cases Client:**
1. **AI Notebooks:** Data exploration, analysis and visualisation. Model Prototyping and Experimentation. AI Proof of Concept.
2. **AI Training:** Large scale Model Training. Model Fine-Tuning and Optimization. AI Research and Experimentation.
3. **AI Deploy:** Application AI Inference. Enterprise AI APIs. Operational Automation.
4. **AI Endpoints:** AI-Enhanced Applications. Predictable, High Throughput Services. Bulk AI Workloads.

**Types de clients cibles:**
- Entreprises déployant des modèles d'IA en production
- Développeurs d'APIs d'inférence
- Organisations automatisant des processus avec l'IA

**Flavors Disponibles:**

| Flavor | vCPU | RAM | Bande passante | Prix |
|--------|------|-----|----------------|------|
| ai1-1-CPU | 1 | 4 Go | 500 Mbit/s | 0.0006 € / heure |

**Note:** AI Deploy propose également des endpoints pré-configurés (Lettria, Voxist) avec des prix spécifiques. Les détails complets sont disponibles dans le catalogue.

---

### AI Notebooks

**URL:** https://www.ovhcloud.com/fr/public-cloud/ai-notebooks/

**Description:**
Environnements de notebooks Jupyter avec GPU pour l'exploration de données, le prototypage de modèles et l'expérimentation en IA.

**Recommandation d'usage:**
Idéal pour l'exploration de données, la visualisation, le prototypage de modèles, les preuves de concept en IA, et l'expérimentation.

**Use Cases Client:**
1. **AI Notebooks:** Data exploration, analysis and visualisation. Model Prototyping and Experimentation. AI Proof of Concept.
2. **AI Training:** Large scale Model Training. Model Fine-Tuning and Optimization. AI Research and Experimentation.
3. **AI Deploy:** Application AI Inference. Enterprise AI APIs. Operational Automation.
4. **AI Endpoints:** AI-Enhanced Applications. Predictable, High Throughput Services. Bulk AI Workloads.

**Types de clients cibles:**
- Data scientists et chercheurs
- Équipes d'expérimentation en IA
- Développeurs de modèles ML

**Flavors Disponibles:**

| Flavor | vCPU | RAM | GPU | VRAM | Bande passante | Prix |
|--------|------|-----|-----|------|----------------|------|
| a10-1-gpu | 28 | 40 Go | NVIDIA Ampere A10 x1 | 24 Go | 5000 Mbit/s | 0.02 € / heure |
| a100-1-gpu | 13 | 160 Go | NVIDIA Ampere A100 x1 | 80 Go | 1500 Mbit/s | 0.05 € / heure |
| h100-1-gpu | 28 | 350 Go | NVIDIA Hopper H100 x1 | 80 Go | 5000 Mbit/s | 0.05 € / heure |
| l4-1-gpu | 20 | 80 Go | NVIDIA Ada Lovelace L4 x1 | 24 Go | 5000 Mbit/s | 0.01 € / heure |
| l40s-1-gpu | 13 | 80 Go | NVIDIA Ada Lovelace L40S x1 | 48 Go | 5000 Mbit/s | 0.03 € / heure |
| ai1-1-GPU | 13 | 40 Go | NVIDIA Tesla V100S x1 | 32 Go | 1500 Mbit/s | 0.03 € / heure |
| ai1-le-1-GPU | 13 | 40 Go | NVIDIA Tesla V100S x1 | 32 Go | 1500 Mbit/s | 0.02 € / heure |
| ai1-1-CPU | 1 | 4 Go | N/A | N/A | 500 Mbit/s | 0.0006 € / heure |

**Note:** Les détails techniques complets pour chaque flavor AI Notebooks sont disponibles dans le catalogue complet.

---

### AI GPU Deploy

**URL:** https://www.ovhcloud.com/fr/public-cloud/ai-deploy/

**Description:**
Service de déploiement d'applications IA avec GPU pour l'inférence en production avec modèles GPU.

**Recommandation d'usage:**
Idéal pour le déploiement de modèles d'IA en production, l'inférence GPU, les APIs d'IA entreprise, et l'automatisation opérationnelle.

**Use Cases Client:**
1. **AI Notebooks:** Data exploration, analysis and visualisation. Model Prototyping and Experimentation. AI Proof of Concept.
2. **AI Training:** Large scale Model Training. Model Fine-Tuning and Optimization. AI Research and Experimentation.
3. **AI Deploy:** Application AI Inference. Enterprise AI APIs. Operational Automation.
4. **AI Endpoints:** AI-Enhanced Applications. Predictable, High Throughput Services. Bulk AI Workloads.

**Types de clients cibles:**
- Applications d'inférence IA en production
- APIs d'IA entreprise
- Automatisation opérationnelle
- Services d'IA haute performance

**Flavors Disponibles:**

| Flavor | vCPU | RAM | GPU | VRAM | Bande passante | Prix |
|--------|------|-----|-----|------|----------------|------|
| a10-1-gpu | 28 | 40 Go | NVIDIA Ampere A10 x1 | 24 Go | 5000 Mbit/s | 0.02 € / heure |
| a100-1-gpu | 13 | 160 Go | NVIDIA Ampere A100 x1 | 80 Go | 1500 Mbit/s | 0.05 € / heure |
| h100-1-gpu | 28 | 350 Go | NVIDIA Hopper H100 x1 | 80 Go | 5000 Mbit/s | 0.05 € / heure |
| l4-1-gpu | 20 | 80 Go | NVIDIA Ada Lovelace L4 x1 | 24 Go | 5000 Mbit/s | 0.01 € / heure |
| l40s-1-gpu | 13 | 80 Go | NVIDIA Ada Lovelace L40S x1 | 48 Go | 5000 Mbit/s | 0.03 € / heure |
| ai1-1-GPU | 13 | 40 Go | NVIDIA Tesla V100S x1 | 32 Go | 1500 Mbit/s | 0.03 € / heure |
| ai1-le-1-GPU | 13 | 40 Go | NVIDIA Tesla V100S x1 | 32 Go | 1500 Mbit/s | 0.02 € / heure |

---

### AI Endpoints (Lettria)

**URL:** https://www.ovhcloud.com/fr/public-cloud/ai-endpoints/

**Description:**
Endpoints IA Lettria pour analyse d'émotions, reconnaissance d'entités nommées, et analyse de sentiment.

**Recommandation d'usage:**
Parfait pour l'analyse de texte, l'analyse de sentiment, la reconnaissance d'entités, et les applications NLP.

**Use Cases Client:**
1. **AI Notebooks:** Data exploration, analysis and visualisation. Model Prototyping and Experimentation. AI Proof of Concept.
2. **AI Training:** Large scale Model Training. Model Fine-Tuning and Optimization. AI Research and Experimentation.
3. **AI Deploy:** Application AI Inference. Enterprise AI APIs. Operational Automation.
4. **AI Endpoints:** AI-Enhanced Applications. Predictable, High Throughput Services. Bulk AI Workloads.

**Types de clients cibles:**
- Analyse de texte et sentiment
- Reconnaissance d'entités nommées
- Applications NLP
- Analyse d'émotions

**Flavors Disponibles:**

| Flavor | Prix |
|--------|------|
| ai-app-lettria-emotion-cpu | 0.03 € / heure |
| ai-app-lettria-emotion-gpu | 0.04 € / heure |
| ai-app-lettria-named-entity-recognition-cpu | 0.03 € / heure |
| ai-app-lettria-named-entity-recognition-gpu | 0.04 € / heure |
| ai-app-lettria-sentiment-cpu | 0.03 € / heure |
| ai-app-lettria-sentiment-gpu | 0.04 € / heure |

---

### AI Endpoints (Voxist)

**URL:** https://www.ovhcloud.com/fr/public-cloud/ai-endpoints/

**Description:**
Endpoints IA Voxist pour transcription de la parole en texte (speech-to-text).

**Recommandation d'usage:**
Idéal pour la transcription audio, la conversion parole-texte, et les applications de traitement vocal.

**Use Cases Client:**
1. **AI Notebooks:** Data exploration, analysis and visualisation. Model Prototyping and Experimentation. AI Proof of Concept.
2. **AI Training:** Large scale Model Training. Model Fine-Tuning and Optimization. AI Research and Experimentation.
3. **AI Deploy:** Application AI Inference. Enterprise AI APIs. Operational Automation.
4. **AI Endpoints:** AI-Enhanced Applications. Predictable, High Throughput Services. Bulk AI Workloads.

**Types de clients cibles:**
- Transcription audio
- Conversion parole-texte
- Applications de traitement vocal
- Services de transcription

**Flavors Disponibles:**

| Flavor | Prix |
|--------|------|
| ai-voxist.transcript-standard-cpu-bracket1 | 0.0002 € / heure |
| ai-voxist.transcript-standard-cpu-bracket2 | 0.0002 € / heure |
| ai-voxist.transcript-standard-cpu-bracket3 | 0.0001 € / heure |
| ai-voxist.transcript-standard-cpu-bracket4 | 0.0001 € / heure |
| ai-voxist.transcript-standard-cpu-bracket5 | 0.0001 € / heure |
| ai-voxist.transcript-standard-gpu-bracket1 | 0.0002 € / heure |
| ai-voxist.transcript-standard-gpu-bracket2 | 0.0002 € / heure |
| ai-voxist.transcript-standard-gpu-bracket3 | 0.0001 € / heure |
| ai-voxist.transcript-standard-gpu-bracket4 | 0.0001 € / heure |
| ai-voxist.transcript-standard-gpu-bracket5 | 0.0001 € / heure |

---

### AI Endpoints - Embeddings

**URL:** https://www.ovhcloud.com/fr/public-cloud/ai-endpoints/

**Description:**
Endpoints IA pour génération d'embeddings de texte pour recherche sémantique et similarité.

**Recommandation d'usage:**
Parfait pour la recherche sémantique, la similarité de texte, et les applications nécessitant des représentations vectorielles.

**Use Cases Client:**
1. **AI Notebooks:** Data exploration, analysis and visualisation. Model Prototyping and Experimentation. AI Proof of Concept.
2. **AI Training:** Large scale Model Training. Model Fine-Tuning and Optimization. AI Research and Experimentation.
3. **AI Deploy:** Application AI Inference. Enterprise AI APIs. Operational Automation.
4. **AI Endpoints:** AI-Enhanced Applications. Predictable, High Throughput Services. Bulk AI Workloads.

**Types de clients cibles:**
- Recherche sémantique
- Similarité de texte
- Applications de recommandation
- Recherche vectorielle

**Flavors Disponibles:**

| Flavor | Prix |
|--------|------|
| ai-endpoints.bge-base-en-v1-5-input_tokens | 0.0000 € / heure |
| ai-endpoints.bge-multilingual-gemma2-input_tokens | 0.0000 € / heure |
| ai-endpoints.bge-m3-input_tokens | 0.0000 € / heure |

---

### AI Endpoints - CodeLLM

**URL:** https://www.ovhcloud.com/fr/public-cloud/ai-endpoints/

**Description:**
Endpoints IA pour modèles de langage spécialisés en génération de code et assistance au développement.

**Recommandation d'usage:**
Idéal pour la génération de code, l'assistance au développement, et les applications de programmation assistée par IA.

**Use Cases Client:**
1. **AI Notebooks:** Data exploration, analysis and visualisation. Model Prototyping and Experimentation. AI Proof of Concept.
2. **AI Training:** Large scale Model Training. Model Fine-Tuning and Optimization. AI Research and Experimentation.
3. **AI Deploy:** Application AI Inference. Enterprise AI APIs. Operational Automation.
4. **AI Endpoints:** AI-Enhanced Applications. Predictable, High Throughput Services. Bulk AI Workloads.

**Types de clients cibles:**
- Génération de code
- Assistance au développement
- Applications de programmation assistée
- Outils de développement IA

**Flavors Disponibles:**

| Flavor | Prix |
|--------|------|
| ai-endpoints.qwen-2-5-coder-32b-instruct-input_tokens | 0.0000 € / heure |
| ai-endpoints.qwen-2-5-coder-32b-instruct-output_tokens | 0.0000 € / heure |
| ai-endpoints.mamba-codestral-7b-v0-1-input_tokens | 0.0000 € / heure |
| ai-endpoints.mamba-codestral-7b-v0-1-output_tokens | 0.0000 € / heure |
| ai-endpoints.qwen-3-coder-30b-a3b-instruct-input_tokens | 0.0000 € / heure |
| ai-endpoints.qwen-3-coder-30b-a3b-instruct-output_tokens | 0.0000 € / heure |

---

### AI Endpoints - LLM

**URL:** https://www.ovhcloud.com/fr/public-cloud/ai-endpoints/

**Description:**
Endpoints IA pour grands modèles de langage (LLM) pour génération de texte et conversations.

**Recommandation d'usage:**
Parfait pour la génération de texte, les chatbots, les assistants conversationnels, et les applications de traitement de langage naturel avancées.

**Use Cases Client:**
1. **AI Notebooks:** Data exploration, analysis and visualisation. Model Prototyping and Experimentation. AI Proof of Concept.
2. **AI Training:** Large scale Model Training. Model Fine-Tuning and Optimization. AI Research and Experimentation.
3. **AI Deploy:** Application AI Inference. Enterprise AI APIs. Operational Automation.
4. **AI Endpoints:** AI-Enhanced Applications. Predictable, High Throughput Services. Bulk AI Workloads.

**Types de clients cibles:**
- Génération de texte
- Chatbots et assistants conversationnels
- Applications NLP avancées
- Services de conversation IA

**Flavors Disponibles:**

| Flavor | Prix |
|--------|------|
| ai-endpoints.llama-3-1-70b-instruct-input_tokens | 0.0000 € / heure |
| ai-endpoints.llama-3-1-70b-instruct-output_tokens | 0.0000 € / heure |
| ai-endpoints.llama-3-1-405b-instruct-input_tokens | 0.0000 € / heure |
| ai-endpoints.llama-3-1-405b-instruct-output_tokens | 0.0000 € / heure |
| ai-endpoints.mixtral-8x7b-instruct-v0-1-input_tokens | 0.0000 € / heure |
| ai-endpoints.mixtral-8x7b-instruct-v0-1-output_tokens | 0.0000 € / heure |
| ai-endpoints.mixtral-8x22b-instruct-v0-1-input_tokens | 0.0000 € / heure |
| ai-endpoints.mixtral-8x22b-instruct-v0-1-output_tokens | 0.0000 € / heure |

**Note:** Les détails techniques complets pour tous les endpoints AI (VLM, NLP, Translation, Speech to text) sont disponibles dans le catalogue complet. De nombreux autres endpoints AI sont disponibles avec des prix et spécifications détaillés.

---

## Network

### Load Balancer

**URL:** https://www.ovhcloud.com/fr/public-cloud/network/load-balancer/

**Description:**
Répartiteur de charge pour distribuer le trafic entre plusieurs instances avec haute disponibilité.

**Recommandation d'usage:**
Idéal pour les applications web haute disponibilité, la distribution de charge, l'exposition sécurisée de services privés, et le load balancing hybride.

**Use Cases Client:**
1. **Highly Available Web & API Applications:** Distribute traffic across multiple backend instances to ensure uptime, performance and resilience for customer-facing services.
2. **Secure Frontend for Private Architectures:** Expose applications through a single, secured entry point while keeping backend services isolated in Private Networks.
3. **Hybrid & Multi-Platform Load Balancing:** Use a single Load Balancer to distribute traffic across Public Cloud instances, Kubernetes workloads, Hosted Private Cloud or Bare Metal servers.

**Types de clients cibles:**
- Applications web haute disponibilité
- Architectures multi-instances
- Services nécessitant distribution de charge
- Applications critiques

**Flavors Disponibles:**

| Flavor | Bande passante | Prix |
|--------|----------------|------|
| Load Balancer S | 200 Mbit/s | 0.01 € / heure ou 6.00 € / mois |
| Load Balancer M | 500 Mbit/s | 0.02 € / heure ou 15.00 € / mois |
| Load Balancer L | 2000 Mbit/s | 0.06 € / heure ou 40.00 € / mois |
| Load Balancer XL | 4000 Mbit/s | 0.21 € / heure ou 150.00 € / mois |

**Détails Techniques par Flavor:**

#### Load Balancer S
- **Plan Codes:** `octavia-loadbalancer.loadbalancer-s.hour.consumption`, `octavia-loadbalancer.loadbalancer-s.month.consumption`, `octavia-loadbalancer.loadbalancer-s.hour.consumption.3AZ`
- **Prix:** 0.01 € / heure, 6.00 € / mois
- **Spécifications:**
  - Bande passante: 200 Mbit/s

#### Load Balancer M
- **Plan Codes:** `octavia-loadbalancer.loadbalancer-m.hour.consumption`, `octavia-loadbalancer.loadbalancer-m.month.consumption`, `octavia-loadbalancer.loadbalancer-m.hour.consumption.3AZ`
- **Prix:** 0.02 € / heure, 15.00 € / mois
- **Spécifications:**
  - Bande passante: 500 Mbit/s

#### Load Balancer L
- **Plan Codes:** `octavia-loadbalancer.loadbalancer-l.hour.consumption`, `octavia-loadbalancer.loadbalancer-l.month.consumption`, `octavia-loadbalancer.loadbalancer-l.hour.consumption.3AZ`
- **Prix:** 0.06 € / heure, 40.00 € / mois
- **Spécifications:**
  - Bande passante: 2000 Mbit/s

#### Load Balancer XL
- **Plan Codes:** `octavia-loadbalancer.loadbalancer-xl.hour.consumption`, `octavia-loadbalancer.loadbalancer-xl.month.consumption`, `octavia-loadbalancer.loadbalancer-xl.hour.consumption.3AZ`
- **Prix:** 0.21 € / heure, 150.00 € / mois
- **Spécifications:**
  - Bande passante: 4000 Mbit/s

---

### Public Gateway

**URL:** https://www.ovhcloud.com/fr/public-cloud/network/gateway/

**Description:**
Passerelle publique pour permettre l'accès Internet aux instances privées de manière sécurisée.

**Recommandation d'usage:**
Idéal pour permettre l'accès Internet aux instances privées, exposer des services de manière contrôlée, et améliorer la sécurité des architectures privées.

**Use Cases Client:**
1. **Enable internet access to private instances:** Allow private instances to access external services (updates, APIs, repositories) while remaining fully isolated from direct internet exposure.
2. **Exposing a service on an instance:** Expose selected services to the public internet in a controlled way, without assigning public IPs to backend resources
3. **Exposing services behind Load Balancer:** Load Balancer enhances security and enables SSL encryption, and can be seamlessly updated through the Gateway-hosted floating IP

**Types de clients cibles:**
- Architectures privées nécessitant accès Internet
- Services nécessitant exposition contrôlée
- Applications avec besoins de sécurité renforcée

**Flavors Disponibles:**

| Flavor | Bande passante | Prix |
|--------|----------------|------|
| Gateway L | 2000 Mbit/s | 0.05 € / heure ou 35.00 € / mois |
| Gateway 2XL | 8000 Mbit/s | 0.42 € / heure ou 300.00 € / mois |

**Détails Techniques par Flavor:**

#### Gateway L
- **Plan Codes:** `gateway.gateway-l.hour.consumption`, `gateway.gateway-l.month.consumption`
- **Prix:** 0.05 € / heure, 35.00 € / mois
- **Spécifications:**
  - Bande passante: 2000 Mbit/s

#### Gateway 2XL
- **Plan Codes:** `gateway.gateway-2xl.hour.consumption`, `gateway.gateway-2xl.month.consumption`
- **Prix:** 0.42 € / heure, 300.00 € / mois
- **Spécifications:**
  - Bande passante: 8000 Mbit/s

---

### Floating IP

**URL:** https://www.ovhcloud.com/fr/public-cloud/network/floating-ip/

**Description:**
Adresses IP publiques flottantes pouvant être déplacées entre instances.

**Recommandation d'usage:**
Idéal pour la maintenance transparente, l'exposition sécurisée d'instances privées, et la création de points d'entrée haute disponibilité.

**Use Cases Client:**
1. **Transparent Maintenance & Server Replacement:** Move a public service from one instance to another instantly, without changing IP address.
2. **Secure Exposure of a Private Instance:** Expose a service hosted in a Private Network to the internet using a Floating IP, while keeping the instance isolated.
3. **Highly Available Application Frontend:** Attach a Floating IP to a Load Balancer to create a single, secure and stable entry point for multi-instance applications.

**Types de clients cibles:**
- Applications nécessitant maintenance transparente
- Services nécessitant IP stable
- Architectures haute disponibilité

**Flavors Disponibles:**

| Flavor | Prix |
|--------|------|
| publicip.ip.hour | Gratuit / heure ou 0.01 € / heure ou 0.0025 € / heure ou 0.0028 € / heure |

**Détails Techniques:**

#### publicip.ip.hour
- **Plan Codes:** `publicip.ip.hour.consumption`, `publicip.ip.hour.consumption.LZ.AF`, `publicip.ip.hour.consumption.LZ`, `publicip.ip.hour.consumption.LZ.EU`
- **Prix:** Gratuit / heure, 0.01 € / heure, 0.0025 € / heure, 0.0028 € / heure
- **Spécifications:** Adresse IP publique flottante

---

## Container

### Managed Kubernetes Service

**URL:** https://www.ovhcloud.com/fr/public-cloud/kubernetes-managed/

**Description:**
Service Kubernetes managé avec plan de contrôle haute disponibilité et scaling automatique.

**Recommandation d'usage:**
Idéal pour déployer des applications containerisées, simplifier le déploiement, optimiser les coûts d'infrastructure, et créer des applications cloud-native résilientes.

**Use Cases Client:**
1. **Simplify and accelerate application deployment:** Forget about infrastructure dependencies and scale micro-services at high speed. Embrace the modern application world by stacking containers and accelerate time to market innovation.
2. **Optimize infrastructure cost ownership:** Densify your data plane utilization on clusters to have the best return on cloud investment and avoiding to handle multiple kubernetes cluster to manage.
3. **Failure-proof your cloud native application:** Deploy highly resilient cloud native application on our multi zonal region. Kubernetes control plane is deployed regionally and data plane is multi zonal.

**Types de clients cibles:**
- Applications containerisées
- Microservices
- Équipes DevOps
- Applications cloud-native

**Flavors Disponibles:**

| Flavor | Prix |
|--------|------|
| Free | Gratuit / heure |
| Standard | 0.09 € / heure |

**Détails Techniques:**

#### Free
- **Plan Codes:** `mks.free.hour.consumption`
- **Prix:** Gratuit / heure
- **Spécifications:** Plan Kubernetes gratuit

#### Standard
- **Plan Codes:** `mks.standard.hour.consumption.3az`
- **Prix:** 0.09 € / heure
- **Spécifications:** Plan Kubernetes standard avec haute disponibilité

---

### Managed Rancher Service

**URL:** https://www.ovhcloud.com/fr/public-cloud/rancher/

**Description:**
Service Rancher managé pour la gestion multi-clusters Kubernetes et la modernisation d'infrastructure.

**Recommandation d'usage:**
Parfait pour moderniser et scaler l'infrastructure efficacement, gérer plusieurs clusters Kubernetes, et déployer des applications sur edge computing avec K3S.

**Use Cases Client:**
1. **Modernizing and scaling infrastructure efficiently:** Maintaining and deploying news services without handling infrastructure and dependencies complexity.
2. **Multi-cluster and multi-cloud management:** Address enterprise level Kubernetes cluster provisioning, upgrades, user and policy management anywhere (on premise, on virtualized environement or in baremetal) in any cloud providers.
3. **Edge computing with K3S:** Run containerized apps on edge (K3S) and keep the same level of administration, monitoring, scaling and updating if it's was on traditional cloud infrastructure

**Types de clients cibles:**
- Gestion multi-clusters Kubernetes
- Modernisation d'infrastructure
- Edge computing avec K3S
- Environnements multi-cloud

**Flavors Disponibles:**

| Flavor | Prix |
|--------|------|
| Rancher OVHcloud Edition | 0.01 € / heure |
| Rancher Standard | 0.02 € / heure |

**Détails Techniques par Flavor:**

#### Rancher OVHcloud Edition
- **Plan Codes:** `rancher.ovhcloud-edition.hour.consumption`
- **Prix:** 0.01 € / heure
- **Spécifications:** Édition Rancher OVHcloud

#### Rancher Standard
- **Plan Codes:** `rancher.standard.hour.consumption`
- **Prix:** 0.02 € / heure
- **Spécifications:** Édition Rancher Standard

---

### Managed Private Registry

**URL:** https://www.ovhcloud.com/fr/public-cloud/container-registry/

**Description:**
Registre de conteneurs privé managé basé sur Harbor pour stocker et gérer les images Docker.

**Recommandation d'usage:**
Idéal pour configurer facilement CI/CD, améliorer la collaboration d'équipe, et gérer efficacement les images et artefacts IA.

**Use Cases Client:**
1. **Easily set up your CI/CD:** Facilitate the entire integration with your CI/CD via API. Accelerate your software releases, from development to production, while OVHcloud manages your private container registry, ensuring the availability of images and a smooth, stress-free application deployment process.
2. **Improve team collaboration:** Enable the efficient and secure delivery of images, everywhere you operate. Depending on their rights, developers access approved images, reducing the risk of obsolescence. Managed Private Registry also enables multiple connections to your container registry to take place simultaneously, further enhancing the agility of your teams.
3. **Streamline management of image or AI artefacts:** Manage your private storage configuration via a single, dedicated Harbor interface, or through the Harbor API. This allows you to ensure the integrity of your images, by synchronising multiple container registries and automating the removal of unused images.

**Types de clients cibles:**
- Équipes DevOps
- Pipelines CI/CD
- Gestion d'images conteneurs
- Organisations avec besoins de sécurité

**Flavors Disponibles:**

| Flavor | Stockage | Bande passante | Prix |
|--------|----------|----------------|------|
| S | 200 GiB | Illimitée | 0.02 € / heure ou 17.60 € / mois ou 0.03 € / heure |
| M | 600 GiB | Illimitée | 0.05 € / heure ou 40.00 € / mois ou 0.06 € / heure |
| L | 5000 GiB | Illimitée | 0.26 € / heure ou 190.00 € / mois ou 0.29 € / heure |

**Détails Techniques:**

#### S
- **Plan Codes:** `registry.s-plan-equivalent.hour.consumption`, `registry.s-plan-equivalent.hour.monthly.postpaid`, `registry.s-plan-equivalent.hour.consumption.3az`
- **Prix:** 0.02 € / heure, 17.60 € / mois, 0.03 € / heure
- **Spécifications:**
  - Stockage: 200 GiB
  - Bande passante: Illimitée

#### M
- **Plan Codes:** `registry.m-plan-equivalent.hour.consumption`, `registry.m-plan-equivalent.hour.monthly.postpaid`, `registry.m-plan-equivalent.hour.consumption.3az`
- **Prix:** 0.05 € / heure, 40.00 € / mois, 0.06 € / heure
- **Spécifications:**
  - Stockage: 600 GiB
  - Bande passante: Illimitée

#### L
- **Plan Codes:** `registry.l-plan-equivalent.hour.consumption`, `registry.l-plan-equivalent.hour.monthly.postpaid`, `registry.l-plan-equivalent.hour.consumption.3az`
- **Prix:** 0.26 € / heure, 190.00 € / mois, 0.29 € / heure
- **Spécifications:**
  - Stockage: 5000 GiB
  - Bande passante: Illimitée

---

## Analytics

### Data Platform

**URL:** https://www.ovhcloud.com/fr/public-cloud/data-platform/

**Description:**
Plateforme de données managée pour l'analyse, le traitement et le catalogage de données à grande échelle.

**Recommandation d'usage:**
Idéal pour la segmentation client, les recommandations personnalisées, la détection de fraude, le scoring de crédit, et l'analyse de données patients.

**Use Cases Client:**
1. **Retail & Ecommerce:** Securing proper Customer Segmentation based on purchasing behaviour or launching Personalized Recommendations based on Analyzing customer browsing analysis.
2. **Financial Services & Banking:** Enabling Fraud Detection by using machine learning to identify suspicious transactions or pinpoint Credit Scoring by evaluating transactional history.
3. **Healthcare & Life Science:** Identifying patients at high risk for diseases using AI-driven models. Or analyzing patient data to accelerate drug discovery and trial effectiveness.

**Types de clients cibles:**
- Retail et e-commerce
- Services financiers et banques
- Santé et sciences de la vie
- Organisations avec besoins d'analyse de données

**Flavors Disponibles:**

| Flavor | vCPU | RAM | Prix |
|--------|------|-----|------|
| Data Platform Capacity | 20 | 4 Go | 44.99 € / heure |
| Applications Services compute | N/A | N/A | 0.08 € / heure |
| Data Processing Engine compute | N/A | N/A | 0.08 € / heure |
| Data Catalog, Control Center and IAM services | N/A | N/A | Gratuit / heure |
| Data Lakehouse & Analytics queries compute | N/A | N/A | 5.47 € / heure |
| Data Lakehouse storage | N/A | N/A | 0.0000 € / heure |

**Détails Techniques:**

#### Data Platform Capacity
- **Plan Codes:** `dataplatform.data-platform-capacity.hour.consumption`
- **Prix:** 44.99 € / heure
- **Spécifications:**
  - CPU: 20 vCPU
  - Mémoire: 4 Go

---

### Data Platform - Pay as you go

**URL:** https://www.ovhcloud.com/fr/public-cloud/data-platform/

**Description:**
Flavors Data Platform en mode Pay as you go pour facturation à l'usage des différents composants de la plateforme.

**Recommandation d'usage:**
Idéal pour les environnements nécessitant flexibilité de facturation et utilisation variable des ressources Data Platform.

**Use Cases Client:**
1. **Retail & Ecommerce:** Securing proper Customer Segmentation based on purchasing behaviour or launching Personalized Recommendations based on Analyzing customer browsing analysis.
2. **Financial Services & Banking:** Enabling Fraud Detection by using machine learning to identify suspicious transactions or pinpoint Credit Scoring by evaluating transactional history.
3. **Healthcare & Life Science:** Identifying patients at high risk for diseases using AI-driven models. Or analyzing patient data to accelerate drug discovery and trial effectiveness.

**Types de clients cibles:**
- Environnements avec utilisation variable
- Facturation à l'usage
- Flexibilité de ressources

**Flavors Disponibles:**

| Flavor | Prix |
|--------|------|
| Applications Services compute | 0.08 € / heure |
| Data Processing Engine compute | 0.08 € / heure |
| Data Catalog, Control Center and IAM services | Gratuit / heure |
| Data Lakehouse & Analytics queries compute | 5.47 € / heure |
| Data Lakehouse storage | 0.0000 € / heure |

**Détails Techniques par Flavor:**

#### Applications Services compute
- **Plan Codes:** `dataplatform.application-services.hour.consumption`
- **Prix:** 0.08 € / heure
- **Spécifications:** Compute pour services d'applications

#### Data Processing Engine compute
- **Plan Codes:** `dataplatform.data-processing-engine.hour.consumption`
- **Prix:** 0.08 € / heure
- **Spécifications:** Compute pour moteur de traitement de données

#### Data Catalog, Control Center and IAM services
- **Plan Codes:** `dataplatform.included-services.hour.consumption`
- **Prix:** Gratuit / heure
- **Spécifications:** Services inclus (Catalog, Control Center, IAM)

#### Data Lakehouse & Analytics queries compute
- **Plan Codes:** `dataplatform.lakehouse-manager-query.unit.consumption`
- **Prix:** 5.47 € / heure
- **Spécifications:** Compute pour requêtes Lakehouse & Analytics

#### Data Lakehouse storage
- **Plan Codes:** `dataplatform.lakehouse-storage.unit.consumption`
- **Prix:** 0.0000 € / heure
- **Spécifications:** Stockage Data Lakehouse

---

## Note importante

Ce fichier contient maintenant une sélection étendue des produits principaux avec toutes les informations combinées. Le catalogue complet contient encore de nombreux autres produits (bases de données PostgreSQL, MongoDB, Redis, Kafka, OpenSearch, services AI, Network, Container, etc.).

Pour obtenir la liste complète de tous les produits et flavors, consultez le fichier `docs_backup/catalogue-produits-complet.md`.

**Produits ajoutés dans cette version:**
- ✅ Instances Metal (Bare Metal)
- ✅ Instances CPU Optimized (c2, c3)
- ✅ Instances RAM Optimized (r2, r3)
- ✅ Instances IOPS Optimized (i1)
- ✅ Instances Discovery (d2)
- ✅ Bases de données managées PostgreSQL (Business, Production, Enterprise, Advanced, Essential)
- ✅ Bases de données managées MongoDB (Business, Enterprise, Essential, Production, Discovery, Advanced)
- ✅ Bases de données managées Redis (Business, Production)
- ✅ Bases de données managées Kafka (Business, Enterprise, Advanced, Production)
- ✅ Bases de données managées Kafka Connect (Business, Enterprise, Essential)
- ✅ Bases de données managées Kafka MirrorMaker (Business, Enterprise, Essential)
- ✅ Bases de données managées OpenSearch (Business, Enterprise, Production)
- ✅ Bases de données managées Grafana (Essential, Business)
- ✅ Services AI Training (GPU: A10, A100, H100, L4, L40S, V100S)
- ✅ Services AI Deploy (CPU)
- ✅ Services AI GPU Deploy
- ✅ Services AI Notebooks (GPU et CPU)
- ✅ Services AI Endpoints (Lettria, Voxist, Embeddings, CodeLLM, LLM)
- ✅ Services Network - Load Balancer (S, M, L, XL)
- ✅ Services Network - Public Gateway (L, 2XL)
- ✅ Services Network - Floating IP
- ✅ Services Network - Network Bandwidth
- ✅ Services Network - Private Network Bandwidth
- ✅ Services Container - Managed Kubernetes Service (Free, Standard)
- ✅ Services Container - Managed Private Registry (S, M, L)
- ✅ Services Container - Managed Rancher Service
- ✅ Services Analytics - Data Platform (Capacity et Pay as you go)
- ✅ Services Storage - Archive Storage
- ✅ Services Storage - Block Storage (High Performance)
- ✅ Services Storage - Object Storage (Standard, S3 API, S3 API 3AZ)
- ✅ Services Storage - Cold Archive (V1 et V2)
- ✅ Services Storage - Infrequent Access Object Storage
- ✅ Services Storage - Block Storage Volumes (classic, high-speed, high-speed-gen2)
- ✅ Services Storage - Volume Snapshots

**Note:** Ce fichier contient maintenant une sélection très complète des produits OVHcloud Public Cloud. Certains produits spécialisés ou variantes peuvent encore être manquants. Pour obtenir la liste exhaustive de tous les produits et flavors avec tous les détails techniques, consultez le fichier `docs_backup/catalogue-produits-complet.md`.

**Produits exclus (selon demande):**
- Cassandra (Business, Enterprise, Essential)
- M3DB (Business, Enterprise, Essential)
- M3 Aggregator (Business, Enterprise)
