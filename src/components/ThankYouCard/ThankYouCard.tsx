// ThankYouCard.tsx
import React from 'react';
import styles from './ThankYouCard.module.css';

const ThankYouCard: React.FC = () => {
  return (
    <div className={styles.card}>
      <div className={styles.icon}>✔️</div>
      <h2 className={styles.message}>Obrigado por pedir com a SDelivery</h2>
    </div>
  );
};

export default ThankYouCard;
