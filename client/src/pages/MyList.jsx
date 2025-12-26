import { useEffect, useState } from "react"
import MovieCard from "../components/MovieCard"

export default function MyList(){
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)

  async function load(){
    setLoading(true)
    try{
      const res = await fetch('/api/movies/demo')
      const data = await res.json()
      setMovies(data)
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

  return (
    <div style={{padding:20}}>
      <h2>My List (demo)</h2>
      {loading && <div>Loading…</div>}
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,240px)',gap:12}}>
        {movies.map(m=> (
          <div key={m._id} style={{border:'1px solid #ddd',padding:8}}>
            <MovieCard movie={{title:m.title, poster_path:null, poster:m.poster, release_date:''}} />
            <div style={{fontSize:13,marginTop:6}}>Status: <strong>{m.status}</strong></div>
            <div style={{marginTop:8}}>
              {m.status !== 'WATCHING' && <button onClick={()=>updateStatus(m._id,'WATCHING')} style={{marginRight:6}}>Mark Watching</button>}
              {m.status !== 'WATCHED' && <button onClick={()=>updateStatus(m._id,'WATCHED')}>Mark Watched</button>}
            </div>
            <div style={{marginTop:8}}>
              <label style={{fontSize:13}}>Rating:</label>
              <input type="number" min={0} max={10} value={m.rating||0} onChange={e=>updateRating(m._id,e.target.value)} style={{width:60,marginLeft:8}} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
