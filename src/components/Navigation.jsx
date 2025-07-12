import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiSun, FiMoon, FiMenu, FiX, FiPalette } = FiIcons;

const Navigation = () => {
  const { currentTheme, mode, toggleMode, themes, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

  const navItems = [
    { label: 'Our Story', href: '#story' },
    { label: 'Wedding Info', href: '#info' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'RSVP', href: '#rsvp' },
    { label: 'Guestbook', href: '#guestbook' }
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg"
      style={{ 
        backgroundColor: `${currentTheme.colors.background}99`,
        borderBottom: `1px solid ${currentTheme.colors.primary}33`
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="serif-font text-2xl font-bold gradient-text"
          >
            Deux
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.label}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(item.href)}
                className="text-sm font-medium transition-colors hover:opacity-80"
                style={{ color: currentTheme.colors.text }}
              >
                {item.label}
              </motion.button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Theme Selector */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                className="p-2 rounded-full transition-colors"
                style={{ color: currentTheme.colors.primary }}
              >
                <SafeIcon icon={FiPalette} className="w-5 h-5" />
              </motion.button>

              {isThemeMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg p-2"
                  style={{ backgroundColor: currentTheme.colors.background }}
                >
                  {Object.entries(themes).map(([key, theme]) => (
                    <button
                      key={key}
                      onClick={() => {
                        setTheme(key);
                        setIsThemeMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-sm rounded-md transition-colors hover:opacity-80"
                      style={{ color: currentTheme.colors.text }}
                    >
                      {theme.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Mode Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleMode}
              className="p-2 rounded-full transition-colors"
              style={{ color: currentTheme.colors.primary }}
            >
              <SafeIcon icon={mode === 'day' ? FiMoon : FiSun} className="w-5 h-5" />
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-full transition-colors"
              style={{ color: currentTheme.colors.primary }}
            >
              <SafeIcon icon={isMenuOpen ? FiX : FiMenu} className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4"
          >
            {navItems.map((item) => (
              <motion.button
                key={item.label}
                whileHover={{ x: 10 }}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left py-2 text-sm font-medium transition-colors hover:opacity-80"
                style={{ color: currentTheme.colors.text }}
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navigation;