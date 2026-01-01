# Watchlist

Full-stack Watchlist app (React + Vite frontend, Express + MongoDB backend).

## Overview
This repository contains two main folders:

- `server/` — Express API, MongoDB (Mongoose), authentication, and movie endpoints.
- `client/` — React frontend built with Vite.

See the service-specific READMEs for details: [server/README.md](server/README.md) and [client/README.md](client/README.md).

## Quick start (development)
1. Start the backend

```powershell
cd server
npm install
# create a .env in server/ with MONGO_URI and JWT_SECRET (see server/README.md)
npm run dev
```

2. Start the frontend (in a separate terminal)

```powershell
cd client
npm install
npm run dev
```

The frontend expects the backend API to be reachable (default: local dev server). Start the backend first so the UI can communicate with `/api` endpoints.

## Build & deploy (frontend)

```powershell
cd client
npm run build
# serve the generated `dist/` folder using any static server, or integrate into your backend
```

## Environment variables (important)
- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — secret for JWT auth
- `TMDB_KEY` — optional, for live TMDB data

Place these variables in `server/.env`.

## Useful files
- `server/` — API code, routes, models, and `controllers/data/mock_movies.json` (local mock data)
- `client/src/` — React sources (see `src/pages` and `src/components`)

## Troubleshooting
- If Mongo fails to connect, verify `MONGO_URI` and Atlas IP whitelist (if applicable).
- Ensure `JWT_SECRET` is set before using auth endpoints.

## Next steps (optional)
- Add a Postman collection or curl examples to `server/README.md` (I can add these if you want).

---
Created to provide quick developer setup for the project. See [server/README.md](server/README.md) and [client/README.md](client/README.md) for more details.
