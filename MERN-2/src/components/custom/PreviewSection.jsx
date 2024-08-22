import { ResumeContextInfo } from '@/context/ResumeContextInfo'
import React, { useContext } from 'react'
import PersonalDetailsPreview from './PersonalDetailsPreview'
import SummaryPreview from './SummaryPreview'
import ExperiencePreview from './ExperiencePreview'
import EducaationalPreview from './EducaationalPreview'
import SkillsPreview from './SkillsPreview'

function PreviewSection() {
  const {resumeInfo, setResumeInfo} = useContext(ResumeContextInfo)
  return (
    <div className='shadow-lg h-full p-14 border-t-[20px]' style={{borderColor: resumeInfo?.themeColor}}>
      <PersonalDetailsPreview resumeInfo={resumeInfo}/>

      <SummaryPreview resumeInfo={resumeInfo} />

      <ExperiencePreview resumeInfo={resumeInfo} />

      <EducaationalPreview resumeInfo={resumeInfo} />

      <SkillsPreview resumeInfo={resumeInfo} />
    </div>
  )
}

export default PreviewSection