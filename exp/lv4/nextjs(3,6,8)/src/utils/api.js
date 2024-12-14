const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export const fetchMovies = async (endpoint, language = 'ko') => {
  const languageCode = language === 'ko' ? 'ko-KR' : 'en-US';
  const res = await fetch(`${API_BASE_URL}${endpoint}?api_key=${API_KEY}&language=${languageCode}`);
  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
};

export async function fetchSearchMovies(query, language = 'ko') {
  const languageCode = language === 'ko' ? 'ko-KR' : 'en-US';
  const url = `${API_BASE_URL}/search/movie?api_key=${API_KEY}&language=${languageCode}&query=${encodeURIComponent(query)}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch search results');
  }
  return response.json();
}
