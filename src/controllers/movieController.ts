import { Request, Response, NextFunction } from 'express';
import { getMoviesByYear } from '../services/movieService';

const validateYear = (year: any): boolean => {
    if(!year) return false;
    const yearRegex = /^\d{4}$/;     //format in YYYY

    return yearRegex.test(year) && Number.isInteger(Number(year));
};

const validatePage = (page: any): boolean => {
    if (!page) return false;
    return Number.isInteger(Number(page)) && page > 0;
};

export const getMovies = async (req: Request, res: Response) => {
    const { year, page = 1 } = req.query;

    if (!validateYear(year)) {
        return res.status(400).json({ error: 'Year must be a valid integer in YYYY format' });
    }

    if (!validatePage(page)) {
        return res.status(400).json({ error: 'Page must be a positive integer' });
    }

    try {
        const movies = await getMoviesByYear(year as string, Number(page));
        res.status(200).json(movies);
    } catch (error) {
        console.error('Error in controller:', error);
        res.status(500).json({ error: 'Failed to fetch movies' });
    }
};