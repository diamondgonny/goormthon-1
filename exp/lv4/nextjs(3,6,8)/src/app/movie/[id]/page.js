import { fetchMovies } from '@/utils/api';
import MovieDetail from './MovieDetail';

export default async function MoviePage({ params }) {
  const { id } = await params;
  const initialData = await fetchMovies(`/movie/${id}`, 'ko');
  return <MovieDetail initialData={initialData} params={{ id }} />;
}
