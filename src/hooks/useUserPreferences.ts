
import { useState, useEffect, useCallback } from 'react';
import { getUserPreferences, preferencesEmitter } from '../utils/userPreferences';

interface UserFavorites {
  userId: string;
  favoritePapers: Array<{
    id: string;
    title: string;
    authors?: string[];
  }>;
  followedAuthors: Array<{
    id: string;
    name: string;
    affiliations?: string[];
  }>;
}

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
