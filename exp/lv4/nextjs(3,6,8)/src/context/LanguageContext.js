'use client';

import { createContext, useContext, useState } from 'react';

// 1) Context 생성
const LanguageContext = createContext();

// 2) Context Provider 생성
export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('ko');

  // 언어설정(language), 언어변경함수(setLanguage)를 자식 컴포넌트들이 사용할 수 있게 함
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

// 3) Context 사용
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 
