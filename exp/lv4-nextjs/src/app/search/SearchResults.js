'use client';

import { useEffect, useState } from 'react';
import { fetchSearchMovies } from '@/utils/api';
import { useLanguage } from '@/context/LanguageContext';
import MovieCard from '@/components/client/MovieCard';

// 검색 결과 UI 렌더링을 담당하는 컴포넌트
function SearchResultsView({ query, movies, language }) {
  const getText = (key) => {
    const texts = {
      searchResults: {
        ko: '검색 결과',
        en: 'Search Results',
        ja: '検索結果'
      },
      noResults: {
        ko: '검색 결과가 없습니다.',
        en: 'No search results found.',
        ja: '検索結果が見つかりませんでした。'
      }
    };
    return texts[key][language] || texts[key]['ko'];
  };

  return (
    <main className="h-full">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-white pt-8 pb-4">
          &quot;{query}&quot; {getText('searchResults')}
        </h1>
        {movies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 py-8">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <p className="text-white text-center py-8">
            {getText('noResults')}
          </p>
        )}
      </div>
    </main>
  );
}

// 검색 결과 데이터 관리를 담당하는 컴포넌트
export default function SearchResults({ initialQuery }) {
  const { language } = useLanguage();
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState(initialQuery);

  // 예: URL이 /search?q=아바타 에서 /search?q=매트릭스 로 변경될 때
  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  // query 값이 변경될 때마다 API를 호출하여 검색 결과를 가져오게 됨
  useEffect(() => {
    const fetchData = async () => {
      if (query) {
        const data = await fetchSearchMovies(query, language);
        setMovies(data.results);
      }
    };
    fetchData();
  }, [query, language]);

  return <SearchResultsView query={query} movies={movies} language={language} />;
}
