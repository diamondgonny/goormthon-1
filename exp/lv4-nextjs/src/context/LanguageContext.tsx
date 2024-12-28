'use client';

// ReactNode는 JSX 요소, 문자열, 숫자, null 등 React에서 렌더링 가능한 모든 타입을 포함
import { createContext, useContext, useState, type ReactNode } from 'react';
import { LanguageType } from '@/types/language';

interface LanguageContextType {
  language: LanguageType;
  setLanguage: (language: LanguageType) => void;
}

interface LanguageProviderProps {
  children: ReactNode;  // children prop의 타입을 ReactNode로 지정
}

const defaultLanguageContext: LanguageContextType = {
  language: 'ko',
  setLanguage: () => {
    throw new Error('setLanguage function must be used within LanguageProvider');
  },
};

// 1) Context 생성 - 모듈이 처음 로드될 때 생성
const LanguageContext = createContext<LanguageContextType>(defaultLanguageContext);

// 2) Context Provider 생성 - 내부의 실제 상태값으로 적용
export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<LanguageType>('ko');

  // 언어설정(language), 언어변경함수(setLanguage)를 자식 컴포넌트들이 사용할 수 있게 함
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

// 3) 커스텀 훅 사용
export function useLanguage(): LanguageContextType {
  return useContext(LanguageContext);
} 
