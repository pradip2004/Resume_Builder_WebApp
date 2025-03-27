import React from 'react'

function AchievementsPreview({ resumeInfo }) {
      return (
            <div className='my-6'>
                  <h2 className='text-center font-bold text-sm mb-2'
                        style={{
                              color: resumeInfo?.themeColor
                        }}
                  >Achievements & Certificates</h2>
                  <hr style={{
                        borderColor: resumeInfo?.themeColor
                  }} />
                  <ul className="list-disc list-inside space-y-2 mt-4">
                        {/* Achievements */}
                        {resumeInfo?.achievements?.map((achievement, index) => (
                              <li key={`achievement-${index}`} className="text-xs">
                                    <span className="font-medium">{achievement.title}</span>
                                    <span className="text-gray-500 ml-2">({achievement.date})</span>
                                    <p className="ml-4 mt-1">{achievement.description}</p>
                              </li>
                        ))}

                        {/* Certificates */}
                        {resumeInfo?.certificates?.map((certificate, index) => (
                              <li key={`certificate-${index}`} className="text-xs">
                                    <span className="font-medium">{certificate.title}</span>
                                    <span className="text-gray-500 ml-2">({certificate.date})</span>
                                    <p className="ml-4 mt-1">
                                          Issued by: {certificate.issuer}
                                          <a 
                                                href={certificate.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="ml-2 text-blue-500 hover:underline"
                                          >
                                                View Certificate
                                          </a>
                                    </p>
                              </li>
                        ))}
                  </ul>
            </div>
      )
}

export default AchievementsPreview