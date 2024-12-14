'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../context/LanguageContext';

// 검색 폼 UI 렌더링을 담당하는 컴포넌트
function SearchForm({ query, onQueryChange, onSubmit, language }) {
  return (
    <form onSubmit={onSubmit} className="w-full max-w-2xl">
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={onQueryChange}
          placeholder={language === 'ko' ? "영화 제목을 입력하세요..." : "Search for a movie..."}
          className="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {language === 'ko' ? '검색' : 'Search'}
        </button>
      </div>
    </form>
  );
}

// 검색 폼 로직을 담당하는 컴포넌트
export default function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const { language } = useLanguage();

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <SearchForm
      query={query}
      onQueryChange={handleQueryChange}
      onSubmit={handleSubmit}
      language={language}
    />
  );
} 
