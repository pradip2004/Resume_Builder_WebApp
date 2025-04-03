import express from 'express'
import User from '../db/models/user.js'
import jwt from 'jsonwebtoken'
import { OAuth2Client } from 'google-auth-library'
import { requireAuth } from '../middleware/auth.js'
const router = express.Router();

// Initialize Google OAuth client with proper configuration
const CLIENT_ID = "13025145795-eoa1e1hkdg81tk3jomt4eksp46krne6o.apps.googleusercontent.com";
const googleClient = new OAuth2Client(CLIENT_ID);

// Register new user
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password
    });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Google OAuth
router.post('/google', async (req, res) => {
  const { credential } = req.body;

  if (!credential) {
    console.error('No credential provided');
    return res.status(400).json({ error: 'No credential provided' });
  }

  try {
    console.log('Verifying Google token...');
    // Verify the token with the correct audience
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: CLIENT_ID
    });

    console.log('Token verified, getting payload...');
    const payload = ticket.getPayload();
    if (!payload) {
      console.error('Invalid token payload');
      return res.status(400).json({ error: 'Invalid token payload' });
    }

    const { name, email, sub: googleId } = payload;
    console.log('User info from Google:', { name, email, googleId });

    if (!email) {
      console.error('No email in payload');
      return res.status(400).json({ error: 'No email provided by Google' });
    }

    // Find or create user
    let user = await User.findOne({ email });
    
    if (!user) {
      console.log('Creating new user...');
      user = await User.create({
        name,
        email,
        password: Math.random().toString(36).slice(-8), // Random password for Google users
        googleId
      });
    } else if (!user.googleId) {
      console.log('Updating existing user with Google ID...');
      user.googleId = googleId;
      await user.save();
    }

    // Generate JWT token
    const jwtToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    console.log('Authentication successful, sending response...');
    res.json({
      token: jwtToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Error with Google authentication:', error);
    if (error.message.includes('Token used too late')) {
      return res.status(400).json({ error: 'Token expired. Please try again.' });
    }
    if (error.message.includes('Wrong number of segments')) {
      return res.status(400).json({ error: 'Invalid token format' });
    }
    if (error.message.includes('Wrong recipient')) {
      return res.status(400).json({ error: 'Invalid client ID configuration' });
    }
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

// Get user profile
router.get('/profile', requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router