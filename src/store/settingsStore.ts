import { create } from 'zustand';
import { AppSettings } from '../types';

interface SettingsState extends AppSettings {
  setTheme: (theme: 'light' | 'dark') => void;
  setLanguage: (language: 'tr' | 'en') => void;
  setAutoLogin: (autoLogin: boolean) => void;
  setRememberMe: (rememberMe: boolean) => void;
  setParentalControl: (enabled: boolean, pin?: string) => void;
  setParentalControlPin: (pin: string) => void;
  validateParentalPin: (pin: string) => boolean;
  blockCategory: (categoryId: number) => void;
  unblockCategory: (categoryId: number) => void;
  blockContent: (contentId: number) => void;
  unblockContent: (contentId: number) => void;
  isContentBlocked: (contentId: number, categoryId?: number) => boolean;
  setVideoQualityPreference: (quality: 'auto' | 'high' | 'medium' | 'low') => void;
  setSubtitleLanguage: (language: string) => void;
  setAudioLanguage: (language: string) => void;
  initializeSettings: () => void;
  resetSettings: () => void;
  parentalControl: {
    enabled: boolean;
    pin: string | null;
    blockedCategories: number[];
    blockedContentIds: number[];
  };
}

// Default settings
const DEFAULT_SETTINGS: AppSettings = {
  theme: 'dark',
  language: 'tr',
  autoLogin: false,
  rememberMe: true,
  parentalControlEnabled: false,
  blockedCategories: [],
  blockedContentIds: [],
  videoQualityPreference: 'auto',
  subtitleLanguage: 'tr',
  audioLanguage: 'tr'
};

// Load settings from localStorage or use defaults
const loadSettings = (): AppSettings => {
  try {
    const savedSettings = localStorage.getItem('app_settings');
    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings);
      // Merge with default settings to ensure all properties exist
      return { ...DEFAULT_SETTINGS, ...parsedSettings };
    }
  } catch (error) {
    console.error('Failed to load settings:', error);
  }
  return DEFAULT_SETTINGS;
};

// Save settings to localStorage
const saveSettings = (settings: AppSettings) => {
  localStorage.setItem('app_settings', JSON.stringify(settings));
};

const useSettingsStore = create<SettingsState>((set, get) => {
  const initialSettings = loadSettings();
  
  return {
    ...initialSettings,
    
    parentalControl: {
      enabled: initialSettings.parentalControlEnabled || false,
      pin: initialSettings.parentalControlPin || null,
      blockedCategories: [],
      blockedContentIds: []
    },
    rememberMe: initialSettings.rememberMe || true,
    
    initializeSettings: () => {
      const settings = loadSettings();
      set({
        ...settings,
        parentalControl: {
          enabled: settings.parentalControlEnabled || false,
          pin: settings.parentalControlPin || null,
          blockedCategories: [],
          blockedContentIds: []
        },
        rememberMe: settings.rememberMe !== undefined ? settings.rememberMe : true
      });
      document.documentElement.setAttribute('data-theme', settings.theme);
    },
    
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
    
    setRememberMe: (rememberMe) => {
      set({ rememberMe });
      saveSettings({ ...get(), rememberMe });
    },
    
    setParentalControl: (enabled, pin) => {
      const settings: Partial<AppSettings> = { parentalControlEnabled: enabled };
      if (pin) {
        settings.parentalControlPin = pin;
      }
      set({
        ...settings as AppSettings,
        parentalControl: {
          enabled,
          pin: pin || get().parentalControl.pin,
          blockedCategories: get().parentalControl.blockedCategories || [],
          blockedContentIds: get().parentalControl.blockedContentIds || []
        }
      });
      saveSettings({ ...get() });
    },
    
    setParentalControlPin: (pin) => {
      set({
        parentalControlPin: pin,
        parentalControl: {
          ...get().parentalControl,
          pin
        }
      });
      saveSettings({ ...get() });
    },
    
    validateParentalPin: (pin) => {
      const { parentalControlPin } = get();
      return parentalControlPin === pin;
    },
    
    blockCategory: (categoryId) => {
      const { parentalControl } = get();
      const blockedCategories = [...(parentalControl.blockedCategories || [])];
      
      if (!blockedCategories.includes(categoryId)) {
        blockedCategories.push(categoryId);
      }
      
      set({
        parentalControl: {
          ...parentalControl,
          blockedCategories
        },
        blockedCategories
      });
      
      saveSettings({ ...get(), blockedCategories });
    },
    
    unblockCategory: (categoryId) => {
      const { parentalControl } = get();
      const blockedCategories = (parentalControl.blockedCategories || [])
        .filter(id => id !== categoryId);
      
      set({
        parentalControl: {
          ...parentalControl,
          blockedCategories
        },
        blockedCategories
      });
      
      saveSettings({ ...get(), blockedCategories });
    },
    
    blockContent: (contentId) => {
      const { parentalControl } = get();
      const blockedContentIds = [...(parentalControl.blockedContentIds || [])];
      
      if (!blockedContentIds.includes(contentId)) {
        blockedContentIds.push(contentId);
      }
      
      set({
        parentalControl: {
          ...parentalControl,
          blockedContentIds
        },
        blockedContentIds
      });
      
      saveSettings({ ...get(), blockedContentIds });
    },
    
    unblockContent: (contentId) => {
      const { parentalControl } = get();
      const blockedContentIds = (parentalControl.blockedContentIds || [])
        .filter(id => id !== contentId);
      
      set({
        parentalControl: {
          ...parentalControl,
          blockedContentIds
        },
        blockedContentIds
      });
      
      saveSettings({ ...get(), blockedContentIds });
    },
    
    isContentBlocked: (contentId, categoryId) => {
      const { parentalControl } = get();
      
      if (!parentalControl.enabled) {
        return false;
      }
      
      // Check if content is directly blocked
      if (parentalControl.blockedContentIds?.includes(contentId)) {
        return true;
      }
      
      // Check if category is blocked
      if (categoryId && parentalControl.blockedCategories?.includes(Number(categoryId))) {
        return true;
      }
      
      return false;
    },
    
    setVideoQualityPreference: (quality) => {
      set({ videoQualityPreference: quality });
      saveSettings({ ...get(), videoQualityPreference: quality });
    },
    
    setSubtitleLanguage: (language) => {
      set({ subtitleLanguage: language });
      saveSettings({ ...get(), subtitleLanguage: language });
    },
    
    setAudioLanguage: (language) => {
      set({ audioLanguage: language });
      saveSettings({ ...get(), audioLanguage: language });
    },
    
    resetSettings: () => {
      set({ ...DEFAULT_SETTINGS });
      saveSettings(DEFAULT_SETTINGS);
      document.documentElement.setAttribute('data-theme', DEFAULT_SETTINGS.theme);
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