import Image from 'next/image';
import { fetchMovies } from '../../../utils/api';

export default async function MovieDetail({ params }) {
  const { id } = await params;
  const movie = await fetchMovies(`/movie/${id}`);

  return (
    <div className="p-4">
      <h1 className="text-2xl">{movie.title}</h1>
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        width={500}
        height={750}
      />
      <p>{movie.overview}</p>
    </div>
  );
}
