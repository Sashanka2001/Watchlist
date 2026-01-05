import express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import User from "../models/User.js"

// In-memory fallback users for when MongoDB is not connected (development)
const fallbackUsers = []

const router = express.Router()

router.post("/register", async (req,res)=>{
  const { name, email, password } = req.body
  const hash = await bcrypt.hash(password, 10)

  // If mongoose is not connected, use in-memory fallback
  if (mongoose.connection.readyState !== 1) {
    if (fallbackUsers.find(u => u.email === email)) return res.status(400).send('Email exists')
    const user = { id: String(fallbackUsers.length + 1), name, email, password: hash }
    fallbackUsers.push(user)
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'devsecret')
    return res.json({ token, user })
  }

  const user = await User.create({ name, email, password:hash })
  res.json(user)
})

router.post("/login", async (req,res)=>{
  const { email, password } = req.body

  // If mongoose is not connected, check in-memory fallback
  if (mongoose.connection.readyState !== 1) {
    const user = fallbackUsers.find(u => u.email === email)
    if (!user) return res.status(400).send('Invalid')
    const ok = await bcrypt.compare(password, user.password)
    if (!ok) return res.status(400).send('Invalid')
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'devsecret')
    return res.json({ token, user })
  }

  const user = await User.findOne({email})
  if(!user) return res.status(400).send("Invalid")

  const ok = await bcrypt.compare(password, user.password)
  if(!ok) return res.status(400).send("Invalid")

  const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
  res.json({token, user})
})

export default router
