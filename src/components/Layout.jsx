import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ModalHost from './ModalHost';
import { useUI } from '../context/UIContext';

// Frame shared by every page: header on top, the current page in the middle, footer at the bottom
export default function Layout() {
  const { pathname } = useLocation();
  const { apiKey } = useUI();

  // start each new page at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      {/* changing the API key remounts the page so it reloads with the new data */}
      <main key={apiKey} className="mx-auto w-full max-w-7xl flex-1">
        <Outlet />
      </main>
      <Footer />
      <ModalHost />
    </div>
  );
}
