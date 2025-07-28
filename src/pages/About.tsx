import React, { useEffect, useState } from 'react';
import styles from './About.module.css';

const About: React.FC = () => {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 100);
  }, []);

  return (
    <>
      <div className={`${styles.background} ${fadeIn ? styles.fadeIn : ''}`} />
      <div className={styles.overlay}>
        <div className={styles.container}>
          <h1>Sobre a SDdelivery</h1>
          <div className={styles.content}>
            <section className={styles.imageSection}>
              <img
                src="https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2024/02/google-maps-e1707316052388.png?w=1200&h=675&crop=1"
                alt="Mapa de cobertura"
                className={styles.mapImage}
              />
              <p className={styles.mapText}>
                Estamos presentes em todo o Brasil, levando praticidade a milhares de clientes.
              </p>
            </section>

            <section className={styles.cardsSection}>
              <article className={styles.card}>
                <h2>Quem Somos</h2>
                <p>
                  A SDdelivery nasceu da paixão por conectar pessoas e comida deliciosa, 
                  facilitando a vida dos nossos clientes com tecnologia inovadora.
                </p>
              </article>

              <article className={styles.card}>
                <h2>O que Fazemos</h2>
                <p>
                  Oferecemos uma plataforma intuitiva para pedidos rápidos e seguros, 
                  reunindo os melhores restaurantes e entregadores para sua comodidade.
                </p>
              </article>

              <article className={styles.card}>
                <h2>Nossa Missão</h2>
                <p>
                  Ser referência em delivery de qualidade, proporcionando satisfação e
                  praticidade para todos os usuários, valorizando parceiros locais.
                </p>
              </article>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
