import MovieGrid from './MovieGrid';
import useApi from '../hooks/useApi';

// MovieGrid that loads its own data from TMDB
export default function ApiGrid({ path, params = {}, ...gridProps }) {
  const { data, loading, error } = useApi(path, params);
  return <MovieGrid {...gridProps} items={data} loading={loading} error={error} />;
}
