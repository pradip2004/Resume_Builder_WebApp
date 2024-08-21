import AddResume from '@/components/custom/AddResume'
import ReusmeCard from '@/components/custom/ReusmeCard';
import GlobalApi from '@/service/GlobalApi'
import { useUser } from '@clerk/clerk-react'
import React, { useEffect, useState } from 'react'

function Deshboard() {
  const {user} = useUser();
  const [resumeList, setResumeList] = useState([]);

  useEffect(()=>{
    user && getResumesList()
  }, [user])

  const getResumesList=()=>{
    GlobalApi.getUserResumes(user?.primaryEmailAddress?.emailAddress)
    .then(res=>{
      // console.log(res.data.resumes)
      setResumeList(res.data.resumes)
    })
  }

  return (
    <div className='w-full mt-10'>
      <div className='max-w-screen-xl p-4 mx-auto'>
        <h1 className='text-5xl font-semibold'>My Resume</h1>
        <p className='text-md mt-3 font-medium'>Start creating Resume for your next job role</p>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-10 gap-x-5 gap-y-10'>
          <AddResume />
          {resumeList.length > 0 && resumeList.map((resume, index)=>(
            <ReusmeCard resume={resume} key={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Deshboard