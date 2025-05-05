import { DefaultTheme } from 'styled-components';

export const lightTheme: DefaultTheme = {
  colors: {
    primary: '#E50914',
    primaryDark: '#B81D24',
    primaryLight: '#F40612',
    primaryRgb: '229, 9, 20',
    
    secondary: '#0071EB',
    secondaryDark: '#0060C7',
    secondaryLight: '#2B8FFF',
    secondaryRgb: '0, 113, 235',
    
    background: '#F5F5F5',
    backgroundCard: '#FFFFFF',
    backgroundInput: '#FFFFFF',
    backgroundModal: '#FFFFFF',
    backgroundNavbar: '#FFFFFF',
    backgroundDisabled: '#F0F0F0',
    
    text: {
      primary: '#141414',
      secondary: '#757575',
      disabled: '#BBBBBB',
      placeholder: '#AAAAAA',
    },
    
    border: '#E5E5E5',
    error: '#FF3B30',
    success: '#34C759',
    warning: '#FF9500',
    info: '#007AFF',
    disabled: '#E5E5E5',
  },
  
  fonts: {
    body: "'Roboto', 'Helvetica Neue', sans-serif",
    heading: "'Roboto', 'Helvetica Neue', sans-serif",
  },
  
  shadows: {
    small: '0 2px 4px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 8px rgba(0, 0, 0, 0.1)',
    large: '0 8px 16px rgba(0, 0, 0, 0.1)',
  },
  
  transitions: {
    fast: '0.1s ease',
    normal: '0.2s ease',
    slow: '0.3s ease',
  },
  
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '12px',
    round: '50%',
  },
};

export const darkTheme: DefaultTheme = {
  colors: {
    primary: '#E50914',
    primaryDark: '#B81D24',
    primaryLight: '#F40612',
    primaryRgb: '229, 9, 20',
    
    secondary: '#0071EB',
    secondaryDark: '#0060C7',
    secondaryLight: '#2B8FFF',
    secondaryRgb: '0, 113, 235',
    
    background: '#141414',
    backgroundCard: '#1F1F1F',
    backgroundInput: '#2B2B2B',
    backgroundModal: '#1F1F1F',
    backgroundNavbar: '#1F1F1F',
    backgroundDisabled: '#2B2B2B',
    
    text: {
      primary: '#FFFFFF',
      secondary: '#AAAAAA',
      disabled: '#666666',
      placeholder: '#777777',
    },
    
    border: '#333333',
    error: '#FF453A',
    success: '#30D158',
    warning: '#FFD60A',
    info: '#0A84FF',
    disabled: '#444444',
  },
  
  fonts: {
    body: "'Roboto', 'Helvetica Neue', sans-serif",
    heading: "'Roboto', 'Helvetica Neue', sans-serif",
  },
  
  shadows: {
    small: '0 2px 4px rgba(0, 0, 0, 0.3)',
    medium: '0 4px 8px rgba(0, 0, 0, 0.3)',
    large: '0 8px 16px rgba(0, 0, 0, 0.3)',
  },
  
  transitions: {
    fast: '0.1s ease',
    normal: '0.2s ease',
    slow: '0.3s ease',
  },
  
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '12px',
    round: '50%',
  },
};