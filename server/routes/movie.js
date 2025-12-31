import express from "express"
import mongoose from "mongoose"
import Movie from "../models/Movie.js"
const router = express.Router()

// In-memory fallback store used when MongoDB is not connected
const memoryStore = []
function isDbReady(){
  return mongoose.connection && mongoose.connection.readyState === 1
}

function generateId(){
  return Date.now().toString(36) + Math.random().toString(36).slice(2,9)
}

// Search movies via TMDB proxy: /api/movies/search?q=...
router.get("/search", async (req,res)=>{
  const q = req.query.q || ""
  if(!q) return res.json([])
  try{
    const key = process.env.TMDB_KEY
    if(!key) return res.status(400).json({ error: 'TMDB_KEY not configured' })
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
    if(isDbReady()){
      const movie = await Movie.create(req.body)
      return res.json(movie)
    }
    // fallback to in-memory store
    const doc = { ...req.body, _id: generateId() }
    memoryStore.push(doc)
    return res.json(doc)
  }catch(err){
    console.error(err)
    res.status(500).json({ error: 'Add failed' })
  }
})

// update status (TO_WATCH, WATCHING, WATCHED)
router.put("/status/:id", async(req,res)=>{
  try{
    if(isDbReady()){
      const movie = await Movie.findByIdAndUpdate(req.params.id,
        {status:req.body.status},{new:true})
      return res.json(movie)
    }
    const idx = memoryStore.findIndex(m=>String(m._id)===String(req.params.id))
    if(idx===-1) return res.status(404).json({ error: 'Not found' })
    memoryStore[idx].status = req.body.status
    return res.json(memoryStore[idx])
  }catch(err){
    console.error(err)
    res.status(500).json({ error: 'Update status failed' })
  }
})

router.put("/rate/:id", async(req,res)=>{
  try{
    if(isDbReady()){
      const movie = await Movie.findByIdAndUpdate(req.params.id,
        {rating:req.body.rating},{new:true})
      return res.json(movie)
    }
    const idx = memoryStore.findIndex(m=>String(m._id)===String(req.params.id))
    if(idx===-1) return res.status(404).json({ error: 'Not found' })
    memoryStore[idx].rating = Number(req.body.rating)
    return res.json(memoryStore[idx])
  }catch(err){
    console.error(err)
    res.status(500).json({ error: 'Rate failed' })
  }
})

router.get("/:userId", async(req,res)=>{
  try{
    if(isDbReady()){
      const movies = await Movie.find({userId:req.params.userId})
      return res.json(movies)
    }
    // return from memory store for demo user
    const movies = memoryStore.filter(m=>String(m.userId)===String(req.params.userId))
    return res.json(movies)
  }catch(err){
    console.error(err)
    res.status(500).json({ error: 'Fetch user movies failed' })
  }
})

export default router
