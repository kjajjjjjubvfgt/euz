import { create } from 'zustand';
import { UserProfile } from '../types';
import xtreamService from '../services/xtreamService';

interface AuthState {
  isAuthenticated: boolean;
  userProfile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  login: (server: string, username: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
}

const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  userProfile: null,
  isLoading: false,
  error: null,
  
  login: async (server: string, username: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const userProfile = await xtreamService.authenticate(server, username, password);
      set({ isAuthenticated: true, userProfile, isLoading: false });
    } catch (error) {
      set({ 
        isAuthenticated: false, 
        userProfile: null, 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Login failed' 
      });
      throw error;
    }
  },
  
  logout: () => {
    xtreamService.clearCredentials();
    set({ isAuthenticated: false, userProfile: null, error: null });
  },
  
  checkAuth: async () => {
    if (xtreamService.isLoggedIn()) {
      set({ isLoading: true, error: null });
      try {
        const userProfile = await xtreamService.getUserInfo();
        set({ isAuthenticated: true, userProfile, isLoading: false });
        return true;
      } catch (error) {
        set({ 
          isAuthenticated: false, 
          userProfile: null, 
          isLoading: false, 
          error: error instanceof Error ? error.message : 'Authentication check failed' 
        });
        return false;
      }
    }
    return false;
  }
}));

export default useAuthStore;