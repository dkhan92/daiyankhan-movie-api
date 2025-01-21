import apiClient from '../utils/apiClient';

interface Movie {
    title: string;
    release_date: string;
    vote_average: number;
    editors: string[];
}

//fetch movies by year and page
export const getMoviesByYear = async (year: string, page: number): Promise<Movie[]> => {
    try {
        // Fallback to page 1 if the page is invalid
        if (!Number.isInteger(page) || page < 1 || page > 500) {
            console.warn(`Invalid page number (${page}). Defaulting to page 1.`);
            page = 1;
        }

        const response = await apiClient.get('/discover/movie', {
            params: {
                language: 'en-US',
                page,
                primary_release_year: year,
                sort_by: 'popularity.desc',
            },
        });

        const movies = response.data.results;

        const movieDetails: Movie[] = [];

        for (const movie of movies) {
            let editors: string[] = [];

            try {
                //fetch editors for the current movie
                editors = await getEditors(movie.id);
            } catch (error) {
                console.error(`Failed to fetch editors for movie ${movie.id}: ${error}`);
                //fallbackto empty array if fetching editors fails
            }

            const movieDetail: Movie = {
                title: movie.title,
                release_date: movie.release_date,
                vote_average: movie.vote_average,
                editors,
            };
            // console.log('Movie Detail:', movieDetail);
            movieDetails.push(movieDetail);
        }

        return movieDetails;
    } catch (error) {
        console.error('Error in fetching movies:', error);
        throw new Error('API has failed to fetch movies');
    }
};

//Get editors
export const getEditors = async (movieId: number): Promise<string[]> => {
    try {
        const response = await apiClient.get(`/movie/${movieId}/credits`);
        const crews = response.data.crew;
        const editors: string[] = [];

        for (const crew of crews) {
            if (crew.known_for_department === 'Editing') {
                editors.push(crew.name);
            }
        }

        // console.log(`Editors for movie ID ${movieId}:`, editors);
        return editors;
    } catch (error) {
        console.error(`error fetching editors for movie ${movieId}:`, error);
        return [];
    }
};