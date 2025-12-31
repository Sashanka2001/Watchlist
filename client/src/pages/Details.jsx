import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"

export default function Details(){
  const { id } = useParams()
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

  if(loading) return <div style={{padding:20}}>Loading…</div>
  if(!movie) return <div style={{padding:20}}>Movie not found or error occured.</div>

  const posterBase = "https://image.tmdb.org/t/p/w300"
  const poster = movie.poster_path ? posterBase+movie.poster_path : movie.poster || ""

  return (
    <div style={{padding:20}}>
      <div style={{marginBottom:12}}><Link to="/">← Home</Link> | <Link to="/my-list">My List</Link></div>
      <div style={{display:'flex',gap:20}}>
        {poster ? <img src={poster} alt={movie.title} style={{width:300}}/> : <div style={{width:300,height:450,background:'#eee'}}/>}
        <div style={{maxWidth:800}}>
          <h2>{movie.title} <small style={{color:'#666'}}>{movie.release_date}</small></h2>
          <p style={{lineHeight:1.4}}>{movie.overview}</p>
          <div style={{marginTop:12}}>
            <strong>Runtime:</strong> {movie.runtime || 'N/A'} min
            {' • '}<strong>Rating:</strong> {movie.vote_average || 'N/A'}
          </div>
          {credits && credits.cast && (
            <div style={{marginTop:18}}>
              <h4>Top Cast</h4>
              <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
                {credits.cast.slice(0,8).map(c=> (
                  <div key={c.cast_id || c.credit_id} style={{width:120}}>
                    {c.profile_path ? <img src={`https://image.tmdb.org/t/p/w185${c.profile_path}`} alt={c.name} style={{width:120}}/> : <div style={{width:120,height:160,background:'#ddd'}}/>}
                    <div style={{fontSize:13}}>{c.name}</div>
                    <div style={{fontSize:12,color:'#666'}}>{c.character}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
