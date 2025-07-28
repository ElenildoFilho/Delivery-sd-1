import React, { useEffect, useState } from 'react';
import FoodGrid from '../components/FoodGrid/FoodGrid';
import OrderList from '../components/Order/OrderList';
import type { SelectedItem } from '../components/Order/OrderList';
import { fetchProducts } from '@/api/products';
import type { Product } from '@/api/products';
import styles from '@/pages/ProductsPage.module.css';

function ProductsList() {
  const [items, setItems] = useState<Product[]>([]);
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Usuário não autenticado. Faça login para continuar.');
      setLoading(false);
      return;
    }

    fetchProducts(token)
      .then(data => {
        console.log('Resposta fetchProducts:', data);
        // Se data for um objeto com .products, pega o array, senão tenta usar data direto
        const productsArray = Array.isArray(data) ? data : data.products;
        if (!Array.isArray(productsArray)) {
          throw new Error('Formato de dados inesperado da API');
        }
        setItems(productsArray);
      })
      .catch((err: any) => setError(err.message || 'Erro ao buscar produtos'))
      .finally(() => setLoading(false));
  }, []);

  const handleItemClick = (item: Product) => {
    setSelectedItems(prev => {
      const existing = prev.find(p => p.product.id === item.id);
      if (existing) {
        return prev.map(p =>
          p.product.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        return [...prev, { product: item, quantity: 1 }];
      }
    });
  };

  const handleRemoveItem = (productId: string) => {
    setSelectedItems(prev => {
      const existing = prev.find(item => item.product.id === productId);
      if (!existing) return prev;

      if (existing.quantity === 1) {
        return prev.filter(item => item.product.id !== productId);
      } else {
        return prev.map(item =>
          item.product.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
    });
  };

  const handleCheckout = (items: SelectedItem[]) => {
    console.log('Enviando pedido para API:', items);
    // TODO: integrar com API de criação de pedidos
  };

  if (loading) return <div className={styles.spinner}></div>;
  if (error) return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;

  return (
    <div className={styles.container}>
      <div className={styles.gridContainer}>
        <h1 style={{ textAlign: 'center' }}>Cardápio</h1>
        <FoodGrid
          items={items.map(item => ({
            ...item,
            imageUrl: item.imageUrl,
            onClick: () => handleItemClick(item),
          }))}
        />
      </div>

      <div className={styles.orderList}>
        <OrderList
          selectedItems={selectedItems}
          onRemoveItem={handleRemoveItem}
          onCheckout={handleCheckout}
        />
      </div>
    </div>
  );
}

export default ProductsList;
