import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const QuotesSection = () => {
  const { currentTheme } = useTheme();
  const [currentQuote, setCurrentQuote] = useState(0);

  const quotes = [
    {
      text: "We are all born naked and the rest is drag.",
      author: "RuPaul"
    },
    {
      text: "Love is love is love is love is love is love is love is love cannot be killed or swept aside.",
      author: "Lin-Manuel Miranda"
    },
    {
      text: "The only way to deal with an unfree world is to become so absolutely free that your very existence is an act of rebellion.",
      author: "Albert Camus"
    },
    {
      text: "You have been assigned this mountain to show others it can be moved.",
      author: "Mel Robbins"
    },
    {
      text: "If you cannot love yourself, you cannot fully open to your ability to love others.",
      author: "Audre Lorde"
    },
    {
      text: "The very best thing you can do for the whole world is to make the most of yourself.",
      author: "Wallace Wattles"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [quotes.length]);

  return (
    <section 
      className="py-20 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: currentTheme.colors.background }}
    >
      <div className="max-w-4xl mx-auto">
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
            Words That Inspire Us
          </h2>
          <div 
            className="w-24 h-1 mx-auto rounded-full"
            style={{ backgroundColor: currentTheme.colors.primary }}
          />
        </motion.div>

        <div className="relative h-64 flex items-center justify-center">
          {quotes.map((quote, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: index === currentQuote ? 1 : 0,
                y: index === currentQuote ? 0 : 20
              }}
              transition={{ duration: 0.8 }}
              className={`absolute inset-0 flex flex-col items-center justify-center text-center space-y-6 ${
                index === currentQuote ? 'pointer-events-auto' : 'pointer-events-none'
              }`}
            >
              <blockquote 
                className="text-xl sm:text-2xl lg:text-3xl font-light italic leading-relaxed"
                style={{ color: currentTheme.colors.text }}
              >
                "{quote.text}"
              </blockquote>
              <cite 
                className="text-lg font-medium not-italic"
                style={{ color: currentTheme.colors.primary }}
              >
                — {quote.author}
              </cite>
            </motion.div>
          ))}
        </div>

        {/* Quote Navigation */}
        <div className="flex justify-center space-x-2 mt-12">
          {quotes.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuote(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentQuote ? 'scale-125' : 'opacity-50'
              }`}
              style={{ backgroundColor: currentTheme.colors.primary }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuotesSection;