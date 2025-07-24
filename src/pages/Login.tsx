import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginBox from '../components/LoginBox/LoginBox';
import { login } from '../api/auth';

function Login() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(email: string, password: string) {
    try {
      const { token } = await login(email, password);
      localStorage.setItem('token', token);
      window.dispatchEvent(new Event('authChanged'))
      setSuccess(true);
      setError(null);

      // Mostra sucesso por 1.5s antes de navegar
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
    <LoginBox
      onLogin={handleLogin}
      error={error || undefined}
      success={success}
    />
  );
}

export default Login;
