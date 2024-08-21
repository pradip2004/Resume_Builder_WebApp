import express from 'express'
import connectDB from './db/db.js'
import rootRouter from './routes/index.js'
import cors from 'cors'
import dotenv from 'dotenv';

dotenv.config();

const app = express()
app.use(cors())
app.use(express.json());
app.use('/api/v1', rootRouter)

const port = 4000

app.get('/', (req, res) => {
  res.send('Hello, World!')
})

connectDB();

app.listen(port, ()=>{
      console.log(`Server is running on port ${process.env.PORT || port}`) 
})