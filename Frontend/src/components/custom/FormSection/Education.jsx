import { ResumeContextInfo } from "@/context/ResumeContextInfo";
import GlobalApi from "@/service/GlobalApi";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const formField = {
  id: 0,
  universityName: '',
  startDate: '',
  endDate: '',
  degree: '',
  major: '',
  description: ''
}

function Education({ enableNext }) {
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeContextInfo);
  const params = useParams();
  const [educationalList, setEducationalList] = useState([]);

  useEffect(() => {
    if (resumeInfo?.education?.length > 0) {
      setEducationalList(resumeInfo.education);
    }
  }, [resumeInfo]);

  const handleChange = (event, index) => {
    const newEntries = educationalList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setEducationalList(newEntries);
    // Update context immediately for preview
    setResumeInfo(prev => ({
      ...prev,
      education: newEntries
    }));
  }

  const AddNewEducation = () => {
    const newId = educationalList.length > 0 
      ? Math.max(...educationalList.map(edu => edu.id)) + 1 
      : 1;
      
    const newEducation = {
      id: newId,
      universityName: '',
      degree: '',
      major: '',
      startDate: '',
      endDate: '',
      description: ''
    };
    
    const updatedList = [...educationalList, newEducation];
    setEducationalList(updatedList);
    // Update context immediately for preview
    setResumeInfo(prev => ({
      ...prev,
      education: updatedList
    }));
  }

  const RemoveEducation = () => {
    const updatedList = educationalList.slice(0, -1);
    setEducationalList(updatedList);
    // Update context immediately for preview
    setResumeInfo(prev => ({
      ...prev,
      education: updatedList
    }));
  }

  const onSave = async () => {
    setLoading(true);
    try {
      const data = {
        data: {
          education: educationalList
        }
      };
      
      const response = await GlobalApi.updateResumeDetail(params.resumeId, data);
      if (response.data) {
        setResumeInfo(prev => ({
          ...prev,
          education: educationalList
        }));
        enableNext(true);
        toast.success("Education details updated successfully");
      } else {
        throw new Error('Failed to update education details');
      }
    } catch (error) {
      console.error('Error updating education:', error);
      toast.error(error.message || 'Failed to update education details');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10 dark:shadow-[0_0_10px_rgba(144,238,144,0.2)] dark:shadow-[0_0_30px_rgba(144,238,144,0.1)]'>
      <h2 className='font-bold text-lg'>Education</h2>
      <p>Add Your educational details</p>

      <div>
        {educationalList.map((item, index) => (
          <div key={index}>
            <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
              <div className='col-span-2'>
                <label className='text-xs'>University Name</label>
                <Input name="universityName" 
                  onChange={(e) => handleChange(e, index)}
                  value={item?.universityName}
                  required
                />
              </div>
              <div>
                <label className='text-xs'>Degree</label>
                <Input name="degree" 
                  onChange={(e) => handleChange(e, index)}
                  value={item?.degree}
                  required
                />
              </div>
              <div>
                <label className='text-xs'>Major</label>
                <Input name="major" 
                  onChange={(e) => handleChange(e, index)}
                  value={item?.major}
                  required
                />
              </div>
              <div>
                <label className='text-xs'>Start Date</label>
                <Input type="date" name="startDate" 
                  onChange={(e) => handleChange(e, index)}
                  value={item?.startDate}
                  required
                />
              </div>
              <div>
                <label className='text-xs'>End Date</label>
                <Input type="date" name="endDate" 
                  onChange={(e) => handleChange(e, index)}
                  value={item?.endDate}
                  required
                />
              </div>
              <div className='col-span-2'>
                <label className='text-xs'>Description</label>
                <Textarea name="description" 
                  onChange={(e) => handleChange(e, index)}
                  value={item?.description}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='flex justify-between'>
        <div className='flex gap-2'>
          <Button variant="outline" onClick={AddNewEducation} className="text-primary"> + Add More Education</Button>
          <Button variant="outline" onClick={RemoveEducation} className="text-primary"> - Remove</Button>
        </div>
        <Button disabled={loading} onClick={onSave}>
          {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}    
        </Button>
      </div>
    </div>
  )
}

export default Education