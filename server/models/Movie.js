import mongoose from "mongoose"

const movieSchema = new mongoose.Schema({
  userId: String,
  tmdbId: String,
  title: String,
  poster: String,
  status: { type:String, default:"TO_WATCH" },
  rating: { type:Number, default:0 }
})

export default mongoose.model("Movie", movieSchema)
