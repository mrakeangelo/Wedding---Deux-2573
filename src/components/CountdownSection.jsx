import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useWedding } from '../contexts/WeddingContext';

const CountdownSection = () => {
  const { currentTheme } = useTheme();
  const { weddingData } = useWedding();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(weddingData.weddingDate) - new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [weddingData.weddingDate]);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days, color: currentTheme.colors.primary },
    { label: 'Hours', value: timeLeft.hours, color: currentTheme.colors.secondary },
    { label: 'Minutes', value: timeLeft.minutes, color: currentTheme.colors.accent },
    { label: 'Seconds', value: timeLeft.seconds, color: currentTheme.colors.primary }
  ];

  return (
    <section 
      className="py-20 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: currentTheme.colors.background }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 
            className="serif-font text-4xl sm:text-5xl font-bold mb-4"
            style={{ color: currentTheme.colors.text }}
          >
            The Big Day
          </h2>
          <div 
            className="w-24 h-1 mx-auto rounded-full"
            style={{ backgroundColor: currentTheme.colors.primary }}
          />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-2xl shadow-lg"
                style={{ backgroundColor: unit.color + '20' }}
              >
                <motion.div
                  key={unit.value}
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="mono-font text-3xl sm:text-4xl font-bold mb-2"
                  style={{ color: unit.color }}
                >
                  {unit.value.toString().padStart(2, '0')}
                </motion.div>
                <p 
                  className="text-sm sm:text-base font-medium uppercase tracking-wide"
                  style={{ color: currentTheme.colors.text }}
                >
                  {unit.label}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <p 
            className="text-lg sm:text-xl font-light italic"
            style={{ color: currentTheme.colors.text }}
          >
            "Love wins. Love always wins."
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CountdownSection;