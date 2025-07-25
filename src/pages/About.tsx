import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import styles from './About.module.css';

const About: React.FC = () => {
  return (
    <div className={styles.background}>
      <div className={styles.blur}>
        <main className={styles.mainContent}>
          {/* Coluna da esquerda */}
          <div className={styles.textColumn}>
            <section className={styles.textBlock}>
              <h2>Quem Somos</h2>
              <p>
                A SDdelivery nasceu da paixão por conectar pessoas e comida deliciosa, 
                facilitando a vida dos nossos clientes com tecnologia inovadora.
              </p>
            </section>

            <section className={styles.textBlock}>
              <h2>O que Fazemos</h2>
              <p>
                Oferecemos uma plataforma intuitiva para pedidos rápidos e seguros, 
                reunindo os melhores restaurantes e entregadores para sua comodidade.
              </p>
            </section>

            <section className={styles.textBlock}>
              <h2>Nossa Missão</h2>
              <p>
                Ser referência em delivery de qualidade, proporcionando satisfação e
                praticidade para todos os usuários, valorizando parceiros locais.
              </p>
            </section>
          </div>

          {/* Coluna da direita com imagem e texto */}
          <div className={styles.imageColumn}>
            <img 
              src="https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2024/02/google-maps-e1707316052388.png?w=1200&h=675&crop=1" 
              alt="Mapa de cobertura" 
              className={styles.mapImage} 
            />
            <p className={styles.mapText}>Estamos presentes em todo o Brasil, levando praticidade a milhares de clientes.</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default About;
