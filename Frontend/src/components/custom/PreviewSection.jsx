import { ResumeContextInfo } from '@/context/ResumeContextInfo'
import React, { useContext } from 'react'
import PersonalDetailsPreview from './PersonalDetailsPreview'
import SummaryPreview from './SummaryPreview'
import ExperiencePreview from './ExperiencePreview'
import EducaationalPreview from './EducaationalPreview'
import SkillsPreview from './SkillsPreview'
import AchievementsPreview from './AchievementsPreview'
function PreviewSection() {
  const {resumeInfo, setResumeInfo} = useContext(ResumeContextInfo)
  return (
    <div className='shadow-lg h-full px-6 md:px-14 py-6 border-t-[20px] dark:shadow-[0_0_10px_rgba(144,238,144,0.2)] dark:shadow-[0_0_30px_rgba(144,238,144,0.1)]' style={{borderColor: resumeInfo?.themeColor}}>
      <PersonalDetailsPreview resumeInfo={resumeInfo}/>

      <SummaryPreview resumeInfo={resumeInfo} />

      <ExperiencePreview resumeInfo={resumeInfo} />

      <EducaationalPreview resumeInfo={resumeInfo} />

      <SkillsPreview resumeInfo={resumeInfo} />

      <AchievementsPreview resumeInfo={resumeInfo} />
    </div>
  )
}

export default PreviewSection