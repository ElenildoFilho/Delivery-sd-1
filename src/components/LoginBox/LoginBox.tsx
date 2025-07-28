import React from 'react'
import styles from './LoginBox.module.css'
import { Link } from 'react-router-dom'

interface LoginBoxProps {
  onLogin: (email: string, password: string) => void
  error?: string
  success?: boolean
}

const LoginBox: React.FC<LoginBoxProps> = ({ onLogin, error, success }) => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    onLogin(email, password)
  }

  return (
    <div className={styles['login-box']}>
      <div className={styles['logo-container']}>
        <img
          src="..\src\assets\logo.png" 
          alt="Logo SDelivery"
          className={styles.logo}
        />
      </div>

      <form onSubmit={handleSubmit}>
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
      </form>

      <p>
        Não tem uma conta? <Link to="/register">Cadastre-se</Link>
      </p>
    </div>
  )
}

export default LoginBox
