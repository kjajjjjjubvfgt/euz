# Netflix-Style IPTV OTT App for Samsung Tizen TV

A modern, feature-rich IPTV OTT (Over-the-top) application for Samsung Tizen smart TVs, designed with a Netflix-like user interface and smooth animations.

## Features

- Modern UI: Netflix-inspired interface with smooth animations and transitions
- Content Types: Live TV, Movies, and Series in a single platform
- Xtream Codes Integration: Full support for Xtream Codes panel API
- EPG Support: Electronic Program Guide for live TV channels
- TMDB Integration: Rich metadata for movies and series
- Multi-language Support: Turkish and English interfaces
- Theme Options: Light and dark mode
- User Features: Favorites, watch history, parental controls
- Advanced Video Player: Support for various formats with DRM capabilities
- TV-Optimized: Designed specifically for big screen and remote control navigation

## Tech Stack

- React: UI library
- TypeScript: Type safety
- Styled Components: Styling
- React Router: Navigation
- Zustand: State management
- i18next: Internationalization
- Axios: API requests
- Shaka Player: Video playback with DRM support
- Vite: Build tool

## Development Setup

### Installation

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. Build for production:
   ```
   npm run build
   ```

### Tizen Deployment

1. Build the project:
   ```
   npm run build
   ```

2. Package for Tizen:
   ```
   npm run tizen:build
   npm run tizen:package
   ```

3. Install on TV or emulator:
   ```
   npm run tizen:install
   npm run tizen:run
   ```

4. Or run all steps at once:
   ```
   npm run tizen:all
   ```
