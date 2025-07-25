import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginBox from '../components/LoginBox/LoginBox';
import { login } from '../api/auth';
import styles from '@/pages/Login.module.css';

function Login() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(email: string, password: string) {
    try {
      const { token } = await login(email, password);
      localStorage.setItem('token', token);
      window.dispatchEvent(new Event('authChanged'));
      setSuccess(true);
      setError(null);

      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err: any) {
      console.error('Erro detalhado no login:', err);
      setError(err.message || 'Usuário ou senha inválidos!');
      setSuccess(false);
    }
  }

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <h2 className={styles.title}>Bem-vindo de volta</h2>
        <LoginBox
          onLogin={handleLogin}
          error={error || undefined}
          success={success}
        />
        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>Login realizado com sucesso!</p>}
      </div>
    </div>
  );
}

export default Login;
