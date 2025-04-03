import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState } from 'react'
import RichTextEditor from '../RichTextEditor';
import { LoaderCircle } from 'lucide-react';
import GlobalApi from '@/service/GlobalApi';
import { toast } from 'sonner';
import { ResumeContextInfo } from '@/context/ResumeContextInfo';
import { useParams } from 'react-router-dom';

const formField = {
  id: 0,
  title: '',
  companyName: '',
  city: '',
  state: '',
  startDate: '',
  endDate: '',
  currentlyWorking: false,
  workSummary: '',
}

function Experience({ enableNext }) {
  const [experienceList, setExperienceList] = useState([]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeContextInfo);
  const params = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (resumeInfo?.experience?.length > 0) {
      setExperienceList(resumeInfo.experience);
    }
  }, [resumeInfo]);

  const handleChange = (index, event) => {
    const newEntries = experienceList.slice();
    const { name, value, type, checked } = event.target;
    newEntries[index][name] = type === 'checkbox' ? checked : value;
    setExperienceList(newEntries);
    // Update context immediately for preview
    setResumeInfo(prev => ({
      ...prev,
      experience: newEntries
    }));
  }

  const AddNewExperience = () => {
    const newId = experienceList.length > 0 
      ? Math.max(...experienceList.map(exp => exp.id)) + 1 
      : 1;
    
    const newExperience = {
      id: newId,
      title: '',
      companyName: '',
      city: '',
      state: '',
      startDate: '',
      endDate: '',
      currentlyWorking: false,
      workSummery: '',
    }
    
    const updatedList = [...experienceList, newExperience];
    setExperienceList(updatedList);
    // Update context immediately for preview
    setResumeInfo(prev => ({
      ...prev,
      experience: updatedList
    }));
  }

  const RemoveExperience = () => {
    const updatedList = experienceList.slice(0, -1);
    setExperienceList(updatedList);
    // Update context immediately for preview
    setResumeInfo(prev => ({
      ...prev,
      experience: updatedList
    }));
  }

  const handleRichTextEditor = (e, name, index) => {
    const newEntries = experienceList.slice();
    newEntries[index][name] = e.target.value;
    setExperienceList(newEntries);
    // Update context immediately for preview
    setResumeInfo(prev => ({
      ...prev,
      experience: newEntries
    }));
  }

  const onSave = async () => {
    setLoading(true);
    try {
      const data = {
        data: {
          experience: experienceList
        }
      }

      const response = await GlobalApi.updateResumeDetail(params?.resumeId, data);
      if (response.data) {
        setResumeInfo(prev => ({
          ...prev,
          experience: experienceList
        }));
        enableNext(true);
        toast.success("Experience details updated successfully");
      } else {
        throw new Error('Failed to update experience details');
      }
    } catch (error) {
      console.error('Error updating experience:', error);
      toast.error(error.message || 'Failed to update experience details');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10 dark:shadow-[0_0_10px_rgba(144,238,144,0.2)] dark:shadow-[0_0_30px_rgba(144,238,144,0.1)]'>
        <h2 className='font-bold text-lg'>Professional Experience</h2>
        <p>Add Your previous Job experience</p>
        <div>
          {experienceList.map((item, index) => (
            <div key={index}>
              <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                <div>
                  <label className='text-xs'>Position Title</label>
                  <Input name="title" 
                    onChange={(event) => handleChange(index, event)}
                    value={item?.title}
                    required
                  />
                </div>
                <div>
                  <label className='text-xs'>Company Name</label>
                  <Input name="companyName" 
                    onChange={(event) => handleChange(index, event)}
                    value={item?.companyName}
                    required
                  />
                </div>
                <div>
                  <label className='text-xs'>City</label>
                  <Input name="city" 
                    onChange={(event) => handleChange(index, event)} 
                    value={item?.city}
                    required
                  />
                </div>
                <div>
                  <label className='text-xs'>State</label>
                  <Input name="state" 
                    onChange={(event) => handleChange(index, event)}
                    value={item?.state}
                    required
                  />
                </div>
                <div>
                  <label className='text-xs'>Start Date</label>
                  <Input type="date"  
                    name="startDate" 
                    onChange={(event) => handleChange(index, event)} 
                    value={item?.startDate}
                    required
                  />
                </div>
                <div>
                  <label className='text-xs'>End Date</label>
                  <Input type="date" name="endDate" 
                    onChange={(event) => handleChange(index, event)} 
                    value={item?.endDate}
                    disabled={item?.currentlyWorking}
                    required={!item?.currentlyWorking}
                  />
                </div>
                <div className='col-span-2 flex items-center gap-2'>
                  <input 
                    type="checkbox" 
                    name="currentlyWorking" 
                    checked={item?.currentlyWorking}
                    onChange={(event) => handleChange(index, event)}
                    className="h-4 w-4"
                  />
                  <label className='text-xs'>Currently Working</label>
                </div>
                <div className='col-span-2'>
                  <RichTextEditor
                    index={index}
                    defaultValue={item?.workSummary}
                    onRichTextEditorChange={(event) => handleRichTextEditor(event, 'workSummery', index)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='flex justify-between'>
          <div className='flex gap-2'>
            <Button variant="outline" onClick={AddNewExperience} className="text-primary"> + Add More Experience</Button>
            <Button variant="outline" onClick={RemoveExperience} className="text-primary"> - Remove</Button>
          </div>
          <Button disabled={loading} onClick={onSave}>
            {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}    
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Experience