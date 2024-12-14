import { fetchSearchMovies } from '../../utils/api';
import MovieCard from '../../components/MovieCard';

async function SearchPage({ searchParams }) {
  const { query } = await searchParams;
  const data = await fetchSearchMovies(query);
  const movies = data.results;

  return (
    <main className="h-full">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-white pt-8 pb-4">
          &quot;{query}&quot; 검색 결과
        </h1>
        {movies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 py-8">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <p className="text-white text-center py-8">검색 결과가 없습니다.</p>
        )}
      </div>
    </main>
  );
}

export default SearchPage; 
