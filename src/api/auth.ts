const BASE_URL = 'https://delivery-api-i9pg.onrender.com';

export async function login(email: string, password: string): Promise<{ token: string }> {
  const res = await fetch(`${BASE_URL}/sessions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  let data;
  try {
    data = await res.json();
  } catch {
    throw new Error('Resposta inválida do servidor');
  }

  if (!res.ok) {
    throw new Error(data.message || 'Login failed');
  }

  return data;
}
