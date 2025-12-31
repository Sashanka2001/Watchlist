import { useState } from "react"
import MovieCard from "../components/MovieCard" 

export default function Search(){
  const [q, setQ] = useState("")
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  async function doSearch(e){
    e && e.preventDefault()
    if(!q) return
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
    <div style={{padding:20}}>
      <h2>Search Movies</h2>
      <form onSubmit={doSearch} style={{marginBottom:12}}>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search movies..." />
        <button type="submit">Search</button>
      </form>
      {loading && <div>Searching…</div>}
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,200px)',gap:12}}>
        {(Array.isArray(results) ? results : []).map(m=> (
          <MovieCard key={m.id || m._id} movie={m} />
        ))}
      </div>
    </div>
  )
}
