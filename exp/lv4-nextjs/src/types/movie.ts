export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  overview: string | null;
  vote_average?: number;
  release_date?: string;
  original_language?: string;
  popularity?: number;
}
