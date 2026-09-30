import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';
import Home from './pages/Home';
import Movies from './pages/Movies';
import Series from './pages/Series';
import GenrePage from './pages/GenrePage';
import SearchPage from './pages/SearchPage';
import Watchlist from './pages/Watchlist';
import Downloads from './pages/Downloads';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      {/* every page below is rendered inside Layout (Header + page + Footer) */}
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="movies" element={<Movies />} />
        <Route path="series" element={<Series />} />
        <Route path="genre/:slug" element={<GenrePage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="watchlist" element={<Watchlist />} />
        <Route path="downloads" element={<RequireAuth><Downloads /></RequireAuth>} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
