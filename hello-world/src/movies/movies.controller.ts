import { Controller,Get,Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { ApiQuery} from '@nestjs/swagger';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {}

    @Get()
    @ApiQuery({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'sort_by', required: false, type: String })
    @ApiQuery({ name: 'search', required: false, type: String })
    async getMovies(
        @Query('page') page?: number,
        @Query('sort_by') sort_by?: string,
        @Query('search') search?: string,
    ){
        if(search){
            return this.moviesService.searchMovies(search, page);
        }
        return this.moviesService.discoverMovies({ page, sort_by});
        }

    @Get(':movieId')
    async getMovieById(@Query('movieId') movieId: string) {
        return this.moviesService.getMovieById(movieId);
    }

    @Get('genre/list')
    async getGenres() {
        return this.moviesService.getGenres();
    }

    async getNowPlaying() {
        return this.moviesService.getNowPlaying();
    }
}
