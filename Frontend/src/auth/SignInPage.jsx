import { SignIn, useUser } from '@clerk/clerk-react';
import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function SignInPage() {
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isSignedIn && user) {
      const email = user.primaryEmailAddress?.emailAddress;
      const name = user.fullName || user.firstName;

      const sendUserData = async () => {
        try {
          const response = await axios.post(`${import.meta.env.VITE_BASE_URL}user`, {
            name: name,
            email: email,
          }, {
            headers: {
              'Authorization': `Bearer ${await user.getToken()}`
            }
          });

          console.log('User data sent successfully:', response.data);
          navigate('/dashboard');
        } catch (error) {
          console.error('Error sending user data:', error);
        }
      };

      sendUserData();
    }
  }, [isSignedIn, user, navigate]);

  return (
    <div className='flex items-center justify-center w-full h-screen bg-gray-50'>
      <div className='w-full max-w-md p-8 bg-white rounded-lg shadow-md'>
        <SignIn 
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-none",
            },
          }}
        />
      </div>
    </div>
  );
}

export default SignInPage;
