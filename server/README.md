
# Watchlist — Server (Backend)

This folder contains the Express + MongoDB backend for the Watchlist app. It provides authentication, movie endpoints (TMDB proxy + local mock fallback), and persistence for users' saved lists.

## Contents
- API server using Express (ESM)
- Models: `models/User.js`, `models/Movie.js`
- Routes: `routes/auth.js`, `routes/movie.js`
- Mock data: `controllers/data/mock_movies.json`

## Prerequisites
- Node.js (v18+ recommended)
- npm
- MongoDB (Atlas or local)

## Environment
Create a `.env` file inside the `server/` folder. Important variables:

- `MONGO_URI` — MongoDB connection string (e.g. `mongodb://127.0.0.1:27017/watchlist`)
- `JWT_SECRET` — secret used to sign JWTs
- `TMDB_KEY` — (optional) The Movie DB API key for live movie data
- `PORT` — optional server port

Example `.env`:

MONGO_URI=mongodb://127.0.0.1:27017/watchlist
JWT_SECRET=supersecretkey
TMDB_KEY=your_tmdb_api_key_here

## Install & Run
From the `server/` directory:

```bash
npm install
npm run dev    # development (nodemon)
npm start      # start with node
```

## API (overview)
Routes are mounted under `/api`. Common endpoints:

- `POST /api/auth/register` — register a user
- `POST /api/auth/login` — login and receive JWT
- `GET /api/movies/search?q=QUERY` — search movies (TMDB or mock)
- `GET /api/movies/details/:tmdbId` — details for a TMDB movie
- `GET /api/movies/credits/:tmdbId` — credits for a TMDB movie

For endpoints requiring authentication, include header: `Authorization: Bearer <token>`.

## Models & Data
- `models/User.js` — user schema and password hashing
- `models/Movie.js` — movie/save schema
- `controllers/data/mock_movies.json` — local movie dataset used as fallback

## Troubleshooting
- If Mongo fails to connect, verify `MONGO_URI` and Atlas IP whitelist (if using Atlas).
- Ensure `JWT_SECRET` is set for authentication routes.

 

