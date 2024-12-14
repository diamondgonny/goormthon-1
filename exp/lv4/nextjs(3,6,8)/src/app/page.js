import SearchBar from '../components/SearchBar';

export default function Home() {
  return (
    <main className="h-full">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center space-y-6">
          <h1 className="text-4xl font-bold text-white">영화 검색</h1>
          <SearchBar />
        </div>
      </div>
    </main>
  );
}
