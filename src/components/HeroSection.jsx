import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useWedding } from '../contexts/WeddingContext';

const HeroSection = () => {
  const { currentTheme } = useTheme();
  const { weddingData } = useWedding();

  return (
    <section 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: currentTheme.colors.background }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            background: [
              `radial-gradient(circle at 20% 80%, ${currentTheme.colors.primary}22 0%, transparent 50%)`,
              `radial-gradient(circle at 80% 20%, ${currentTheme.colors.secondary}22 0%, transparent 50%)`,
              `radial-gradient(circle at 40% 40%, ${currentTheme.colors.accent}22 0%, transparent 50%)`
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute inset-0"
        />
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="space-y-8"
        >
          {/* Names */}
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="serif-font text-4xl sm:text-6xl lg:text-7xl font-bold"
              style={{ color: currentTheme.colors.text }}
            >
              {weddingData.partnerA.name}
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="flex items-center justify-center space-x-4"
            >
              <div 
                className="h-px w-16 sm:w-24"
                style={{ backgroundColor: currentTheme.colors.primary }}
              />
              <span 
                className="text-2xl sm:text-3xl font-light"
                style={{ color: currentTheme.colors.primary }}
              >
                &
              </span>
              <div 
                className="h-px w-16 sm:w-24"
                style={{ backgroundColor: currentTheme.colors.primary }}
              />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="serif-font text-4xl sm:text-6xl lg:text-7xl font-bold"
              style={{ color: currentTheme.colors.text }}
            >
              {weddingData.partnerB.name}
            </motion.h1>
          </div>

          {/* Pronouns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-sm sm:text-base"
            style={{ color: currentTheme.colors.text }}
          >
            <span className="mono-font px-3 py-1 rounded-full border"
                  style={{ borderColor: currentTheme.colors.primary }}>
              {weddingData.partnerA.pronouns}
            </span>
            <span className="mono-font px-3 py-1 rounded-full border"
                  style={{ borderColor: currentTheme.colors.secondary }}>
              {weddingData.partnerB.pronouns}
            </span>
          </motion.div>

          {/* Wedding Date */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-xl sm:text-2xl font-light"
            style={{ color: currentTheme.colors.text }}
          >
            {new Date(weddingData.weddingDate).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </motion.div>

          {/* Rainbow Flare */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 1.2 }}
            className="relative"
          >
            <div className="gradient-text text-6xl sm:text-8xl">✨</div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 pride-glow rounded-full"
            />
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 rounded-full flex justify-center"
              style={{ borderColor: currentTheme.colors.primary }}
            >
              <motion.div
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 rounded-full mt-2"
                style={{ backgroundColor: currentTheme.colors.primary }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;