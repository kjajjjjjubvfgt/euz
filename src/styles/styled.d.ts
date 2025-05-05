import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primaryDark: string;
      primaryLight: string;
      primaryRgb: string;
      
      secondary: string;
      secondaryDark: string;
      secondaryLight: string;
      secondaryRgb: string;
      
      background: string;
      backgroundCard: string;
      backgroundInput: string;
      backgroundModal: string;
      backgroundNavbar: string;
      backgroundDisabled: string;
      
      text: {
        primary: string;
        secondary: string;
        disabled: string;
        placeholder: string;
      };
      
      border: string;
      error: string;
      success: string;
      warning: string;
      info: string;
      disabled: string;
    };
    
    fonts: {
      body: string;
      heading: string;
    };
    
    shadows: {
      small: string;
      medium: string;
      large: string;
    };
    
    transitions: {
      fast: string;
      normal: string;
      slow: string;
    };
    
    borderRadius: {
      small: string;
      medium: string;
      large: string;
      round: string;
    };
  }
}