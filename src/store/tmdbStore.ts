import { create } from 'zustand';
import { tmdbService } from '../services';
import { TmdbMovieDetails, TmdbSeriesDetails } from '../types';

interface TmdbState {
  movieDetails: TmdbMovieDetails | null;
  seriesDetails: TmdbSeriesDetails | null;
  isLoading: boolean;
  error: string | null;
  
  fetchMovieDetails: (title: string, year?: string) => Promise<void>;
  fetchSeriesDetails: (title: string, year?: string) => Promise<void>;
  clearMovieDetails: () => void;
  clearSeriesDetails: () => void;
}

export const useTmdbStore = create<TmdbState>((set) => ({
  movieDetails: null,
  seriesDetails: null,
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
        return;
      }
      
      // Get the first result (most relevant)
      const movieId = searchResults[0].id;
      
      // Fetch detailed information
      const details = await tmdbService.getMovieDetails(movieId);
      
      set({ 
        movieDetails: details,
        isLoading: false 
      });
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch movie details',
        movieDetails: null
      });
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
        return;
      }
      
      // Get the first result (most relevant)
      const seriesId = searchResults[0].id;
      
      // Fetch detailed information
      const details = await tmdbService.getSeriesDetails(seriesId);
      
      set({ 
        seriesDetails: details,
        isLoading: false 
      });
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch series details',
        seriesDetails: null
      });
    }
  },
  
  clearMovieDetails: () => {
    set({ movieDetails: null });
  },
  
  clearSeriesDetails: () => {
    set({ seriesDetails: null });
  },
}));