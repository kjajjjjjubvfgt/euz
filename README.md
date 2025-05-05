# IPTV OTT App for Samsung Tizen TV

A Netflix-style IPTV OTT (Over-the-top) application for Samsung Tizen smart TVs. This application provides a modern, animated interface for accessing live TV, movies, and series content in a single platform.

## Features

- **Modern UI**: Netflix-like interface with smooth animations and transitions
- **Content Types**: Live TV, Movies, and Series in a unified platform
- **Xtream Codes Support**: Connect to IPTV services using Xtream Codes panel
- **TMDB Integration**: Rich metadata for movies and series
- **EPG Support**: Electronic Program Guide for live TV channels
- **Advanced Video Player**: Support for various formats, DRM, and subtitles
- **Multilingual**: Turkish and English language support
- **Theme Options**: Light and dark mode
- **User Features**: Favorites, watch history, parental controls
- **Search**: Find content across all categories

## Technical Details

- Built with React, TypeScript, and Vite
- State management with Zustand
- Video playback with Shaka Player
- Internationalization with i18next
- Focus management for TV remote control
- Responsive design for TV screens

## Installation

### Prerequisites

- Tizen Studio with TV extension
- Samsung TV Certificate for signing

### Development Setup

1. Clone the repository:
   ```
   git clone https://github.com/mbulut00486/tizen-iptv-app.git
   cd tizen-iptv-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start development server:
   ```
   npm run dev
   ```

### Building for Tizen TV

1. Build the project:
   ```
   npm run build
   ```

2. Package for Tizen:
   ```
   npm run package
   ```

3. Install on TV or emulator:
   ```
   npm run install-tv
   ```

## Configuration

The application requires Xtream Codes panel credentials (server URL, username, password) for accessing IPTV content. These are entered by the user on the login screen.

For TMDB integration, the application uses the following API credentials:
- API Key: 42125c682636b68d10d70b487c692685
- Read Access Token: eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MjEyNWM2ODI2MzZiNjhkMTBkNzBiNDg3YzY5MjY4NSIsIm5iZiI6MS42NDM4MjA2NjA2OTUwMDAyZSs5LCJzdWIiOiI2MWZhYjY3NGI3YWJiNTAwNjY1YWQ4MzAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.e06dzH5trScMiz7obFbCFip5dO1XQp-bUC3lecJ8sxU

## Project Structure

```
tizen-iptv-app/
├── src/
│   ├── api/           # API services for Xtream Codes and TMDB
│   ├── assets/        # Static assets
│   ├── components/    # UI components
│   ├── hooks/         # Custom React hooks
│   ├── i18n/          # Internationalization
│   ├── pages/         # Application pages
│   ├── providers/     # Context providers
│   ├── stores/        # Zustand stores
│   ├── types/         # TypeScript type definitions
│   ├── utils/         # Utility functions
│   ├── App.tsx        # Main application component
│   └── main.tsx       # Application entry point
├── public/            # Public assets
├── config.xml         # Tizen application configuration
└── package.json       # Project dependencies and scripts
```

## Deployment

The application can be deployed to Samsung Tizen TVs through the Tizen Studio or using the provided npm scripts. The built application is packaged as a .wgt file that can be installed on compatible TVs.

## License

This project is proprietary and not licensed for public use without permission.
