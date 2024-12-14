import { fetchMovies } from '../../utils/api';
import MovieCard from '../../components/MovieCard';

async function PopularMovies() {
  const data = await fetchMovies('/movie/popular');
  const movies = data.results;

  return (
    <main className="h-full">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-white pt-8 pb-4">인기 영화</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 py-8">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default PopularMovies; 
