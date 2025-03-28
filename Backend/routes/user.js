import express from 'express'
import User from '../db/models/user.js'
const router = express.Router();

router.post('/', async (req, res)=>{
  const { name, email } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // If user exists, do nothing and return a message
      return res.status(200).json({ message: 'User already exists', user: existingUser });
    }

    // If user does not exist, create a new one
    const newUser = await User.create({
      name: name,
      email: email,
    });

    console.log(newUser);

    res.status(201).json({
      message: 'User created successfully',
      user: newUser,
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
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