Server setup and MongoDB connection
=================================

1) Create a `.env` file in the `server/` folder (next to `index.js`) by copying the example:

```powershell
cd server
copy .env.example .env
notepad .env    # or edit with your editor
```

2) Fill `MONGO_URI` with either:
- A MongoDB Atlas connection string (recommended):
  - Example: `mongodb+srv://<username>:<password>@cluster0.mongodb.net/mywatchlist?retryWrites=true&w=majority`
  - Make sure your Atlas Network Access allows your IP (or 0.0.0.0/0 for testing).
- Or a local MongoDB URI: `mongodb://127.0.0.1:27017/watchlist`

3) Fill `JWT_SECRET` (any long secret string) and optionally `TMDB_KEY` if you use the TMDB proxy.

4) Install dependencies and start the server:

```powershell
npm install
npm run dev   # uses nodemon, or npm start
```

5) Verify the connection
- On successful connection you should see `MongoDB Connected` in the server logs.
- If there is an error, check the URI, Atlas IP whitelist, and that Mongo is running locally if using local URI.

If you want a quick temporary fallback so the API runs without Mongo (for UI development), tell me and I'll add an in-memory fallback mode.

TMDB API (movie search/details)
--------------------------------

1) Get a TMDB API key (v3) at https://www.themoviedb.org/ (Account → Settings → API).
2) Add the key to your `.env` file:

```
TMDB_KEY=your_tmdb_api_key_here
```

3) Endpoints available once `TMDB_KEY` is configured:
- `GET /api/movies/search?q=QUERY` — search movies (also works with local mock data if key missing)
- `GET /api/movies/details/:tmdbId` — movie details
- `GET /api/movies/credits/:tmdbId` — cast & crew

Images (posters)
-----------------
Use the TMDB image base URL when rendering posters in the frontend, for example:

```
https://image.tmdb.org/t/p/w200/<poster_path>
```

