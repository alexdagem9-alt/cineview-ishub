import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GENRE_MENU } from '../constants/genres';

// Dropdown that opens on hover (desktop) or tap (touch)
export default function GenreMenu({ active }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const pick = (slug) => {
    navigate(`/genre/${slug}`);
    setOpen(false);
  };

  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        onClick={() => setOpen((isOpen) => !isOpen)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
          active ? 'accent' : 'muted hover:text-neutral-900 dark:hover:text-white'
        }`}
      >
        Genre &#9662;
      </button>

      {open && (
        <div
          role="menu"
          className="absolute left-0 top-full z-50 grid w-64 grid-cols-2 gap-1 rounded-xl border border-neutral-200 bg-white p-2 shadow-2xl dark:border-white/10 dark:bg-neutral-900"
        >
          {GENRE_MENU.map((genre) => (
            <button
              key={genre.slug}
              role="menuitem"
              onClick={() => pick(genre.slug)}
              className="rounded-lg px-3 py-2 text-left text-sm text-neutral-700 hover:bg-emerald-500/10 hover:text-emerald-600 dark:text-neutral-300 dark:hover:text-emerald-400"
            >
              {genre.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
