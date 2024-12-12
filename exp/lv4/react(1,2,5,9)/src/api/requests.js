import axios from './axios';

export const movieAPI = {
    getPopularMovies: async () => {
        try {
            const response = await axios.get('/movie/popular', {
                params: {
                    language: 'ko-KR',
                    page: 1
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching popular movies:', error);
            throw error;
        }
    },
    searchMovies: async (query, page = 1, sortBy = 'popularity.desc') => {
        try {
            const response = await axios.get(`/search/movie`, {
                params: {
                    query: query,
                    language: 'ko-KR',
                    page: page,
                    sort_by: sortBy
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error searching movies:', error);
            throw error;
        }
    }
};
