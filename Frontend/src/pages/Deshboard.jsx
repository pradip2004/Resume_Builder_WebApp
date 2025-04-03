import AddResume from '@/components/custom/AddResume'
import ReusmeCard from '@/components/custom/ReusmeCard';
import GlobalApi from '@/service/GlobalApi'
import React, { useEffect, useState } from 'react'

function Deshboard() {
  const [resumeList, setResumeList] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      getResumesList(parsedUser.email);
    }
  }, []);

  const getResumesList = async (email) => {
    try {
      const response = await GlobalApi.getUserResumes({ email });
      if (response.data && response.data.resumes) {
        setResumeList(response.data.resumes);
      }
    } catch (error) {
      console.error('Error fetching resumes:', error);
    }
  }

  const handleDelete = (deletedResumeId) => {
    setResumeList(prevResumes => prevResumes.filter(resume => resume._id !== deletedResumeId));
  }

  return (
    <div className='w-full mt-10'>
      <div className='max-w-screen-xl p-4 mx-auto'>
        <h1 className='text-5xl font-semibold dark:text-white'>My Resume</h1>
        <p className='text-md mt-3 font-medium font-winky dark:text-gray-300'>Start creating Resume for your next job role</p>
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-10 gap-x-5 gap-y-10'>
          <AddResume />
          {resumeList.length > 0 && resumeList.map((resume, index) => (
            <ReusmeCard 
              resume={resume} 
              key={index} 
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Deshboard