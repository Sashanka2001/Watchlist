import { Link } from "react-router-dom"

export default function MovieCard({movie}){
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
      <div style={{width:200,border:'1px solid #ddd',padding:8}}>
        {poster ? (
          <Link to={`/movie/${movie.id || movie._id}`}>
            <img src={poster} alt={movie.title} style={{width:'100%'}}/>
          </Link>
        ) : <div style={{height:300,background:'#eee'}}/>}
        <h4 style={{fontSize:14,margin:'8px 0 4px'}}>{movie.title}</h4>
        <div style={{fontSize:12,color:'#666'}}>{movie.release_date}</div>
        <button onClick={add} style={{marginTop:8}}>Add to To Watch</button>
      </div>
    )
}
