import express from 'express'
import connectDB from './db/db.js'
import userRouter from './routes/user.js'
import userResumeRouter from './routes/userResume.js'
import cors from 'cors'
import dotenv from 'dotenv';


dotenv.config();

const app = express()

// Configure CORS with specific options
app.use(cors({
  origin: [process.env.FRONTEND_URL, 'http://localhost:5173', 'https://resumegpt-psi.vercel.app'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parse JSON bodies
app.use(express.json());

// Connect to MongoDB
connectDB();

// Protected routes (auth required)
app.use('/api/v1/user',  userRouter);
app.use('/api/v1/userResume',  userResumeRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});