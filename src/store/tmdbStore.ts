import { create } from 'zustand';
import tmdbService from '../services/tmdbService';
import { TmdbMovieDetails, TmdbSeriesDetails, TMDBMovie, TMDBSeries, TMDBCast } from '../types';

interface TmdbState {
  movieDetails: TmdbMovieDetails | null;
  seriesDetails: TmdbSeriesDetails | null;
  similarMovies: TMDBMovie[];
  similarSeries: TMDBSeries[];
  movieCast: TMDBCast[];
  seriesCast: TMDBCast[];
  trendingMovies: TMDBMovie[];
  trendingSeries: TMDBSeries[];
  isLoading: boolean;
  error: string | null;
  
  fetchMovieDetails: (title: string, year?: string) => Promise<TmdbMovieDetails | null>;
  fetchSeriesDetails: (title: string, year?: string) => Promise<TmdbSeriesDetails | null>;
  fetchMovieById: (id: number) => Promise<TmdbMovieDetails | null>;
  fetchSeriesById: (id: number) => Promise<TmdbSeriesDetails | null>;
  fetchSimilarMovies: (movieId: number) => Promise<TMDBMovie[]>;
  fetchSimilarSeries: (seriesId: number) => Promise<TMDBSeries[]>;
  fetchTrendingMovies: (timeWindow?: 'day' | 'week') => Promise<TMDBMovie[]>;
  fetchTrendingSeries: (timeWindow?: 'day' | 'week') => Promise<TMDBSeries[]>;
  clearMovieDetails: () => void;
  clearSeriesDetails: () => void;
  clearAll: () => void;
}

export const useTmdbStore = create<TmdbState>((set) => ({
  movieDetails: null,
  seriesDetails: null,
  similarMovies: [],
  similarSeries: [],
  movieCast: [],
  seriesCast: [],
  trendingMovies: [],
  trendingSeries: [],
  isLoading: false,
  error: null,
  
  fetchMovieDetails: async (title: string, year?: string) => {
    try {
      set({ isLoading: true, error: null });
      
      // Search for the movie
      const searchResults = await tmdbService.searchMovies(title, year);
      
      if (searchResults.length === 0) {
        set({ 
          isLoading: false, 
          error: 'Movie not found',
          movieDetails: null
        });
        return null;
      }
      
      // Get the first result (most relevant)
      const movieId = searchResults[0].id;
      
      // Fetch detailed information
      const details = await tmdbService.getMovieDetails(movieId);
      
      // Extract cast if available
      const cast = details.credits?.cast || [];
      
      set({ 
        movieDetails: details,
        movieCast: cast,
        isLoading: false 
      });
      
      // Also fetch similar movies
      try {
        const similar = await tmdbService.getSimilarMovies(movieId);
        set({ similarMovies: similar });
      } catch (err) {
        console.error('Failed to fetch similar movies', err);
        set({ similarMovies: [] });
      }
      
      return details;
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch movie details',
        movieDetails: null,
        movieCast: [],
        similarMovies: []
      });
      return null;
    }
  },
  
  fetchMovieById: async (id: number) => {
    try {
      set({ isLoading: true, error: null });
      
      // Fetch detailed information
      const details = await tmdbService.getMovieDetails(id);
      
      // Extract cast if available
      const cast = details.credits?.cast || [];
      
      set({ 
        movieDetails: details,
        movieCast: cast,
        isLoading: false 
      });
      
      // Also fetch similar movies
      try {
        const similar = await tmdbService.getSimilarMovies(id);
        set({ similarMovies: similar });
      } catch (err) {
        console.error('Failed to fetch similar movies', err);
        set({ similarMovies: [] });
      }
      
      return details;
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch movie details',
        movieDetails: null,
        movieCast: [],
        similarMovies: []
      });
      return null;
    }
  },
  
  fetchSeriesDetails: async (title: string, year?: string) => {
    try {
      set({ isLoading: true, error: null });
      
      // Search for the series
      const searchResults = await tmdbService.searchSeries(title, year);
      
      if (searchResults.length === 0) {
        set({ 
          isLoading: false, 
          error: 'Series not found',
          seriesDetails: null
        });
        return null;
      }
      
      // Get the first result (most relevant)
      const seriesId = searchResults[0].id;
      
      // Fetch detailed information
      const details = await tmdbService.getSeriesDetails(seriesId);
      
      // Extract cast if available
      const cast = details.credits?.cast || [];
      
      set({ 
        seriesDetails: details,
        seriesCast: cast,
        isLoading: false 
      });
      
      // Also fetch similar series
      try {
        const similar = await tmdbService.getSimilarSeries(seriesId);
        set({ similarSeries: similar });
      } catch (err) {
        console.error('Failed to fetch similar series', err);
        set({ similarSeries: [] });
      }
      
      return details;
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch series details',
        seriesDetails: null,
        seriesCast: [],
        similarSeries: []
      });
      return null;
    }
  },
  
  fetchSeriesById: async (id: number) => {
    try {
      set({ isLoading: true, error: null });
      
      // Fetch detailed information
      const details = await tmdbService.getSeriesDetails(id);
      
      // Extract cast if available
      const cast = details.credits?.cast || [];
      
      set({ 
        seriesDetails: details,
        seriesCast: cast,
        isLoading: false 
      });
      
      // Also fetch similar series
      try {
        const similar = await tmdbService.getSimilarSeries(id);
        set({ similarSeries: similar });
      } catch (err) {
        console.error('Failed to fetch similar series', err);
        set({ similarSeries: [] });
      }
      
      return details;
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch series details',
        seriesDetails: null,
        seriesCast: [],
        similarSeries: []
      });
      return null;
    }
  },
  
  fetchSimilarMovies: async (movieId: number) => {
    try {
      const similar = await tmdbService.getSimilarMovies(movieId);
      set({ similarMovies: similar });
      return similar;
    } catch (error) {
      console.error('Failed to fetch similar movies', error);
      set({ similarMovies: [] });
      return [];
    }
  },
  
  fetchSimilarSeries: async (seriesId: number) => {
    try {
      const similar = await tmdbService.getSimilarSeries(seriesId);
      set({ similarSeries: similar });
      return similar;
    } catch (error) {
      console.error('Failed to fetch similar series', error);
      set({ similarSeries: [] });
      return [];
    }
  },
  
  clearMovieDetails: () => {
    set({ 
      movieDetails: null,
      movieCast: [],
      similarMovies: []
    });
  },
  
  clearSeriesDetails: () => {
    set({ 
      seriesDetails: null,
      seriesCast: [],
      similarSeries: []
    });
  },
  
  fetchTrendingMovies: async (timeWindow: 'day' | 'week' = 'week') => {
    try {
      const trending = await tmdbService.getTrendingMovies(timeWindow);
      set({ trendingMovies: trending });
      return trending;
    } catch (error) {
      console.error('Failed to fetch trending movies', error);
      set({ trendingMovies: [] });
      return [];
    }
  },
  
  fetchTrendingSeries: async (timeWindow: 'day' | 'week' = 'week') => {
    try {
      const trending = await tmdbService.getTrendingSeries(timeWindow);
      set({ trendingSeries: trending });
      return trending;
    } catch (error) {
      console.error('Failed to fetch trending series', error);
      set({ trendingSeries: [] });
      return [];
    }
  },
  
  clearAll: () => {
    set({
      movieDetails: null,
      seriesDetails: null,
      similarMovies: [],
      similarSeries: [],
      movieCast: [],
      seriesCast: [],
      error: null
    });
  },
}));