import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="px-4 py-24 text-center">
      <h1 className="text-5xl font-extrabold">404</h1>
      <p className="muted mt-3">We couldn't find that page.</p>
      <Link to="/" className="btn-primary mt-6">Back to home</Link>
    </div>
  );
}
