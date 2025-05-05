import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { useSettingsStore } from '../store';
import { GlobalStyles, lightTheme, darkTheme } from '../styles';

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { theme } = useSettingsStore();
  
  return (
    <StyledThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <GlobalStyles />
      {children}
    </StyledThemeProvider>
  );
};

export default ThemeProvider;