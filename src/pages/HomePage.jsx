import React from 'react';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import OurStorySection from '../components/OurStorySection';
import WeddingInfoSection from '../components/WeddingInfoSection';
import CountdownSection from '../components/CountdownSection';
import GallerySection from '../components/GallerySection';
import RsvpSection from '../components/RsvpSection';
import GuestbookSection from '../components/GuestbookSection';
import QuotesSection from '../components/QuotesSection';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <OurStorySection />
      <WeddingInfoSection />
      <CountdownSection />
      <GallerySection />
      <RsvpSection />
      <GuestbookSection />
      <QuotesSection />
      <Footer />
    </div>
  );
};

export default HomePage;