import Image from "next/image";
import styles from "./page.module.css";
import CostEstimator from "../components/CostEstimator";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <h1>OVHcloud GPU Cost Estimator</h1>
        <p>Estimate the cost of GPU instances in Paris 2. Adjust the parameters below.</p>
        <CostEstimator />
      </main>
    </div>
  );
}
