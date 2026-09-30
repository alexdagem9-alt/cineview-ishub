import { useLocation, useNavigate } from 'react-router-dom';
import Modal from './Modal';
import Poster from './Poster';
import Rating from './Rating';
import { GENRE_NAMES } from '../constants/genres';
import { useAuth } from '../context/AuthContext';
import { useLibrary } from '../context/LibraryContext';
import { useUI } from '../context/UIContext';

export default function DetailsModal({ movie, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { isSaved, toggleWatchlist, getDownload, startDownload } = useLibrary();
  const { playTitle, flash } = useUI();

  const saved = isSaved(movie);
  const download = getDownload(movie);
  const downloadLabel = !download
    ? 'Download'
    : download.progress < 100 ? `Downloading ${download.progress}%` : 'Downloaded';

  const handleDownload = () => {
    // downloads are for signed-in users only, send everyone else to log in first
    if (!user) {
      flash('Please log in to download titles');
      onClose();
      navigate('/login', { state: { from: location.pathname + location.search } });
      return;
    }
    startDownload(movie);
  };

  return (
    <Modal label={movie.title} onClose={onClose}>
      <div className="grid sm:grid-cols-[240px_1fr]">
        <Poster movie={movie} className="aspect-[2/3] w-full sm:h-full" />

        <div className="p-6">
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-2xl font-bold">{movie.title}</h2>
            <button onClick={onClose} aria-label="Close" className="rounded-lg px-2 text-xl text-neutral-500 hover:bg-neutral-200 dark:hover:bg-neutral-800">
              &times;
            </button>
          </div>

          <div className="muted mt-3 flex items-center gap-3 text-sm">
            <Rating value={movie.rating} />
            <span>{movie.year}</span>
            <span>{movie.type === 'tv' ? 'Series' : 'Movie'}</span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {movie.genres.map((id) => (
              <span key={id} className="accent rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium">
                {GENRE_NAMES[id] || 'Other'}
              </span>
            ))}
          </div>

          <p className="mt-5 leading-relaxed text-neutral-600 dark:text-neutral-300">{movie.overview}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={() => playTitle(movie)} className="btn-primary">&#9654; Play</button>
            <button onClick={handleDownload} disabled={!!download} className="btn-outline">&#8681; {downloadLabel}</button>
            <button onClick={() => toggleWatchlist(movie)} className="btn-ghost">
              {saved ? '- Watchlist' : '+ Watchlist'}
            </button>
          </div>

          {download && download.progress < 100 && (
            <div className="mt-4 h-1.5 overflow-hidden rounded bg-neutral-200 dark:bg-neutral-800">
              <div className="h-full bg-emerald-500 transition-all dark:bg-emerald-400" style={{ width: `${download.progress}%` }} />
            </div>
          )}

          <p className="muted mt-4 text-xs">
            Play and Download are demo controls. TMDB provides details and trailers, not movie files.
          </p>
        </div>
      </div>
    </Modal>
  );
}
