import express from "express"
import Movie from "../models/Movie.js"
const router = express.Router()

// Search movies via TMDB proxy: /api/movies/search?q=...
router.get("/search", async (req,res)=>{
  const q = req.query.q || ""
  if(!q) return res.json([])
  try{
    const key = process.env.TMDB_KEY
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${encodeURIComponent(q)}`
    const resp = await fetch(url)
    const data = await resp.json()
    res.json(data.results || [])
  }catch(err){
    console.error(err)
    res.status(500).json({ error: 'Search failed' })
  }
})

router.post("/add", async(req,res)=>{
  try{
    const movie = await Movie.create(req.body)
    res.json(movie)
  }catch(err){
    console.error(err)
    res.status(500).json({ error: 'Add failed' })
  }
})

// update status (TO_WATCH, WATCHING, WATCHED)
router.put("/status/:id", async(req,res)=>{
  try{
    const movie = await Movie.findByIdAndUpdate(req.params.id,
      {status:req.body.status},{new:true})
    res.json(movie)
  }catch(err){
    console.error(err)
    res.status(500).json({ error: 'Update status failed' })
  }
})

router.put("/rate/:id", async(req,res)=>{
  try{
    const movie = await Movie.findByIdAndUpdate(req.params.id,
      {rating:req.body.rating},{new:true})
    res.json(movie)
  }catch(err){
    console.error(err)
    res.status(500).json({ error: 'Rate failed' })
  }
})

router.get("/:userId", async(req,res)=>{
  try{
    const movies = await Movie.find({userId:req.params.userId})
    res.json(movies)
  }catch(err){
    console.error(err)
    res.status(500).json({ error: 'Fetch user movies failed' })
  }
})

export default router
