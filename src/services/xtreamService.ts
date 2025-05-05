import axios from 'axios';
import { 
  Category, 
  LiveStream, 
  Movie, 
  Series, 
  Season, 
  Episode, 
  EPGProgram,
  UserProfile
} from '../types';

class XtreamService {
  private baseUrl: string = '';
  private username: string = '';
  private password: string = '';
  private isAuthenticated: boolean = false;

  constructor() {
    // Try to load credentials from localStorage
    this.loadCredentials();
  }

  private loadCredentials(): void {
    const credentials = localStorage.getItem('xtream_credentials');
    if (credentials) {
      const { server, username, password } = JSON.parse(credentials);
      this.baseUrl = server;
      this.username = username;
      this.password = password;
      this.isAuthenticated = true;
    }
  }

  public saveCredentials(server: string, username: string, password: string): void {
    localStorage.setItem('xtream_credentials', JSON.stringify({ server, username, password }));
    this.baseUrl = server;
    this.username = username;
    this.password = password;
    this.isAuthenticated = true;
  }

  public clearCredentials(): void {
    localStorage.removeItem('xtream_credentials');
    this.baseUrl = '';
    this.username = '';
    this.password = '';
    this.isAuthenticated = false;
  }

  public isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  private getApiUrl(action: string, params: Record<string, string | number> = {}): string {
    const baseApiUrl = `${this.baseUrl}/player_api.php?username=${this.username}&password=${this.password}`;
    const actionParam = action ? `&action=${action}` : '';
    
    const queryParams = Object.entries(params)
      .map(([key, value]) => `&${key}=${value}`)
      .join('');
    
    return `${baseApiUrl}${actionParam}${queryParams}`;
  }

  // Authentication and User Profile
  public async authenticate(server: string, username: string, password: string): Promise<UserProfile> {
    try {
      const url = `${server}/player_api.php?username=${username}&password=${password}`;
      const response = await axios.get(url);
      
      if (response.data.user_info) {
        this.saveCredentials(server, username, password);
        return response.data.user_info as UserProfile;
      }
      
      throw new Error('Authentication failed');
    } catch (error) {
      console.error('Authentication error:', error);
      throw new Error('Failed to authenticate. Please check your credentials.');
    }
  }

  public async getUserInfo(): Promise<UserProfile> {
    try {
      if (!this.isAuthenticated) {
        throw new Error('Not authenticated');
      }
      
      const url = this.getApiUrl('');
      const response = await axios.get(url);
      
      if (response.data.user_info) {
        return response.data.user_info as UserProfile;
      }
      
      throw new Error('Failed to get user info');
    } catch (error) {
      console.error('Get user info error:', error);
      throw new Error('Failed to get user information.');
    }
  }

  // Live TV Methods
  public async getLiveCategories(): Promise<Category[]> {
    try {
      const url = this.getApiUrl('get_live_categories');
      const response = await axios.get(url);
      return response.data as Category[];
    } catch (error) {
      console.error('Get live categories error:', error);
      throw new Error('Failed to get live TV categories.');
    }
  }

  public async getLiveStreams(categoryId?: string): Promise<LiveStream[]> {
    try {
      const params: Record<string, string | number> = {};
      if (categoryId) {
        params.category_id = categoryId;
      }
      
      const url = this.getApiUrl('get_live_streams', params);
      const response = await axios.get(url);
      return response.data as LiveStream[];
    } catch (error) {
      console.error('Get live streams error:', error);
      throw new Error('Failed to get live streams.');
    }
  }

  // VOD (Movies) Methods
  public async getVodCategories(): Promise<Category[]> {
    try {
      const url = this.getApiUrl('get_vod_categories');
      const response = await axios.get(url);
      return response.data as Category[];
    } catch (error) {
      console.error('Get VOD categories error:', error);
      throw new Error('Failed to get movie categories.');
    }
  }

  public async getVodStreams(categoryId?: string): Promise<Movie[]> {
    try {
      const params: Record<string, string | number> = {};
      if (categoryId) {
        params.category_id = categoryId;
      }
      
      const url = this.getApiUrl('get_vod_streams', params);
      const response = await axios.get(url);
      return response.data as Movie[];
    } catch (error) {
      console.error('Get VOD streams error:', error);
      throw new Error('Failed to get movies.');
    }
  }

  public async getVodInfo(vodId: number): Promise<Movie> {
    try {
      const url = this.getApiUrl('get_vod_info', { vod_id: vodId });
      const response = await axios.get(url);
      return response.data.info as Movie;
    } catch (error) {
      console.error('Get VOD info error:', error);
      throw new Error('Failed to get movie information.');
    }
  }

  // Series Methods
  public async getSeriesCategories(): Promise<Category[]> {
    try {
      const url = this.getApiUrl('get_series_categories');
      const response = await axios.get(url);
      return response.data as Category[];
    } catch (error) {
      console.error('Get series categories error:', error);
      throw new Error('Failed to get series categories.');
    }
  }

  public async getSeries(categoryId?: string): Promise<Series[]> {
    try {
      const params: Record<string, string | number> = {};
      if (categoryId) {
        params.category_id = categoryId;
      }
      
      const url = this.getApiUrl('get_series', params);
      const response = await axios.get(url);
      return response.data as Series[];
    } catch (error) {
      console.error('Get series error:', error);
      throw new Error('Failed to get series.');
    }
  }

  public async getSeriesInfo(seriesId: number): Promise<{ info: Series; episodes: Record<string, Episode[]> }> {
    try {
      const url = this.getApiUrl('get_series_info', { series_id: seriesId });
      const response = await axios.get(url);
      return {
        info: response.data.info as Series,
        episodes: response.data.episodes as Record<string, Episode[]>
      };
    } catch (error) {
      console.error('Get series info error:', error);
      throw new Error('Failed to get series information.');
    }
  }

  // EPG Methods
  public async getShortEPG(streamId: number, limit: number = 2): Promise<EPGProgram[]> {
    try {
      const url = this.getApiUrl('get_short_epg', { stream_id: streamId, limit });
      const response = await axios.get(url);
      return response.data.epg_listings as EPGProgram[];
    } catch (error) {
      console.error('Get short EPG error:', error);
      throw new Error('Failed to get EPG information.');
    }
  }

  public async getEPG(streamId: number): Promise<EPGProgram[]> {
    try {
      const url = this.getApiUrl('get_simple_data_table', { stream_id: streamId });
      const response = await axios.get(url);
      return response.data.epg_listings as EPGProgram[];
    } catch (error) {
      console.error('Get EPG error:', error);
      throw new Error('Failed to get EPG information.');
    }
  }

  // Stream URL Generators
  public getLiveStreamUrl(streamId: number): string {
    return `${this.baseUrl}/live/${this.username}/${this.password}/${streamId}.ts`;
  }

  public getVodStreamUrl(vodId: number): string {
    return `${this.baseUrl}/movie/${this.username}/${this.password}/${vodId}.mp4`;
  }

  public getSeriesStreamUrl(episodeId: number): string {
    return `${this.baseUrl}/series/${this.username}/${this.password}/${episodeId}.mp4`;
  }

  // XMLTV EPG
  public getXmltvUrl(): string {
    return `${this.baseUrl}/xmltv.php?username=${this.username}&password=${this.password}`;
  }
}

// Create a singleton instance
const xtreamService = new XtreamService();
export default xtreamService;