# Prompt pour Recommandation Infrastructure OVHcloud Public Cloud - Application Data Crawling

## Contexte et Rôle
Tu es un expert consultant en infrastructure cloud OVHcloud Public Cloud. Ton rôle est d'analyser les besoins d'un client et de recommander les produits les plus adaptés avec une estimation de coûts mensuels précise.

## Informations sur le Client

**Type d'organisation :** Startup
**Rôle du demandeur :** DevOps
**Objectif principal :** Développer et déployer une application de data crawling (collecte et traitement de données web)

## Spécifications Techniques Requises

### Compute (Instances)
- **RAM nécessaire :** Entre 32 GB et 64 GB par instance
- **CPU nécessaire :** Quad core (4 vCPU) minimum par instance
- **Type de charge de travail :** Data crawling (traitement de données, parsing, extraction)
- **Performance :** Besoin d'un bon équilibre CPU/RAM pour traiter efficacement les données collectées
- **Disponibilité :** Disponibilité standard acceptable (99%)
- **GPU :** Non nécessaire
- **Bare Metal :** Non, instances virtuelles suffisent

### Stockage
- **Volume de données :** Entre 5 TB et 10 TB de stockage nécessaire
- **Type de stockage :** Stockage pour données de crawling (fichiers, objets, données structurées)
- **Fréquence d'accès :** Accès fréquent pour écriture/lecture des données collectées
- **Durabilité :** Réplication souhaitée pour éviter la perte de données

### Autres Besoins
- **Environnement :** Production
- **Budget :** Optimisation des coûts importante (startup)
- **Modèle de facturation :** Préférence pour engagement mensuel si avantageux, sinon pay-as-you-go
- **Région :** Europe (France de préférence)
- **Scalabilité :** Infrastructure pouvant évoluer selon la croissance

## Tâche à Réaliser

En te basant sur le catalogue complet des produits OVHcloud Public Cloud disponible dans le fichier `docs/donnees-produits-cloud-complet.md`, je te demande de :

1. **Identifier les instances Compute optimales** qui correspondent aux critères :
   - RAM entre 32 GB et 64 GB
   - Minimum 4 vCPU (quad core)
   - Adaptées pour du data crawling et traitement de données

2. **Recommander une solution de stockage** pour 5-10 TB :
   - Comparer Object Storage vs Block Storage vs Archive Storage
   - Justifier le choix selon le cas d'usage data crawling
   - Prendre en compte les besoins d'accès fréquent

3. **Proposer une architecture complète** incluant :
   - Le nombre d'instances recommandé
   - La configuration de stockage
   - Tous les services complémentaires nécessaires (réseau, etc.)

4. **Fournir une estimation de coûts mensuels détaillée** :
   - Coût par instance (avec option mensuelle si disponible)
   - Coût du stockage (5 TB et 10 TB)
   - Coûts additionnels (bande passante, etc.)
   - **Total mensuel pour chaque scénario (5 TB et 10 TB)**
   - Comparaison pay-as-you-go vs engagement mensuel

5. **Justifier les recommandations** :
   - Pourquoi ces produits sont adaptés au data crawling
   - Avantages/inconvénients de chaque option
   - Recommandations d'optimisation des coûts

## Format de Réponse Attendu

Structure ta réponse comme suit :

### 1. Analyse des Besoins
[Résumé de la compréhension des besoins]

### 2. Recommandations d'Instances Compute
- **Option 1 :** [Nom du flavor] - [Justification]
  - Spécifications : X vCPU, Y GB RAM, Z GB stockage local
  - Prix : X €/heure ou Y €/mois
  - Plan Code : [code]
  
- **Option 2 :** [Alternative si applicable]

### 3. Recommandation de Stockage
- **Type recommandé :** [Object Storage / Block Storage / Archive]
- **Justification :** [Pourquoi adapté au data crawling]
- **Configuration :** [Détails]

### 4. Architecture Proposée
- Nombre d'instances : X
- Configuration par instance : [détails]
- Stockage : [détails]
- Services complémentaires : [si nécessaire]

### 5. Estimation de Coûts Mensuels

**Scénario 1 : Stockage 5 TB**
- Instances Compute : X € HT/mois
- Stockage 5 TB : Y € HT/mois
- Bande passante : Z € HT/mois
- **TOTAL : XX € HT/mois**

**Scénario 2 : Stockage 10 TB**
- Instances Compute : X € HT/mois
- Stockage 10 TB : Y € HT/mois
- Bande passante : Z € HT/mois
- **TOTAL : XX € HT/mois**

**Comparaison Facturation :**
- Pay-as-you-go : X € HT/mois
- Engagement mensuel : Y € HT/mois (économie de Z%)

### 6. Recommandations et Optimisations
[Conseils pour optimiser les coûts et la performance]

## Sources de Données

Utilise exclusivement les informations du fichier `docs/donnees-produits-cloud-complet.md` pour :
- Les spécifications techniques des instances
- Les prix (à l'heure et au mois si disponibles)
- Les plan codes
- Les recommandations d'usage

Si certaines informations ne sont pas disponibles dans ce fichier (notamment pour le stockage Object Storage détaillé), indique-le clairement et propose une estimation basée sur les informations disponibles.

## Contraintes

- Tous les prix doivent être en € HT (hors taxes)
- Précise si les prix sont à l'heure ou au mois
- Indique les plan codes exacts pour faciliter la commande
- Sois précis sur les calculs (assume 730 heures par mois pour les calculs horaires)
- Mentionne les options de facturation disponibles (consumption vs monthly.postpaid)

---

**Commence maintenant l'analyse et fournis tes recommandations complètes.**
