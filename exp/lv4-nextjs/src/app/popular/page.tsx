import { fetchMovies } from '@/utils/api';
import PopularMovies from './PopularMovies';

export default async function PopularPage() {
  const initialMovies = await fetchMovies('/movie/popular', 'ko');

  return (
    <main className="h-full">
      <PopularMovies initialMovies={initialMovies.results} />
    </main>
  );
}
