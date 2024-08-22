import FormSection from '@/components/custom/FormSection';
import PreviewSection from '@/components/custom/PreviewSection';
import { ResumeContextInfo } from '@/context/ResumeContextInfo';
import Dummy from '@/data/Dummy';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function EditResume() {
  const params = useParams();
  const [resumeInfo, setResumeInfo] = useState();

  useEffect(() => (
    setResumeInfo(Dummy)
  ), [])
  return (
    <ResumeContextInfo.Provider value={{resumeInfo, setResumeInfo}}>
      <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
        <FormSection />

        <PreviewSection />
      </div>
    </ResumeContextInfo.Provider>
  )
}

export default EditResume