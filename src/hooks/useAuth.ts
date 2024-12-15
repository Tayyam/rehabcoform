import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { subscribeToAuthChanges } from '../lib/firebase/auth';
import { getUserById } from '../lib/firebase/users';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const setUser = useAuthStore(state => state.setUser);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges(async (firebaseUser) => {
      setLoading(true);
      try {
        if (firebaseUser) {
          const userData = await getUserById(firebaseUser.uid);
          if (userData) {
            setUser(userData);
          } else {
            setUser(null);
            navigate('/login');
          }
        } else {
          setUser(null);
          navigate('/login');
        }
      } catch (error) {
        console.error('Auth state change error:', error);
        setUser(null);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [setUser, navigate]);

  return { loading };
};