import { Link } from "react-router-dom"

export default function MovieCard({movie, hideAdd = false}){
  const posterBase = "https://image.tmdb.org/t/p/w200"
  const poster = movie.poster_path ? posterBase+movie.poster_path : movie.poster || ""

  async function add(){
    try{
      const body = {
        userId: "demo",
        tmdbId: String(movie.id),
        title: movie.title,
        poster,
        status: "TO_WATCH"
      }
      const res = await fetch('/api/movies/add',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)})
      const data = await res.json()
      if(!res.ok){
        console.error('Add movie error', data)
        alert(data.error || data.detail || 'Failed to add movie')
        return
      }
      alert('Added to list')
    }catch(err){
      console.error(err)
      alert('Failed to add')
    }
  }
  return (
    <div
      className="bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 flex flex-col items-center"
      style={{
        width: '100%',
        minHeight: 290,
        padding: 2,
        cursor: 'pointer',
        boxSizing: 'border-box',
        overflow: 'hidden',
        transformOrigin: 'center center'
      }}
    >
      {poster ? (
        <Link to={`/movie/${movie.id || movie._id}`} className="block w-full">
          <img
            src={poster}
            alt={movie.title}
            className="rounded-lg w-full h-60 object-cover mb-2"
            style={{display: 'block', margin: 0, background: '#222', objectPosition: 'center center'}}
          />
        </Link>
      ) : (
        <div className="w-full h-60 bg-gray-700 rounded-lg mb-2" />
      )}
      <h4 className="text-white text-base font-semibold text-center line-clamp-2 mb-1" style={{minHeight:40}}>{movie.title}</h4>
      <div className="text-gray-400 text-xs mb-2">{movie.release_date}</div>
      {!hideAdd && (
        <button
          onClick={add}
          className="mt-auto px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-medium transition-colors"
        >
          Add to To Watch
        </button>
      )}
    </div>
  )
}
