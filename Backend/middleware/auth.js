import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import dotenv from 'dotenv';

dotenv.config();

export const requireAuth = ClerkExpressRequireAuth({
  // Optional: Configure which routes require authentication
  publicRoutes: ['/api/v1/public/*'],
  // Optional: Configure which routes are ignored by the middleware
  ignoredRoutes: ['/api/v1/health'],
}); 