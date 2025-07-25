import React, { useEffect, useState } from 'react';
import styles from './UserProfile.module.css';

interface UserProfileData {
  id: string;
  name: string;
  email: string;
  profilePictureUrl?: string;
  address?: {
    street?: string;
    number?: string;
    complement?: string;
    cep?: string;
    apartment?: string;
  };
}

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('Você precisa estar logado para ver o perfil.');
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('https://delivery-api-i9pg.onrender.com/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          if (res.status === 401) {
            setError('Sessão expirada. Faça login novamente.');
          } else {
            const err = await res.json();
            setError(err.message || 'Erro ao buscar perfil.');
          }
          setLoading(false);
          return;
        }

        const data = await res.json();
        setUser(data.user);
      } catch (err: any) {
        setError(err.message || 'Erro ao buscar perfil.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <p>Carregando perfil...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!user) {
    return null;
  }

  const { profilePictureUrl, address } = user;

  return (
    <div className={styles.container}>
      <h2 className={styles.sectionTitle}>Perfil do Usuário</h2>

      <div className={styles.header}>
        {profilePictureUrl ? (
          <img
            src={profilePictureUrl}
            alt={`${user.name} - Foto de perfil`}
            className={styles.profilePicture}
          />
        ) : (
          <div className={styles.profilePicture}>SEM FOTO</div>
        )}

        <div className={styles.userDetails}>
          <p><strong>Nome:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      </div>

      <h3 className={styles.sectionTitle}>Endereço</h3>
      <div className={styles.address}>
        <p><strong>Rua:</strong> {address?.street || '-'}</p>
        <p><strong>Número:</strong> {address?.number || '-'}</p>
        <p><strong>Complemento:</strong> {address?.complement || '-'}</p>
        <p><strong>Apartamento:</strong> {address?.apartment || '-'}</p>
        <p><strong>CEP:</strong> {address?.cep || '-'}</p>
      </div>
    </div>
  );
};

export default UserProfile;
