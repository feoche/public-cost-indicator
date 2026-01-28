'use client';

import { useRouter } from 'next/navigation';
import styles from './HomePage.module.css';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1 className={styles.title}>
          Estimateur de Coûts OVHcloud Public Cloud
        </h1>
        <p className={styles.subtitle}>
          Choisissez votre méthode de configuration pour estimer vos coûts
        </p>
      </div>

      <div className={styles.cardsContainer}>
        {/* Calculateur Détaillé */}
        <div className={styles.card} onClick={() => router.push('/calculator')}>
          <div className={styles.cardIcon}>📊</div>
          <h2 className={styles.cardTitle}>Calculateur Détaillé</h2>
          <p className={styles.cardDescription}>
            Créez des configurations complètes avec toutes les spécifications techniques
          </p>
          <ul className={styles.cardFeatures}>
            <li>⚙️ Configuration hardware complète</li>
            <li>🌍 Localisation et résilience</li>
            <li>💾 Gestion des sauvegardes</li>
            <li>💰 Optimisation des coûts</li>
          </ul>
          <button className={styles.cardButton}>
            Ouvrir le calculateur
          </button>
        </div>

        {/* Configuration Guidée */}
        <div className={styles.card} onClick={() => router.push('/guided')}>
          <div className={styles.cardIcon}>🤖</div>
          <h2 className={styles.cardTitle}>Configuration Guidée</h2>
          <p className={styles.cardDescription}>
            Laissez notre assistant IA vous guider dans le choix des produits adaptés à vos besoins
          </p>
          <ul className={styles.cardFeatures}>
            <li>💬 Conversation interactive</li>
            <li>🎯 Recommandations personnalisées</li>
            <li>📊 Comparaison automatique</li>
            <li>⚡ Rapide et simple</li>
          </ul>
          <button className={styles.cardButton}>
            Démarrer la configuration guidée
          </button>
        </div>

        {/* Configuration Manuelle */}
        <div className={styles.card} onClick={() => router.push('/manual')}>
          <div className={styles.cardIcon}>🛠️</div>
          <h2 className={styles.cardTitle}>Configuration Manuelle</h2>
          <p className={styles.cardDescription}>
            Parcourez le catalogue complet et configurez vos produits selon vos spécifications exactes
          </p>
          <ul className={styles.cardFeatures}>
            <li>📦 Catalogue complet des produits</li>
            <li>⚙️ Configuration détaillée</li>
            <li>💰 Estimation en temps réel</li>
            <li>🔧 Contrôle total</li>
          </ul>
          <button className={styles.cardButton}>
            Accéder à la configuration manuelle
          </button>
        </div>
      </div>

      {/* Section avantages */}
      <div className={styles.benefits}>
        <h3 className={styles.benefitsTitle}>Pourquoi utiliser cet estimateur ?</h3>
        <div className={styles.benefitsGrid}>
          <div className={styles.benefit}>
            <div className={styles.benefitIcon}>💎</div>
            <h4>Transparent</h4>
            <p>Prix clairs et détaillés pour tous les produits</p>
          </div>
          <div className={styles.benefit}>
            <div className={styles.benefitIcon}>⚡</div>
            <h4>Instantané</h4>
            <p>Estimation en temps réel de vos coûts</p>
          </div>
          <div className={styles.benefit}>
            <div className={styles.benefitIcon}>📊</div>
            <h4>Comparatif</h4>
            <p>Comparez avec les concurrents (AWS, Azure, GCP)</p>
          </div>
          <div className={styles.benefit}>
            <div className={styles.benefitIcon}>🎯</div>
            <h4>Précis</h4>
            <p>Basé sur les prix officiels OVHcloud</p>
          </div>
        </div>
      </div>
    </div>
  );
}

