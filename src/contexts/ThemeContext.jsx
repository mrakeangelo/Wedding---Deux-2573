import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('pride-brights');
  const [mode, setMode] = useState('day');

  const themes = {
    'pride-brights': {
      name: 'Pride Brights',
      colors: {
        primary: '#e40303',
        secondary: '#0066cc',
        accent: '#ffed00',
        background: '#ffffff',
        text: '#1a1a1a'
      }
    },
    'pastel-queer': {
      name: 'Pastel Queer',
      colors: {
        primary: '#ffb3d9',
        secondary: '#e6ccff',
        accent: '#b3ffcc',
        background: '#fff5e6',
        text: '#4a4a4a'
      }
    },
    'midnight-neon': {
      name: 'Midnight Neon',
      colors: {
        primary: '#ff006e',
        secondary: '#00f5ff',
        accent: '#06ffa5',
        background: '#0a0a0a',
        text: '#ffffff'
      }
    },
    'soft-romance': {
      name: 'Soft Romance',
      colors: {
        primary: '#f4a6cd',
        secondary: '#d4c5f9',
        accent: '#b8d4c1',
        background: '#faf7f0',
        text: '#2d2d2d'
      }
    }
  };

  useEffect(() => {
    document.documentElement.className = `theme-${theme} mode-${mode}`;
  }, [theme, mode]);

  const toggleMode = () => {
    setMode(mode === 'day' ? 'night' : 'day');
  };

  const value = {
    theme,
    setTheme,
    mode,
    setMode,
    toggleMode,
    themes,
    currentTheme: themes[theme]
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};