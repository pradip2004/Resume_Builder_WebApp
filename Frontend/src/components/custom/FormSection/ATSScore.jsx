import React, { useContext, useState } from 'react'
import { AIChatSession } from '@/service/AIModel'
import GlobalApi from '@/service/GlobalApi'
import { ResumeContextInfo } from '@/context/ResumeContextInfo'
import { toast } from 'sonner'

const ATSScore = () => {
      const [score, setScore] = useState(null)
      const [suggestions, setSuggestions] = useState([])
      const [loading, setLoading] = useState(false)
      const [error, setError] = useState(null)
      const { resumeInfo, setResumeInfo } = useContext(ResumeContextInfo)

      const analyzeResume = async () => {
            try {
                  setLoading(true)
                  setError(null)
                  
                  if (!resumeInfo) {
                        throw new Error('No resume data available')
                  }

                  // Convert resume data to string for analysis
                  const resumeText = JSON.stringify(resumeInfo)
                  
                  // Get analysis from Gemini AI
                  const result = await AIChatSession.sendMessage(`
                        Analyze this resume and provide:
                        1. An ATS score out of 100
                        2. 3-5 specific suggestions to improve the resume's ATS compatibility
                        
                        Resume data: ${resumeText}
                        
                        Format the response as JSON with the following structure:
                        {
                              "score": number,
                              "suggestions": string[]
                        }
                  `)

                  if (!result?.response?.text()) {
                        throw new Error('Failed to get analysis from AI')
                  }

                  const response = JSON.parse(result.response.text())
                  
                  if (!response.score || !response.suggestions) {
                        throw new Error('Invalid response format from AI')
                  }

                  setScore(response.score)
                  setSuggestions(response.suggestions)
                  toast.success('Analysis completed successfully')
            } catch (error) {
                  console.error('Error analyzing resume:', error)
                  setError(error.message || 'Failed to analyze resume')
                  toast.error(error.message || 'Failed to analyze resume')
            } finally {
                  setLoading(false)
            }
      }

      return (
            <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10 dark:shadow-[0_0_10px_rgba(144,238,144,0.2)] dark:shadow-[0_0_30px_rgba(144,238,144,0.1)]'>
                  <h2 className='font-bold text-lg mb-4'>ATS Score</h2>
                  <p className='mb-4'>Get your resume score and suggestions to improve ATS compatibility</p>
                  
                  {error && (
                        <div className="text-red-500 mb-4 p-3 bg-red-50 rounded">
                              {error}
                        </div>
                  )}
                  
                  <button 
                        onClick={analyzeResume}
                        disabled={loading || !resumeInfo}
                        className='bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50'
                  >
                        {loading ? 'Analyzing...' : 'Analyze Resume'}
                  </button>

                  {score !== null && (
                        <div className='mt-6'>
                              <div className='flex items-center gap-4 mb-6'>
                                    <div className='text-4xl font-bold text-primary'>{score}</div>
                                    <div className='text-gray-600 dark:text-gray-300'>/ 100</div>
                              </div>
                              
                              <div className='bg-gray-50 dark:bg-gray-800 p-4 rounded-lg'>
                                    <h3 className='font-semibold mb-3'>Improvement Suggestions:</h3>
                                    <ul className='space-y-2'>
                                          {suggestions.map((suggestion, index) => (
                                                <li key={index} className='flex items-start gap-2'>
                                                      <span className='text-primary'>•</span>
                                                      <span>{suggestion}</span>
                                                </li>
                                          ))}
                                    </ul>
                              </div>
                        </div>
                  )}
            </div>
      )
}

export default ATSScore