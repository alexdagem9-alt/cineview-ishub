import { createContext, useContext, useEffect, useState } from 'react';
import { store } from '../services/storage';
import { isSameTitle } from '../utils/isSameTitle';

const LibraryContext = createContext(null);

// Watchlist and (simulated) downloads, both saved in localStorage
export function LibraryProvider({ children }) {
  const [watchlist, setWatchlist] = useState(() => store.get('watchlist', []));
  const [downloads, setDownloads] = useState(() => store.get('downloads', []));

  useEffect(() => { store.set('watchlist', watchlist); }, [watchlist]);
  useEffect(() => { store.set('downloads', downloads); }, [downloads]);

  // No real files are transferred, we only fake the progress bar
  const isDownloading = downloads.some((d) => d.progress < 100);
  useEffect(() => {
    if (!isDownloading) return undefined;
    const timer = setInterval(() => {
      setDownloads((list) => list.map((d) => (d.progress < 100 ? { ...d, progress: Math.min(100, d.progress + 10) } : d)));
    }, 500);
    return () => clearInterval(timer);
  }, [isDownloading]);

  const isSaved = (title) => watchlist.some((item) => isSameTitle(item, title));

  const toggleWatchlist = (title) => {
    setWatchlist((list) => (
      list.some((item) => isSameTitle(item, title))
        ? list.filter((item) => !isSameTitle(item, title))
        : [...list, title]
    ));
  };

  const getDownload = (title) => downloads.find((d) => isSameTitle(d, title));

  const startDownload = (title) => {
    setDownloads((list) => (list.some((d) => isSameTitle(d, title)) ? list : [...list, { ...title, progress: 0 }]));
  };

  const value = { watchlist, downloads, isSaved, toggleWatchlist, getDownload, startDownload };
  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>;
}

export const useLibrary = () => useContext(LibraryContext);
