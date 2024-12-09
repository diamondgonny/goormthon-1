import React from 'react';

const MovieCard = ({ movie }) => (
    <div className="movie-card">
        <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            onError={(e) => {
                e.target.src = 'https://via.placeholder.com/500x750?text=No+Image+Available';
            }}
        />
        <h3>{movie.title}</h3>
        <p>{movie.release_date}</p>
        <p>평점: {movie.vote_average}</p>
    </div>
);

export default MovieCard; 
