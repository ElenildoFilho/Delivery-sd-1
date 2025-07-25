import React, { useEffect, useState } from 'react';
import styles from './OrderHistory.module.css';

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
}

interface OrderItem {
  product: Product;
  quantity: number;
}

interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  rating?: number | null;
  status?: string;
}

const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('Você precisa estar logado para ver seu histórico.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('https://delivery-api-i9pg.onrender.com/orders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const err = await response.json();
          throw new Error(err.message || 'Erro ao buscar pedidos.');
        }

        const data = await response.json();
        if (!Array.isArray(data.orders)) {
          throw new Error('Formato inesperado: esperava uma lista de pedidos em "orders".');
        }

        setOrders(data.orders);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleRatingChange = (orderId: string, rating: number) => {
    setRatings(prev => ({ ...prev, [orderId]: rating }));
  };

  const submitRating = async (orderId: string) => {
    const rating = ratings[orderId];
    const token = localStorage.getItem('token');

    if (!rating) {
      alert('Por favor, selecione uma nota antes de enviar.');
      return;
    }

    try {
      const response = await fetch(`https://delivery-api-i9pg.onrender.com/orders/${orderId}/rating`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rating }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao enviar avaliação.');
      }

      alert('Avaliação enviada com sucesso!');
      setOrders(prev =>
        prev.map(order =>
          order.id === orderId ? { ...order, rating } : order
        )
      );
    } catch (err: any) {
      alert(`Erro ao enviar avaliação: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Aguarde, carregando histórico de pedidos...</p>
      </div>
    );
  }

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  if (orders.length === 0) {
    return <p className={styles.empty}>Você ainda não fez nenhum pedido.</p>;
  }

  return (
    <>
      <div className={styles.waveBackground} />
      <div className={styles.container}>
        <h2 className={styles.title}>📦 Histórico de Pedidos</h2>
        <ul className={styles.orderList}>
          {orders.map(order => {
            const createdDate = new Date(order.date);
            const validDate = !isNaN(createdDate.getTime());
            const total = order.items.reduce(
              (sum, item) => sum + item.product.price * item.quantity,
              0
            );

            return (
              <li key={order.id} className={styles.order}>
                <div className={styles.header}>
                  <span className={styles.date}>
                    {validDate ? createdDate.toLocaleString() : 'Data inválida'}
                  </span>
                  {order.status && (
                    <span className={styles.status}>
                      {order.status === 'completed' || order.status === 'concluido'
                        ? '✅ Concluído'
                        : `🕒 ${order.status}`}
                    </span>
                  )}
                </div>

                <ul className={styles.items}>
                  {order.items.map(item => (
                    <li key={item.product.id} className={styles.item}>
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className={styles.image}
                      />
                      <div className={styles.details}>
                        <span className={styles.name}>{item.product.name}</span>
                        <span className={styles.quantity}>Qtd: {item.quantity}</span>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className={styles.totalAndRating}>
                  <div className={styles.total}>Total: R$ {total.toFixed(2)}</div>

                  <div className={styles.ratingSection}>
                    {order.rating ? (
                      <div className={styles.stars}>
                        {[1, 2, 3, 4, 5].map(star => (
                          <span
                            key={star}
                            className={`${styles.star} ${order.rating >= star ? styles.filled : ''}`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    ) : (
                      <>
                        <label>Avaliação:</label>
                        <div className={styles.stars}>
                          {[1, 2, 3, 4, 5].map(star => (
                            <span
                              key={star}
                              className={`${styles.star} ${ratings[order.id] >= star ? styles.filled : ''}`}
                              onClick={() => handleRatingChange(order.id, star)}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <button onClick={() => submitRating(order.id)}>Enviar</button>
                      </>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default OrderHistory;
