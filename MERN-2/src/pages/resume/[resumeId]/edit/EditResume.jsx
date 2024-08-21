import FormSection from '@/components/custom/FormSection';
import PreviewSection from '@/components/custom/PreviewSection';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

function EditResume() {
  const params = useParams();

  useEffect(()=>(
    console.log(params)
  ), [])
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
      <FormSection />

      <PreviewSection />
    </div>
  )
}

export default EditResume