import express from 'express'
import User from '../db/models/user.js';
import UserResume from '../db/models/userResume.js'
const router = express.Router();

router.post('/', async(req, res)=>{
      const {email, title} = req.body;
      const user = await User.findOne({email});
      if(!user){
            return res.status(404).json({error: 'User not found'});
      }

      const resume = await UserResume.create({
            title: title,
      })

      user.resumes.push(resume._id);
      await user.save();
      res.send({
            message: 'Resume created successfully',
            resumeId: resume._id
      })
})

router.get('/', async (req, res)=>{
      const { email } = req.query;

      try {
        const user = await User.findOne({ email }).populate('resumes');
            // console.log(user)
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        const populatedUser = await user.populate('resumes');
        
        res.json({
          message: 'Resumes fetched successfully',
          resumes: populatedUser.resumes,
        });
        
      } catch (error) {
        console.error('Error fetching resumes:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
})


export default router