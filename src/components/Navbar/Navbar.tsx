import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import logo from '../../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';

export interface NavbarProps {
  title: string;
}

const Navbar: React.FC<NavbarProps> = ({ title }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const updateLoginStatus = () => {
      const token = localStorage.getItem('token')
      setIsLoggedIn(!!token)
    }

    window.addEventListener('authChanged', updateLoginStatus)


    updateLoginStatus()

    return () => {
      window.removeEventListener('authChanged', updateLoginStatus)
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem('token');
    window.dispatchEvent(new Event('authChanged'))
    setIsLoggedIn(false);
    navigate('/login');
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <Link to="/">
          <img src={logo} alt="Logo" className={styles.logo} />
        </Link>
        <h1 className={styles.title}>{title}</h1>
      </div>

      <ul className={styles.navLinks}>
        <li>
          <Link to="/about">Sobre</Link>
        </li>
        <li>
          <Link to="/profile">Perfil</Link>
        </li>
        <li>
          <Link to="/history">Histórico</Link>
        </li>
        <li>
          <Link to="/products">Produtos</Link>
        </li>
        {isLoggedIn ? (
          <li>
            <button onClick={handleLogout} className={styles.logoutButton}>
              Logout
            </button>
          </li>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
