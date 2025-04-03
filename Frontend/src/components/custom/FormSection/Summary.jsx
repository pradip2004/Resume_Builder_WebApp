import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeContextInfo } from '@/context/ResumeContextInfo'
import GlobalApi from '@/service/GlobalApi'
import { Brain, LoaderCircle } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AIChatSession} from '../../../service/AIModel'
import { toast } from 'sonner'

const prompt = "job title: {jobTitle}, Depends on job title give me list of summary for 3 experience level, Mid Level and Freasher level in 3 -4 lines in array format, With summary and experience_level Field in JSON Format"
function Summary({ enableNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeContextInfo)
  const [summary, setSummary] = useState('')
  const [loading, setLoading] = useState(false);
  const [aiGeneratedSummary, setAIGeneratedSummary] = useState()
  const params = useParams();

  useEffect(() => {
    if (resumeInfo?.summary) {
      setSummary(resumeInfo.summary);
    }
  }, [resumeInfo]);

  const GenerateSummaryFromAI = async () => {
    if (!resumeInfo?.jobTitle) {
      toast.error('Please add a job title first');
      return;
    }
    
    setLoading(true)
    try {
      const PROMPT = prompt.replace('{jobTitle}', resumeInfo.jobTitle)
      const result = await AIChatSession.sendMessage(PROMPT)
      const response = JSON.parse(result.response.text())
      setAIGeneratedSummary(response)
      toast.success('AI generated summary suggestions ready!')
    } catch (error) {
      console.error('Error generating summary:', error)
      toast.error('Failed to generate summary suggestions')
    } finally {
      setLoading(false)
    }
  }

  const onSave = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const data = {
        data: {
          summary: summary
        }
      }
      const response = await GlobalApi.updateResumeDetail(params?.resumeId, data)
      if (response.data) {
        // Update both local state and context
        setResumeInfo(prev => ({
          ...prev,
          summary: summary
        }));
        enableNext(true);
        toast.success("Summary updated successfully")
      } else {
        throw new Error('Failed to update summary')
      }
    } catch (error) {
      console.error('Error updating summary:', error)
      toast.error(error.message || 'Failed to update summary')
    } finally {
      setLoading(false);
    }
  }

  const handleSummaryChange = (e) => {
    const newSummary = e.target.value;
    setSummary(newSummary);
    // Update context immediately for preview
    setResumeInfo(prev => ({
      ...prev,
      summary: newSummary
    }));
  }

  return (
    <div>
      <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10 dark:shadow-[0_0_10px_rgba(144,238,144,0.2)] dark:shadow-[0_0_30px_rgba(144,238,144,0.1)]'>
        <h2 className='font-bold text-lg'>Professional Summary</h2>
        <p>Write a compelling summary of your professional experience</p>

        <form className='mt-7' onSubmit={onSave}>
          <div className='flex justify-between items-end'>
            <label>Add Summary</label>
            <Button 
              variant="outline" 
              onClick={GenerateSummaryFromAI}
              type="button" 
              size="sm" 
              className="border-primary text-primary flex gap-2"
              disabled={loading}
            >
              {loading ? <LoaderCircle className='animate-spin' /> : <Brain className='h-4 w-4' />}
              Generate from AI
            </Button>
          </div>
          <Textarea 
            className="mt-5" 
            required
            value={summary}
            onChange={handleSummaryChange}
            placeholder="Write a compelling summary of your professional experience..."
          />
          <div className='mt-2 flex justify-end'>
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
            </Button>
          </div>
        </form>
      </div>

      {aiGeneratedSummary && (
        <div className='my-5'>
          <h2 className='font-bold text-lg'>AI Suggestions</h2>
          {aiGeneratedSummary.map((item, index) => (
            <div 
              key={index} 
              onClick={() => {
                setSummary(item.summary);
                // Update context when selecting an AI suggestion
                setResumeInfo(prev => ({
                  ...prev,
                  summary: item.summary
                }));
              }}
              className='p-5 shadow-lg my-4 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors'
            >
              <h2 className='font-bold my-1 text-primary'>Level: {item.experience_level}</h2>
              <p>{item.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Summary