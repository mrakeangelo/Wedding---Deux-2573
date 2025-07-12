import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiHeart, FiSettings } = FiIcons;

const Footer = () => {
  const { currentTheme } = useTheme();

  return (
    <footer 
      className="py-16 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: currentTheme.colors.background }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center space-y-8"
        >
          {/* Love Message */}
          <div className="space-y-4">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl"
            >
              🏳️‍🌈
            </motion.div>
            <h3 
              className="serif-font text-2xl sm:text-3xl font-bold"
              style={{ color: currentTheme.colors.text }}
            >
              Love is Love
            </h3>
            <p 
              className="text-lg max-w-2xl mx-auto"
              style={{ color: currentTheme.colors.text }}
            >
              Thank you for being part of our journey. Your love and support mean everything to us.
            </p>
          </div>

          {/* Admin Link */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-block"
          >
            <a
              href="#/admin"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all hover:opacity-80"
              style={{ 
                backgroundColor: currentTheme.colors.primary + '20',
                color: currentTheme.colors.primary
              }}
            >
              <SafeIcon icon={FiSettings} className="w-5 h-5" />
              <span>Admin Dashboard</span>
            </a>
          </motion.div>

          {/* Divider */}
          <div 
            className="w-full h-px"
            style={{ backgroundColor: currentTheme.colors.primary + '30' }}
          />

          {/* Credits */}
          <div className="space-y-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center space-x-2"
            >
              <span 
                className="serif-font text-2xl font-bold gradient-text"
              >
                Deux
              </span>
              <SafeIcon icon={FiHeart} className="w-5 h-5" style={{ color: currentTheme.colors.primary }} />
            </motion.div>
            
            <p 
              className="text-sm"
              style={{ color: currentTheme.colors.text + '80' }}
            >
              An Inclusive Wedding Template by <strong>Mrake Agency</strong>
            </p>
            
            <p 
              className="text-xs"
              style={{ color: currentTheme.colors.text + '60' }}
            >
              Celebrating love in all its beautiful forms since 2024
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;