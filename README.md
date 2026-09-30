# 🎬 Cineview — Modern Movie & TV Series Explorer

Cineview is a sleek, responsive web application built with **React 18**, **Vite**, and **Tailwind CSS**. It connects directly to **The Movie Database (TMDB) API** to deliver live movies, TV series, search functionality, ratings, trailers, and personalized watchlists.

---

## ✨ Features

- **Live TMDB Integration**: Live movie and TV catalog updated continuously from TMDB's global database.
- **Dynamic Trending & Popular**: Real-time trending titles and current box office favorites.
- **TV Series & Episode Info**: Browse series, seasons, air dates, and overviews.
- **Instant Search**: Real-time debounced search across millions of movies and shows.
- **Detailed Overviews & Trailers**: High-resolution posters, backdrop images, cast details, ratings, and embedded video trailers.
- **Category & Genre Filtering**: Explore movies and series by specific genres.
- **Watchlist & Saved Titles**: Save your favorite titles with local storage persistence.
- **Dark & Light Mode**: Seamless theme switching with persistent user preference.
- **Graceful Fallback**: Automatically falls back to offline sample data if no TMDB API key is provided.

---

## 🛠️ Tech Stack

- **Frontend**: [React 18](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Routing**: [React Router DOM v6](https://reactrouter.com/)
- **Data Source**: [The Movie Database (TMDB) API v3](https://developers.themoviedb.org/)
- **Icons & UI**: Custom SVG icons, glassmorphism UI components, and modal dialogues

---

## 📂 Project Architecture

```
cineview-react/
├── public/                 # Static public assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Header.jsx      # Navigation bar, search toggle, theme switch
│   │   ├── Footer.jsx      # Footer with links and TMDB attribution
│   │   ├── Hero.jsx        # Featured spotlight banner
│   │   ├── MovieCard.jsx   # Card item with poster, title, and rating
│   │   ├── MovieGrid.jsx   # Responsive grid layout for media cards
│   │   ├── MovieRow.jsx    # Horizontal scrolling carousel
│   │   ├── DetailsModal.jsx# Media details modal (synopsis, cast, genre)
│   │   ├── PlayerModal.jsx # Video / trailer playback modal
│   │   ├── SettingsModal.jsx # In-app TMDB API key configuration
│   │   └── Skeletons.jsx   # Loading state placeholders
│   ├── context/            # React Context providers
│   │   ├── AuthContext.jsx # User authentication state (local simulation)
│   │   ├── LibraryContext.jsx # Watchlist and downloads management
│   │   ├── ThemeContext.jsx# Dark/light theme provider
│   │   └── UIContext.jsx   # Modals and settings state
│   ├── hooks/              # Custom React hooks
│   │   ├── useApi.js       # Asynchronous TMDB data fetching hook
│   │   └── useDebounce.js  # Debounce utility for search input
│   ├── pages/              # Application pages
│   │   ├── Home.jsx        # Trending spotlight, rows & highlights
│   │   ├── Movies.jsx      # Movie catalog & filters
│   │   ├── Series.jsx      # TV shows catalog & filters
│   │   ├── SearchPage.jsx  # Search results page
│   │   ├── GenrePage.jsx   # Genre-filtered listings
│   │   ├── Watchlist.jsx   # Saved movies and series
│   │   └── NotFound.jsx    # 404 error page
│   ├── services/           # API and data layer
│   │   ├── tmdb.js         # TMDB API client and response normalization
│   │   ├── demoData.js     # Fallback offline mock dataset
│   │   └── storage.js      # LocalStorage helpers
│   ├── App.jsx             # Route definitions & modal hosting
│   ├── main.jsx            # Application entry point
│   └── index.css           # Tailwind base styles and design utilities
├── .env.example            # Environment template for TMDB API key
├── .gitignore              # Ignored files (node_modules, .env, dist)
├── package.json            # Dependencies and npm scripts
├── tailwind.config.js      # Tailwind design system configuration
└── vite.config.js          # Vite build configuration
```

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) (v18 or higher) installed on your system.

### 2. Clone and Install
```bash
git clone <your-repo-url>
cd cineview-react
npm install
```

### 3. Configure TMDB API Key
Create a `.env` file in the root directory (or copy `.env.example`):
```env
VITE_TMDB_KEY=your_tmdb_api_key_here
```
> **Note:** You can obtain a free API key at [themoviedb.org/settings/api](https://www.themoviedb.org/settings/api). If left empty, the application will display bundled sample data.

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Build for Production
```bash
npm run build
```
Preview the production build locally:
```bash
npm run preview
```

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
