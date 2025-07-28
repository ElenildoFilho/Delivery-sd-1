import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // importar
import styles from './Welcome.module.css';

const Welcome: React.FC = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const navigate = useNavigate();  // instanciar o hook

  useEffect(() => {
    const timeout = setTimeout(() => setFadeIn(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <div className={`${styles.background} ${fadeIn ? styles.fadeIn : ''}`} />
      <div className={styles.overlay}>
        <h1 className={styles.title}>Bem-vindo ao SDelivery!</h1>
        <div className={styles.buttonGroup}>
          <button className={styles.button} onClick={() => navigate('/register')}>
            Registrar
          </button>
          <button className={styles.button} onClick={() => navigate('/login')}>
            Entrar
          </button>
        </div>
      </div>
    </>
  );
};

export default Welcome;
