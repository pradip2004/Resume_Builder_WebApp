import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeContextInfo } from '@/context/ResumeContextInfo'
import GlobalApi from '@/service/GlobalApi'
import { Brain, LoaderCircle } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function Summary({ enabledNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeContextInfo)
  const [summery, setSummery] = useState()
  const [loading, setLoading] = useState(false);
  const params = useParams();
  useEffect(() => {
    summery && setResumeInfo({
      ...resumeInfo,
      summery: summery
    })
  }, [summery])



  const onSave = (e) => {
    e.preventDefault()

    setLoading(true)
    const data = {
      data: {
        summery: summery
      }
    }
    GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(resp => {
      console.log(resp);
      enabledNext(true);
      setLoading(false);
      toast("Details updated")
    }, (error) => {
      setLoading(false);
    })
  }
  return (
    <div>
      <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Personal Detail</h2>
        <p>Get Started with the basic information</p>

        <form className='mt-7' onSubmit={onSave}>
          <div className='flex justify-between items-end'>
            <label>Add Summery</label>
            <Button variant="outline"
              type="button" size="sm" className="border-primary text-primary flex gap-2">
              <Brain className='h-4 w-4' />  Generate from AI</Button>
          </div>
          <Textarea className="mt-5" required
          value={summery}
          defaultValue={summery?summery:resumeInfo?.summery}
            onChange={(e) => setSummery(e.target.value)}
          />
          <div className='mt-2 flex justify-end'>
            <Button type="submit"
            disabled={loading}
            >
              {loading?<LoaderCircle className='animate-spin' />:'Save'}
              
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Summary