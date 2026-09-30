import { useEffect, useState } from 'react';
import { fetchTmdb } from '../services/tmdb';

// Loads a TMDB path and returns { data, loading, error }
export default function useApi(path, params = {}) {
  const [state, setState] = useState({ data: null, loading: true, error: null });
  const dependency = path + JSON.stringify(params);

  useEffect(() => {
    let active = true; // ignore the response if the component has moved on
    setState((prev) => ({ ...prev, loading: true }));

    fetchTmdb(path, params)
      .then((data) => active && setState({ data, loading: false, error: null }))
      .catch((err) => {
        if (!active) return;
        const message = err instanceof TypeError
          ? 'Could not reach TMDB. Check your connection.'
          : err.message;
        setState({ data: null, loading: false, error: message });
      });

    return () => { active = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dependency]);

  return state;
}
