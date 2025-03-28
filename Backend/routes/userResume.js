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

      // Initialize with dummy data
      const resume = await UserResume.create({
            title: title,
            firstName: 'James',
            lastName: 'Carter',
            jobTitle: 'full stack developer',
            address: '525 N tryon Street, NC 28117',
            phone: '(123)-456-7890',
            email: email,
            themeColor: '#ff6666',
            summery: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            experience: [
                {
                    id: 1,
                    title: 'Full Stack Developer',
                    companyName: 'Amazon',
                    city: 'New York',
                    state: 'NY',
                    startDate: 'Jan 2021',
                    endDate: '',
                    currentlyWorking: true,
                    workSummery: 'Designed, developed, and maintained full-stack applications using React and Node.js.'
                }
            ],
            education: [
                {
                    id: 1,
                    universityName: 'Western Illinois University',
                    startDate: 'Aug 2018',
                    endDate: 'Dec 2019',
                    degree: 'Master',
                    major: 'Computer Science',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
                }
            ],
            skills: [
                {
                    category: 'Frontend',
                    items: ['HTML', 'CSS', 'JavaScript', 'React']
                }
            ],
            achievements: [
                {
                    id: 1,
                    title: 'Best Employee Award',
                    description: 'Received recognition for outstanding performance',
                    date: 'Dec 2022'
                }
            ],
            certificates: [
                {
                    id: 1,
                    title: 'AWS Certified Solutions Architect',
                    issuer: 'Amazon Web Services',
                    date: 'Jan 2023',
                    link: 'https://aws.amazon.com/certification/'
                }
            ]
      })

      user.resumes.push(resume._id);
      await user.save();
      res.send({
            message: 'Resume created successfully',
            resumeId: resume._id
      })
})

router.delete('/:resumeId', async (req, res)=>{
      const { resumeId } = req.params;
      await UserResume.findByIdAndDelete(resumeId);
      res.send({message: 'Resume deleted successfully'});
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

router.get('/:resumeId', async (req, res) => {
      try {
            const { resumeId } = req.params;
            const resume = await UserResume.findById(resumeId);
            
            if (!resume) {
                  return res.status(404).json({ message: "Resume not found." });
            }

            res.status(200).json({
                  message: "Resume fetched successfully",
                  data: resume
            });
      } catch (error) {
            console.error("Error fetching resume:", error);
            res.status(500).json({ 
                  message: "Internal Server Error.", 
                  error: error.message 
            });
      }
});

export default router