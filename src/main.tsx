import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Initialize i18n
import './i18n';

// Remove the default CSS
// import './index.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
