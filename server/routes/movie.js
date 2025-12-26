import express from "express"
import Movie from "../models/Movie.js"
const router = express.Router()

router.post("/add", async(req,res)=>{
  const movie = await Movie.create(req.body)
  res.json(movie)
})

router.get("/:userId", async(req,res)=>{
  const movies = await Movie.find({userId:req.params.userId})
  res.json(movies)
})

router.put("/rate/:id", async(req,res)=>{
  const movie = await Movie.findByIdAndUpdate(req.params.id,
    {rating:req.body.rating},{new:true})
  res.json(movie)
})

// update status (TO_WATCH, WATCHING, WATCHED)
router.put("/status/:id", async(req,res)=>{
  const movie = await Movie.findByIdAndUpdate(req.params.id,
    {status:req.body.status},{new:true})
  res.json(movie)
})

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
    res.status(500).send("Search failed")
  }
})

export default router
