import { SignIn, useUser, useClerk } from '@clerk/clerk-react';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function SignInPage() {
  const { isSignedIn, user } = useUser();
  const { client } = useClerk();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleUserSignIn = async () => {
      if (isSignedIn && user) {
        try {
          setError(null);
          const email = user.primaryEmailAddress?.emailAddress;
          const name = user.fullName || user.firstName;

          if (!email) {
            setError('No email address found');
            return;
          }

          const token = await user.getToken();
          if (!token) {
            setError('Failed to get authentication token');
            return;
          }

          const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}user`,
            {
              name: name,
              email: email,
            },
            {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            }
          );

          console.log('User data sent successfully:', response.data);
          
          // Handle SSO callback redirect
          const searchParams = new URLSearchParams(location.search);
          const afterSignInUrl = searchParams.get('after_sign_in_url') || '/dashboard';
          navigate(afterSignInUrl);
        } catch (error) {
          console.error('Error during authentication:', error.response?.data || error.message);
          setError(error.response?.data?.error || 'Authentication failed');
          
          if (error.response?.status === 401) {
            setError('Authentication failed. Please try signing in again.');
          }
        }
      }
    };

    handleUserSignIn();
  }, [isSignedIn, user, navigate, location]);

  return (
    <div className='flex items-center justify-center w-full h-screen bg-gray-50'>
      <div className='w-full max-w-md p-8 bg-white rounded-lg shadow-md'>
        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-md">
            {error}
          </div>
        )}
        <SignIn 
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-none",
            },
          }}
          routing="path"
          path="/auth/signin"
          signUpUrl="/auth/signup"
          afterSignInUrl="/dashboard"
          afterSignUpUrl="/dashboard"
        />
      </div>
    </div>
  );
}

export default SignInPage;
