import { Movie } from '@/providers/MovieProvider';
import MovieCard from '../movieCard';

interface MovieListProps {
  movies: Movie[];
}

const MovieList = ({ movies }: MovieListProps): JSX.Element => {
  if (!movies.length) {
    return (
      <div className="flex justify-center items-center h-svh" data-testid="not-results">
        Not results
      </div>
    );
  }
  return (
    <div className="h-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {movies.map((movie, index) => {
        return (
          <MovieCard
            key={movie.id}
            position={index + 1}
            id={movie.id}
            title={movie.title}
            overview={movie.overview}
            posterPath={movie.posterPath}
            voteAverage={movie.voteAverage}
            releaseDate={movie.releaseDate.split('-')[0]}
          />
        );
      })}
    </div>
  );
};

export default MovieList;
