import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useWedding } from '../contexts/WeddingContext';
import { useTheme } from '../contexts/ThemeContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiLogOut, FiSave, FiEye, FiEyeOff, FiHome, FiUsers, FiHeart, FiSettings } = FiIcons;

const AdminDashboard = () => {
  const { signOut } = useAuth();
  const { weddingData, setWeddingData, saveWeddingData, isPreview, setIsPreview } = useWedding();
  const { currentTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('basic');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveWeddingData(weddingData);
      alert('Wedding data saved successfully!');
    } catch (error) {
      alert('Error saving wedding data');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: FiHome },
    { id: 'story', label: 'Our Story', icon: FiHeart },
    { id: 'guests', label: 'Guests', icon: FiUsers },
    { id: 'settings', label: 'Settings', icon: FiSettings }
  ];

  const updateWeddingData = (field, value) => {
    setWeddingData(prev => ({ ...prev, [field]: value }));
  };

  const updatePartnerData = (partner, field, value) => {
    setWeddingData(prev => ({
      ...prev,
      [partner]: { ...prev[partner], [field]: value }
    }));
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: currentTheme.colors.background }}>
      {/* Header */}
      <header className="border-b" style={{ borderColor: currentTheme.colors.primary + '20' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="serif-font text-2xl font-bold gradient-text">Deux Admin</h1>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsPreview(!isPreview)}
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all hover:scale-105"
                  style={{ 
                    backgroundColor: currentTheme.colors.secondary + '20',
                    color: currentTheme.colors.secondary
                  }}
                >
                  <SafeIcon icon={isPreview ? FiEyeOff : FiEye} className="w-4 h-4" />
                  <span>{isPreview ? 'Exit Preview' : 'Preview'}</span>
                </button>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-white transition-all hover:scale-105 disabled:opacity-50"
                style={{ backgroundColor: currentTheme.colors.primary }}
              >
                <SafeIcon icon={FiSave} className="w-4 h-4" />
                <span>{isSaving ? 'Saving...' : 'Save'}</span>
              </button>
              
              <button
                onClick={handleSignOut}
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all hover:scale-105"
                style={{ 
                  backgroundColor: currentTheme.colors.accent + '20',
                  color: currentTheme.colors.text
                }}
              >
                <SafeIcon icon={FiLogOut} className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all ${
                    activeTab === tab.id ? 'text-white' : ''
                  }`}
                  style={{ 
                    backgroundColor: activeTab === tab.id 
                      ? currentTheme.colors.primary 
                      : currentTheme.colors.primary + '10',
                    color: activeTab === tab.id 
                      ? 'white' 
                      : currentTheme.colors.text
                  }}
                >
                  <SafeIcon icon={tab.icon} className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {activeTab === 'basic' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold" style={{ color: currentTheme.colors.text }}>
                    Basic Information
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold" style={{ color: currentTheme.colors.text }}>
                        Partner A
                      </h3>
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: currentTheme.colors.text }}>
                          Name
                        </label>
                        <input
                          type="text"
                          value={weddingData.partnerA.name}
                          onChange={(e) => updatePartnerData('partnerA', 'name', e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border"
                          style={{ 
                            backgroundColor: currentTheme.colors.background,
                            borderColor: currentTheme.colors.primary + '40',
                            color: currentTheme.colors.text
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: currentTheme.colors.text }}>
                          Pronouns
                        </label>
                        <input
                          type="text"
                          value={weddingData.partnerA.pronouns}
                          onChange={(e) => updatePartnerData('partnerA', 'pronouns', e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border"
                          style={{ 
                            backgroundColor: currentTheme.colors.background,
                            borderColor: currentTheme.colors.primary + '40',
                            color: currentTheme.colors.text
                          }}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold" style={{ color: currentTheme.colors.text }}>
                        Partner B
                      </h3>
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: currentTheme.colors.text }}>
                          Name
                        </label>
                        <input
                          type="text"
                          value={weddingData.partnerB.name}
                          onChange={(e) => updatePartnerData('partnerB', 'name', e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border"
                          style={{ 
                            backgroundColor: currentTheme.colors.background,
                            borderColor: currentTheme.colors.primary + '40',
                            color: currentTheme.colors.text
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: currentTheme.colors.text }}>
                          Pronouns
                        </label>
                        <input
                          type="text"
                          value={weddingData.partnerB.pronouns}
                          onChange={(e) => updatePartnerData('partnerB', 'pronouns', e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border"
                          style={{ 
                            backgroundColor: currentTheme.colors.background,
                            borderColor: currentTheme.colors.primary + '40',
                            color: currentTheme.colors.text
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold" style={{ color: currentTheme.colors.text }}>
                      Wedding Details
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: currentTheme.colors.text }}>
                          Wedding Date
                        </label>
                        <input
                          type="date"
                          value={weddingData.weddingDate}
                          onChange={(e) => updateWeddingData('weddingDate', e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border"
                          style={{ 
                            backgroundColor: currentTheme.colors.background,
                            borderColor: currentTheme.colors.primary + '40',
                            color: currentTheme.colors.text
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: currentTheme.colors.text }}>
                          Venue
                        </label>
                        <input
                          type="text"
                          value={weddingData.venue}
                          onChange={(e) => updateWeddingData('venue', e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border"
                          style={{ 
                            backgroundColor: currentTheme.colors.background,
                            borderColor: currentTheme.colors.primary + '40',
                            color: currentTheme.colors.text
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: currentTheme.colors.text }}>
                          Location
                        </label>
                        <input
                          type="text"
                          value={weddingData.location}
                          onChange={(e) => updateWeddingData('location', e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border"
                          style={{ 
                            backgroundColor: currentTheme.colors.background,
                            borderColor: currentTheme.colors.primary + '40',
                            color: currentTheme.colors.text
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'story' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold" style={{ color: currentTheme.colors.text }}>
                    Your Love Story
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: currentTheme.colors.text }}>
                        {weddingData.partnerA.name}'s Story
                      </label>
                      <textarea
                        value={weddingData.partnerA.story}
                        onChange={(e) => updatePartnerData('partnerA', 'story', e.target.value)}
                        rows="8"
                        className="w-full px-4 py-3 rounded-lg border resize-none"
                        style={{ 
                          backgroundColor: currentTheme.colors.background,
                          borderColor: currentTheme.colors.primary + '40',
                          color: currentTheme.colors.text
                        }}
                        placeholder="Share your perspective on how you met and fell in love..."
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: currentTheme.colors.text }}>
                        {weddingData.partnerB.name}'s Story
                      </label>
                      <textarea
                        value={weddingData.partnerB.story}
                        onChange={(e) => updatePartnerData('partnerB', 'story', e.target.value)}
                        rows="8"
                        className="w-full px-4 py-3 rounded-lg border resize-none"
                        style={{ 
                          backgroundColor: currentTheme.colors.background,
                          borderColor: currentTheme.colors.primary + '40',
                          color: currentTheme.colors.text
                        }}
                        placeholder="Share your perspective on how you met and fell in love..."
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'guests' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold" style={{ color: currentTheme.colors.text }}>
                    Guest Management
                  </h2>
                  <p style={{ color: currentTheme.colors.text }}>
                    Guest RSVP and guestbook management features will be available here.
                  </p>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold" style={{ color: currentTheme.colors.text }}>
                    Website Settings
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id="isPublic"
                        checked={weddingData.isPublic}
                        onChange={(e) => updateWeddingData('isPublic', e.target.checked)}
                        className="w-4 h-4 rounded"
                      />
                      <label htmlFor="isPublic" className="text-sm font-medium" style={{ color: currentTheme.colors.text }}>
                        Make website public
                      </label>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: currentTheme.colors.text }}>
                        Password Protection (optional)
                      </label>
                      <input
                        type="password"
                        value={weddingData.password}
                        onChange={(e) => updateWeddingData('password', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border"
                        style={{ 
                          backgroundColor: currentTheme.colors.background,
                          borderColor: currentTheme.colors.primary + '40',
                          color: currentTheme.colors.text
                        }}
                        placeholder="Leave empty for no password"
                      />
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;