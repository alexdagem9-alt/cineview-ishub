import ApiGrid from '../components/ApiGrid';

export default function Series() {
  return <ApiGrid title="Popular series" path="/tv/popular" emptyText="No series found." />;
}
