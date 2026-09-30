// Grey pulsing placeholders shown while a list loads
export default function Skeletons({ count = 7, wide = false }) {
  return Array.from({ length: count }).map((_, index) => (
    <div
      key={index}
      className={`aspect-[2/3] animate-pulse rounded-xl bg-neutral-200 dark:bg-neutral-800 ${wide ? 'w-full' : 'w-44 shrink-0'}`}
    />
  ));
}
