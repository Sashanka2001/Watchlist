import { useEffect, useState } from "react"
import { ArrowLeft, Clock, Star, Calendar, Film, User } from "lucide-react"

// Props: id (movie id), onNavigate (callback for navigation)
export default function Details({ id = "550", onNavigate }){
  const [movie, setMovie] = useState(null)
  const [credits, setCredits] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    async function load(){
      setLoading(true)
      try{
        const [mRes, cRes] = await Promise.all([
          fetch(`/api/movies/details/${id}`),
          fetch(`/api/movies/credits/${id}`)
        ])
        const mData = await mRes.json()
        const cData = await cRes.json()
        if(!mRes.ok) throw mData
        if(!cRes.ok) console.warn('Credits error', cData)
        setMovie(mData)
        setCredits(cData)
      }catch(err){
        console.error('Details load error', err)
        setMovie(null)
        setCredits(null)
      }finally{setLoading(false)}
    }
    load()
  },[id])

  const handleNavigate = (path) => {
    if(onNavigate) onNavigate(path)
  }

  if(loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg">Loading movie details...</p>
        </div>
      </div>
    )
  }

  if(!movie) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Film className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-300 mb-2">Movie Not Found</h2>
          <p className="text-gray-500 mb-6">The movie you're looking for doesn't exist or an error occurred.</p>
          <button 
            onClick={() => handleNavigate('/')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  const posterBase = "https://image.tmdb.org/t/p/w500"
  const backdropBase = "https://image.tmdb.org/t/p/original"
  const poster = movie.poster_path ? posterBase + movie.poster_path : movie.poster || ""
  const backdrop = movie.backdrop_path ? backdropBase + movie.backdrop_path : ""

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Backdrop with gradient overlay */}
      {backdrop && (
        <div className="absolute inset-0 h-[600px] overflow-hidden">
          <img src={backdrop} alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-gray-900/90 to-gray-900"></div>
        </div>
      )}

      <div className="relative z-10">
        {/* Navigation */}
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center gap-4 text-sm">
            <button 
              onClick={() => handleNavigate('/')}
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Home
            </button>
            <span className="text-gray-600">|</span>
            <button 
              onClick={() => handleNavigate('/my-list')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              My List
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 pb-16 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
              {/* Poster */}
              <div className="flex-shrink-0">
                {poster ? (
                  <img 
                    src={poster} 
                    alt={movie.title} 
                    className="w-full md:w-80 rounded-xl shadow-2xl"
                  />
                ) : (
                  <div className="w-full md:w-80 aspect-[2/3] bg-gray-800 rounded-xl flex items-center justify-center shadow-2xl">
                    <Film className="w-20 h-20 text-gray-600" />
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3">
                  {movie.title}
                </h1>
                
                {movie.release_date && (
                  <div className="flex items-center gap-2 text-gray-400 mb-6">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(movie.release_date).getFullYear()}</span>
                  </div>
                )}

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-6 mb-8">
                  {movie.runtime && (
                    <div className="flex items-center gap-2 text-gray-300">
                      <Clock className="w-5 h-5 text-blue-500" />
                      <span className="font-medium">{movie.runtime} min</span>
                    </div>
                  )}
                  {movie.vote_average && (
                    <div className="flex items-center gap-2 text-gray-300">
                      <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      <span className="font-medium">{movie.vote_average.toFixed(1)}/10</span>
                    </div>
                  )}
                  {movie.genres && movie.genres.length > 0 && (
                    <div className="flex gap-2 flex-wrap">
                      {movie.genres.slice(0, 3).map(genre => (
                        <span key={genre.id} className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium border border-blue-500/30">
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Overview */}
                {movie.overview && (
                  <div className="mb-10">
                    <h3 className="text-xl font-semibold text-white mb-3">Overview</h3>
                    <p className="text-gray-300 leading-relaxed text-lg">{movie.overview}</p>
                  </div>
                )}

                {/* Cast */}
                {credits && credits.cast && credits.cast.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-6">Top Cast</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                      {credits.cast.slice(0, 10).map(c => (
                        <div key={c.cast_id || c.credit_id} className="group">
                          <div className="relative overflow-hidden rounded-lg mb-2 aspect-[2/3] bg-gray-800">
                            {c.profile_path ? (
                              <img 
                                src={`https://image.tmdb.org/t/p/w185${c.profile_path}`} 
                                alt={c.name} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <User className="w-12 h-12 text-gray-600" />
                              </div>
                            )}
                          </div>
                          <div className="text-sm font-medium text-white line-clamp-1">{c.name}</div>
                          <div className="text-xs text-gray-400 line-clamp-1">{c.character}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}