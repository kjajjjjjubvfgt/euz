# IPTV OTT App for Samsung Tizen TV

A Netflix-style IPTV OTT (Over-the-top) application for Samsung Tizen smart TVs. This application provides a modern, animated interface for accessing live TV, movies, and series content in a single platform.

## Features

- **Modern UI**: Netflix-like interface with smooth animations and transitions
- **Content Types**: Live TV, Movies, and Series in a unified platform
- **Xtream Codes Support**: Connect to your IPTV service using Xtream Codes panel
- **EPG Support**: Electronic Program Guide for live TV channels
- **TMDB Integration**: Rich metadata for movies and series
- **Advanced Video Player**: Support for various formats, DRM, and subtitles
- **User Management**: Profile and settings management
- **Multilingual**: Support for Turkish and English languages
- **Theme Support**: Light and dark mode
- **Parental Controls**: PIN protection for adult content
- **Favorites**: Save your favorite channels and content
- **Search**: Find content across all categories
- **Watch History**: Resume watching from where you left off

## Technical Details

- Built with React, TypeScript, and Vite
- Styled with Styled Components
- State management with Zustand
- Video playback with Shaka Player
- Internationalization with i18next
- Focus management for TV remote control
- Optimized for Samsung Tizen TV platform

## Installation Instructions

### Prerequisites

- Samsung Tizen TV (Tizen 4.0 or higher)
- Tizen Studio with TV extension installed
- Samsung TV certificate for signing the application

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

3. Start the development server:
   ```
   npm run dev
   ```

### Building for Tizen TV

1. Build the application:
   ```
   npm run build
   ```

2. Open the project in Tizen Studio:
   - Launch Tizen Studio
   - Select File > Import > Tizen > Tizen Project
   - Browse to the project directory
   - Select the project and click Finish

3. Configure the application:
   - Right-click on the project in Project Explorer
   - Select Properties
   - Ensure the application ID and version match your config.xml

4. Build the Tizen package:
   - Right-click on the project
   - Select Build Project

5. Run on Emulator or Device:
   - Right-click on the project
   - Select Run As > Tizen Web Application
   - Choose your target device or emulator

### Manual Installation on TV

1. Enable Developer Mode on your Samsung TV:
   - Go to Apps
   - Press 1, 2, 3, 4, 5 in sequence on the remote
   - Enable Developer Mode
   - Set the IP address of your development machine

2. Connect to the TV from Tizen Studio:
   - Open Device Manager in Tizen Studio
   - Click "Scan" to find your TV
   - Select your TV and click "Connect"

3. Install the application:
   - Right-click on the project
   - Select Run As > Tizen Web Application
   - Choose your connected TV

## Configuration

The application requires Xtream Codes panel information to connect to your IPTV service:
- Server URL/DNS
- Username
- Password

TMDB API credentials are pre-configured for metadata retrieval.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [React](https://reactjs.org/)
- [Shaka Player](https://github.com/google/shaka-player)
- [TMDB API](https://www.themoviedb.org/documentation/api)
- [Samsung Tizen Platform](https://developer.samsung.com/smarttv/develop/specifications/tizen-specifications.html)
