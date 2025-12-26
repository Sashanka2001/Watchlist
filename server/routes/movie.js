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

export default router
