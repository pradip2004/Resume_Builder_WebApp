import express from "express";
import userRouter from './user.js';
import userResumeRouter from './userResume.js'

const router = express.Router();

router.use("/user", userRouter)
router.use('/userResume', userResumeRouter)

export default router;