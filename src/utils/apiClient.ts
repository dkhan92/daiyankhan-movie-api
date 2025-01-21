import axios from 'axios';
import dotenv from 'dotenv';

//load environment variables
dotenv.config();

//create Axios client with default configuration
const apiClient = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
    },
});

export default apiClient;