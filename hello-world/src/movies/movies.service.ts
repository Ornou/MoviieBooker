import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import * as https from 'https';

@Injectable()
export class MoviesService {
    private readonly axiosInstance: AxiosInstance;

    constructor(private readonly configService: ConfigService) {
      const baseURL = this.configService.get<string>('TMDB_BASE_URL');
      const token = this.configService.get<string>('TMDB_READ_ACCESS_TOKEN');
      this.axiosInstance = axios.create({
        baseURL,
        params: {
          api_key: this.configService.get<string>('TMDB_API_KEY'),
        },
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
        }),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    async discoverMovies(params: { page?: number; sort_by?: string; with_genres?: string }): Promise<any> {
      try {
        const response = await this.axiosInstance.get('/discover/movie', { params });
        return response.data;
      } catch (err) {
        console.error('Erreur TMDB :', err.message);
        return null;
      }
    }
  
    async searchMovies(query: string, page?: number): Promise<any> {
      try {
        const response = await this.axiosInstance.get('/search/movie', {
          params: {
            query,
            page
          },
        });
        return response.data;
      } catch (err) {
        console.error('Erreur TMDB :', err.message);
        return null;
      }
    }

    async getMovieById(movieId: string): Promise<any> {
      try {
        const response = await this.axiosInstance.get(`/movie/${movieId}`);
        return response.data;
      } catch (err) {
        console.error('Erreur TMDB :', err.message);
        return null;
      }
    }
    async getGenres(): Promise<any> {
      try {
        const response = await this.axiosInstance.get('/genre/movie/list');
        return response.data;
      } catch (err) {
        console.error('Erreur TMDB :', err.message);
        return null;
      }
    }

    async getNowPlaying(): Promise<any> {
      try {
        const response = await this.axiosInstance.get('/movie/now_playing');
        return response.data;
      } catch (err) {
        console.error('Erreur TMDB :', err.message);
        return null;
      }
    }

}
