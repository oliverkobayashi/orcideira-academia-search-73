interface UserFavorites {
  userId: string;
  favoritePapers: string[];
  followedAuthors: string[];
}

const USER_PREFERENCES_KEY = 'cha_orcideira_preferences';

// Função para obter preferências do usuário
export const getUserPreferences = (userId: string): UserFavorites => {
  try {
    const preferencesJson = localStorage.getItem(USER_PREFERENCES_KEY);
    const allPreferences: UserFavorites[] = preferencesJson ? JSON.parse(preferencesJson) : [];
    
    const userPrefs = allPreferences.find(pref => pref.userId === userId);
    
    if (userPrefs) {
      return userPrefs;
    } else {
      // Criar preferências vazias para o usuário
      const newPrefs: UserFavorites = {
        userId,
        favoritePapers: [],
        followedAuthors: []
      };
      allPreferences.push(newPrefs);
      localStorage.setItem(USER_PREFERENCES_KEY, JSON.stringify(allPreferences));
      return newPrefs;
    }
  } catch (error) {
    console.error('Erro ao ler preferências do usuário:', error);
    return {
      userId,
      favoritePapers: [],
      followedAuthors: []
    };
  }
};

// Função para salvar preferências
const saveUserPreferences = (preferences: UserFavorites): void => {
  try {
    const preferencesJson = localStorage.getItem(USER_PREFERENCES_KEY);
    const allPreferences: UserFavorites[] = preferencesJson ? JSON.parse(preferencesJson) : [];
    
    const userIndex = allPreferences.findIndex(pref => pref.userId === preferences.userId);
    
    if (userIndex >= 0) {
      allPreferences[userIndex] = preferences;
    } else {
      allPreferences.push(preferences);
    }
    
    localStorage.setItem(USER_PREFERENCES_KEY, JSON.stringify(allPreferences));
    
    // Emitir evento de mudança
    preferencesEmitter.emit();
  } catch (error) {
    console.error('Erro ao salvar preferências do usuário:', error);
  }
};

// Função para adicionar paper aos favoritos
export const addFavoritePaper = (userId: string, paperId: string): void => {
  const preferences = getUserPreferences(userId);
  
  if (!preferences.favoritePapers.includes(paperId)) {
    preferences.favoritePapers.push(paperId);
    saveUserPreferences(preferences);
    console.log('Paper adicionado aos favoritos:', paperId);
  }
};

// Função para remover paper dos favoritos
export const removeFavoritePaper = (userId: string, paperId: string): void => {
  const preferences = getUserPreferences(userId);
  preferences.favoritePapers = preferences.favoritePapers.filter(id => id !== paperId);
  saveUserPreferences(preferences);
  console.log('Paper removido dos favoritos:', paperId);
};

// Função para verificar se paper está nos favoritos
export const isPaperFavorite = (userId: string, paperId: string): boolean => {
  const preferences = getUserPreferences(userId);
  return preferences.favoritePapers.includes(paperId);
};

// Função para seguir autor
export const followAuthor = (userId: string, authorId: string): void => {
  const preferences = getUserPreferences(userId);
  
  if (!preferences.followedAuthors.includes(authorId)) {
    preferences.followedAuthors.push(authorId);
    saveUserPreferences(preferences);
    console.log('Autor seguido:', authorId);
  }
};

// Função para deixar de seguir autor
export const unfollowAuthor = (userId: string, authorId: string): void => {
  const preferences = getUserPreferences(userId);
  preferences.followedAuthors = preferences.followedAuthors.filter(id => id !== authorId);
  saveUserPreferences(preferences);
  console.log('Autor não seguido:', authorId);
};

// Função para verificar se está seguindo autor
export const isFollowingAuthor = (userId: string, authorId: string): boolean => {
  const preferences = getUserPreferences(userId);
  return preferences.followedAuthors.includes(authorId);
};
