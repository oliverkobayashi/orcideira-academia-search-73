
import { useState, useEffect, useCallback } from 'react';
import { getUserPreferences } from '../utils/userPreferences';

interface UserFavorites {
  userId: string;
  favoritePapers: string[];
  followedAuthors: string[];
}

// Event emitter para notificar mudanças nas preferências
class PreferencesEventEmitter {
  private listeners: (() => void)[] = [];

  subscribe(callback: () => void) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }

  emit() {
    this.listeners.forEach(callback => callback());
  }
}

export const preferencesEmitter = new PreferencesEventEmitter();

export const useUserPreferences = (userId: string) => {
  const [preferences, setPreferences] = useState<UserFavorites | null>(null);

  const refreshPreferences = useCallback(() => {
    if (userId) {
      const prefs = getUserPreferences(userId);
      setPreferences(prefs);
    }
  }, [userId]);

  useEffect(() => {
    refreshPreferences();
    
    // Subscrever para mudanças
    const unsubscribe = preferencesEmitter.subscribe(refreshPreferences);
    
    return unsubscribe;
  }, [refreshPreferences]);

  return preferences;
};
