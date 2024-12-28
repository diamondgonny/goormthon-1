'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { fetchMovies } from '@/utils/api';
import { useLanguage } from '@/context/LanguageContext';
import { Movie } from '@/types/movie';
import { LanguageType } from '@/types/language';

interface MovieDetailProps {
  initialData: Movie;
  params: {
    id: string;
  };
}

interface TextContent {
  [key: string]: {
    [K in LanguageType]: string;
  };
}

const texts: TextContent = {
  loading: {
    ko: '영화 정보를 불러오는 중...',
    en: 'Loading movie information...',
    ja: '映画情報を読み込んでいます...'
  },
  overview: {
    ko: '줄거리',
    en: 'Overview',
    ja: 'あらすじ'
  },
  noOverview: {
    ko: '줄거리 정보가 없습니다.',
    en: 'No overview available.',
    ja: 'あらすじは利用できません。'
  }
};

export default function MovieDetail({ initialData, params }: MovieDetailProps) {
  const { language } = useLanguage();
  const [movieData, setMovieData] = useState<Movie | null>(initialData);

  const getText = (key: keyof TextContent): string => {
    return texts[key][language] || texts[key]['ko'];
  };

  //언어 변경 대응
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMovies(`/movie/${params.id}`, language);
        setMovieData(data as Movie);
      } catch (error) {
        console.error('영화 데이터 로딩 중 오류:', error);
      }
    };
    fetchData();
  }, [language, params.id]);

  if (!movieData) return <div>{getText('loading')}</div>;

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
        <h2 className="text-xl font-semibold mb-2">{getText('overview')}</h2>
        <p className="text-lg leading-relaxed">
          {movieData.overview || getText('noOverview')}
        </p>
      </div>
    </div>
  );
}
