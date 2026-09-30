// TMDB genre ids -> names (movie and TV ids live in the same lookup)
export const GENRE_NAMES = {
  28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 18: 'Drama',
  14: 'Fantasy', 27: 'Horror', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 53: 'Thriller',
  10765: 'Sci-Fi & Fantasy', 10759: 'Action & Adventure', 10752: 'War', 10768: 'War & Politics',
  36: 'History', 37: 'Western', 10751: 'Family',
};

const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-');

// Genre dropdown: label plus every TMDB id (movie and TV) that belongs to it.
// ids[0] is always the movie genre id, which is what we query with.
export const GENRE_MENU = [
  ['Action', [28, 10759]], ['Adventure', [12, 10759]], ['Animation', [16]], ['Comedy', [35]],
  ['Crime', [80]], ['Drama', [18]], ['Family', [10751]], ['Fantasy', [14, 10765]],
  ['Horror', [27]], ['Mystery', [9648]], ['Romance', [10749]], ['Sci-Fi', [878, 10765]],
  ['Thriller', [53]], ['War', [10752, 10768]], ['Western', [37]],
].map(([label, ids]) => ({ label, slug: slugify(label), ids }));

// Extra genre rows shown on the home page
export const HOME_GENRE_ROWS = [
  { label: 'Horror', id: 27 },
  { label: 'War', id: 10752 },
  { label: 'Romance', id: 10749 },
  { label: 'Adventure', id: 12 },
];
