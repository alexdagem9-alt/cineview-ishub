import Hero from '../components/Hero';
import MovieRow from '../components/MovieRow';
import { HOME_GENRE_ROWS } from '../constants/genres';

export default function Home() {
  return (
    <>
      <Hero />
      <MovieRow title="Trending this week" path="/trending/all/week" />
      <MovieRow title="Popular movies" path="/movie/popular" />
      <MovieRow title="Top rated movies" path="/movie/top_rated" />
      {HOME_GENRE_ROWS.map((genre) => (
        <MovieRow key={genre.id} title={genre.label} path="/discover/movie" params={{ with_genres: genre.id }} />
      ))}
      <MovieRow title="Popular series" path="/tv/popular" />
    </>
  );
}
