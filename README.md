# Netflix-Style IPTV OTT App for Samsung Tizen TV

A modern, feature-rich IPTV OTT (Over-the-top) application for Samsung Tizen smart TVs, designed with a Netflix-like user interface and smooth animations.

## Features

- **Modern UI**: Netflix-inspired interface with smooth animations and transitions
- **Content Types**: Live TV, Movies, and Series in a single platform
- **Xtream Codes Integration**: Full support for Xtream Codes panel API
- **EPG Support**: Electronic Program Guide for live TV channels
- **TMDB Integration**: Rich metadata for movies and series
- **Multi-language Support**: Turkish and English interfaces
- **Theme Options**: Light and dark mode
- **User Features**: Favorites, watch history, parental controls
- **Advanced Video Player**: Support for various formats with DRM capabilities
- **TV-Optimized**: Designed specifically for big screen and remote control navigation

## Tech Stack

- **React**: UI library
- **TypeScript**: Type safety
- **Styled Components**: Styling
- **React Router**: Navigation
- **Zustand**: State management
- **i18next**: Internationalization
- **Axios**: API requests
- **Shaka Player**: Video playback with DRM support
- **Vite**: Build tool

## Project Structure

```
src/
├── assets/           # Static assets
├── components/       # UI components
│   ├── content/      # Content-specific components
│   ├── layout/       # Layout components
│   └── ui/           # Reusable UI components
├── hooks/            # Custom React hooks
├── i18n/             # Internationalization
├── pages/            # Application pages
├── providers/        # Context providers
├── services/         # API services
├── store/            # State management
├── styles/           # Global styles and themes
├── types/            # TypeScript type definitions
└── utils/            # Utility functions
```

## Development Setup

### Prerequisites

- Node.js (v16+)
- npm or yarn
- Tizen Studio (for TV deployment)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/mbulut00486/tizen-iptv-app.git
   cd tizen-iptv-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Build for production:
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

## Configuration

### TMDB API

The application uses TMDB API for movie and series metadata. The API key is already configured in the application.

### Xtream Codes

The application supports Xtream Codes panel API. Users need to enter their server URL, username, and password on the login screen.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
