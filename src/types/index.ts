// User and Authentication Types
export interface LoginCredentials {
  server: string;
  username: string;
  password: string;
}

export interface UserProfile {
  username: string;
  password: string;
  status: string;
  expDate: string;
  maxConnections: number;
  activeConnections: number;
}

// Content Types
export interface Category {
  category_id: string;
  category_name: string;
  parent_id?: number;
}

export interface LiveStream {
  stream_id: number;
  name: string;
  stream_icon: string;
  epg_channel_id?: string;
  added?: string;
  category_id: string;
  custom_sid?: string;
  tv_archive?: 0 | 1;
  direct_source?: string;
  tv_archive_duration?: number;
}

export interface Movie {
  stream_id: number;
  name: string;
  stream_icon: string;
  added: string;
  category_id: string;
  container_extension: string;
  custom_sid?: string;
  direct_source?: string;
}

export interface Series {
  series_id: number;
  name: string;
  cover: string;
  plot?: string;
  cast?: string;
  director?: string;
  genre?: string;
  releaseDate?: string;
  last_modified?: string;
  rating?: string;
  rating_5based?: number;
  backdrop_path?: string;
  youtube_trailer?: string;
  episode_run_time?: string;
  category_id: string;
}

export interface Season {
  id: number;
  season_number: number;
  name: string;
  cover?: string;
  overview?: string;
  air_date?: string;
}

export interface Episode {
  id: number;
  episode_num: number;
  title: string;
  container_extension: string;
  info?: {
    movie_image?: string;
    plot?: string;
    duration_secs?: number;
    duration?: string;
    releasedate?: string;
    rating?: string;
  };
  added?: string;
  season: number;
  direct_source?: string;
}

// EPG Types
export interface EPGProgram {
  id: string;
  title: string;
  start: string; // ISO date string
  end: string; // ISO date string
  description?: string;
  channel_id: string;
  start_timestamp: number;
  stop_timestamp: number;
}

// TMDB Types
export interface TMDBMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  genres: { id: number; name: string }[];
  runtime: number;
  imdb_id?: string;
}

export interface TMDBSeries {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  first_air_date: string;
  vote_average: number;
  genres: { id: number; name: string }[];
  number_of_seasons: number;
  number_of_episodes: number;
  episode_run_time: number[];
  imdb_id?: string;
}

export interface TMDBCast {
  id: number;
  name: string;
  character: string;
  profile_path: string;
}

// App Settings
export interface AppSettings {
  theme: 'light' | 'dark';
  language: 'tr' | 'en';
  autoLogin: boolean;
  parentalControlEnabled: boolean;
  parentalControlPin?: string;
}

// Playback History
export interface PlaybackHistory {
  id: number;
  type: 'movie' | 'series' | 'live';
  name: string;
  streamId: number;
  position: number; // seconds
  duration: number; // seconds
  posterUrl?: string;
  seasonNumber?: number;
  episodeNumber?: number;
  lastWatched: string; // ISO date string
  completed: boolean;
}

// Favorites
export interface Favorite {
  id: number;
  type: 'movie' | 'series' | 'live';
  name: string;
  streamId: number;
  posterUrl?: string;
  addedAt: string; // ISO date string
}