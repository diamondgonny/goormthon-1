import { LanguageType, languageMap } from '@/types/language';

// API 응답 타입 정의
interface MovieResponse {
  id: number;
  title: string;
  poster_path: string | null;
  overview: string | null;
  vote_average?: number;
}

interface MovieListResponse {
  results: MovieResponse[];
  page: number;
  total_pages: number;
  total_results: number;
}

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

// Promise<T>는 비동기 작업이 완료되면 타입 T의 값을 반환한다는 것을 명시적으로 나타냄
// |는 유니온 타입(Union Type)을 나타내는 연산자로, "이 값의 타입이 A 또는 B가 될 수 있다"를 의미함
export const fetchMovies = async (endpoint: string, language: LanguageType = 'ko'): Promise<MovieResponse | MovieListResponse> => {
  const languageCode = languageMap[language] || 'ko-KR';
  const res = await fetch(`${API_BASE_URL}${endpoint}?api_key=${API_KEY}&language=${languageCode}`);
  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
};

export async function fetchSearchMovies(query: string, language: LanguageType = 'ko'): Promise<MovieListResponse> {
  const languageCode = languageMap[language] || 'ko-KR';
  const url = `${API_BASE_URL}/search/movie?api_key=${API_KEY}&language=${languageCode}&query=${encodeURIComponent(query)}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch search results');
  }
  return response.json();
}
