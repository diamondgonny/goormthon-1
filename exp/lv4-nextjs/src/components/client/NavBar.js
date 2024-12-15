'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function NavBar() {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const getNavText = (key) => {
    const texts = {
      home: {
        ko: '홈',
        en: 'Home',
        ja: 'ホーム'
      },
      popular: {
        ko: '인기영화',
        en: 'Popular Movies',
        ja: '人気映画'
      }
    };
    return texts[key][language] || texts[key]['ko'];
  };

  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-white">Movie App</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/" className="text-gray-300 hover:text-white px-3 py-2">
              {getNavText('home')}
            </Link>
            <Link href="/popular" className="text-gray-300 hover:text-white px-3 py-2">
              {getNavText('popular')}
            </Link>
            <select
              value={language}
              onChange={handleLanguageChange}
              className="bg-gray-700 text-white rounded-md px-2 py-1 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ko">한국어</option>
              <option value="en">English</option>
              <option value="ja">日本語</option>
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
}
