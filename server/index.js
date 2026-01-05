import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.js"
import movieRoutes from "./routes/movie.js"


dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
app.use("/api/auth", authRoutes)
app.use("/api/movies", movieRoutes)
// MongoDB connection with retry logic
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mywatchlist'
const mongooseOpts = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverSelectionTimeoutMS: 5000, // short timeout for quicker failure
}

async function connectWithRetry(retries = 5, delay = 3000) {
	try {
		await mongoose.connect(mongoUri, mongooseOpts)
		console.log('MongoDB Connected')
	} catch (err) {
		console.error(`MongoDB connection error: ${err.message}`)
		if (retries > 0) {
			console.log(`Retrying MongoDB connection in ${delay}ms... (${retries} retries left)`)
			setTimeout(() => connectWithRetry(retries - 1, Math.min(delay * 2, 30000)), delay)
		} else {
			console.error('Could not connect to MongoDB after multiple attempts. Falling back to in-memory operations where implemented.')
		}
	}
}

mongoose.connection.on('connected', () => console.log('Mongoose event: connected'))
mongoose.connection.on('error', (err) => console.error('Mongoose event: error', err))
mongoose.connection.on('disconnected', () => console.warn('Mongoose event: disconnected'))

connectWithRetry()

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on ${PORT}`))
