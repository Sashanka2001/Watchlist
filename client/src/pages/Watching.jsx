import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "../components/MovieCard";

export default function Watching() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch('/api/movies/demo');
        const data = await res.json();
        if (!res.ok) {
          setMovies([]);
        } else {
          setMovies(Array.isArray(data) ? data.filter(m => m.status === 'WATCHING') : []);
        }
      } catch {
        setMovies([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            Watching Movies
          </h1>
          <p className="text-gray-400">Movies you are currently watching</p>
        </div>
        {loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-400">Loading watching movies...</p>
          </div>
        )}
        {!loading && movies.length > 0 && (
          <div style={{position:'relative', width:'100%'}}>
            <div
              role="region"
              aria-label="Watching movies"
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
                    <MovieCard movie={{title: m.title, poster_path: null, poster: m.poster, release_date: ''}} />
                    <div className="p-3 flex items-center justify-center">
                      <button
                        onClick={async () => {
                          if (updatingId) return;
                          setUpdatingId(m._id);
                          try {
                            const res = await fetch(`/api/movies/status/${m._id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: 'WATCHED' }) });
                            if (res.ok) {
                              navigate('/watched');
                            } else {
                              const data = await res.json().catch(() => ({}));
                              alert(data.error || data.detail || 'Failed to update status');
                            }
                          } catch (err) {
                            console.error(err);
                            alert('Failed to update status');
                          } finally {
                            setUpdatingId(null);
                          }
                        }}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-medium"
                        disabled={updatingId === m._id}
                      >
                        {updatingId === m._id ? 'Updating...' : 'Mark as Watched'}
                      </button>
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
            <h3 className="text-xl font-semibold text-gray-300 mb-2">No movies currently being watched</h3>
            <p className="text-gray-500">Mark movies as watching to see them here</p>
          </div>
        )}
      </div>
    </div>
  );
}
