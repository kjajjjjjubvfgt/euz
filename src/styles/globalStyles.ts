import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --color-primary: ${props => props.theme.colors.primary};
    --color-primary-dark: ${props => props.theme.colors.primaryDark};
    --color-primary-light: ${props => props.theme.colors.primaryLight};
    --color-primary-rgb: ${props => props.theme.colors.primaryRgb};
    
    --color-secondary: ${props => props.theme.colors.secondary};
    --color-secondary-dark: ${props => props.theme.colors.secondaryDark};
    --color-secondary-light: ${props => props.theme.colors.secondaryLight};
    --color-secondary-rgb: ${props => props.theme.colors.secondaryRgb};
    
    --color-background: ${props => props.theme.colors.background};
    --color-background-card: ${props => props.theme.colors.backgroundCard};
    --color-background-input: ${props => props.theme.colors.backgroundInput};
    --color-background-modal: ${props => props.theme.colors.backgroundModal};
    --color-background-navbar: ${props => props.theme.colors.backgroundNavbar};
    --color-background-disabled: ${props => props.theme.colors.backgroundDisabled};
    
    --color-text-primary: ${props => props.theme.colors.text.primary};
    --color-text-secondary: ${props => props.theme.colors.text.secondary};
    --color-text-disabled: ${props => props.theme.colors.text.disabled};
    --color-text-placeholder: ${props => props.theme.colors.text.placeholder};
    
    --color-border: ${props => props.theme.colors.border};
    --color-error: ${props => props.theme.colors.error};
    --color-success: ${props => props.theme.colors.success};
    --color-warning: ${props => props.theme.colors.warning};
    --color-info: ${props => props.theme.colors.info};
    --color-disabled: ${props => props.theme.colors.disabled};
    
    --font-body: ${props => props.theme.fonts.body};
    --font-heading: ${props => props.theme.fonts.heading};
    
    --shadow-small: ${props => props.theme.shadows.small};
    --shadow-medium: ${props => props.theme.shadows.medium};
    --shadow-large: ${props => props.theme.shadows.large};
    
    --transition-fast: ${props => props.theme.transitions.fast};
    --transition-normal: ${props => props.theme.transitions.normal};
    --transition-slow: ${props => props.theme.transitions.slow};
    
    --border-radius-small: ${props => props.theme.borderRadius.small};
    --border-radius-medium: ${props => props.theme.borderRadius.medium};
    --border-radius-large: ${props => props.theme.borderRadius.large};
    --border-radius-round: ${props => props.theme.borderRadius.round};
  }
  
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  html, body {
    font-family: var(--font-body);
    font-size: 16px;
    line-height: 1.5;
    background-color: var(--color-background);
    color: var(--color-text-primary);
    overflow-x: hidden;
    width: 100%;
    height: 100%;
  }
  
  #root {
    width: 100%;
    height: 100%;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-heading);
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 0.5em;
  }
  
  h1 {
    font-size: 2.5rem;
  }
  
  h2 {
    font-size: 2rem;
  }
  
  h3 {
    font-size: 1.75rem;
  }
  
  h4 {
    font-size: 1.5rem;
  }
  
  h5 {
    font-size: 1.25rem;
  }
  
  h6 {
    font-size: 1rem;
  }
  
  p {
    margin-bottom: 1em;
  }
  
  a {
    color: var(--color-primary);
    text-decoration: none;
    transition: color var(--transition-fast);
    
    &:hover {
      color: var(--color-primary-dark);
    }
  }
  
  button {
    cursor: pointer;
    font-family: var(--font-body);
  }
  
  input, textarea, select {
    font-family: var(--font-body);
  }
  
  ul, ol {
    list-style-position: inside;
    margin-bottom: 1em;
  }
  
  img {
    max-width: 100%;
    height: auto;
  }
  
  /* Focus styles for keyboard navigation */
  *:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
  
  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
  }
  
  ::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.5);
  }
  
  /* For Firefox */
  * {
    scrollbar-width: thin;
    scrollbar-color: rgba(0, 0, 0, 0.3) rgba(0, 0, 0, 0.1);
  }
`;

export default GlobalStyles;