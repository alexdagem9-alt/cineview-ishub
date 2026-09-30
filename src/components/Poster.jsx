import { useState } from 'react';

// Shows the poster image, or a coloured placeholder with the title when there is none
export default function Poster({ movie, className = '' }) {
  const [failed, setFailed] = useState(false);

  if (movie.poster && !failed) {
    return (
      <img
        src={movie.poster}
        alt={movie.title}
        loading="lazy"
        onError={() => setFailed(true)}
        className={`object-cover ${className}`}
      />
    );
  }

  return (
    <div
      className={`grid place-items-center p-3 text-center text-sm font-bold text-white ${className}`}
      style={{ background: `linear-gradient(160deg, hsl(${movie.hue} 60% 38%), hsl(${(movie.hue + 70) % 360} 60% 16%))` }}
    >
      {movie.title}
    </div>
  );
}
