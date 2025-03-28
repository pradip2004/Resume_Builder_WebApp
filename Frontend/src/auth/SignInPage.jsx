import { SignIn, useUser } from '@clerk/clerk-react';
import axios from 'axios';
import React from 'react';

function SignInPage() {
  // const { isSignedIn, user } = useUser();

  // React.useEffect(() => {
  //   if (isSignedIn && user) {
  //     const email = user.primaryEmailAddress?.emailAddress;
  //     const name = user.fullName || user.firstName;

  //     const sendUserData = async () => {
  //       try {
  //         // Send the user data to the backend
  //         const response = await axios.post('http://localhost:3000/api/v1/user', {
  //           name: name,
  //           email: email,
  //         });

  //         console.log('User data sent successfully:', response.data);
  //       } catch (error) {
  //         console.error('Error sending user data:', error);
  //       }
  //     };

  //     sendUserData();
  //   }
  // }, [isSignedIn, user]);

  return (
    <div className='flex items-center justify-center w-full h-screen'>
      <SignIn />
    </div>
  );
}

export default SignInPage;
