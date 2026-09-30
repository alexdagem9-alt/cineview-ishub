import { GENRE_NAMES, GENRE_MENU } from '../constants/genres';
import { sleep } from '../utils/sleep';

// Sample catalogue used when no TMDB key is set. One title per entry: name|year|rating|genre ids
const MOVIES = `Inception|2010|8.4|28,878;The Dark Knight|2008|8.5|28,80,18;Interstellar|2014|8.4|12,18,878;Parasite|2019|8.5|35,53,18;The Matrix|1999|8.2|28,878;Spirited Away|2001|8.5|16,14,12;Dune|2021|7.8|12,878;Whiplash|2014|8.4|18;The Shawshank Redemption|1994|8.7|18,80;The Godfather|1972|8.7|18,80;Pulp Fiction|1994|8.5|53,80;Forrest Gump|1994|8.5|35,18,10749;Gladiator|2000|8.2|28,12,18;Saving Private Ryan|1998|8.2|18,10752;Schindler's List|1993|8.6|18,36,10752;1917|2019|8.0|10752,18,28;Dunkirk|2017|7.5|10752,28,18;Apocalypse Now|1979|8.3|18,10752;Hacksaw Ridge|2016|8.2|18,10752;The Notebook|2004|7.9|10749,18;Titanic|1997|7.9|18,10749;La La Land|2016|7.9|35,18,10749;Pride & Prejudice|2005|7.8|18,10749;Before Sunrise|1995|7.9|18,10749;The Shining|1980|8.2|27,53;Get Out|2017|7.6|27,9648,53;A Quiet Place|2018|7.4|27,18,878;Hereditary|2018|7.3|27,9648,53;The Conjuring|2013|7.5|27,53;Alien|1979|8.1|27,878;Mad Max: Fury Road|2015|7.6|28,12,878;Avengers: Endgame|2019|8.3|12,878,28;Jurassic Park|1993|8.0|12,878;Raiders of the Lost Ark|1981|7.9|12,28;The Fellowship of the Ring|2001|8.4|12,14,28;Toy Story|1995|8.0|16,35,10751;Coco|2017|8.2|16,10751,14;The Lion King|1994|8.3|16,10751,18;Superbad|2007|7.2|35;The Grand Budapest Hotel|2014|8.0|35,18;Se7en|1995|8.4|80,9648,53;Django Unchained|2012|8.2|18,37;The Good, the Bad and the Ugly|1966|8.5|37,12;Oppenheimer|2023|8.1|18,36;Top Gun: Maverick|2022|8.2|28,18;Everything Everywhere All at Once|2022|7.8|28,12,878`.split(';');

const SERIES = `Breaking Bad|2008|8.9|18,80;Stranger Things|2016|8.6|10765,9648;Arcane|2021|8.8|16,10765;Severance|2022|8.4|18,9648;The Last of Us|2023|8.6|18,10759;Dark|2017|8.4|9648,10765;Game of Thrones|2011|8.5|10765,18,10759;Chernobyl|2019|8.7|18,36;Band of Brothers|2001|8.7|10768,18;The Pacific|2010|8.4|10768,18;Better Call Saul|2015|8.7|18,80;The Wire|2002|8.6|80,18;Peaky Blinders|2013|8.5|18,80;Friends|1994|8.4|35;The Office|2005|8.6|35;Attack on Titan|2013|8.7|16,10765,10759;Bridgerton|2020|7.4|18,10749;Outlander|2014|8.0|10765,18,10749;The Haunting of Hill House|2018|8.6|18,27,9648;Squid Game|2021|7.8|10759,9648,18;Money Heist|2017|8.3|80,18;Avatar: The Last Airbender|2005|8.7|16,10759,10765`.split(';');

// Turn the text rows into the same shape the real API results are normalised to
function buildTitles(rows, type, firstId) {
  return rows.map((row, index) => {
    const [title, year, rating, genreList] = row.split('|');
    const genres = genreList.split(',').map(Number);
    const id = firstId + index;
    const genreText = genres.slice(0, 2).map((g) => GENRE_NAMES[g]).join(' / ').toLowerCase();
    return {
      id, type, title, year, genres,
      rating: Number(rating),
      hue: (id * 47) % 360,
      poster: null,
      back: null,
      overview: `A ${genreText} ${type === 'tv' ? 'series' : 'film'} from ${year}. Add your TMDB key (top right) to load the real synopsis.`,
    };
  });
}

const DEMO_TITLES = [...buildTitles(MOVIES, 'movie', 1), ...buildTitles(SERIES, 'tv', 101)];

const byType = (type) => DEMO_TITLES.filter((t) => t.type === type);
const byRating = (list) => [...list].sort((a, b) => b.rating - a.rating);

// Mimics the TMDB endpoints the app uses
export async function demoRequest(path, params) {
  await sleep(350); // pretend the network takes a moment

  if (path.endsWith('/videos')) return [];

  if (path.startsWith('/search')) {
    const term = params.query.toLowerCase();
    return DEMO_TITLES.filter((t) => t.title.toLowerCase().includes(term));
  }

  if (path.startsWith('/discover')) {
    const genre = GENRE_MENU.find((g) => g.ids[0] === Number(params.with_genres));
    const ids = genre ? genre.ids : [];
    return byRating(DEMO_TITLES.filter((t) => t.genres.some((g) => ids.includes(g))));
  }

  if (path === '/movie/top_rated') return byRating(byType('movie'));
  if (path === '/movie/popular') return byType('movie');
  if (path === '/tv/popular') return byType('tv');

  // trending: newest first
  return [...DEMO_TITLES].sort((a, b) => b.year - a.year).slice(0, 20);
}
