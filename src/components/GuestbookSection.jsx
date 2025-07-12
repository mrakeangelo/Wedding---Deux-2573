import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useTheme } from '../contexts/ThemeContext';
import { useWedding } from '../contexts/WeddingContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiHeart, FiSend } = FiIcons;

const GuestbookSection = () => {
  const { currentTheme } = useTheme();
  const { guestbookEntries, addGuestbookEntry } = useWedding();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await addGuestbookEntry({
        ...data,
        created_at: new Date().toISOString()
      });
      reset();
    } catch (error) {
      console.error('Error submitting guestbook entry:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="guestbook"
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
            Say It Loud, Say It Proud
          </h2>
          <div 
            className="w-24 h-1 mx-auto rounded-full mb-6"
            style={{ backgroundColor: currentTheme.colors.primary }}
          />
          <p 
            className="text-lg"
            style={{ color: currentTheme.colors.text }}
          >
            Share your love, wishes, and excitement with us!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Guestbook Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label 
                  className="block text-sm font-medium mb-2"
                  style={{ color: currentTheme.colors.text }}
                >
                  Your Name *
                </label>
                <input
                  type="text"
                  {...register('name', { required: 'Name is required' })}
                  className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:border-transparent transition-all"
                  style={{ 
                    backgroundColor: currentTheme.colors.background,
                    borderColor: currentTheme.colors.primary + '40',
                    color: currentTheme.colors.text
                  }}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label 
                  className="block text-sm font-medium mb-2"
                  style={{ color: currentTheme.colors.text }}
                >
                  Your Message *
                </label>
                <textarea
                  {...register('message', { required: 'Message is required' })}
                  rows="6"
                  placeholder="Share your love, congratulations, favorite memory, or words of wisdom..."
                  className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:border-transparent transition-all resize-none"
                  style={{ 
                    backgroundColor: currentTheme.colors.background,
                    borderColor: currentTheme.colors.primary + '40',
                    color: currentTheme.colors.text
                  }}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 rounded-lg font-medium text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                style={{ backgroundColor: currentTheme.colors.primary }}
              >
                <SafeIcon icon={FiSend} className="w-5 h-5" />
                <span>{isSubmitting ? 'Sending...' : 'Send Love'}</span>
              </motion.button>
            </form>
          </motion.div>

          {/* Guestbook Entries */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 
              className="text-2xl font-bold mb-6"
              style={{ color: currentTheme.colors.text }}
            >
              Messages of Love
            </h3>

            <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-hide">
              {guestbookEntries.length === 0 ? (
                <div 
                  className="text-center py-8 rounded-lg"
                  style={{ backgroundColor: currentTheme.colors.primary + '10' }}
                >
                  <SafeIcon icon={FiHeart} className="w-12 h-12 mx-auto mb-4" style={{ color: currentTheme.colors.primary }} />
                  <p style={{ color: currentTheme.colors.text }}>
                    Be the first to share your love!
                  </p>
                </div>
              ) : (
                guestbookEntries.map((entry, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-4 rounded-lg shadow-sm"
                    style={{ backgroundColor: currentTheme.colors.accent + '20' }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 
                        className="font-semibold"
                        style={{ color: currentTheme.colors.text }}
                      >
                        {entry.name}
                      </h4>
                      <span 
                        className="text-xs"
                        style={{ color: currentTheme.colors.text + '80' }}
                      >
                        {new Date(entry.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p 
                      className="text-sm leading-relaxed"
                      style={{ color: currentTheme.colors.text }}
                    >
                      {entry.message}
                    </p>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GuestbookSection;