import { store } from './storage';
import { demoRequest } from './demoData';

const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE = 'https://image.tmdb.org/t/p/';

// Key pasted in the app wins, then the .env value
export const getApiKey = () => store.get('tmdb_key', '') || import.meta.env.VITE_TMDB_KEY || '';

// Shape a TMDB result so the UI doesn't care whether it came from the API or the demo data
function normalise(item) {
  return {
    id: item.id,
    type: item.media_type || (item.title ? 'movie' : 'tv'),
    title: item.title || item.name,
    year: (item.release_date || item.first_air_date || '').slice(0, 4),
    rating: item.vote_average || 0,
    genres: item.genre_ids || [],
    overview: item.overview || 'No overview available.',
    poster: item.poster_path ? `${IMAGE_BASE}w342${item.poster_path}` : null,
    back: item.backdrop_path ? `${IMAGE_BASE}w1280${item.backdrop_path}` : null,
    hue: (item.id * 47) % 360,
  };
}

// Single entry point for every request: real API when there is a key, demo data otherwise
export async function fetchTmdb(path, params = {}) {
  const apiKey = getApiKey();
  if (!apiKey) return demoRequest(path, params);

  const url = new URL(BASE_URL + path);
  const query = { api_key: apiKey, language: 'en-US', ...params };
  Object.entries(query).forEach(([name, value]) => url.searchParams.set(name, value));

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(response.status === 401 ? 'Invalid TMDB API key' : `TMDB request failed (${response.status})`);
  }

  const { results } = await response.json();
  if (path.endsWith('/videos')) return results;
  return results.filter((item) => item.media_type !== 'person').map(normalise);
}
