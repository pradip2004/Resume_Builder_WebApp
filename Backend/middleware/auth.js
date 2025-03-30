import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import dotenv from 'dotenv';

dotenv.config();

export const requireAuth = ClerkExpressRequireAuth({
  // Configure which routes require authentication
  publicRoutes: ['/api/v1/public/*'],
  // Configure which routes are ignored by the middleware
  ignoredRoutes: ['/api/v1/health'],
  // Add proper error handling
  onError: (err, req, res, next) => {
    console.error('Clerk auth error:', err);
    res.status(401).json({ error: 'Unauthorized' });
  }
}); 