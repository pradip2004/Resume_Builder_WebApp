import React from 'react'

function PersonalDetailsPreview({resumeInfo}) {

  return (
    <div>
      <h2 className='text-xl text-center font-bold' style={{color: resumeInfo?.themeColor}}>{resumeInfo?.firstName} {resumeInfo?.lastName}</h2>
      <h2 className='text-sm text-center font-medium'>{resumeInfo?.jobTitle}</h2>
      <h2 className='text-sm text-center font-medium' style={{color: resumeInfo?.themeColor}}>{resumeInfo?.address}</h2>

      <div className='flex justify-between'>
        <h2 className='text-sm font-normal' style={{color: resumeInfo?.themeColor}}>{resumeInfo?.phone}</h2>
        <h2 className='text-sm font-normal' style={{color: resumeInfo?.themeColor}}>{resumeInfo?.email}</h2>
      </div>

      <hr className='border-[1.5px] my-2' style={{borderColor: resumeInfo?.themeColor}}/>
    </div>
  )
}

export default PersonalDetailsPreview