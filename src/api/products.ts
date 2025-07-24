export interface Product {
  image: string;
  name: string;
  description: string;
  price: number;
  rating?: number;
}

export async function fetchProducts(token: string): Promise<Product[]> {
  const response = await fetch('https://delivery-api-i9pg.onrender.com/products', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Erro ao buscar produtos');
  }

  return response.json();
}
