import { Link } from "react-router-dom"

export default function MovieCard({ movie }) {
  const posterBase = "https://image.tmdb.org/t/p/w342"
  const poster = movie.poster_path ? posterBase + movie.poster_path : movie.poster || ""

  const rating = movie.vote_average ?? movie.rating ?? movie.score ?? null
  let displayRating = null
  if (typeof rating === 'number') {
    displayRating = rating <= 10 ? Math.round(rating * 10) : Math.round(rating)
  } else if (rating) {
    displayRating = rating
  }

  async function add() {
    try {
      const body = {
        userId: "demo",
        tmdbId: String(movie.id || movie._id || movie.tmdbId || ""),
        title: movie.title,
        poster,
        status: "TO_WATCH",
      }
      const res = await fetch('/api/movies/add', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      const data = await res.json()
      if (!res.ok) {
        console.error('Add movie error', data)
        alert(data.error || data.detail || 'Failed to add movie')
        return
      }
      alert('Added to list')
    } catch (err) {
      console.error(err)
      alert('Failed to add')
    }
  }

  return (
    <div className="w-44 snap-start flex-shrink-0">
      <div className="relative">
        {poster ? (
          <Link to={`/movie/${movie.id || movie._id}`}>
            <img src={poster} alt={movie.title} className="w-full h-64 object-cover rounded-md border border-gray-700 shadow-lg" />
          </Link>
        ) : (
          <div className="w-full h-64 bg-gray-800 rounded-md flex items-center justify-center">
            <div className="text-gray-500">No Image</div>
          </div>
        )}

        {displayRating !== null && (
          <div className="absolute left-2 -bottom-3 bg-black/80 text-white px-2 py-1 rounded-full text-xs font-semibold">
            {displayRating}
          </div>
        )}
      </div>

      <div className="mt-6 text-center">
        <h4 className="text-sm font-semibold text-white line-clamp-2">{movie.title}</h4>
        {movie.release_date && <div className="text-xs text-gray-400 mt-1">{movie.release_date}</div>}
        <button onClick={add} className="mt-3 w-full bg-gray-800 hover:bg-gray-700 text-white text-sm py-2 rounded-md border border-gray-700">Add to To Watch</button>
      </div>
    </div>
  )
}
