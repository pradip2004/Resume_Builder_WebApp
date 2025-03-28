import Header from '@/components/custom/Header'
import PreviewSection from '@/components/custom/PreviewSection'
import { Button } from '@/components/ui/button'
import { ResumeContextInfo } from '@/context/ResumeContextInfo'
import GlobalApi from '@/service/GlobalApi'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { RWebShare } from 'react-web-share'

const ViewResume = () => {
  const [resumeInfo, setResumeInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const { resumeId } = useParams();

  const GetResumeInfo = async () => {
    try {
      const resp = await GlobalApi.getResumeById(resumeId);
      setResumeInfo(resp.data.data);
    } catch (error) {
      console.error('Error fetching resume:', error);
    }
  }

  useEffect(() => {
    GetResumeInfo();
  }, [resumeId]);

  const HandleDownload = () => {
    setLoading(true);
    // Add a small delay to ensure styles are applied
    setTimeout(() => {
      window.print();
      setLoading(false);
    }, 100);
  }

  return (
    <ResumeContextInfo.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id="no-print">
        <Header />

        <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
          <h2 className='text-center text-2xl font-medium'>
            Congrats! Your Ultimate AI generates Resume is ready ! </h2>
          <p className='text-center text-gray-400'>Now you are ready to download your resume and you can share unique
            resume url with your friends and family </p>
          <div className='flex justify-between px-44 my-10'>
            <Button onClick={HandleDownload}>Download</Button>

            <RWebShare
              data={{
                text: "Hello Everyone, This is my resume please open url to see it",
                url: import.meta.env.VITE_BASE_URL + "/my-resume/" + resumeId + "/view",
                title: resumeInfo?.firstName + " " + resumeInfo?.lastName + " resume",
              }}
              onClick={() => console.log("shared successfully!")}
            > 
              <Button>Share</Button>
            </RWebShare>
          </div>
        </div>

      </div>
      <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
        <div id="print-area" >
          <PreviewSection />
        </div>
      </div>
    </ResumeContextInfo.Provider>
  )
}

export default ViewResume