import { useEffect, useState } from "react"
import { Film, Star, Eye, CheckCircle, Loader } from "lucide-react"

// Mock MovieCard component for demonstration
function MovieCard({ movie }) {
  return (
    <div className="aspect-[2/3] bg-gray-700 rounded-t-lg flex items-center justify-center">
      {movie.poster ? (
        <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover rounded-t-lg" />
      ) : (
        <Film className="w-12 h-12 text-gray-600" />
      )}
    </div>
  )
}

export default function MyList(){
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)

  async function load(){
    setLoading(true)
    try{
      const res = await fetch('/api/movies/demo')
      const data = await res.json()
      if(!res.ok){
        console.error('Load my list error', data)
        alert(data.error || data.detail || 'Failed to load list')
        setMovies([])
      }else{
        setMovies(Array.isArray(data) ? data : [])
      }
    }catch(err){
      console.error(err)
      setMovies([])
    }finally{setLoading(false)}
  }

  useEffect(()=>{load()},[])

  async function updateStatus(id,status){
    try{
      await fetch(`/api/movies/status/${id}`,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({status})})
      load()
    }catch(err){console.error(err)}
  }

  async function updateRating(id,value){
    try{
      await fetch(`/api/movies/rate/${id}`,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({rating:Number(value)})})
      load()
    }catch(err){console.error(err)}
  }

  const getStatusBadge = (status) => {
    const styles = {
      WATCHING: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      WATCHED: "bg-green-500/20 text-green-400 border-green-500/30",
      PLAN_TO_WATCH: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      TO_WATCH: "bg-gray-700/20 text-gray-300 border-gray-600/30"
    }
    const icons = {
      WATCHING: <Eye className="w-3 h-3" />,
      WATCHED: <CheckCircle className="w-3 h-3" />,
      PLAN_TO_WATCH: <Film className="w-3 h-3" />,
      TO_WATCH: <Film className="w-3 h-3" />
    }
    const labels = {
      WATCHING: 'Watching',
      WATCHED: 'Watched',
      PLAN_TO_WATCH: 'Plan to Watch',
      TO_WATCH: 'To watch'
    }
    const label = labels[status] || (status ? status.replace(/_/g, ' ').toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase()) : '')
    return (
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status] || styles.TO_WATCH}`}>
        {icons[status] || icons.TO_WATCH}
        {label}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <Film className="w-10 h-10 text-blue-500" />
            My Movie List
          </h1>
          <p className="text-gray-400">Track and rate your movie collection</p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader className="w-12 h-12 text-blue-500 animate-spin mb-4" />
            <p className="text-gray-400">Loading your movies...</p>
          </div>
        )}

        {/* Movies Grid */}
        {!loading && movies.length > 0 && (
          <div>
            <div className="mb-6 text-gray-400">
              {movies.length} {movies.length === 1 ? 'movie' : 'movies'} in your list
            </div>
            <div style={{position:'relative', width:'100%'}}>
              <div
                role="region"
                aria-label="My list"
                style={{
                  display: 'flex',
                  gap: 24,
                  overflowX: 'auto',
                  padding: '16px 24px',
                  WebkitOverflowScrolling: 'touch',
                  scrollSnapType: 'x mandatory'
                }}
              >
                {movies.map(m => (
                  <div key={m._id} style={{flex: '0 0 auto', width: 360, scrollSnapAlign: 'start'}}>
                    <div style={{padding:8, borderRadius:12, border:'1px solid rgba(255,255,255,0.06)', background:'rgba(255,255,255,0.02)', boxSizing:'border-box', overflow:'hidden'}}>
                      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                        <MovieCard movie={{title: m.title, poster_path: null, poster: m.poster, release_date: ''}} />
                        <div className="p-4">
                          <h3 className="font-semibold text-white text-sm mb-3 line-clamp-2">{m.title}</h3>
                          {/* Removed status badge above buttons */}
                          <div className="flex mb-4">
                            {m.status !== 'WATCHING' && (
                              <button
                                onClick={() => updateStatus(m._id, 'WATCHING')}
                                className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-md transition-colors font-medium flex items-center justify-center"
                                style={{marginRight: m.status !== 'WATCHED' ? 20 : 0}}
                              >
                                Watching
                              </button>
                            )}
                            {m.status !== 'WATCHED' && (
                              <button
                                onClick={() => updateStatus(m._id, 'WATCHED')}
                                className="flex-1 px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-xs rounded-md transition-colors font-medium flex items-center justify-center"
                              >
                                Watched
                              </button>
                            )}
                          </div>
                          <div className="bg-gray-700/50 rounded-lg p-3 border border-gray-600/50 flex flex-col items-center">
                            <label className="text-xs text-gray-400 mb-2 block flex items-center gap-1.5">
                              Your Rating
                            </label>
                            <div className="flex items-center gap-1">
                              {[1,2,3,4,5].map(i => (
                                <svg
                                  key={i}
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill={(m.rating || 0) >= i*2 ? '#facc15' : 'none'}
                                  stroke="#facc15"
                                  strokeWidth="1.5"
                                  className="w-4 h-4"
                                  style={{display:'inline'}}
                                >
                                  <polygon points="10,2 12.59,7.36 18.51,7.97 14,12.14 15.18,18.02 10,15.1 4.82,18.02 6,12.14 1.49,7.97 7.41,7.36" />
                                </svg>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{position:'absolute',top:0,right:0,width:64,height:'100%',pointerEvents:'none',background:'linear-gradient(to right, rgba(0,0,0,0), rgba(24,24,27,0.95))'}} />
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && movies.length === 0 && (
          <div className="text-center py-16">
            <Film className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-300 mb-2">Your list is empty</h3>
            <p className="text-gray-500">Start adding movies to track your watching progress</p>
          </div>
        )}
      </div>
    </div>
  )
}