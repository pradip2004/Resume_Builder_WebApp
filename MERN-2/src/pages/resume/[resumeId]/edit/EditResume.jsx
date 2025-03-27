import FormSection from '@/components/custom/FormSection';
import PreviewSection from '@/components/custom/PreviewSection';
import { ResumeContextInfo } from '@/context/ResumeContextInfo';
import Dummy from '@/data/Dummy';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from '@/service/GlobalApi';
import { toast } from 'sonner';

function EditResume() {
  const params = useParams();
  const [resumeInfo, setResumeInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const getResumeInfo = async () => {
    try {
      setLoading(true);
      const response = await GlobalApi.getResumeById(params.resumeId);
      if (response.data) {
        console.log("response.data")
        console.log(response.data.data)
        setResumeInfo(response.data.data);
      } else {
        toast.error('Resume not found');
      }
    } catch (error) {
      console.error('Error fetching resume:', error);
      toast.error('Failed to load resume data');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (params.resumeId) {
      getResumeInfo();
    }
  }, [params.resumeId]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!resumeInfo) {
    return <div className="flex items-center justify-center min-h-screen">Resume not found</div>;
  }

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