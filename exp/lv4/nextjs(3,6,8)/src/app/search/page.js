import SearchResults from './SearchResults';

export default async function SearchPage({ searchParams }) {
  const params = await searchParams;
  const query = params.query;
  return <SearchResults initialQuery={query} />;
} 
