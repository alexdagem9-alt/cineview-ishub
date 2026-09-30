// Small message in the bottom corner (login welcome, "please log in", etc.)
export default function Toast({ message }) {
  if (!message) return null;

  return (
    <div
      role="status"
      className="fixed bottom-6 right-6 z-[60] rounded-xl border border-emerald-500/40 bg-white px-4 py-3 text-sm shadow-lg dark:bg-neutral-900"
    >
      {message}
    </div>
  );
}
