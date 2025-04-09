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

    @Get('genre/list')
    async getGenres() {
        return this.moviesService.getGenres();
    }
    @Get('now_playing')
    @ApiQuery({ name: 'language', required: false, type: String, example: 'fr-FR' })
    @ApiQuery({ name: 'region', required: false, type: String, example: 'FR' })
@   ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
    async getNowPlaying(@Query('language') language = 'fr-FR',
    @Query('region') region = 'FR',
    @Query('page') page = 1,
  ) {
    return this.moviesService.getNowPlaying(language, region, page);
    }

    @Get(':movieId')
    async getMovieById(@Query('movieId') movieId: string) {
        return this.moviesService.getMovieById(movieId);
    }
}
