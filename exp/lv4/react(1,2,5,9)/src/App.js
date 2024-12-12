import React, { useState, useEffect } from 'react';
import { movieAPI } from './api/requests';
import SearchBar from './components/SearchBar';
import MovieCard from './components/MovieCard';
import StatusMessage from './components/StatusMessage';
import './styles/common.css';

function App() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPopularMovies = async () => {
            setLoading(true);
            try {
                const data = await movieAPI.getPopularMovies();
                setMovies(data.results);
            } catch (err) {
                setError("영화 목록을 불러오는 중 문제가 발생했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchPopularMovies();
    }, []);

    const handleSearch = async (searchTerm) => {
        if (!searchTerm.trim()) {
            setMovies([]);
            return;
        }

        setLoading(true);
        try {
            const data = await movieAPI.searchMovies(searchTerm, 1);
            setMovies(data.results);
        } catch (err) {
            setError("영화 검색 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <StatusMessage>영화를 검색중입니다...</StatusMessage>;
    if (error) return <StatusMessage>{error}</StatusMessage>;

    return (
        <div className="app">
            <div className="search-sort-container">
                <SearchBar onSearch={handleSearch} />
            </div>
            <div className="movies-grid">
                {movies.map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
}

export default App;
