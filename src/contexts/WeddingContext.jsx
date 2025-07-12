import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from './AuthContext';

const WeddingContext = createContext();

export const useWedding = () => {
  const context = useContext(WeddingContext);
  if (!context) {
    throw new Error('useWedding must be used within a WeddingProvider');
  }
  return context;
};

export const WeddingProvider = ({ children }) => {
  const [weddingData, setWeddingData] = useState({
    partnerA: {
      name: 'Alex',
      pronouns: 'they/them',
      story: 'I never believed in love at first sight until I met you...'
    },
    partnerB: {
      name: 'Jordan',
      pronouns: 'she/her',
      story: 'From our first conversation, I knew you were special...'
    },
    weddingDate: '2024-08-15',
    venue: 'The Rainbow Garden',
    location: 'San Francisco, CA',
    isPublic: true,
    password: '',
    customSections: []
  });

  const [rsvps, setRsvps] = useState([]);
  const [guestbookEntries, setGuestbookEntries] = useState([]);
  const [isPreview, setIsPreview] = useState(false);

  const saveWeddingData = async (data) => {
    try {
      const { error } = await supabase
        .from('wedding_data')
        .upsert(data);
      
      if (!error) {
        setWeddingData(data);
      }
      return { error };
    } catch (error) {
      return { error };
    }
  };

  const loadWeddingData = async () => {
    try {
      const { data, error } = await supabase
        .from('wedding_data')
        .select('*')
        .single();
      
      if (data) {
        setWeddingData(data);
      }
      return { data, error };
    } catch (error) {
      return { error };
    }
  };

  const addRsvp = async (rsvpData) => {
    try {
      const { data, error } = await supabase
        .from('rsvps')
        .insert(rsvpData);
      
      if (!error) {
        setRsvps(prev => [...prev, rsvpData]);
      }
      return { data, error };
    } catch (error) {
      return { error };
    }
  };

  const addGuestbookEntry = async (entry) => {
    try {
      const { data, error } = await supabase
        .from('guestbook')
        .insert(entry);
      
      if (!error) {
        setGuestbookEntries(prev => [...prev, entry]);
      }
      return { data, error };
    } catch (error) {
      return { error };
    }
  };

  const value = {
    weddingData,
    setWeddingData,
    saveWeddingData,
    loadWeddingData,
    rsvps,
    setRsvps,
    addRsvp,
    guestbookEntries,
    setGuestbookEntries,
    addGuestbookEntry,
    isPreview,
    setIsPreview
  };

  return (
    <WeddingContext.Provider value={value}>
      {children}
    </WeddingContext.Provider>
  );
};