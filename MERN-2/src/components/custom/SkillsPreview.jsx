import React from 'react'

function SkillsPreview({ resumeInfo }) {
      return (
            <div className='my-6'>
                  <h2 className='text-center font-bold text-sm mb-2'
                        style={{
                              color: resumeInfo?.themeColor
                        }}
                  >Skills</h2>
                  <hr style={{
                        borderColor: resumeInfo?.themeColor
                  }} />

                  {/* Skills Categories */}
                  <div className='flex flex-wrap gap-4 my-4'>
                        {resumeInfo?.skills?.map((category, index) => (
                              <div key={index} className='flex items-center gap-2'>
                                    <h3 className='text-sm font-semibold whitespace-nowrap'
                                          style={{
                                                color: resumeInfo?.themeColor
                                          }}
                                    >
                                          {category.category}:
                                    </h3>
                                    <div className='flex flex-wrap gap-2'>
                                          {category.items.map((item, itemIndex) => (
                                                <span key={itemIndex} 
                                                      className='text-xs px-2 py-1 rounded-full bg-gray-100'>
                                                      {item}
                                                </span>
                                          ))}
                                    </div>
                              </div>
                        ))}
                  </div>

            </div>
      )
}

export default SkillsPreview