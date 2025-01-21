import { getMoviesByYear, getEditors } from '../src/services/movieService';

describe('Movie Fetching API Service', () => {
    it('should fetch movies by year', async () => {
        const movies = await getMoviesByYear('2021', 1);
        expect(movies).toBeDefined();
        expect(movies.length).toBeGreaterThan(0);
    });

    it('should fetch editors for a movie', async () => {
        const editors = await getEditors(475557); // Example movie ID for "Joker"
        expect(editors).toBeDefined();
        expect(editors).toBeInstanceOf(Array);
    });

    it('should return an empty array if no movies are found for the year', async () => {
        const movies = await getMoviesByYear('1800', 1); // Year with no movies
        expect(movies).toBeDefined();
        expect(movies.length).toBe(0);
    });

    it('should handle invalid year format', async () => {
        try {
            await getMoviesByYear('abcd', 1);
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

});