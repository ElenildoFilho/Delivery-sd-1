import React from 'react';
import styles from './FoodGrid.module.css';

export interface FoodItemProps {
  imageUrl: string;
  name: string;
  description: string;
  price: number;
  onClick?: () => void;
}

const FoodItem: React.FC<FoodItemProps> = ({ name, price, imageUrl, description, onClick }) => {
  return (
    <div
      className={styles.card}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
      onClick={onClick}
    >
      <img src={imageUrl} alt={name} className={styles.image} />
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.price}>R$ {price.toFixed(2)}</p>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default FoodItem;
