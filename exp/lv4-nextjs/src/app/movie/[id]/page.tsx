import { fetchMovies } from '@/utils/api';
import MovieDetail from './MovieDetail';
import { Movie } from '@/types/movie';

interface MoviePageProps {
  params: Promise<{
    id: string;
  }>;
}

// Next.js 15부터 params와 searchParams 모두 Promise를 반환하도록 변경됨
// (params : 동적 라우트 매개변수, searchParams : 검색 매개변수)
// - 서버 컴포넌트에서의 비동기 데이터 흐름을 더 명확하게 만들기 위함
// - 라우팅 파라미터 처리를 일관되게 하기 위함
// - 서버 사이드에서의 데이터 처리를 더 예측 가능하게 만들기 위함

export default async function MoviePage({ params }: MoviePageProps) {
  const resolvedParams = await params;
  const initialData = await fetchMovies(`/movie/${resolvedParams.id}`, 'ko') as Movie;
  return <MovieDetail initialData={initialData} params={{ id: resolvedParams.id }} />;
}

// 서버 컴포넌트와 클라이언트 컴포넌트의 분리
// - 서버 전용 API를 클라이언트 컴포넌트에서 직접 사용하면 에러 발생 (예: fetch)
// - 이는 Next.js의 서버-클라이언트 데이터 흐름 규칙을 위반
// - 파일을 분리하면 서버에서 searchParams를 안전하게 처리
// - 이 파일은 데이터를 클라이언트 컴포넌트로 전달하는 역할만 수행

// 위와 같은 해결 방식의 장점
// - 서버에서 데이터를 받아 props로 전달
// - 클라이언트 컴포넌트는 전달받은 props만 사용
// - 명확한 데이터 흐름
// - 서버와 클라이언트의 역할 구분이 명확
