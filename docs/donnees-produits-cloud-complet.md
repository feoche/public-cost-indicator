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

## Note importante

Ce fichier contient une sélection des produits principaux avec toutes les informations combinées. Le catalogue complet contient de nombreux autres produits (autres types d'instances, bases de données PostgreSQL, MongoDB, Redis, Kafka, OpenSearch, services AI, Network, etc.).

Pour obtenir la liste complète de tous les produits et flavors, consultez le fichier `docs/catalogue-produits-complet.md`.

**Prochaines étapes pour compléter ce fichier:**
- Ajouter les autres types d'instances (CPU Optimized, RAM Optimized, etc.)
- Ajouter toutes les bases de données managées (PostgreSQL, MongoDB, Redis, Kafka, OpenSearch)
- Ajouter les services AI (AI Training, AI Deploy, AI Endpoints, AI Notebooks)
- Ajouter les services Network (Load Balancer, Gateway, Floating IP, vRack)
- Ajouter les services Storage complets (Object Storage, Cold Archive)
