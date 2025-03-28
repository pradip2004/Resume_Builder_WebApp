import React from 'react'

function SummaryPreview({resumeInfo}) {
  return (
    <p className='text-xs'>
      {resumeInfo?.summery}
    </p>
  )
}

export default SummaryPreview