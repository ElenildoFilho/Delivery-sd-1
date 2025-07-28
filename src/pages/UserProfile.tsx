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

  // Campos editáveis
  const [formData, setFormData] = useState<UserProfileData | null>(null);

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
          const err = await res.json();
          setError(err.message || 'Erro ao buscar perfil.');
          setLoading(false);
          return;
        }

        const data = await res.json();
        setUser(data.user);
        setFormData(data.user);
      } catch (err: any) {
        setError(err.message || 'Erro ao buscar perfil.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (!formData) return;

    if (name in (formData.address || {})) {
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [name]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  if (loading) return <p>Carregando perfil...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!user || !formData) return null;

  const { profilePictureUrl, address } = formData;

  return (
    <div className={styles.container}>
      <h2 className={styles.sectionTitle}>Perfil do Usuário</h2>

      <div className={styles.header}>
        {profilePictureUrl ? (
          <img
            src={profilePictureUrl || '@/assets/holologo.png'}
            alt={`${formData.name} - Foto de perfil`}
            className={styles.profilePicture}
          />
        ) : (
          <div className={styles.profilePicture}>SEM FOTO</div>
        )}

        <div className={styles.userDetails}>
          <label>
            Nome:
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </label>
        </div>
      </div>

      <h3 className={styles.sectionTitle}>Endereço</h3>
      <div className={styles.address}>
        <label>
          Rua:
          <input type="text" name="street" value={address?.street || ''} onChange={handleChange} />
        </label>
        <label>
          Número:
          <input type="text" name="number" value={address?.number || ''} onChange={handleChange} />
        </label>
        <label>
          Complemento:
          <input
            type="text"
            name="complement"
            value={address?.complement || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          Apartamento:
          <input
            type="text"
            name="apartment"
            value={address?.apartment || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          CEP:
          <input type="text" name="cep" value={address?.cep || ''} onChange={handleChange} />
        </label>
      </div>

      <button className={styles.saveButton}>Salvar Alterações</button>
    </div>
  );
};

export default UserProfile;
