export default function Rating({ value }) {
  // green for good, amber for ok, red for poor
  const color = value >= 7 ? '#10b981' : value >= 5 ? '#f59e0b' : '#ef4444';

  return (
    <span
      aria-label={`Rating ${value.toFixed(1)} out of 10`}
      className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-white/90 px-2 py-1 text-xs font-bold text-neutral-900 ring-1 ring-black/10 dark:bg-neutral-950/80 dark:text-white dark:ring-white/10"
    >
      <span style={{ color }}>&#9733;</span>
      {value.toFixed(1)}
      <span className="font-medium text-neutral-400 dark:text-neutral-500">/10</span>
    </span>
  );
}
