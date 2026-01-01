import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

export default function Watched() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch('/api/movies/demo');
        const data = await res.json();
        if (!res.ok) {
          setMovies([]);
        } else {
          setMovies(Array.isArray(data) ? data.filter(m => m.status === 'WATCHED') : []);
        }
      } catch {
        setMovies([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Add updateRating function for rating
  async function updateRating(id, value) {
    try {
      await fetch(`/api/movies/rate/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating: Number(value) })
      });
      // Update UI after rating
      setMovies(movies =>
        movies.map(m => m._id === id ? { ...m, rating: Number(value) } : m)
      );
    } catch (err) {
      console.error(err);
      alert('Failed to update rating');
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            Watched Movies
          </h1>
          <p className="text-gray-400">All movies you have watched and rated</p>
        </div>
        {loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-400">Loading watched movies...</p>
          </div>
        )}
        {!loading && movies.length > 0 && (
          <div style={{position:'relative', width:'100%'}}>
            <div
              role="region"
              aria-label="Watched movies"
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
                <div key={m._id} style={{flex: '0 0 auto', width: 176, scrollSnapAlign: 'start'}}>
                  <div style={{padding:8, borderRadius:12, border:'1px solid rgba(255,255,255,0.06)', background:'rgba(255,255,255,0.02)', boxSizing:'border-box', overflow:'hidden'}}>
                    <MovieCard movie={{title: m.title, poster_path: null, poster: m.poster, release_date: ''}} hideAdd={true} />
                    <div className="flex items-center justify-center mt-3 mb-2">
                      {[1,2,3,4,5].map(i => (
                        <button
                          key={i}
                          onClick={() => updateRating(m._id, i*2)}
                          style={{background:'none',border:'none',padding:0,margin:0,cursor:'pointer',lineHeight:0}}
                          aria-label={`Rate ${i} star${i>1?'s':''}`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill={(m.rating || 0) >= i*2 ? '#facc15' : 'none'}
                            stroke="#facc15"
                            strokeWidth="1.5"
                            className="w-3 h-3"
                            style={{
                              width: "1.5em",
                              height: "1.5em",
                              display: "inline-block",
                              verticalAlign: "middle"
                            }}
                          >
                            <polygon points="10,2 12.59,7.36 18.51,7.97 14,12.14 15.18,18.02 10,15.1 4.82,18.02 6,12.14 1.49,7.97 7.41,7.36" />
                          </svg>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{position:'absolute',top:0,right:0,width:64,height:'100%',pointerEvents:'none',background:'linear-gradient(to right, rgba(0,0,0,0), rgba(24,24,27,0.95))'}} />
          </div>
        )}
        {!loading && movies.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-gray-300 mb-2">No watched movies yet</h3>
            <p className="text-gray-500">Mark movies as watched to see them here</p>
          </div>
        )}
      </div>
    </div>
  );
}
