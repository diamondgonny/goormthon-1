import Link from 'next/link';
import Image from 'next/image';

export default function MovieCard({ movie }) {
  return (
    <div className="w-full max-w-[200px] mx-auto bg-gray-800 shadow-sm rounded-lg">
      <Link href={`/movie/${movie.id}`}>
        <div className="relative">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={200}
            height={300}
            className="w-[200px] h-[300px] rounded-t-lg"
          />
        </div>
        <div className="p-3">
          <h2 className="text-sm font-medium text-gray-200">{movie.title}</h2>
          <p className="text-xs text-gray-400 mt-1">
            ⭐ {movie.vote_average.toFixed(1)}
          </p>
        </div>
      </Link>
    </div>
  )
}
