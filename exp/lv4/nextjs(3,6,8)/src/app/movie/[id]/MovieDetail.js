'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { fetchMovies } from '@/utils/api';
import { useLanguage } from '@/context/LanguageContext';

export default function MovieDetail({ initialData, params }) {
  const { language } = useLanguage();
  const [movieData, setMovieData] = useState(initialData);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const data = await fetchMovies(`/movie/${params.id}`, language === 'ko' ? 'ko' : 'en');
        if (isMounted) {
          setMovieData(data);
        }
      } catch (error) {
        console.error('영화 데이터 로딩 중 오류:', error);
      }
    };
    fetchData();

    return () => {
      isMounted = false;
    };
  }, [language, params.id]);

  if (!movieData) return <div>{language === 'ko' ? '영화 정보를 불러오는 중...' : 'Loading movie information...'}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{movieData.title}</h1>
      {movieData.poster_path && (
        <div className="mb-4">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
            alt={movieData.title}
            width={400}
            height={600}
            priority={true}
            className="w-[400px] h-[600px] rounded-lg object-cover"
          />
        </div>
      )}
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">{language === 'ko' ? '줄거리' : 'Overview'}</h2>
        <p className="text-lg leading-relaxed">
          {movieData.overview || (language === 'ko' ? '줄거리 정보가 없습니다.' : 'No overview available.')}
        </p>
      </div>
    </div>
  );
}
