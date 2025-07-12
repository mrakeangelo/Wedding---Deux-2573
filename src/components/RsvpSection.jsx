import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useTheme } from '../contexts/ThemeContext';
import { useWedding } from '../contexts/WeddingContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCheck, FiX, FiHeart } = FiIcons;

const RsvpSection = () => {
  const { currentTheme } = useTheme();
  const { addRsvp } = useWedding();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await addRsvp({
        ...data,
        created_at: new Date().toISOString()
      });
      setIsSubmitted(true);
      reset();
    } catch (error) {
      console.error('Error submitting RSVP:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section 
        id="rsvp"
        className="py-20 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: currentTheme.colors.background }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <div className="pride-glow rounded-full w-24 h-24 mx-auto flex items-center justify-center">
              <SafeIcon icon={FiHeart} className="w-12 h-12 text-white" />
            </div>
            
            <h2 
              className="serif-font text-4xl font-bold"
              style={{ color: currentTheme.colors.text }}
            >
              Thank You!
            </h2>
            
            <p 
              className="text-lg"
              style={{ color: currentTheme.colors.text }}
            >
              We're so excited to celebrate with you! Your response has been received with love.
            </p>
            
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl"
            >
              🏳️‍🌈
            </motion.div>
            
            <button
              onClick={() => setIsSubmitted(false)}
              className="px-6 py-3 rounded-full font-medium transition-all hover:scale-105"
              style={{ 
                backgroundColor: currentTheme.colors.primary,
                color: 'white'
              }}
            >
              Submit Another RSVP
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section 
      id="rsvp"
      className="py-20 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: currentTheme.colors.background }}
    >
      <div className="max-w-2xl mx-auto">
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
            RSVP
          </h2>
          <div 
            className="w-24 h-1 mx-auto rounded-full mb-6"
            style={{ backgroundColor: currentTheme.colors.primary }}
          />
          <p 
            className="text-lg"
            style={{ color: currentTheme.colors.text }}
          >
            We can't wait to celebrate with you! Please let us know if you'll be joining us.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label 
                className="block text-sm font-medium mb-2"
                style={{ color: currentTheme.colors.text }}
              >
                First Name *
              </label>
              <input
                type="text"
                {...register('firstName', { required: 'First name is required' })}
                className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:border-transparent transition-all"
                style={{ 
                  backgroundColor: currentTheme.colors.background,
                  borderColor: currentTheme.colors.primary + '40',
                  color: currentTheme.colors.text
                }}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
              )}
            </div>

            <div>
              <label 
                className="block text-sm font-medium mb-2"
                style={{ color: currentTheme.colors.text }}
              >
                Last Name *
              </label>
              <input
                type="text"
                {...register('lastName', { required: 'Last name is required' })}
                className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:border-transparent transition-all"
                style={{ 
                  backgroundColor: currentTheme.colors.background,
                  borderColor: currentTheme.colors.primary + '40',
                  color: currentTheme.colors.text
                }}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div>
            <label 
              className="block text-sm font-medium mb-2"
              style={{ color: currentTheme.colors.text }}
            >
              Email *
            </label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:border-transparent transition-all"
              style={{ 
                backgroundColor: currentTheme.colors.background,
                borderColor: currentTheme.colors.primary + '40',
                color: currentTheme.colors.text
              }}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label 
              className="block text-sm font-medium mb-2"
              style={{ color: currentTheme.colors.text }}
            >
              Pronouns (optional)
            </label>
            <input
              type="text"
              {...register('pronouns')}
              placeholder="e.g., they/them, she/her, he/him"
              className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:border-transparent transition-all"
              style={{ 
                backgroundColor: currentTheme.colors.background,
                borderColor: currentTheme.colors.primary + '40',
                color: currentTheme.colors.text
              }}
            />
          </div>

          <div>
            <label 
              className="block text-sm font-medium mb-4"
              style={{ color: currentTheme.colors.text }}
            >
              Will you be attending? *
            </label>
            <div className="grid md:grid-cols-2 gap-4">
              <label className="flex items-center p-4 rounded-lg border cursor-pointer hover:scale-105 transition-transform">
                <input
                  type="radio"
                  value="yes"
                  {...register('attending', { required: 'Please select your attendance' })}
                  className="sr-only"
                />
                <div className="flex items-center space-x-3">
                  <SafeIcon icon={FiCheck} className="w-6 h-6" style={{ color: currentTheme.colors.primary }} />
                  <span style={{ color: currentTheme.colors.text }}>Yes, I'll be there!</span>
                </div>
              </label>
              
              <label className="flex items-center p-4 rounded-lg border cursor-pointer hover:scale-105 transition-transform">
                <input
                  type="radio"
                  value="no"
                  {...register('attending', { required: 'Please select your attendance' })}
                  className="sr-only"
                />
                <div className="flex items-center space-x-3">
                  <SafeIcon icon={FiX} className="w-6 h-6" style={{ color: currentTheme.colors.secondary }} />
                  <span style={{ color: currentTheme.colors.text }}>Can't make it</span>
                </div>
              </label>
            </div>
            {errors.attending && (
              <p className="text-red-500 text-sm mt-1">{errors.attending.message}</p>
            )}
          </div>

          <div>
            <label 
              className="block text-sm font-medium mb-2"
              style={{ color: currentTheme.colors.text }}
            >
              Number of Guests
            </label>
            <select
              {...register('guestCount')}
              className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:border-transparent transition-all"
              style={{ 
                backgroundColor: currentTheme.colors.background,
                borderColor: currentTheme.colors.primary + '40',
                color: currentTheme.colors.text
              }}
            >
              <option value="1">Just me</option>
              <option value="2">2 people</option>
              <option value="3">3 people</option>
              <option value="4">4 people</option>
              <option value="5">5+ people</option>
            </select>
          </div>

          <div>
            <label 
              className="block text-sm font-medium mb-2"
              style={{ color: currentTheme.colors.text }}
            >
              Special Notes or Dietary Restrictions
            </label>
            <textarea
              {...register('notes')}
              rows="4"
              placeholder="Let us know about any dietary restrictions, accessibility needs, or just share your excitement!"
              className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:border-transparent transition-all resize-none"
              style={{ 
                backgroundColor: currentTheme.colors.background,
                borderColor: currentTheme.colors.primary + '40',
                color: currentTheme.colors.text
              }}
            />
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-4 rounded-lg font-medium text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: currentTheme.colors.primary }}
          >
            {isSubmitting ? 'Sending with Love...' : 'Send RSVP with Love 💕'}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
};

export default RsvpSection;