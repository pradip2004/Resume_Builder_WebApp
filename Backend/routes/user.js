import express from 'express'
import User from '../db/models/user.js'
const router = express.Router();

router.post('/', async (req, res)=>{
  const { name, email, externalId, externalProvider } = req.body;

  try {
    // Check if the user already exists by email or externalId
    const existingUser = await User.findOne({ 
      $or: [
        { email },
        { externalId }
      ]
    });

    if (existingUser) {
      // If user exists, update their information
      existingUser.name = name;
      existingUser.externalProvider = externalProvider;
      await existingUser.save();
      
      return res.status(200).json({ 
        message: 'User updated successfully', 
        user: existingUser 
      });
    }

    // If user does not exist, create a new one
    const newUser = await User.create({
      name,
      email,
      externalId,
      externalProvider
    });

    console.log('New user created:', newUser);

    res.status(201).json({
      message: 'User created successfully',
      user: newUser,
    });
  } catch (error) {
    console.error('Error creating/updating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

router.get('/', async (req, res) => {
  const { email, externalId } = req.query;
  
  try {
    const user = await User.findOne({ 
      $or: [
        { email },
        { externalId }
      ]
    });
  
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