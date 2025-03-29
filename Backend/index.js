import express from 'express'
import connectDB from './db/db.js'
import rootRouter from './routes/index.js'
import cors from 'cors'
import dotenv from 'dotenv';
import { requireAuth } from './middleware/auth.js';

dotenv.config();

const app = express()
app.use(cors())
app.use(express.json());

// Apply Clerk authentication middleware to all routes under /api/v1
app.use('/api/v1', requireAuth, rootRouter)

// Public route
app.get('/', (req, res) => {
  res.send('Hello, World!')
})

connectDB();

app.listen(process.env.PORT, ()=>{
      console.log(`Server is running on port ${process.env.PORT}`) 
})