'use client';

import SearchBar from '@/components/client/SearchBar';
import { useLanguage } from '@/context/LanguageContext';
import { LanguageType } from '@/types/language';

interface TitleText {
  [key: string]: {
    [K in LanguageType]: string;
  };
}

export default function Home() {
  const { language } = useLanguage();

  const getText = (key: keyof TitleText): string => {
    const texts: TitleText = {
      title: {
        ko: '영화 검색',
        en: 'Movie Search',
        ja: '映画検索'
      }
    };
    return texts[key][language as LanguageType] || texts[key]['ko'];
  };

  return (
    <main className="h-full">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center space-y-6">
          <h1 className="text-4xl font-bold text-white">
            {getText('title')}
          </h1>
          <SearchBar />
        </div>
      </div>
    </main>
  );
}
