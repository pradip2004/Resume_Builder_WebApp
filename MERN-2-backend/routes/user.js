import express from 'express'
import User from '../db/models/user.js'
const router = express.Router();

router.post('/', async (req, res)=>{
      const {name, email} = req.body;
      const user = await User.create({
            name: name,
            email: email,
      });
      console.log(user)
      res.send({
            message: 'user created'
      })
})

router.get('/', async (req, res) => {
      const { email } = req.query;
    
      try {
        const user = await User.findOne({ email });
    
        if (user) {
          res.json(user);
        } else {
          res.json(null);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });



export default router