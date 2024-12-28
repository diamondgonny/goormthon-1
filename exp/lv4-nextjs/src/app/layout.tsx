import { Inter } from 'next/font/google';
import './globals.css';
import NavBar from '@/components/client/NavBar';
import { LanguageProvider } from '@/context/LanguageContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Movie App',
  description: 'Next.js Movie Application',
};

export default function RootLayout({ children }) {
  // Next.js의 파일 시스템 기반 라우팅 시스템이 children에 알맞은 컴포넌트를 렌더링
  // 찾은 page.js 컴포넌트를 가장 가까운 상위 layout.js의 children으로 자동 주입함
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          <NavBar />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
