import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './OrderList.module.css';
import ThankYouCard from '@/components/ThankYouCard/ThankYouCard';
import type { Product } from '@/api/products';

export type SelectedItem = {
  product: Product;
  quantity: number;
};

interface OrderListProps {
  selectedItems: SelectedItem[];
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

const OrderList: React.FC<OrderListProps> = ({ selectedItems, onRemoveItem, onClearCart }) => {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('Você precisa estar logado para finalizar a compra.');
      return;
    }

    const orderPayload = {
      items: selectedItems.map(item => ({
        productId: item.product.id,
        quantity: item.quantity,
      })),
      status: 'pending',
    };

    try {
      const response = await fetch('https://delivery-api-i9pg.onrender.com/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderPayload),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Erro ao enviar pedido.');
      }

      onClearCart?.();
      setOrderPlaced(true);
      setError(null);
    } catch (error: any) {
      setError(`Erro ao concluir pedido: ${error.message}`);
    }
  };

  useEffect(() => {
    if (orderPlaced) {
      const timer = setTimeout(() => {
        navigate('/history');
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [orderPlaced, navigate]);

  if (orderPlaced) {
    return <ThankYouCard />;
  }

  if (selectedItems.length === 0) {
    return <p className={styles.empty}>Nenhum item selecionado ainda.</p>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>🛒 Itens selecionados:</h2>

      {error && <p className={styles.error}>{error}</p>}

      <ul className={styles.list}>
        {selectedItems.map(({ product, quantity }) => (
          <li key={product.id} className={styles.item}>
            <img src={product.imageUrl} alt={product.name} className={styles.image} />
            <div className={styles.details}>
              <span className={styles.name}>{product.name}</span>
              <span className={styles.price}>R$ {product.price.toFixed(2)}</span>
            </div>
            <div className={styles.actions}>
              <span className={styles.quantity}>Qtd: {quantity}</span>
              <button
                className={styles.removeButton}
                onClick={() => onRemoveItem(product.id)}
                aria-label={`Remover ${product.name}`}
              >
                −
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className={styles.total}>
        <span>Total:</span>
        <span>
          R${' '}
          {selectedItems
            .reduce((acc, item) => acc + item.product.price * item.quantity, 0)
            .toFixed(2)}
        </span>
      </div>

      <button className={styles.checkoutButton} onClick={handleCheckout}>
        Concluir Compra
      </button>
    </div>
  );
};

export default OrderList;
