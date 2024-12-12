import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: process.env.REACT_APP_TMDB_API_KEY,
    },
    headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`,
        'Content-Type': 'application/json;charset=utf-8',
    },
});

export default instance;
