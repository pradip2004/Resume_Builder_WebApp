import React from 'react'
import { Github, Linkedin, Globe, Phone, Mail } from 'lucide-react'

function PersonalDetailsPreview({resumeInfo}) {

  return (
    <div>
      <h2 className='text-xl text-center font-bold' style={{color: resumeInfo?.themeColor}}>{resumeInfo?.firstName} {resumeInfo?.lastName}</h2>
      <h2 className='text-sm text-center font-medium'>{resumeInfo?.jobTitle}</h2>
      <h2 className='text-sm text-center font-medium' style={{color: resumeInfo?.themeColor}}>{resumeInfo?.address}</h2>

      <div className='flex justify-between items-center'>
        <div className='flex gap-4'>
          <div className='flex items-center gap-1'>
            <Phone size={14} style={{color: resumeInfo?.themeColor}} />
            <h2 className='text-sm font-normal' style={{color: resumeInfo?.themeColor}}>{resumeInfo?.phone}</h2>
          </div>
          <div className='flex items-center gap-1'>
            <Mail size={14} style={{color: resumeInfo?.themeColor}} />
            <h2 className='text-sm font-normal' style={{color: resumeInfo?.themeColor}}>{resumeInfo?.email}</h2>
          </div>
        </div>
        <div className='flex gap-3'>
          {resumeInfo?.github && (
            <a href={resumeInfo.github} target="_blank" rel="noopener noreferrer" className='hover:opacity-80'>
              <Github size={18} style={{color: resumeInfo?.themeColor}} />
            </a>
          )}
          {resumeInfo?.linkedin && (
            <a href={resumeInfo.linkedin} target="_blank" rel="noopener noreferrer" className='hover:opacity-80'>
              <Linkedin size={18} style={{color: resumeInfo?.themeColor}} />
            </a>
          )}
          {resumeInfo?.website && (
            <a href={resumeInfo.website} target="_blank" rel="noopener noreferrer" className='hover:opacity-80'>
              <Globe size={18} style={{color: resumeInfo?.themeColor}} />
            </a>
          )}
        </div>
      </div>

      <hr className='border-[1.5px] my-2' style={{borderColor: resumeInfo?.themeColor}}/>
    </div>
  )
}

export default PersonalDetailsPreview