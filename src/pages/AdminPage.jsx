import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useWedding } from '../contexts/WeddingContext';
import { useTheme } from '../contexts/ThemeContext';
import LoginForm from '../components/LoginForm';
import AdminDashboard from '../components/AdminDashboard';

const AdminPage = () => {
  const { user, loading } = useAuth();
  const { currentTheme } = useTheme();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" 
           style={{ backgroundColor: currentTheme.colors.background }}>
        <div className="animate-spin rounded-full h-32 w-32 border-b-2" 
             style={{ borderColor: currentTheme.colors.primary }}></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: currentTheme.colors.background }}>
      {user ? <AdminDashboard /> : <LoginForm />}
    </div>
  );
};

export default AdminPage;