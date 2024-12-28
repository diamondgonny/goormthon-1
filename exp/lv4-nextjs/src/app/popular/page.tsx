import { fetchMovies } from '@/utils/api';
import PopularMovies from './PopularMovies';
import { Movie } from '@/types/movie';

interface MovieResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}

export default async function PopularPage() {
  const initialMovies = await fetchMovies('/movie/popular', 'ko') as MovieResponse;

  return (
    <main className="h-full">
      <PopularMovies initialMovies={initialMovies.results} />
    </main>
  );
}
