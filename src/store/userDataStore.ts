import { create } from 'zustand';
import { Favorite, PlaybackHistory } from '../types';

interface UserDataState {
  favorites: Favorite[];
  watchHistory: PlaybackHistory[];
  
  // Favorites actions
  addFavorite: (favorite: Omit<Favorite, 'id' | 'addedAt'>) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (type: 'movie' | 'series' | 'live', streamId: number) => boolean;
  
  // Watch history actions
  addToWatchHistory: (history: Omit<PlaybackHistory, 'id' | 'lastWatched'>) => void;
  updateWatchProgress: (id: number, position: number, duration: number) => void;
  removeFromWatchHistory: (id: number) => void;
  getWatchProgress: (type: 'movie' | 'series' | 'live', streamId: number, seasonNumber?: number, episodeNumber?: number) => PlaybackHistory | undefined;
  
  // Clear user data
  clearUserData: () => void;
}

// Load data from localStorage
const loadFavorites = (): Favorite[] => {
  const savedFavorites = localStorage.getItem('favorites');
  return savedFavorites ? JSON.parse(savedFavorites) : [];
};

const loadWatchHistory = (): PlaybackHistory[] => {
  const savedHistory = localStorage.getItem('watch_history');
  return savedHistory ? JSON.parse(savedHistory) : [];
};

// Save data to localStorage
const saveFavorites = (favorites: Favorite[]) => {
  localStorage.setItem('favorites', JSON.stringify(favorites));
};

const saveWatchHistory = (history: PlaybackHistory[]) => {
  localStorage.setItem('watch_history', JSON.stringify(history));
};

const useUserDataStore = create<UserDataState>((set, get) => ({
  favorites: loadFavorites(),
  watchHistory: loadWatchHistory(),
  
  // Favorites methods
  addFavorite: (favorite) => {
    const newFavorite: Favorite = {
      ...favorite,
      id: Date.now(),
      addedAt: new Date().toISOString()
    };
    
    set(state => {
      const updatedFavorites = [...state.favorites, newFavorite];
      saveFavorites(updatedFavorites);
      return { favorites: updatedFavorites };
    });
  },
  
  removeFavorite: (id) => {
    set(state => {
      const updatedFavorites = state.favorites.filter(fav => fav.id !== id);
      saveFavorites(updatedFavorites);
      return { favorites: updatedFavorites };
    });
  },
  
  isFavorite: (type, streamId) => {
    return get().favorites.some(fav => fav.type === type && fav.streamId === streamId);
  },
  
  // Watch history methods
  addToWatchHistory: (history) => {
    // Check if this content is already in history
    const existingEntry = get().watchHistory.find(
      h => h.type === history.type && 
           h.streamId === history.streamId && 
           (history.type !== 'series' || 
            (h.seasonNumber === history.seasonNumber && 
             h.episodeNumber === history.episodeNumber))
    );
    
    if (existingEntry) {
      // Update existing entry
      get().updateWatchProgress(existingEntry.id, history.position, history.duration);
      return;
    }
    
    // Add new entry
    const newHistoryEntry: PlaybackHistory = {
      ...history,
      id: Date.now(),
      lastWatched: new Date().toISOString()
    };
    
    set(state => {
      // Limit history to 100 items
      const updatedHistory = [newHistoryEntry, ...state.watchHistory].slice(0, 100);
      saveWatchHistory(updatedHistory);
      return { watchHistory: updatedHistory };
    });
  },
  
  updateWatchProgress: (id, position, duration) => {
    set(state => {
      const updatedHistory = state.watchHistory.map(item => {
        if (item.id === id) {
          const completed = position / duration > 0.9; // Mark as completed if watched more than 90%
          return {
            ...item,
            position,
            duration,
            completed,
            lastWatched: new Date().toISOString()
          };
        }
        return item;
      });
      
      // Move the updated item to the top of the list
      const updatedItem = updatedHistory.find(item => item.id === id);
      if (updatedItem) {
        const filteredHistory = updatedHistory.filter(item => item.id !== id);
        const reorderedHistory = [updatedItem, ...filteredHistory];
        saveWatchHistory(reorderedHistory);
        return { watchHistory: reorderedHistory };
      }
      
      saveWatchHistory(updatedHistory);
      return { watchHistory: updatedHistory };
    });
  },
  
  removeFromWatchHistory: (id) => {
    set(state => {
      const updatedHistory = state.watchHistory.filter(item => item.id !== id);
      saveWatchHistory(updatedHistory);
      return { watchHistory: updatedHistory };
    });
  },
  
  getWatchProgress: (type, streamId, seasonNumber, episodeNumber) => {
    return get().watchHistory.find(
      h => h.type === type && 
           h.streamId === streamId && 
           (type !== 'series' || 
            (h.seasonNumber === seasonNumber && 
             h.episodeNumber === episodeNumber))
    );
  },
  
  // Clear all user data
  clearUserData: () => {
    localStorage.removeItem('favorites');
    localStorage.removeItem('watch_history');
    set({ favorites: [], watchHistory: [] });
  }
}));

export default useUserDataStore;