import React, { useContext, useEffect, useState } from 'react'
import { ResumeContextInfo } from '@/context/ResumeContextInfo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { LoaderCircle, Plus, Trash2 } from 'lucide-react'
import GlobalApi from '@/service/GlobalApi'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

function Achievement({ enableNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeContextInfo)
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const [achievements, setAchievements] = useState([])
  const [certificates, setCertificates] = useState([])

  useEffect(() => {
    if (resumeInfo?.achievements) {
      setAchievements(resumeInfo.achievements)
    }
    if (resumeInfo?.certificates) {
      setCertificates(resumeInfo.certificates)
    }
  }, [resumeInfo])

  const addAchievement = () => {
    const newAchievement = {
      title: '',
      description: '',
      date: ''
    }
    const updatedAchievements = [...achievements, newAchievement]
    setAchievements(updatedAchievements)
    // Update context immediately for preview
    setResumeInfo(prev => ({
      ...prev,
      achievements: updatedAchievements
    }))
  }

  const addCertificate = () => {
    const newCertificate = {
      title: '',
      issuer: '',
      date: '',
      link: ''
    }
    const updatedCertificates = [...certificates, newCertificate]
    setCertificates(updatedCertificates)
    // Update context immediately for preview
    setResumeInfo(prev => ({
      ...prev,
      certificates: updatedCertificates
    }))
  }

  const removeAchievement = (index) => {
    const newAchievements = achievements.filter((_, i) => i !== index)
    setAchievements(newAchievements)
    // Update context immediately for preview
    setResumeInfo(prev => ({
      ...prev,
      achievements: newAchievements
    }))
  }

  const removeCertificate = (index) => {
    const newCertificates = certificates.filter((_, i) => i !== index)
    setCertificates(newCertificates)
    // Update context immediately for preview
    setResumeInfo(prev => ({
      ...prev,
      certificates: newCertificates
    }))
  }

  const updateAchievement = (index, field, value) => {
    const newAchievements = [...achievements]
    newAchievements[index] = {
      ...newAchievements[index],
      [field]: value
    }
    setAchievements(newAchievements)
    // Update context immediately for preview
    setResumeInfo(prev => ({
      ...prev,
      achievements: newAchievements
    }))
  }

  const updateCertificate = (index, field, value) => {
    const newCertificates = [...certificates]
    newCertificates[index] = {
      ...newCertificates[index],
      [field]: value
    }
    setCertificates(newCertificates)
    // Update context immediately for preview
    setResumeInfo(prev => ({
      ...prev,
      certificates: newCertificates
    }))
  }

  const onSave = async () => {
    setLoading(true)
    try {
      const data = {
        data: {
          achievements: achievements,
          certificates: certificates
        }
      }

      const response = await GlobalApi.updateResumeDetail(params?.resumeId, data)
      if (response.data) {
        setResumeInfo(prev => ({
          ...prev,
          achievements: achievements,
          certificates: certificates
        }))
        enableNext(true)
        toast.success("Details updated successfully")
      } else {
        throw new Error('Failed to update details')
      }
    } catch (error) {
      console.error('Error updating details:', error)
      toast.error(error.message || 'Failed to update details')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10 dark:shadow-[0_0_10px_rgba(144,238,144,0.2)] dark:shadow-[0_0_30px_rgba(144,238,144,0.1)]'>
      <h2 className='font-bold text-lg'>Achievements and Certificates</h2>
      <p>Add Your achievements and certificates details</p>

      {/* Achievements Section */}
      <div className="mt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">Achievements</h3>
          <Button variant="outline" size="sm" onClick={addAchievement} className="text-primary">
            <Plus className="h-4 w-4 mr-2" /> Add Achievement
          </Button>
        </div>
        {achievements.map((achievement, index) => (
          <div key={index} className="border p-4 rounded-lg mb-4">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium">Achievement {index + 1}</h4>
              <Button variant="ghost" size="sm" onClick={() => removeAchievement(index)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-sm">Title</label>
                <Input
                  value={achievement.title}
                  onChange={(e) => updateAchievement(index, 'title', e.target.value)}
                  placeholder="Enter achievement title"
                  required
                />
              </div>
              <div>
                <label className="text-sm">Description</label>
                <Textarea
                  value={achievement.description}
                  onChange={(e) => updateAchievement(index, 'description', e.target.value)}
                  placeholder="Enter achievement description"
                  required
                />
              </div>
              <div>
                <label className="text-sm">Date</label>
                <Input
                  type="date"
                  value={achievement.date}
                  onChange={(e) => updateAchievement(index, 'date', e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Certificates Section */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">Certificates</h3>
          <Button variant="outline" size="sm" onClick={addCertificate} className="text-primary">
            <Plus className="h-4 w-4 mr-2" /> Add Certificate
          </Button>
        </div>
        {certificates.map((certificate, index) => (
          <div key={index} className="border p-4 rounded-lg mb-4">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium">Certificate {index + 1}</h4>
              <Button variant="ghost" size="sm" onClick={() => removeCertificate(index)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-sm">Title</label>
                <Input
                  value={certificate.title}
                  onChange={(e) => updateCertificate(index, 'title', e.target.value)}
                  placeholder="Enter certificate title"
                  required
                />
              </div>
              <div>
                <label className="text-sm">Issuer</label>
                <Input
                  value={certificate.issuer}
                  onChange={(e) => updateCertificate(index, 'issuer', e.target.value)}
                  placeholder="Enter certificate issuer"
                  required
                />
              </div>
              <div>
                <label className="text-sm">Date</label>
                <Input
                  type="date"
                  value={certificate.date}
                  onChange={(e) => updateCertificate(index, 'date', e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-sm">Certificate Link</label>
                <Input
                  value={certificate.link}
                  onChange={(e) => updateCertificate(index, 'link', e.target.value)}
                  placeholder="Enter certificate link"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <Button onClick={onSave} disabled={loading}>
          {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
        </Button>
      </div>
    </div>
  )
}

export default Achievement