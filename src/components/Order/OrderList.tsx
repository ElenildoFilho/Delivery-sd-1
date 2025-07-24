import React from 'react';
import styles from './OrderList.module.css';
import type { Product } from '@/api/products';

export type SelectedItem = {
  product: Product;
  quantity: number;
};

interface OrderListProps {
  selectedItems: SelectedItem[];
  onRemoveItem: (productId: string) => void;
  onCheckout: (items: SelectedItem[]) => void;
}

const OrderList: React.FC<OrderListProps> = ({ selectedItems, onRemoveItem, onCheckout }) => {
  if (selectedItems.length === 0) {
    return <p className={styles.empty}>Nenhum item selecionado ainda.</p>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>🛒 Itens selecionados:</h2>
      <ul className={styles.list}>
        {selectedItems.map(({ product, quantity }) => (
          <li key={product.id} className={styles.item}>
            <img src={product.imageUrl} alt={product.name} className={styles.image} />
            <span className={styles.name}>{product.name}</span>
            <span className={styles.quantity}>Qtd: {quantity}</span>
            <button
              className={styles.removeButton}
              onClick={() => onRemoveItem(product.id)}
              aria-label={`Remover ${product.name}`}
            >
              -
            </button>
          </li>
        ))}
      </ul>
      <button
        className={styles.checkoutButton}
        onClick={() => onCheckout(selectedItems)}
      >
        Concluir Compra
      </button>
    </div>
  );
};

export default OrderList;
