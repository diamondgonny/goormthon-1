'use client';

import SearchBar from '../components/SearchBar';
import { useLanguage } from '../context/LanguageContext';

export default function Home() {
  const { language } = useLanguage();

  return (
    <main className="h-full">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center space-y-6">
          <h1 className="text-4xl font-bold text-white">
            {language === 'ko' ? '영화 검색' : 'Movie Search'}
          </h1>
          <SearchBar />
        </div>
      </div>
    </main>
  );
}
