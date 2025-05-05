import { create } from 'zustand';
import { AppSettings } from '../types';

interface SettingsState extends AppSettings {
  setTheme: (theme: 'light' | 'dark') => void;
  setLanguage: (language: 'tr' | 'en') => void;
  setAutoLogin: (autoLogin: boolean) => void;
  setParentalControl: (enabled: boolean, pin?: string) => void;
  validateParentalPin: (pin: string) => boolean;
}

// Load settings from localStorage or use defaults
const loadSettings = (): AppSettings => {
  const savedSettings = localStorage.getItem('app_settings');
  if (savedSettings) {
    return JSON.parse(savedSettings);
  }
  return {
    theme: 'dark',
    language: 'tr',
    autoLogin: false,
    parentalControlEnabled: false,
  };
};

// Save settings to localStorage
const saveSettings = (settings: AppSettings) => {
  localStorage.setItem('app_settings', JSON.stringify(settings));
};

const useSettingsStore = create<SettingsState>((set, get) => {
  const initialSettings = loadSettings();
  
  return {
    ...initialSettings,
    
    setTheme: (theme) => {
      set({ theme });
      saveSettings({ ...get(), theme });
      
      // Apply theme to document
      document.documentElement.setAttribute('data-theme', theme);
    },
    
    setLanguage: (language) => {
      set({ language });
      saveSettings({ ...get(), language });
    },
    
    setAutoLogin: (autoLogin) => {
      set({ autoLogin });
      saveSettings({ ...get(), autoLogin });
    },
    
    setParentalControl: (enabled, pin) => {
      const settings: Partial<AppSettings> = { parentalControlEnabled: enabled };
      if (pin) {
        settings.parentalControlPin = pin;
      }
      set(settings as AppSettings);
      saveSettings({ ...get() });
    },
    
    validateParentalPin: (pin) => {
      const { parentalControlPin } = get();
      return parentalControlPin === pin;
    }
  };
});

// Initialize theme on app load
const initializeTheme = () => {
  const { theme } = useSettingsStore.getState();
  document.documentElement.setAttribute('data-theme', theme);
};

// Call this when your app initializes
initializeTheme();

export default useSettingsStore;