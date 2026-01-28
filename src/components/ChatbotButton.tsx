'use client';

import styles from './ChatbotButton.module.css';

interface ChatbotButtonProps {
  onClick: () => void;
}

export default function ChatbotButton({ onClick }: ChatbotButtonProps) {
  return (
    <button className={styles.floatingButton} onClick={onClick}>
      <span className={styles.icon}>💬</span>
      <span className={styles.text}>Chatbot : Décrivez-moi votre besoin</span>
    </button>
  );
}

