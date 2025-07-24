import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../Register/Register.module.css';

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // novo estado

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // inicia o carregamento

    try {
      const response = await fetch('https://delivery-api-i9pg.onrender.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        setSuccess(true);
        setError('');
        setName('');
        setEmail('');
        setPassword('');

        setTimeout(() => {
          navigate('/login');
        }, 1000);
      } else {
        const data = await response.json();
        setError(data.message || 'Erro ao cadastrar usuário');
        setSuccess(false);
      }
    } catch (err) {
      setError('Erro de conexão com o servidor');
      setSuccess(false);
    } finally {
      setIsLoading(false); // encerra o carregamento
    }
  };

  return (
    <div className={styles.container}>
      <h2>Cadastro de Usuário</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={isLoading}
        />

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Cadastrando...' : 'Cadastrar'}
        </button>

        {isLoading && <p className={styles.loading}>Aguarde, cadastrando usuário...</p>}
        {success && <p className={styles.success}>Usuário cadastrado com sucesso! Redirecionando...</p>}
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

export default Register;
