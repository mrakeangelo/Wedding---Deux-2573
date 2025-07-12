import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useWedding } from '../contexts/WeddingContext';

const OurStorySection = () => {
  const { currentTheme } = useTheme();
  const { weddingData } = useWedding();

  return (
    <section 
      id="story"
      className="py-20 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: currentTheme.colors.background }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 
            className="serif-font text-4xl sm:text-5xl font-bold mb-4"
            style={{ color: currentTheme.colors.text }}
          >
            Our Story
          </h2>
          <div 
            className="w-24 h-1 mx-auto rounded-full"
            style={{ backgroundColor: currentTheme.colors.primary }}
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Partner A Story */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl"
                style={{ backgroundColor: currentTheme.colors.primary }}
              >
                {weddingData.partnerA.name.charAt(0)}
              </div>
              <div>
                <h3 
                  className="text-xl font-semibold"
                  style={{ color: currentTheme.colors.text }}
                >
                  {weddingData.partnerA.name}
                </h3>
                <p 
                  className="text-sm mono-font"
                  style={{ color: currentTheme.colors.text + '80' }}
                >
                  {weddingData.partnerA.pronouns}
                </p>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div 
                className="absolute left-0 top-0 w-1 h-full rounded-full"
                style={{ backgroundColor: currentTheme.colors.primary }}
              />
              <div className="pl-8">
                <p 
                  className="text-lg leading-relaxed"
                  style={{ color: currentTheme.colors.text }}
                >
                  {weddingData.partnerA.story}
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Partner B Story */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl"
                style={{ backgroundColor: currentTheme.colors.secondary }}
              >
                {weddingData.partnerB.name.charAt(0)}
              </div>
              <div>
                <h3 
                  className="text-xl font-semibold"
                  style={{ color: currentTheme.colors.text }}
                >
                  {weddingData.partnerB.name}
                </h3>
                <p 
                  className="text-sm mono-font"
                  style={{ color: currentTheme.colors.text + '80' }}
                >
                  {weddingData.partnerB.pronouns}
                </p>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div 
                className="absolute left-0 top-0 w-1 h-full rounded-full"
                style={{ backgroundColor: currentTheme.colors.secondary }}
              />
              <div className="pl-8">
                <p 
                  className="text-lg leading-relaxed"
                  style={{ color: currentTheme.colors.text }}
                >
                  {weddingData.partnerB.story}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* How We Found Each Other */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 
            className="serif-font text-2xl sm:text-3xl font-bold mb-8"
            style={{ color: currentTheme.colors.text }}
          >
            How We Found Each Other
          </h3>
          <div 
            className="max-w-3xl mx-auto p-8 rounded-2xl"
            style={{ backgroundColor: currentTheme.colors.accent + '20' }}
          >
            <p 
              className="text-lg leading-relaxed italic"
              style={{ color: currentTheme.colors.text }}
            >
              "Love is love is love is love. It cannot be killed or swept aside."
              <br />
              <span className="text-sm not-italic mt-4 block">
                - Lin-Manuel Miranda
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OurStorySection;