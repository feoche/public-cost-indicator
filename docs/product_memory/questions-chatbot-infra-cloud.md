# Questions Types pour Chatbot de Sélection d'Infrastructure Cloud OVH

Ce document propose une série de questions types à poser aux utilisateurs pour les aider à choisir leur infrastructure cloud OVHcloud Public Cloud et estimer les coûts.
Les informations entre parenthèses ne doivent pas être affichées mais doivent être prises en compte.

---

## 🎯 Questions d'Introduction et de Contexte

### 1. Objectif principal du projet
- **Question :** "Quel est l'objectif principal de votre projet cloud ?" (Facultatif, à poser plutot apres l'estimation, apres la question sur le besoin d'accompagnement)
  - Développer une application web/mobile
  - Héberger une base de données
  - Faire du machine learning / IA
  - Traiter et analyser des données
  - Migrer une infrastructure existante
  - Tester / Développer (environnement de dev/test)
  - Autre (précisez)

### 2. Type d'organisation
- **Question :** "Quel type d'organisation êtes-vous ?" (Facultatif, à poser plutot apres l'estimation)
  - Startup / PME
  - Entreprise (ETI)
  - Grande entreprise
  - Organisation publique
  - Indépendant / Freelance
  - Éducation / Recherche

### 3. Niveau d'expertise technique
- **Question :** "Quel est votre niveau d'expertise technique en cloud computing ?" (Facultatif, à poser plutot apres l'estimation)
  - Débutant (première utilisation du cloud)
  - Intermédiaire (quelque expérience)
  - Avancé (équipe DevOps expérimentée)
  - Expert (architecte cloud)

---

## 💻 Questions sur le Compute (Instances)

### 4. Type de charge de travail
- **Question :** "Quel type de charge de travail souhaitez-vous exécuter ?"
  - Application web classique
  - Application nécessitant beaucoup de CPU
  - Application nécessitant beaucoup de RAM
  - Application nécessitant un équilibre CPU/RAM
  - Calculs intensifs / HPC
  - Je ne sais pas encore

### 5. Besoins en ressources
- **Question :** "Quelles sont vos estimations de ressources nécessaires ?"
  - Nombre de vCPU souhaité : [___]
  - Quantité de RAM nécessaire : [___] Go
  - Espace disque nécessaire : [___] Go
  - Ou : "Je ne sais pas, j'ai besoin d'aide pour dimensionner"

### 6. Performance et disponibilité
- **Question :** "Quels sont vos besoins en termes de performance et disponibilité ?"
  - Haute disponibilité requise (99.9%+)
  - Disponibilité standard (99%)
  - Acceptable pour dev/test
  - Performance maximale requise
  - Économie prioritaire

### 7. GPU et calculs accélérés
- **Question :** "Avez-vous besoin de GPU ou d'accélération matérielle ?"
  - Oui, pour l'entraînement de modèles IA/ML
  - Oui, pour l'inférence IA en production
  - Oui, pour le rendu 3D / graphisme
  - Oui, pour des calculs scientifiques
  - Non, pas nécessaire
  - Je ne sais pas

### 8. Instances Metal (bare metal)
- **Question :** "Avez-vous besoin d'instances bare metal (Metal) ?"
  - Oui, pour des performances maximales
  - Oui, pour des contraintes de conformité
  - Oui, pour virtualiser moi-même
  - Non, des instances virtuelles suffisent
  - Je ne sais pas

---

## 🗄️ Questions sur le Stockage

### 9. Type de stockage
- **Question :** "Quel type de stockage avez-vous besoin ?"
  - Stockage de fichiers / objets (Object Storage)
  - Disques attachés aux instances (Block Storage)
  - Archive longue durée (Cold Archive)
  - Stockage haute performance
  - Plusieurs types

### 10. Volume de données
- **Question :** "Quel volume de données prévoyez-vous de stocker ?"
  - Moins de 100 Go
  - 100 Go - 1 To
  - 1 To - 10 To
  - 10 To - 100 To
  - Plus de 100 To
  - Je ne sais pas encore

### 11. Fréquence d'accès
- **Question :** "À quelle fréquence accéderez-vous à vos données ?"
  - Accès fréquent / temps réel
  - Accès occasionnel
  - Archive (accès rare)
  - Mixte (données chaudes et froides)

### 12. Durabilité et sauvegarde
- **Question :** "Quels sont vos besoins en sauvegarde et réplication ?"
  - Sauvegarde automatique requise
  - Réplication multi-région
  - Versioning des données
  - Pas de sauvegarde nécessaire
  - Je ne sais pas

---

## 🗃️ Questions sur les Bases de Données

### 13. Type de base de données
- **Question :** "Quel type de base de données avez-vous besoin ?"
  - MySQL / MariaDB
  - PostgreSQL
  - MongoDB (NoSQL document)
  - Redis (cache / clé-valeur)
  - Cassandra (NoSQL colonnes)
  - OpenSearch (recherche)
  - Kafka (messaging / streaming)
  - Autre
  - Je ne sais pas

### 14. Taille et charge de la base
- **Question :** "Quelle est la taille estimée de votre base de données et la charge attendue ?"
  - Moins de 10 Go, faible charge
  - 10-100 Go, charge modérée
  - 100 Go - 1 To, charge importante
  - Plus de 1 To, charge très importante
  - Je ne sais pas

### 15. Disponibilité de la base
- **Question :** "Quels sont vos besoins en haute disponibilité pour votre base de données ?"
  - Réplication automatique requise
  - Sauvegardes automatiques
  - Failover automatique
  - Disponibilité standard suffisante
  - Pas de contrainte particulière

---

## 🤖 Questions sur l'IA et Machine Learning

### 16. Cas d'usage IA
- **Question :** "Quel est votre cas d'usage en IA / Machine Learning ?"
  - Entraînement de modèles (training)
  - Déploiement de modèles en production (inference)
  - Développement / expérimentation (notebooks)
  - Traitement de données pour l'IA
  - APIs IA pré-entraînées (endpoints)
  - Autre

### 17. Type de modèles IA
- **Question :** "Quel type de modèles IA souhaitez-vous utiliser ?"
  - Modèles de langage (LLM)
  - Vision par ordinateur
  - Traitement du langage naturel (NLP)
  - Recommandations
  - Détection de fraude
  - Autre

### 18. Volume de données IA
- **Question :** "Quel volume de données traitez-vous pour l'IA ?"
  - Petits datasets (< 10 Go)
  - Datasets moyens (10 Go - 100 Go)
  - Grands datasets (100 Go - 1 To)
  - Très grands datasets (> 1 To)
  - Streaming de données en temps réel

---

## 📊 Questions sur le Data Platform et Analytics

### 19. Besoins en analytics
- **Question :** "Avez-vous besoin de solutions d'analytics ou de traitement de données ?"
  - Oui, traitement de données en temps réel
  - Oui, analytics de données historiques
  - Oui, data lake / data warehouse
  - Oui, streaming de données (Kafka)
  - Oui, recherche et indexation (OpenSearch)
  - Non, pas nécessaire

### 20. Volume de données à traiter
- **Question :** "Quel volume de données devez-vous traiter et analyser ?"
  - Moins de 100 Go
  - 100 Go - 1 To
  - 1 To - 10 To
  - Plus de 10 To
  - Streaming continu

### 21. Type d'analytics
- **Question :** "Quel type d'analytics effectuez-vous ?"
  - Analytics en temps réel
  - Analytics par batch
  - Analytics prédictif / ML
  - Visualisation de données
  - Recherche full-text
  - Mixte

---

## 🐳 Questions sur les Containers et Orchestration

### 22. Utilisation de containers
- **Question :** "Utilisez-vous ou prévoyez-vous d'utiliser des containers (Docker) ?"
  - Oui, avec Kubernetes
  - Oui, avec Rancher
  - Oui, sans orchestration
  - Non, pas pour le moment
  - Je ne sais pas

### 23. Gestion de clusters
- **Question :** "Quel est votre besoin en gestion de clusters ?"
  - Cluster Kubernetes managé (MKS)
  - Gestion multi-cluster (Rancher)
  - Cluster Kubernetes auto-géré
  - Pas de besoin d'orchestration
  - Je ne sais pas

### 24. Registry d'images
- **Question :** "Avez-vous besoin d'un registry privé pour vos images Docker ?"
  - Oui, registry managé
  - Oui, registry auto-hébergé
  - Non, registry public suffit
  - Je ne sais pas

---

## 🌐 Questions sur le Réseau

### 25. Exposition publique
- **Question :** "Vos services doivent-ils être accessibles depuis Internet ?"
  - Oui, exposition publique requise
  - Non, réseau privé uniquement
  - Mixte (certains services publics, d'autres privés)
  - Je ne sais pas

### 26. Load balancing
- **Question :** "Avez-vous besoin d'un load balancer (répartiteur de charge) ?"
  - Oui, pour haute disponibilité
  - Oui, pour équilibrer le trafic
  - Oui, pour SSL/TLS termination
  - Non, pas nécessaire
  - Je ne sais pas

### 27. Bande passante
- **Question :** "Quelle bande passante estimez-vous nécessaire ?"
  - Faible (< 100 Mbps)
  - Modérée (100 Mbps - 1 Gbps)
  - Élevée (1-10 Gbps)
  - Très élevée (> 10 Gbps)
  - Je ne sais pas

### 28. Floating IP
- **Question :** "Avez-vous besoin de Floating IPs (IPs flottantes) ?"
  - Oui, pour basculer entre instances
  - Oui, pour maintenance transparente
  - Non, pas nécessaire
  - Je ne sais pas

### 29. Gateway
- **Question :** "Avez-vous besoin d'une Gateway pour exposer des services privés ?"
  - Oui, pour accès Internet sortant depuis instances privées
  - Oui, pour exposer des services de manière contrôlée
  - Non, pas nécessaire
  - Je ne sais pas

---

## 🔒 Questions sur la Sécurité et Conformité

### 30. Conformité et réglementation
- **Question :** "Avez-vous des contraintes de conformité ou réglementaires ?"
  - RGPD (Europe)
  - HDS (Hébergement Données de Santé)
  - ISO 27001
  - Autre conformité
  - Pas de contrainte particulière

### 31. Localisation des données
- **Question :** "Où doivent être hébergées vos données ?"
  - France uniquement
  - Europe uniquement
  - Pas de contrainte géographique
  - Multi-région
  - Je ne sais pas

### 32. Sécurité réseau
- **Question :** "Quels sont vos besoins en sécurité réseau ?"
  - Réseau privé (vRack)
  - Firewall / règles de sécurité
  - VPN / connexion sécurisée
  - Sécurité standard
  - Je ne sais pas

---

## 💰 Questions sur le Budget et la Tarification

### 33. Budget estimé
- **Question :** "Quel est votre budget mensuel estimé pour cette infrastructure ?"
  - Moins de 50 € HT/mois
  - 50-200 € HT/mois
  - 200-500 € HT/mois
  - 500-1000 € HT/mois
  - 1000-5000 € HT/mois
  - Plus de 5000 € HT/mois
  - Je ne sais pas / besoin d'estimation

### 34. Modèle de facturation
- **Question :** "Quel modèle de facturation préférez-vous ?"
  - Pay-as-you-go (à l'usage)
  - Engagement mensuel (Savings Plan)
  - Engagement annuel
  - Mixte
  - Je ne sais pas

### 35. Prévisibilité des coûts
- **Question :** "Quelle prévisibilité des coûts recherchez-vous ?"
  - Coûts fixes prévisibles
  - Flexibilité importante (coûts variables)
  - Optimisation des coûts prioritaire
  - Pas de préférence

---

## 📈 Questions sur la Scalabilité

### 36. Évolution prévue
- **Question :** "Comment prévoyez-vous l'évolution de votre infrastructure ?"
  - Croissance progressive
  - Pic de charge ponctuel
  - Scaling automatique nécessaire
  - Infrastructure stable
  - Je ne sais pas

### 37. Auto-scaling
- **Question :** "Avez-vous besoin d'auto-scaling (mise à l'échelle automatique) ?"
  - Oui, selon la charge CPU
  - Oui, selon le trafic
  - Oui, selon des métriques personnalisées
  - Non, scaling manuel
  - Je ne sais pas

---

## 🎯 Questions sur les Cas d'Usage Spécifiques

### 38. Secteur d'activité
- **Question :** "Dans quel secteur d'activité évoluez-vous ?"
  - E-commerce / Retail
  - Services financiers / Banque
  - Santé / Sciences de la vie
  - Éducation / Recherche
  - Média / Entertainment
  - Industrie / Manufacturing
  - Autre

### 39. Cas d'usage métier spécifique
- **Question :** "Quel est votre cas d'usage métier principal ?"
  - Site web / Application web
  - API backend
  - E-commerce
  - Détection de fraude
  - Recommandations produits
  - Analyse de données clients
  - Recherche et développement
  - Autre (précisez)

---

## 🔄 Questions sur la Migration

### 40. Infrastructure existante
- **Question :** "Avez-vous déjà une infrastructure cloud existante ?"
  - Oui, sur un autre cloud provider
  - Oui, on-premise (serveurs physiques)
  - Oui, sur OVHcloud
  - Non, nouveau projet
  - Mixte

### 41. Migration
- **Question :** "Souhaitez-vous migrer une infrastructure existante ?"
  - Oui, migration complète
  - Oui, migration progressive
  - Non, nouveau déploiement
  - Extension d'infrastructure existante

---

## 📝 Questions Finales

### 42. Environnement
- **Question :** "Pour quel environnement déployez-vous ?" (facultatif)
  - Production
  - Développement / Test
  - Staging / Pré-production
  - Mixte (plusieurs environnements)

### 43. Support nécessaire (à poser après avoir fourni l'estimation)
- **Question :** "Quel niveau de support avez-vous besoin ?"
  - Support standard
  - Support prioritaire
  - Support entreprise
  - Pas de support nécessaire
  - Je ne sais pas

### 44. Délai de déploiement (Facultatif)
- **Question :** "Quand souhaitez-vous déployer cette infrastructure ?"
  - Immédiatement
  - Dans les prochaines semaines
  - Dans les prochains mois
  - Planification en cours
  - Juste une estimation pour le moment

### 45. Informations complémentaires
- **Question :** "Avez-vous d'autres besoins ou contraintes spécifiques à mentionner ?"
  - [Champ libre pour informations additionnelles]

---

## 📋 Structure Recommandée du Questionnaire

### Phase 1 : Découverte (Questions 1-3)
- Comprendre le contexte général et le niveau d'expertise

### Phase 2 : Besoins Techniques (Questions 4-29)
- Identifier les besoins par catégorie de service :
  - Compute (4-8)
  - Storage (9-12)
  - Databases (13-15)
  - IA/ML (16-18)
  - Data Platform (19-21)
  - Containers (22-24)
  - Réseau (25-29)

### Phase 3 : Contraintes et Budget (Questions 30-37)
- Sécurité, conformité, budget, scalabilité

### Phase 4 : Contexte Métier (Questions 38-41)
- Secteur, cas d'usage, migration

### Phase 5 : Finalisation (Questions 42-45)
- Environnement, support, délais, informations complémentaires

---

## 💡 Conseils d'Utilisation

1. **Adaptation dynamique** : Les questions doivent s'adapter aux réponses précédentes
   - Si l'utilisateur n'a pas besoin d'IA, sauter les questions 16-18
   - Si pas de containers, sauter les questions 22-24

2. **Questions conditionnelles** : Certaines questions ne doivent être posées que si nécessaire
   - GPU uniquement si besoin d'IA ou calculs intensifs
   - Base de données uniquement si besoin identifié

3. **Progression logique** : Commencer par les besoins généraux, puis affiner
   - D'abord l'objectif, puis les ressources, puis les contraintes

4. **Validation** : Proposer un résumé avant de générer la recommandation
   - "Voici ce que j'ai compris de vos besoins : [résumé]"
   - "Souhaitez-vous modifier quelque chose ?"

5. **Estimation de coûts** : Après chaque section importante, donner une estimation indicative
   - "Pour cette partie, l'estimation est de X € HT/mois"

---

## 🎯 Exemples de Parcours Utilisateur

### Parcours 4 : PME e-commerce en migration on-premise
- **Contexte :** site web + API backend + base relationnelle, pics promotionnels, équipe IT réduite
- **Objectifs :** haute disponibilité, performance en pics, sécurité, coûts maîtrisés, évolutivité
- **Questions clés (ordre conseillé) :**
  1. **Objectif principal** (1) : migration d'infrastructure existante
  2. **Type d'organisation** (2) : Startup / PME
  3. **Infrastructure existante** (40) : on-premise
  4. **Migration** (41) : complète ou progressive
  5. **Type de charge** (4) : application web classique + API backend
  6. **Besoins en ressources** (5) : vCPU / RAM / disque estimés
  7. **Performance & disponibilité** (6) : 99,9 % ou 99,99 % ?
  8. **Évolution prévue** (36) : pics de charge ponctuels
  9. **Auto-scaling** (37) : selon trafic ou CPU
  10. **Exposition publique** (25) : front public, back privé
  11. **Load balancing** (26) : oui, pour HA + trafic
  12. **Bande passante** (27) : modérée / élevée
  13. **Type de base** (13) : relationnelle (MySQL/PostgreSQL)
  14. **Taille/charge de la base** (14)
  15. **Disponibilité base** (15) : réplication / failover
  16. **Type de stockage** (9) : objet + bloc
  17. **Volume de données** (10)
  18. **Sauvegarde & réplication** (12)
  19. **Sécurité réseau** (32) : firewall / VPN / vRack
  20. **Conformité** (30) : RGPD
  21. **Localisation des données** (31) : France / Europe
  22. **Budget estimé** (33)
  23. **Modèle de facturation** (34)
  24. **Prévisibilité des coûts** (35)
  25. **Environnement** (42) : prod + dev/test
  26. **Support nécessaire** (43)
  27. **Délai de déploiement** (44)
  28. **Infos complémentaires** (45)
- **Questions conditionnelles :**
  - **Containers** (22-24) si stack déjà conteneurisée
  - **Gateway** (29) si instances privées avec sortie Internet
  - **GPU/IA** (7, 16-18) si projet IA existant

### Parcours 1 : Startup - Application Web Simple
- Questions clés : 1, 4, 5, 9, 13, 25, 33, 42
- Produits probables : Instance General Purpose, Object Storage, MySQL, Load Balancer

### Parcours 2 : Entreprise - Projet IA
- Questions clés : 1, 4, 7, 16, 17, 18, 19, 33, 42
- Produits probables : Instances GPU, AI Training, AI Deploy, Data Platform

### Parcours 3 : Migration Infrastructure
- Questions clés : 1, 40, 41, 4, 5, 9, 13, 25, 33
- Produits probables : Instances équivalentes, Storage, Databases, Network

---

*Document généré à partir de l'analyse du catalogue OVHcloud Public Cloud*
