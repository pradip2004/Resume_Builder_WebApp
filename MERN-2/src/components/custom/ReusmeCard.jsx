import { BookText, Download, Share2, Trash2, Edit } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import GlobalApi from '@/service/GlobalApi'
import { toast } from 'sonner'

function ReusmeCard({ resume, onDelete = null }) {
  const [showButtons, setShowButtons] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation(); // Stop event bubbling
    
    try {
      setIsDeleting(true);
      await GlobalApi.deleteResumeById(resume._id);
      toast.success('Resume deleted successfully');
      if (typeof onDelete === 'function') {
        onDelete(resume._id);
      }
    } catch (error) {
      console.error('Error deleting resume:', error);
      toast.error('Failed to delete resume');
    } finally {
      setIsDeleting(false);
    }
  }

  const handleShare = (e) => {
    e.preventDefault(); // Prevent navigation
    navigate(`/my-resume/${resume._id}/view`);
  }

  const handleDownload = (e) => {
    e.preventDefault(); // Prevent navigation
    navigate(`/my-resume/${resume._id}/view`);
  }

  return (
    <div className="relative">
      <Link to={'/dashboard/resume/'+resume._id+"/edit"}>
        <div 
          className='relative px-16 py-32 bg-gradient-to-r from-[#74ebd5] to-[#acb6e5] flex flex-col items-center justify-center rounded-lg hover:scale-105 hover:shadow-lg cursor-pointer border-black transition-all h-[240px]'
          onMouseEnter={() => setShowButtons(true)}
          onMouseLeave={() => setShowButtons(false)}
        >
          <BookText className='w-10 h-10 text-gray-600 mb-4' />
          <h2 className='text-center text-gray-600 text-lg font-medium'>{resume.title}</h2>
          
          {/* Hover Buttons */}
          {showButtons && (
            <div className='absolute inset-0 flex items-center justify-center gap-2 bg-black/20 rounded-lg'>
              <Button 
                variant="secondary" 
                size="icon"
                className="bg-white/90 hover:bg-white"
                onClick={handleDownload}
              >
                <Download className="h-4 w-4" />
              </Button>
              <Button 
                variant="secondary" 
                size="icon"
                className="bg-white/90 hover:bg-white"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4" />
              </Button>
              <Button 
                variant="secondary" 
                size="icon"
                className="bg-white/90 hover:bg-white"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button 
                variant="secondary" 
                size="icon"
                className="bg-white/90 hover:bg-white"
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </Link>
    </div>
  )
}

export default ReusmeCard