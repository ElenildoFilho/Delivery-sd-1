// src/components/LoginBox/LoginBox.tsx
import React, { useState } from 'react';
import styles from './Login.module.css';

interface Props {
  onLogin: (email: string, password: string) => void;
  error?: string;
  success?: boolean;
}

const LoginBox: React.FC<Props> = ({ onLogin, error, success }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onLogin(email, password);
  }

  return (
    <div className={styles['login-box']}>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <button type="submit">Entrar</button>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>Login realizado com sucesso!</p>}

        <p>
          Ainda não tem uma conta? <a href="/register">Cadastre-se</a>
        </p>
      </form>
    </div>
  );
};

export default LoginBox;
