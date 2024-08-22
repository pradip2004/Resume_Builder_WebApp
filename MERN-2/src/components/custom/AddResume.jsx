import { Loader2, PlusCircleIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
      Dialog,
      DialogContent,
      DialogDescription,
      DialogHeader,
      DialogTitle,
      DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/clerk-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
function AddResume() {
      const [open, setOpen] = useState(false)
      const [resumeTitle, setResumeTitle] = useState()
      const { user } = useUser();
      const [loading, setLoading] = useState(false)
      const navigate = useNavigate();
      const onCreate = async () => {
            setLoading(true)
            try {
                  const existingUserResponse = await axios.get('http://localhost:3000/api/v1/user', {
                        params: { email: user.primaryEmailAddress?.emailAddress }
                  });

                  if (!existingUserResponse.data) {
                        await axios.post('http://localhost:3000/api/v1/user', {
                              name: user?.fullName,
                              email: user.primaryEmailAddress?.emailAddress,
                        });
                  }


                  const resumeResponse = await axios.post('http://localhost:3000/api/v1/userResume', {
                        title: resumeTitle,
                        email: user?.primaryEmailAddress?.emailAddress, 
                  });


                  console.log('Resume created successfully', resumeResponse.data);
                  setOpen(false);
                  setLoading(false);
                  navigate('/dashboard/resume/'+resumeResponse.data.resumeId+"/edit")
            } catch (error) {
                  console.error('Error creating resume:', error);
            }
      }

      return (
            <div>
                  <div className='px-16 py-32 bg-gray-400 flex items-center justify-center rounded-lg hover:scale-105 hover:shadow-lg cursor-pointer border-dashed transition-all h-[240px]' onClick={() => setOpen(true)}>

                        <PlusCircleIcon />
                  </div>

                  <Dialog open={open}>
                        <DialogContent>
                              <DialogHeader>
                                    <DialogTitle>Create New Resume</DialogTitle>
                                    <DialogDescription className="mt-10">
                                          <p>Add a title to your Resume</p>
                                          <Input className="my-2" placeholder="Ex: Full Stack Resume" onChange={(e) => setResumeTitle(e.target.value)} />
                                    </DialogDescription>
                                    <div className='flex items-center justify-end gap-3 mt-5'>
                                          <Button variant="ghost" onClick={() => setOpen(false)}>cancel</Button>
                                          <Button disabled={!resumeTitle || loading} onClick={() => onCreate()}>
                                               {(loading) ? <Loader2 className='animate-spin'/> : 'create'}
                                          </Button>
                                    </div>
                              </DialogHeader>

                        </DialogContent>
                  </Dialog>
            </div>
      )
}

export default AddResume