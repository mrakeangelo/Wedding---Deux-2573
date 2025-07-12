import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useWedding } from '../contexts/WeddingContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCalendar, FiMapPin, FiClock, FiHeart } = FiIcons;

const WeddingInfoSection = () => {
  const { currentTheme } = useTheme();
  const { weddingData } = useWedding();

  const infoCards = [
    {
      icon: FiCalendar,
      title: 'Date',
      content: new Date(weddingData.weddingDate).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      color: currentTheme.colors.primary
    },
    {
      icon: FiMapPin,
      title: 'Venue',
      content: weddingData.venue,
      subtitle: weddingData.location,
      color: currentTheme.colors.secondary
    },
    {
      icon: FiClock,
      title: 'Time',
      content: '4:00 PM',
      subtitle: 'Ceremony begins',
      color: currentTheme.colors.accent
    },
    {
      icon: FiHeart,
      title: 'Dress Code',
      content: 'Celebrate You',
      subtitle: 'Wear what makes you feel authentic',
      color: currentTheme.colors.primary
    }
  ];

  return (
    <section 
      id="info"
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
            Wedding Details
          </h2>
          <div 
            className="w-24 h-1 mx-auto rounded-full"
            style={{ backgroundColor: currentTheme.colors.primary }}
          />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {infoCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="text-center p-6 rounded-2xl shadow-lg"
              style={{ backgroundColor: currentTheme.colors.background }}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{ backgroundColor: card.color + '20' }}
              >
                <SafeIcon 
                  icon={card.icon} 
                  className="w-8 h-8"
                  style={{ color: card.color }}
                />
              </motion.div>
              
              <h3 
                className="text-xl font-semibold mb-2"
                style={{ color: currentTheme.colors.text }}
              >
                {card.title}
              </h3>
              
              <p 
                className="text-lg font-medium mb-1"
                style={{ color: currentTheme.colors.text }}
              >
                {card.content}
              </p>
              
              {card.subtitle && (
                <p 
                  className="text-sm"
                  style={{ color: currentTheme.colors.text + '80' }}
                >
                  {card.subtitle}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div 
            className="max-w-3xl mx-auto p-8 rounded-2xl"
            style={{ backgroundColor: currentTheme.colors.primary + '10' }}
          >
            <h3 
              className="serif-font text-2xl font-bold mb-4"
              style={{ color: currentTheme.colors.text }}
            >
              Our Chosen Family
            </h3>
            <p 
              className="text-lg leading-relaxed"
              style={{ color: currentTheme.colors.text }}
            >
              This celebration is about love, authenticity, and the beautiful community that supports us. 
              Come as you are, love who you love, and let's make this day unforgettable together.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WeddingInfoSection;