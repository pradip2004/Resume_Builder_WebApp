import React from 'react'

function SummaryPreview({resumeInfo}) {
  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2">Professional Summary</h2>
      <p className="text-sm leading-relaxed">
        {resumeInfo?.summary || 'No summary provided'}
      </p>
    </div>
  )
}

export default SummaryPreview