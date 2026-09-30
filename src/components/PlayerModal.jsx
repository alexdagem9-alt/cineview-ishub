import { useEffect, useState } from 'react';
import Modal from './Modal';
import useApi from '../hooks/useApi';

// With a TMDB key it plays the official YouTube trailer. Without one it shows a demo player.
export default function PlayerModal({ movie, onClose }) {
  const { data } = useApi(`/${movie.type}/${movie.id}/videos`);
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(true);
  const trailer = data && data.find((video) => video.site === 'YouTube' && video.type === 'Trailer');

  // fake progress bar for the demo player
  useEffect(() => {
    if (!running) return undefined;
    const timer = setInterval(() => setProgress((p) => (p >= 100 ? 0 : p + 1)), 300);
    return () => clearInterval(timer);
  }, [running]);

  return (
    <Modal label={`Playing ${movie.title}`} onClose={onClose}>
      <div className="relative aspect-video w-full bg-black">
        {trailer ? (
          <iframe
            className="h-full w-full"
            title={movie.title}
            allowFullScreen
            allow="autoplay; encrypted-media; fullscreen"
            src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
          />
        ) : (
          <div
            className="grid h-full place-items-center text-center text-white"
            style={{ background: `linear-gradient(135deg, hsl(${movie.hue} 60% 28%), hsl(${(movie.hue + 80) % 360} 60% 8%))` }}
          >
            <div>
              <p className="text-2xl font-bold">{movie.title}</p>
              <button
                onClick={() => setRunning(!running)}
                aria-label={running ? 'Pause' : 'Play'}
                className="mx-auto mt-4 grid h-14 w-14 place-items-center rounded-full bg-emerald-400 text-xl text-neutral-950"
              >
                {running ? '\u275A\u275A' : '\u25B6'}
              </button>
              <p className="mt-4 px-4 text-xs text-neutral-300">Demo player. Connect your licensed video source here.</p>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-1 bg-white/10">
              <div className="h-full bg-emerald-400" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between p-4">
        <p className="font-semibold">{movie.title}</p>
        <button onClick={onClose} className="btn-outline py-2">Close</button>
      </div>
    </Modal>
  );
}
