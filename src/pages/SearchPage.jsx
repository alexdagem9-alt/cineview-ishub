import { useSearchParams } from 'react-router-dom';
import ApiGrid from '../components/ApiGrid';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  return (
    <ApiGrid
      key={query}
      title={`Results for "${query}"`}
      path="/search/multi"
      params={{ query }}
      emptyText="No matches. Try another title."
    />
  );
}
