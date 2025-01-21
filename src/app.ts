import express from 'express';
import { getMovies } from './controllers/movieController';

const app = express();

app.get('/movies', async (req, res) => {
    try {
        await getMovies(req, res);
    } catch (error) {
        console.error('Unhandled error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default app;