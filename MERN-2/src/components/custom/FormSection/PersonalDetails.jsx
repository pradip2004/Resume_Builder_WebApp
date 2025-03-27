import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ResumeContextInfo } from '@/context/ResumeContextInfo'
import GlobalApi from '@/service/GlobalApi'
import { LoaderCircle } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

function PersonalDetails({enableNext}) {
  const {resumeInfo, setResumeInfo} = useContext(ResumeContextInfo)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    jobTitle: '',
    address: '',
    phone: '',
    email: ''
  });
  const [loading, setLoading] = useState(false)
  const params = useParams();

  useEffect(() => {
    if (resumeInfo) {
      setFormData({
        firstName: resumeInfo.firstName || '',
        lastName: resumeInfo.lastName || '',
        jobTitle: resumeInfo.jobTitle || '',
        address: resumeInfo.address || '',
        phone: resumeInfo.phone || '',
        email: resumeInfo.email || ''
      });
    }
  }, [resumeInfo]);

  const handleInputChange = (e) => {
    enableNext(false)
    const {name, value} = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const onSave = (e) => {
    e.preventDefault()
    setLoading(true);
    const data = {
      data: formData
    }
    GlobalApi.updateResumeDetail(params?.resumeId, data).then(res =>{
      setResumeInfo(prev => ({
        ...prev,
        ...formData
      }));
      enableNext(true);
      setLoading(false);
      toast("Detail updated successfully")
    })
  }

  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
         <h2 className='font-bold text-lg'>Personal Detail</h2>
         <p>Get Started with the basic information</p>

         <form onSubmit={onSave}>
            <div className='grid grid-cols-2 mt-5 gap-3'>
                <div>
                    <label className='text-sm'>First Name</label>
                    <Input name="firstName" value={formData.firstName} required onChange={handleInputChange}  />
                </div>
                <div>
                    <label className='text-sm'>Last Name</label>
                    <Input name="lastName" value={formData.lastName} required onChange={handleInputChange} />
                </div>
                <div className='col-span-2'>
                    <label className='text-sm'>Job Title</label>
                    <Input name="jobTitle" value={formData.jobTitle} required onChange={handleInputChange} />
                </div>
                <div className='col-span-2'>
                    <label className='text-sm'>Address</label>
                    <Input name="address" value={formData.address} required onChange={handleInputChange} />
                </div>
                <div>
                    <label className='text-sm'>Phone</label>
                    <Input name="phone" value={formData.phone} required onChange={handleInputChange} />
                </div>
                <div>
                    <label className='text-sm'>Email</label>
                    <Input name="email" value={formData.email} required onChange={handleInputChange} />
                </div>
            </div>
            <div className='mt-3 flex justify-end'>
                <Button type="submit">
                    {loading?<LoaderCircle className='animate-spin' />:'Save'}
                </Button>
            </div>
        </form>
    </div>
  )
}

export default PersonalDetails