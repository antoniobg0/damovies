import { useEffect } from 'react';
import MovieList from './components/movieList';
import FilterPanel from './components/filterPanel';
import { useMovie } from '@/providers/MovieProvider';
import Loading from '@/components/Loading';

const Movies = (): JSX.Element => {
  const { loading, movies, loadMovies } = useMovie();

  useEffect(() => {
    loadMovies();
  }, [loadMovies]);

  return (
    <div>
      <FilterPanel />
      {loading ? <Loading /> : <MovieList movies={movies} />}
    </div>
  );
};

export default Movies;
