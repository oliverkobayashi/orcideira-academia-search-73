
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

const USER_PREFERENCES_KEY = 'cha_orcideira_preferences';

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
export const addFavoritePaper = (userId: string, paperId: string, title: string, authors?: string[]): void => {
  const preferences = getUserPreferences(userId);
  
  if (!preferences.favoritePapers.find(paper => paper.id === paperId)) {
    preferences.favoritePapers.push({
      id: paperId,
      title,
      authors
    });
    saveUserPreferences(preferences);
    console.log('Paper adicionado aos favoritos:', paperId);
  }
};

// Função para remover paper dos favoritos
export const removeFavoritePaper = (userId: string, paperId: string): void => {
  const preferences = getUserPreferences(userId);
  preferences.favoritePapers = preferences.favoritePapers.filter(paper => paper.id !== paperId);
  saveUserPreferences(preferences);
  console.log('Paper removido dos favoritos:', paperId);
};

// Função para verificar se paper está nos favoritos
export const isPaperFavorite = (userId: string, paperId: string): boolean => {
  const preferences = getUserPreferences(userId);
  return preferences.favoritePapers.some(paper => paper.id === paperId);
};

// Função para seguir autor
export const followAuthor = (userId: string, authorId: string, name: string, affiliations?: string[]): void => {
  const preferences = getUserPreferences(userId);
  
  if (!preferences.followedAuthors.find(author => author.id === authorId)) {
    preferences.followedAuthors.push({
      id: authorId,
      name,
      affiliations
    });
    saveUserPreferences(preferences);
    console.log('Autor seguido:', authorId);
  }
};

// Função para deixar de seguir autor
export const unfollowAuthor = (userId: string, authorId: string): void => {
  const preferences = getUserPreferences(userId);
  preferences.followedAuthors = preferences.followedAuthors.filter(author => author.id !== authorId);
  saveUserPreferences(preferences);
  console.log('Autor não seguido:', authorId);
};

// Função para verificar se está seguindo autor
export const isFollowingAuthor = (userId: string, authorId: string): boolean => {
  const preferences = getUserPreferences(userId);
  return preferences.followedAuthors.some(author => author.id === authorId);
};
