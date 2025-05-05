import axios from 'axios';
import { TMDBMovie, TMDBSeries, TMDBCast } from '../types';

class TMDBService {
  private readonly API_KEY = '42125c682636b68d10d70b487c692685';
  private readonly ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MjEyNWM2ODI2MzZiNjhkMTBkNzBiNDg3YzY5MjY4NSIsIm5iZiI6MS42NDM4MjA2NjA2OTUwMDAyZSs5LCJzdWIiOiI2MWZhYjY3NGI3YWJiNTAwNjY1YWQ4MzAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.e06dzH5trScMiz7obFbCFip5dO1XQp-bUC3lecJ8sxU';
  private readonly BASE_URL = 'https://api.themoviedb.org/3';
  private readonly IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

  private api = axios.create({
    baseURL: this.BASE_URL,
    headers: {
      Authorization: `Bearer ${this.ACCESS_TOKEN}`,
      'Content-Type': 'application/json;charset=utf-8',
    },
  });

  // Helper method to get image URL with appropriate size
  public getImageUrl(path: string | null, size: 'original' | 'w500' | 'w300' | 'w185' = 'w500'): string | null {
    if (!path) return null;
    return `${this.IMAGE_BASE_URL}/${size}${path}`;
  }

  // Search for movies
  public async searchMovies(query: string, language: string = 'tr-TR'): Promise<TMDBMovie[]> {
    try {
      const response = await this.api.get('/search/movie', {
        params: {
          query,
          language,
          include_adult: false,
        },
      });
      return response.data.results;
    } catch (error) {
      console.error('TMDB search movies error:', error);
      throw new Error('Failed to search for movies.');
    }
  }

  // Search for TV shows
  public async searchTVShows(query: string, language: string = 'tr-TR'): Promise<TMDBSeries[]> {
    try {
      const response = await this.api.get('/search/tv', {
        params: {
          query,
          language,
          include_adult: false,
        },
      });
      return response.data.results;
    } catch (error) {
      console.error('TMDB search TV shows error:', error);
      throw new Error('Failed to search for TV shows.');
    }
  }

  // Get movie details
  public async getMovieDetails(movieId: number, language: string = 'tr-TR'): Promise<TMDBMovie> {
    try {
      const response = await this.api.get(`/movie/${movieId}`, {
        params: {
          language,
          append_to_response: 'credits,videos,external_ids',
        },
      });
      return response.data;
    } catch (error) {
      console.error('TMDB get movie details error:', error);
      throw new Error('Failed to get movie details.');
    }
  }

  // Get TV show details
  public async getTVShowDetails(tvId: number, language: string = 'tr-TR'): Promise<TMDBSeries> {
    try {
      const response = await this.api.get(`/tv/${tvId}`, {
        params: {
          language,
          append_to_response: 'credits,videos,external_ids',
        },
      });
      return response.data;
    } catch (error) {
      console.error('TMDB get TV show details error:', error);
      throw new Error('Failed to get TV show details.');
    }
  }

  // Get movie cast
  public async getMovieCast(movieId: number, language: string = 'tr-TR'): Promise<TMDBCast[]> {
    try {
      const response = await this.api.get(`/movie/${movieId}/credits`, {
        params: {
          language,
        },
      });
      return response.data.cast.slice(0, 10); // Return only the first 10 cast members
    } catch (error) {
      console.error('TMDB get movie cast error:', error);
      throw new Error('Failed to get movie cast.');
    }
  }

  // Get TV show cast
  public async getTVShowCast(tvId: number, language: string = 'tr-TR'): Promise<TMDBCast[]> {
    try {
      const response = await this.api.get(`/tv/${tvId}/credits`, {
        params: {
          language,
        },
      });
      return response.data.cast.slice(0, 10); // Return only the first 10 cast members
    } catch (error) {
      console.error('TMDB get TV show cast error:', error);
      throw new Error('Failed to get TV show cast.');
    }
  }

  // Get movie videos (trailers)
  public async getMovieVideos(movieId: number, language: string = 'tr-TR'): Promise<any[]> {
    try {
      const response = await this.api.get(`/movie/${movieId}/videos`, {
        params: {
          language,
        },
      });
      return response.data.results;
    } catch (error) {
      console.error('TMDB get movie videos error:', error);
      throw new Error('Failed to get movie videos.');
    }
  }

  // Get TV show videos (trailers)
  public async getTVShowVideos(tvId: number, language: string = 'tr-TR'): Promise<any[]> {
    try {
      const response = await this.api.get(`/tv/${tvId}/videos`, {
        params: {
          language,
        },
      });
      return response.data.results;
    } catch (error) {
      console.error('TMDB get TV show videos error:', error);
      throw new Error('Failed to get TV show videos.');
    }
  }

  // Get similar movies
  public async getSimilarMovies(movieId: number, language: string = 'tr-TR'): Promise<TMDBMovie[]> {
    try {
      const response = await this.api.get(`/movie/${movieId}/similar`, {
        params: {
          language,
        },
      });
      return response.data.results;
    } catch (error) {
      console.error('TMDB get similar movies error:', error);
      throw new Error('Failed to get similar movies.');
    }
  }

  // Get similar TV shows
  public async getSimilarTVShows(tvId: number, language: string = 'tr-TR'): Promise<TMDBSeries[]> {
    try {
      const response = await this.api.get(`/tv/${tvId}/similar`, {
        params: {
          language,
        },
      });
      return response.data.results;
    } catch (error) {
      console.error('TMDB get similar TV shows error:', error);
      throw new Error('Failed to get similar TV shows.');
    }
  }
}

// Create a singleton instance
const tmdbService = new TMDBService();
export default tmdbService;