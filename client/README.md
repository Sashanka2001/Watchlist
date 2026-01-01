# Watchlist — Client (Frontend)

This is the React frontend for the Watchlist app, built with Vite. It consumes the backend API to search movies, view details, and manage a user's watch list.

## Prerequisites
- Node.js (v18+ recommended)
- npm

## Install & Run
From the `client/` directory:

```bash
npm install
npm run dev      # start development server (Vite)
npm run build    # build for production
npm run preview  # preview the built app
npm run lint     # run ESLint
```

By default the app expects the backend API to run locally (e.g. `http://localhost:5000`). Start the server in `server/` first.

## Project structure (important files)
- `src/main.jsx` — app entry
- `src/App.jsx` — root component and routes
- `src/components/MovieCard.jsx` — movie tile component
- `src/pages/Search.jsx` — movie search UI
- `src/pages/Details.jsx` — movie detail view
- `src/pages/MyList.jsx` — user's saved list
- `public/` — static assets

## Environment & API
The frontend calls the backend's `/api` endpoints. Ensure the backend is running and reachable. If you need a proxy or a custom backend URL, add configuration in your app (or set an env var and update the fetch base URL).

## Build & Deploy
Run `npm run build` to produce the production bundle in `dist/`. Serve the `dist/` output with any static server or integrate it with the backend.

## Contributing / Development notes
- Keep components small and focused (see `MovieCard.jsx`).
- Use the mock data in `server/controllers/data/mock_movies.json` when TMDB access is not available.

If you'd like, I can add a `.env` file example for frontend settings or a `proxy` config for local development.
