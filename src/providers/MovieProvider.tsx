import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import useRequest from '@/hooks/useRequest';
import { responseToEntity } from '@/utils/dataMapper';

export type Movie = {
  id: number;
  backdropPath: string;
  genreIds: number[];
  originalLanguage: string;
  originalTitle: string;
  overview: string;
  popularity: number;
  posterPath: string;
  releaseDate: string;
  title: string;
  video: false;
  voteAverage: number;
  voteCount: number;
};

type MovieContextType = {
  loading: boolean;
  movies: Movie[];
  adult: boolean;
  openFilterPanel: boolean;
  query: string;
  loadMovies: () => void;
  setOpenFilterPanel: Dispatch<SetStateAction<boolean>>;
  setAdult: Dispatch<SetStateAction<boolean>>;
  searchMovie: (query: string) => void;
};

const MovieContext = createContext<MovieContextType>({
  loading: false,
  movies: [],
  adult: false,
  openFilterPanel: false,
  query: '',
  loadMovies: () => null,
  setOpenFilterPanel: () => false,
  setAdult: () => false,
  searchMovie: (query: string) => query,
});

const MovieProvider = ({ children }: { children: ReactNode }) => {
  const { makeRequest, loading } = useRequest();
  const [openFilterPanel, setOpenFilterPanel] = useState(false);
  const [query, setQuery] = useState('');
  const [adult, setAdult] = useState(false);
  const [moviesCache, setMoviesCache] = useState<Movie[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);

  const loadMovies = useCallback(() => {
    makeRequest({
      method: 'get',
      url: `discover/movie?include_adult=${adult ? 'true' : 'false'}`,
    }).then(({ results }) => {
      const moviesParsed = results
        .map(responseToEntity<Movie[]>)
        .sort(
          (a: { voteCount: number }, b: { voteCount: number }): any => b.voteCount - a.voteCount
        );

      setMovies(moviesParsed);
      setMoviesCache(moviesParsed);
    });
  }, [adult, makeRequest]);

  const searchMovie = useCallback(
    (q: string) => {
      setQuery(q);

      if (!q) {
        setMovies(moviesCache);
        return;
      }

      const matches: Movie[] = movies.filter((i) => i.title.toLowerCase() === query);

      if (matches.length) {
        setMovies(matches);
        return;
      }

      makeRequest({
        method: 'get',
        url: `search/movie?query=${q}&include_adult=${adult ? 'true' : 'false'}`,
      }).then(({ results }) => {
        const moviesParsed = results
          .map(responseToEntity<Movie[]>)
          .sort(
            (a: { voteCount: number }, b: { voteCount: number }): any => b.voteCount - a.voteCount
          );

        setMovies(moviesParsed);
      });
    },
    [adult, moviesCache, movies]
  );

  const value = useMemo(
    () => ({
      adult,
      loading,
      query,
      openFilterPanel,
      movies,
      loadMovies,
      setOpenFilterPanel,
      searchMovie,
      setAdult,
    }),
    [
      adult,
      loading,
      query,
      openFilterPanel,
      movies,
      loadMovies,
      setOpenFilterPanel,
      searchMovie,
      setAdult,
    ]
  );

  return (
    <MovieContext.Provider value={value}>
      <div className="relative flex-1">{children}</div>
    </MovieContext.Provider>
  );
};

export const useMovie = () => {
  return useContext(MovieContext);
};

export default MovieProvider;
