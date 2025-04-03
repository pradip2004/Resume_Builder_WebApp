import FormSection from '@/components/custom/FormSection';
import PreviewSection from '@/components/custom/PreviewSection';
import { ResumeContextInfo } from '@/context/ResumeContextInfo';
import Dummy from '@/data/Dummy';
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import GlobalApi from '@/service/GlobalApi';
import { toast } from 'sonner';

function EditResume() {
  const params = useParams();
  const navigate = useNavigate();
  const [resumeInfo, setResumeInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const getResumeInfo = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await GlobalApi.getResumeById(params.resumeId);
      if (response.data) {
        setResumeInfo(response.data.data);
      } else {
        setError('Resume not found');
        toast.error('Resume not found');
      }
    } catch (error) {
      console.error('Error fetching resume:', error);
      setError(error.message || 'Failed to load resume data');
      toast.error(error.message || 'Failed to load resume data');
      if (error.message === 'Resource not found') {
        navigate('/dashboard');
      }
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
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-red-500 mb-4">{error}</div>
        <button 
          onClick={() => navigate('/dashboard')}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  if (!resumeInfo) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-gray-500 mb-4">Resume not found</div>
        <button 
          onClick={() => navigate('/dashboard')}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <ResumeContextInfo.Provider value={{resumeInfo, setResumeInfo}}>
      <div className='grid grid-cols-1 md:grid-cols-2 p-4 md:p-10 gap-10'>
        <FormSection />
        <PreviewSection />
      </div>
    </ResumeContextInfo.Provider>
  )
}

export default EditResume