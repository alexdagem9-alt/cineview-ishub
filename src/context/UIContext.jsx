import { createContext, useCallback, useContext, useRef, useState } from 'react';
import { store } from '../services/storage';
import { getApiKey } from '../services/tmdb';

const UIContext = createContext(null);

// App-wide UI state: which modal is open, the toast message and the TMDB key
export function UIProvider({ children }) {
  const [selected, setSelected] = useState(null);   // title shown in the details modal
  const [playing, setPlaying] = useState(null);     // title shown in the player modal
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [apiKey, setApiKey] = useState(getApiKey());
  const toastTimer = useRef(null);

  const flash = useCallback((text) => {
    setToast(text);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 3500);
  }, []);

  const saveApiKey = (key) => {
    store.set('tmdb_key', key);
    setApiKey(getApiKey());
  };

  const playTitle = (title) => {
    setSelected(null);
    setPlaying(title);
  };

  const value = {
    selected, playing, settingsOpen, toast, apiKey,
    openDetails: setSelected,
    closeDetails: () => setSelected(null),
    playTitle,
    closePlayer: () => setPlaying(null),
    openSettings: () => setSettingsOpen(true),
    closeSettings: () => setSettingsOpen(false),
    saveApiKey,
    flash,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export const useUI = () => useContext(UIContext);
