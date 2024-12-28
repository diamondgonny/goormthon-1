'use client';

import { useEffect, useState } from 'react';
import { fetchMovies } from '@/utils/api';
import { useLanguage } from '@/context/LanguageContext';
import MovieCard from '@/components/client/MovieCard';
import { Movie } from '@/types/movie';
import { LanguageType } from '@/types/language';

interface PopularMoviesProps {
  initialMovies: Movie[];
}

interface TextContent {
  [key: string]: {
    [K in LanguageType]: string;
  };
}

const texts: TextContent = {
  title: {
    ko: '인기 영화',
    en: 'Popular Movies',
    ja: '人気映画'
  }
};

export default function PopularMovies({ initialMovies }: PopularMoviesProps) {
  const { language } = useLanguage();
  const [movies, setMovies] = useState<Movie[]>(initialMovies);

  const getText = (key: keyof TextContent): string => {
    return texts[key][language] || texts[key]['ko'];
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMovies('/movie/popular', language);
        setMovies((data as { results: Movie[] }).results);
      } catch (error) {
        console.error('인기 영화 데이터 로딩 중 오류:', error);
      }
    };
    fetchData();
  }, [language]);

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-2xl font-bold text-white pt-8 pb-4">
        {getText('title')}
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 py-8">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
