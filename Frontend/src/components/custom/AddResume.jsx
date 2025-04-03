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
import GlobalApi from '@/service/GlobalApi';
import { useNavigate } from 'react-router-dom'

function AddResume() {
      const [open, setOpen] = useState(false)
      const [resumeTitle, setResumeTitle] = useState()
      const [loading, setLoading] = useState(false)
      const navigate = useNavigate();
      const [user, setUser] = useState(null);

      useEffect(() => {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                  setUser(JSON.parse(storedUser));
            }
      }, []);

      const onCreate = async () => {
            if (!user) return;
            
            setLoading(true)
            try {
                  const resumeResponse = await GlobalApi.createResume({
                        title: resumeTitle,
                        email: user.email
                  });

                  console.log('Resume created successfully', resumeResponse.data);
                  setOpen(false);
                  setLoading(false);
                  navigate('/dashboard/resume/'+resumeResponse.data.resumeId+"/edit")
            } catch (error) {
                  console.error('Error creating resume:', error);
                  setLoading(false);
            }
      }

      return (
            <div>
                  <div className='relative px-16 py-32 bg-gradient-to-r from-[#74ebd5] to-[#acb6e5] flex flex-col items-center justify-center rounded-lg hover:scale-105 hover:shadow-lg cursor-pointer border-black transition-all h-[240px]' onClick={() => setOpen(true)}>
                        <PlusCircleIcon className='w-10 h-10 text-gray-600 mb-4' />
                        <h2 className='text-center text-gray-600 text-lg font-medium'>Create New Resume</h2>
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