import { Inter } from 'next/font/google';
import './globals.css';
import NavBar from '@/components/client/NavBar';
import { LanguageProvider } from '@/context/LanguageContext';
import { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

interface RootLayoutProps {
  children: ReactNode;
}

// Line 15 const는 변수의 재할당을 막음 (객체 내의 값 변경은 가능)
// Line 18 as const는 객체 내의 모든 프로퍼티를 읽기 전용으로 선언
export const metadata = {
  title: 'Movie App',
  description: 'Next.js Movie Application',
} as const;

export default function RootLayout({ children }: RootLayoutProps) {
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
