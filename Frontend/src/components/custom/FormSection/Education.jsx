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

function Education() {
  const [loading,setLoading]=useState(false);
  const {resumeInfo,setResumeInfo}=useContext(ResumeContextInfo);
  const params=useParams();
  const [educationalList,setEducationalList]=useState([]);

  useEffect(()=>{
    resumeInfo?.education?.length > 0 && setEducationalList(resumeInfo?.education)
  },[])

  const handleChange=(event,index)=>{
    const newEntries=educationalList.slice();
    const {name,value}=event.target;
    newEntries[index][name]=value;
    setEducationalList(newEntries);
  }

  const AddNewEducation=()=>{
    const newId = educationalList.length > 0 
      ? Math.max(...educationalList.map(edu => edu.id)) + 1 
      : 1;
      
    setEducationalList([...educationalList,
      {
        id: newId,
        universityName:'',
        degree:'',
        major:'',
        startDate:'',
        endDate:'',
        description:''
      }
    ])
  }

  const RemoveEducation=()=>{
    setEducationalList(educationalList=>educationalList.slice(0,-1))
  }

  const onSave=()=>{
    setLoading(true)
    const data={
      data:{
        education: educationalList
      }
    }

    GlobalApi.updateResumeDetail(params.resumeId,data).then(resp=>{
      console.log(resp);
      setLoading(false)
      toast('Details updated !')
    },(error)=>{
      setLoading(false);
      toast('Server Error, Please try again!')
    })
  }

  useEffect(()=>{
    setResumeInfo({
      ...resumeInfo,
      education:educationalList
    })
  },[educationalList])

  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10 dark:shadow-[0_0_10px_rgba(144,238,144,0.2)] dark:shadow-[0_0_30px_rgba(144,238,144,0.1)]'>
      <h2 className='font-bold text-lg'>Education</h2>
      <p>Add Your educational details</p>

      <div>
        {educationalList.map((item,index)=>(
          <div key={index}>
            <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
              <div className='col-span-2'>
                <label className='text-xs'>University Name</label>
                <Input name="universityName" 
                onChange={(e)=>handleChange(e,index)}
                defaultValue={item?.universityName}
                required
                />
              </div>
              <div>
                <label className='text-xs'>Degree</label>
                <Input name="degree" 
                onChange={(e)=>handleChange(e,index)}
                defaultValue={item?.degree}
                required
                />
              </div>
              <div>
                <label className='text-xs'>Major</label>
                <Input name="major" 
                onChange={(e)=>handleChange(e,index)}
                defaultValue={item?.major}
                required
                />
              </div>
              <div>
                <label className='text-xs'>Start Date</label>
                <Input type="date" name="startDate" 
                onChange={(e)=>handleChange(e,index)}
                defaultValue={item?.startDate}
                required
                />
              </div>
              <div>
                <label className='text-xs'>End Date</label>
                <Input type="date" name="endDate" 
                onChange={(e)=>handleChange(e,index)}
                defaultValue={item?.endDate}
                required
                />
              </div>
              <div className='col-span-2'>
                <label className='text-xs'>Description</label>
                <Textarea name="description" 
                onChange={(e)=>handleChange(e,index)}
                defaultValue={item?.description} />
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
        <Button disabled={loading} onClick={()=>onSave()}>
          {loading?<LoaderCircle className='animate-spin' />:'Save'}    
        </Button>
      </div>
    </div>
  )
}

export default Education