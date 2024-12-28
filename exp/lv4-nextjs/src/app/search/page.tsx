import SearchResults from './SearchResults';

interface SearchPageProps {
  searchParams: Promise<{
    query?: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.query;
  return <SearchResults initialQuery={query} />;
}
