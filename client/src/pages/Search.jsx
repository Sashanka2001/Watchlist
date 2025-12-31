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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <Film className="w-10 h-10 text-blue-500" />
            Movie Search
          </h1>
          <p className="text-gray-400">Discover your next favorite film</p>
        </div>

        {/* Search Form */}
        <div className="mb-12">
          <div className="max-w-2xl mx-auto relative">
            <div className="relative">
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                value={q} 
                onChange={e=>setQ(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && doSearch(e)}
                placeholder="Search for movies..." 
                className="w-full pl-12 pr-4 py-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <button 
              onClick={doSearch}
              disabled={loading || !q.trim()}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-md transition-colors font-medium"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-400">Searching for movies...</p>
          </div>
        )}

        {/* Results */}
        {!loading && results.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-white mb-6">
              Found {results.length} {results.length === 1 ? 'result' : 'results'}
            </h2>
            <div className="relative w-full">
              <div className="overflow-x-auto py-4 w-full">
                <div
                  className="flex flex-row flex-nowrap items-start px-4"
                  style={{minHeight:320, whiteSpace: 'nowrap'}}
                >
                  {results.map(m => (
                    <div key={m.id || m._id} className="flex-shrink-0 inline-block" style={{width:170}}>
                      <MovieCard movie={m} />
                    </div>
                  ))}
                </div>
                {/* Right fade effect */}
                <div style={{position:'absolute',top:0,right:0,width:60,height:'100%',pointerEvents:'none',background:'linear-gradient(to right,rgba(0,0,0,0),#18181b 80%)'}} />
              </div>
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
  )
}