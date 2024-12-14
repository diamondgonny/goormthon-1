import SearchResults from './SearchResults';

export default function SearchPage({ searchParams }) {
  return <SearchResults initialQuery={searchParams.query} />;
} 

// 서버 컴포넌트와 클라이언트 컴포넌트의 분리
// - 서버 전용 API를 클라이언트 컴포넌트에서 직접 사용하면 에러 발생 (searchParams)
// - 이는 Next.js의 서버-클라이언트 데이터 흐름 규칙을 위반
// - 파일을 분리하면 서버에서 searchParams를 안전하게 처리
// - 데이터를 클라이언트 컴포넌트로 전달하는 역할만 수행

// 위와 같은 해결 방식의 장점
// - 서버에서 데이터를 받아 props로 전달
// - 클라이언트 컴포넌트는 전달받은 props만 사용
// - 명확한 데이터 흐름
// - 서버와 클라이언트의 역할 구분이 명확
