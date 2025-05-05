import { create } from 'zustand';
import { 
  Category, 
  LiveStream, 
  Movie, 
  Series, 
  EPGProgram 
} from '../types';
import xtreamService from '../services/xtreamService';

interface ContentState {
  // Live TV
  liveCategories: Category[];
  liveStreams: LiveStream[];
  selectedLiveCategory: Category | null;
  currentEPG: Record<number, EPGProgram[]>;
  
  // Movies
  movieCategories: Category[];
  movies: Movie[];
  selectedMovieCategory: Category | null;
  
  // Series
  seriesCategories: Category[];
  seriesList: Series[];
  selectedSeriesCategory: Category | null;
  
  // Loading states
  isLoadingLive: boolean;
  isLoadingMovies: boolean;
  isLoadingSeries: boolean;
  isLoadingEPG: boolean;
  
  // Error states
  liveError: string | null;
  moviesError: string | null;
  seriesError: string | null;
  epgError: string | null;
  
  // Actions
  fetchLiveCategories: () => Promise<void>;
  fetchLiveStreams: (categoryId?: string) => Promise<void>;
  setSelectedLiveCategory: (category: Category | null) => void;
  fetchShortEPG: (streamId: number) => Promise<void>;
  
  fetchMovieCategories: () => Promise<void>;
  fetchMovies: (categoryId?: string) => Promise<void>;
  setSelectedMovieCategory: (category: Category | null) => void;
  
  fetchSeriesCategories: () => Promise<void>;
  fetchSeries: (categoryId?: string) => Promise<void>;
  setSelectedSeriesCategory: (category: Category | null) => void;
  
  clearContent: () => void;
}

const useContentStore = create<ContentState>((set, get) => ({
  // Initial states
  liveCategories: [],
  liveStreams: [],
  selectedLiveCategory: null,
  currentEPG: {},
  
  movieCategories: [],
  movies: [],
  selectedMovieCategory: null,
  
  seriesCategories: [],
  seriesList: [],
  selectedSeriesCategory: null,
  
  isLoadingLive: false,
  isLoadingMovies: false,
  isLoadingSeries: false,
  isLoadingEPG: false,
  
  liveError: null,
  moviesError: null,
  seriesError: null,
  epgError: null,
  
  // Live TV actions
  fetchLiveCategories: async () => {
    set({ isLoadingLive: true, liveError: null });
    try {
      const categories = await xtreamService.getLiveCategories();
      set({ liveCategories: categories, isLoadingLive: false });
    } catch (error) {
      set({ 
        isLoadingLive: false, 
        liveError: error instanceof Error ? error.message : 'Failed to fetch live categories' 
      });
    }
  },
  
  fetchLiveStreams: async (categoryId?: string) => {
    set({ isLoadingLive: true, liveError: null });
    try {
      const streams = await xtreamService.getLiveStreams(categoryId);
      set({ liveStreams: streams, isLoadingLive: false });
    } catch (error) {
      set({ 
        isLoadingLive: false, 
        liveError: error instanceof Error ? error.message : 'Failed to fetch live streams' 
      });
    }
  },
  
  setSelectedLiveCategory: (category: Category | null) => {
    set({ selectedLiveCategory: category });
    if (category) {
      get().fetchLiveStreams(category.category_id);
    } else {
      get().fetchLiveStreams();
    }
  },
  
  fetchShortEPG: async (streamId: number) => {
    set({ isLoadingEPG: true, epgError: null });
    try {
      const epg = await xtreamService.getShortEPG(streamId);
      set(state => ({ 
        currentEPG: { ...state.currentEPG, [streamId]: epg },
        isLoadingEPG: false 
      }));
    } catch (error) {
      set({ 
        isLoadingEPG: false, 
        epgError: error instanceof Error ? error.message : 'Failed to fetch EPG' 
      });
    }
  },
  
  // Movies actions
  fetchMovieCategories: async () => {
    set({ isLoadingMovies: true, moviesError: null });
    try {
      const categories = await xtreamService.getVodCategories();
      set({ movieCategories: categories, isLoadingMovies: false });
    } catch (error) {
      set({ 
        isLoadingMovies: false, 
        moviesError: error instanceof Error ? error.message : 'Failed to fetch movie categories' 
      });
    }
  },
  
  fetchMovies: async (categoryId?: string) => {
    set({ isLoadingMovies: true, moviesError: null });
    try {
      const movies = await xtreamService.getVodStreams(categoryId);
      set({ movies, isLoadingMovies: false });
    } catch (error) {
      set({ 
        isLoadingMovies: false, 
        moviesError: error instanceof Error ? error.message : 'Failed to fetch movies' 
      });
    }
  },
  
  setSelectedMovieCategory: (category: Category | null) => {
    set({ selectedMovieCategory: category });
    if (category) {
      get().fetchMovies(category.category_id);
    } else {
      get().fetchMovies();
    }
  },
  
  // Series actions
  fetchSeriesCategories: async () => {
    set({ isLoadingSeries: true, seriesError: null });
    try {
      const categories = await xtreamService.getSeriesCategories();
      set({ seriesCategories: categories, isLoadingSeries: false });
    } catch (error) {
      set({ 
        isLoadingSeries: false, 
        seriesError: error instanceof Error ? error.message : 'Failed to fetch series categories' 
      });
    }
  },
  
  fetchSeries: async (categoryId?: string) => {
    set({ isLoadingSeries: true, seriesError: null });
    try {
      const series = await xtreamService.getSeries(categoryId);
      set({ seriesList: series, isLoadingSeries: false });
    } catch (error) {
      set({ 
        isLoadingSeries: false, 
        seriesError: error instanceof Error ? error.message : 'Failed to fetch series' 
      });
    }
  },
  
  setSelectedSeriesCategory: (category: Category | null) => {
    set({ selectedSeriesCategory: category });
    if (category) {
      get().fetchSeries(category.category_id);
    } else {
      get().fetchSeries();
    }
  },
  
  // Clear all content (e.g., on logout)
  clearContent: () => {
    set({
      liveCategories: [],
      liveStreams: [],
      selectedLiveCategory: null,
      currentEPG: {},
      
      movieCategories: [],
      movies: [],
      selectedMovieCategory: null,
      
      seriesCategories: [],
      seriesList: [],
      selectedSeriesCategory: null,
      
      liveError: null,
      moviesError: null,
      seriesError: null,
      epgError: null
    });
  }
}));

export default useContentStore;