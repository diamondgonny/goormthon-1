export type LanguageType = 'ko' | 'en' | 'ja';

// Record<K, T>는 TypeScript의 유틸리티 타입 중 하나로, 키(K)와 값(T)의 타입을 지정하여 객체 타입을 정의할 때 사용
export const languageMap: Record<LanguageType, string> = {
  ko: 'ko-KR',
  en: 'en-US',
  ja: 'ja-JP'
};
