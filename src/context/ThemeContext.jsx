import { createContext, useContext, useEffect, useState } from 'react';
import { store } from '../services/storage';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  // dark is the default, a saved choice wins
  const [theme, setTheme] = useState(() => store.get('theme', 'dark'));

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    store.set('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((current) => (current === 'dark' ? 'light' : 'dark'));

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
