import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Home(){
  const [latest, setLatest] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    setLoading(true)
    fetch('/api/movies/latest')
      .then(r=>r.json())
      .then(data=>setLatest(data || []))
      .catch(()=>setLatest([]))
      .finally(()=>setLoading(false))
  },[])

  const posterUrl = (p) => p ? `https://image.tmdb.org/t/p/w342${p}` : null

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-4xl mx-auto text-center">
        <nav className="mb-6">
          <Link to="/home" className="text-indigo-400 hover:underline mr-3">Home</Link>
          <Link to="/search" className="text-gray-300 hover:underline mr-3">Search</Link>
          <Link to="/my-list" className="text-gray-300 hover:underline">My List</Link>
        </nav>

        <h1 className="text-3xl font-bold text-white mb-2">Latest Releases</h1>
        <p className="text-sm text-gray-300 mb-6">What’s playing now — curated from TMDB</p>

        {loading && <div className="text-gray-300">Loading...</div>}

        {!loading && latest.length === 0 && (
          <div className="text-gray-400">No recent releases found.</div>
        )}

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {latest.map(m => (
            <Link to={`/movie/${m.id}`} key={m.id} className="group block bg-white/5 rounded overflow-hidden hover:shadow-lg">
              {posterUrl(m.poster_path) ? (
                <img src={posterUrl(m.poster_path)} alt={m.title} className="w-full h-44 object-cover group-hover:scale-105 transition-transform" />
              ) : (
                <div className="w-full h-44 bg-gray-800 flex items-center justify-center text-gray-400">No Image</div>
              )}
              <div className="p-3 text-left">
                <div className="text-sm font-semibold text-white truncate">{m.title}</div>
                <div className="text-xs text-gray-400">{m.release_date}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
