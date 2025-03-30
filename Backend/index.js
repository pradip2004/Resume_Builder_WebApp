import express from 'express'
import connectDB from './db/db.js'
import rootRouter from './routes/index.js'
import cors from 'cors'
import dotenv from 'dotenv';
import { requireAuth } from './middleware/auth.js';

dotenv.config();

const app = express()

// Configure CORS with specific options
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

// Apply Clerk authentication middleware to all routes under /api/v1
app.use('/api/v1', requireAuth, rootRouter)

// Public route
app.get('/', (req, res) => {
  res.send('Hello, World!')
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

connectDB();

app.listen(process.env.PORT, ()=>{
      console.log(`Server is running on port ${process.env.PORT}`) 
})