import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const GallerySection = () => {
  const { currentTheme } = useTheme();
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryImages = [
    {
      src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=500&h=600&fit=crop',
      alt: 'Couple laughing together',
      message: 'Our first date - couldn\'t stop laughing!'
    },
    {
      src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=500&h=600&fit=crop',
      alt: 'Holding hands',
      message: 'The moment we knew we were meant to be'
    },
    {
      src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=500&h=600&fit=crop',
      alt: 'Dancing together',
      message: 'Dancing in the kitchen at 2 AM'
    },
    {
      src: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=500&h=600&fit=crop',
      alt: 'Sunset moment',
      message: 'Watching sunsets never gets old'
    },
    {
      src: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=500&h=600&fit=crop',
      alt: 'Adventure together',
      message: 'Adventures are better together'
    },
    {
      src: 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=500&h=600&fit=crop',
      alt: 'Cozy moment',
      message: 'Home is wherever you are'
    }
  ];

  return (
    <section 
      id="gallery"
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
            Our Journey
          </h2>
          <div 
            className="w-24 h-1 mx-auto rounded-full"
            style={{ backgroundColor: currentTheme.colors.primary }}
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg"
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="text-white text-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <p className="text-sm font-medium">{image.message}</p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-auto max-h-screen object-contain rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 rounded-b-lg">
                <p className="text-center">{selectedImage.message}</p>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-70 transition-opacity"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;