import { useParams } from 'react-router-dom';
import ApiGrid from '../components/ApiGrid';
import NotFound from './NotFound';
import { GENRE_MENU } from '../constants/genres';

export default function GenrePage() {
  const { slug } = useParams();
  const genre = GENRE_MENU.find((g) => g.slug === slug);

  if (!genre) return <NotFound />;

  return (
    <ApiGrid
      key={slug}
      title={genre.label}
      path="/discover/movie"
      params={{ with_genres: genre.ids[0] }}
      emptyText="Nothing here yet."
    />
  );
}
