import React, { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { Header } from '../layout/Header';
import { useAuthStore } from '../../store/useAuthStore';
import { useStore } from '../../store/useStore';
import { useLocation } from 'react-router-dom';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { loading } = useAuth();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const fetchComplaints = useStore(state => state.fetchComplaints);
  const fetchUsers = useAuthStore(state => state.fetchUsers);
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      fetchComplaints();
      fetchUsers();
    }
  }, [isAuthenticated, fetchComplaints, fetchUsers]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const isPublicRoute = location.pathname.startsWith('/public/') || location.pathname === '/login';

  return (
    <div className="min-h-screen bg-gray-100">
      {isAuthenticated && !isPublicRoute && <Header />}
      {children}
    </div>
  );
};