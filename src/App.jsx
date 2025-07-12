import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { WeddingProvider } from './contexts/WeddingContext';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <WeddingProvider>
          <Router>
            <div className="min-h-screen">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/admin" element={<AdminPage />} />
              </Routes>
            </div>
          </Router>
        </WeddingProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;