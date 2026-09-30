import ApiGrid from '../components/ApiGrid';

export default function Movies() {
  return <ApiGrid title="Popular movies" path="/movie/popular" emptyText="No movies found." />;
}
