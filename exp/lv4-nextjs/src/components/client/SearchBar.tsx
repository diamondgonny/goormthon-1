'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { LanguageType } from '@/types/language';

interface SearchFormProps {
  query: string;
  onQueryChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  language: LanguageType;
}

interface TextContent {
  [key: string]: {
    [K in LanguageType]: string;
  };
}

// 검색 폼 UI 렌더링을 담당하는 컴포넌트
function SearchForm({ query, onQueryChange, onSubmit, language }: SearchFormProps) {
  const getText = (key: keyof TextContent): string => {
    const texts: TextContent = {
      placeholder: {
        ko: "영화 제목을 입력하세요...",
        en: "Search for a movie...",
        ja: "映画のタイトルを入力してください..."
      },
      search: {
        ko: "검색",
        en: "Search",
        ja: "検索"
      }
    };
    return texts[key][language] || texts[key]['ko'];
  };

  return (
    <form onSubmit={onSubmit} className="w-full max-w-2xl">
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={onQueryChange}
          placeholder={getText('placeholder')}
          className="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {getText('search')}
        </button>
      </div>
    </form>
  );
}

// 검색 폼 로직을 담당하는 컴포넌트
export default function SearchBar() {
  const [query, setQuery] = useState<string>('');
  const { language } = useLanguage();
  const router = useRouter();  // 주로 페이지 이동 기능

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query)}`);  // 동적 라우팅
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
