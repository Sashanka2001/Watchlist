import { useState } from "react"
import { Search as SearchIcon, Film } from "lucide-react"
import MovieCard from "../components/MovieCard.jsx"

export default function Search(){
  const [q, setQ] = useState("")
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  async function doSearch(e){
    e && e.preventDefault()
    if(!q.trim()) return
    setLoading(true)
    try{
      const res = await fetch(`/api/movies/search?q=${encodeURIComponent(q)}`)
      const data = await res.json()
      if(!res.ok){
        console.error('Search error', data)
        setResults([])
        alert(data.error || data.detail || 'Search failed')
      }else{
        setResults(Array.isArray(data) ? data : (data.results || []))
      }
    }catch(err){
      console.error(err)
      setResults([])
    }finally{setLoading(false)}
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
      <div className="w-full max-w-3xl mx-auto px-4 py-12 sm:px-8 lg:px-12">
        {/* Glassmorphism Card */}
        <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-10 md:p-14 mb-12 animate-fadein">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-5xl font-extrabold text-white mb-3 flex items-center justify-center gap-4 tracking-tight drop-shadow-lg">
              <Film className="w-12 h-12 text-blue-500 animate-bounce-slow" />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Movie Search</span>
            </h1>
            <p className="text-lg text-gray-300 font-medium">Discover your next favorite film</p>
          </div>

          {/* Search Form */}
          <form className="mb-10" onSubmit={doSearch} autoComplete="off">
            <div className="relative flex items-center max-w-xl mx-auto">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 w-6 h-6" />
              <input
                value={q}
                onChange={e => setQ(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && doSearch(e)}
                placeholder="Search for movies..."
                className="w-full pl-14 pr-32 py-4 bg-white/10 border border-blue-400/30 rounded-full text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg shadow-inner transition-all"
                style={{backdropFilter:'blur(6px)'}}
              />
              <button
                type="submit"
                disabled={loading || !q.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-7 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-pink-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-full transition-all font-semibold text-lg shadow-lg"
                style={{letterSpacing:'0.03em'}}
              >
                {loading ? "Searching..." : "Search"}
              </button>
            </div>
          </form>

          {/* Results, Loading, No Results, Initial State (all inside card) */}
          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-gray-400">Searching for movies...</p>
            </div>
          )}

          {/* Results (horizontal scroll row) */}
          {!loading && results.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-white mb-6">
                Found {results.length} {results.length === 1 ? 'result' : 'results'}
              </h2>

              <div style={{position:'relative', width:'100%'}}>
                <div
                  role="region"
                  aria-label="Search results"
                  style={{
                    display: 'flex',
                    gap: 24,
                    overflowX: 'auto',
                    padding: '16px 24px',
                    WebkitOverflowScrolling: 'touch',
                    scrollSnapType: 'x mandatory'
                  }}
                >
                  {results.map(m => (
                    <div
                      key={m.id || m._id}
                      style={{flex: '0 0 auto', width: 176, scrollSnapAlign: 'start'}}
                    >
                      <div
                        style={{
                          padding: 8,
                          borderRadius: 12,
                          border: '1px solid rgba(255,255,255,0.06)',
                          background: 'rgba(255,255,255,0.02)',
                          overflow: 'hidden',
                          boxSizing: 'border-box'
                        }}
                      >
                        <MovieCard movie={m} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right fade effect */}
                <div
                  aria-hidden
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: 64,
                    height: '100%',
                    pointerEvents: 'none',
                    background: 'linear-gradient(to right, rgba(0,0,0,0), rgba(24,24,27,0.95))'
                  }}
                />
              </div>
            </div>
          )}

          {/* No Results */}
          {!loading && q && results.length === 0 && (
            <div className="text-center py-12">
              <Film className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-300 mb-2">No movies found</h3>
              <p className="text-gray-500">Try searching with different keywords</p>
            </div>
          )}

          {/* Initial State */}
          {!loading && !q && results.length === 0 && (
            <div className="text-center py-12">
              <SearchIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-300 mb-2">Start your search</h3>
              <p className="text-gray-500">Enter a movie title above to begin</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}