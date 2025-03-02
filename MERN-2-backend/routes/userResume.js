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

router.put('/:resumeId', async (req, res)=>{
      try {
            const { resumeId } = req.params;
            const updateData = req.body.data;
    
            if (!updateData) {
                return res.status(400).json({ message: "No data provided for update." });
            }
    
            const updatedResume = await UserResume.findByIdAndUpdate(resumeId, updateData, { new: true, runValidators: true });
    
            if (!updatedResume) {
                return res.status(404).json({ message: "Resume not found." });
            }
    
            res.status(200).json({ message: "Resume updated successfully.", updatedResume });
        } catch (error) {
            console.error("Error updating resume:", error);
            res.status(500).json({ message: "Internal Server Error.", error: error.message });
        }
})


export default router