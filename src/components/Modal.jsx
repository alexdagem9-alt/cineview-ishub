import { useEffect } from 'react';

// Shared dialog wrapper: dark backdrop, click outside or press Esc to close
export default function Modal({ label, onClose, children }) {
  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden'; // stop the page scrolling behind the dialog

    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={label}
        onClick={(event) => event.stopPropagation()}
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white text-neutral-900 ring-1 ring-black/10 dark:bg-neutral-900 dark:text-neutral-100 dark:ring-white/10"
      >
        {children}
      </div>
    </div>
  );
}
