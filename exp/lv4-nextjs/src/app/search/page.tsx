import SearchResults from './SearchResults';

interface SearchParams {
  query?: string;
}

interface SearchPageProps {
  searchParams: SearchParams;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.query;
  return <SearchResults initialQuery={query} />;
}
