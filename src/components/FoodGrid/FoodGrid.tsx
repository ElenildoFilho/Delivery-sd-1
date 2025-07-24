import React from 'react';
import styles from './FoodGrid.module.css';
import FoodItem from './FoodItem';
import type { FoodItemProps } from './FoodItem';

interface FoodGridProps {
  items: FoodItemProps[];
}

const FoodGrid: React.FC<FoodGridProps> = ({ items }) => {
  return (
    <div className={styles.grid}>
      {items.map((item, index) => (
        <FoodItem
          key={index}
          {...item}
          onClick={item.onClick}
        />
      ))}
    </div>
  );
};

export default FoodGrid;
