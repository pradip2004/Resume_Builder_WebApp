import Header from '@/components/custom/Header'
import React from 'react'
import { Button } from '@/components/ui/button'
import { FileText, Sparkles, Palette, Share2, Download, Brain, Target } from 'lucide-react'
import { Link } from 'react-router-dom'

function LandingPage() {
  const features = [
    {
      icon: <Brain className="w-8 h-8 text-primary" />,
      title: "AI-Powered Resume Builder",
      description: "Let our AI craft professional resumes tailored to your job title and experience level."
    },
    {
      icon: <Target className="w-8 h-8 text-primary" />,
      title: "ATS Score Analysis",
      description: "Get instant feedback on your resume's ATS compatibility and suggestions for improvement."
    },
    {
      icon: <Palette className="w-8 h-8 text-primary" />,
      title: "Customizable Templates",
      description: "Choose from multiple modern templates and customize colors to match your style."
    },
    {
      icon: <Sparkles className="w-8 h-8 text-primary" />,
      title: "Smart Content Suggestions",
      description: "Get AI-powered suggestions for your summary, skills, and achievements."
    },
    {
      icon: <Share2 className="w-8 h-8 text-primary" />,
      title: "Easy Sharing",
      description: "Share your resume instantly with potential employers or download as PDF."
    }
  ]

  return (
    <div className="min-h-screen bg-background dark:bg-gray-900">
      <Header />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-screen-xl mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              <span className='dark:text-yellow-500'>Resume</span><span className='text-yellow-500 dark:text-gray-300'>GPT</span>
            </h1>
            <p className="text-xl font-winky md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Create professional resumes in minutes with the power of AI. Stand out to employers with beautifully crafted resumes.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/dashboard">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Get Started
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">
            Why Choose ResumeGPT?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 dark:shadow-[0_0_15px_rgba(144,238,144,0.1)]"
              >
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 font-winky dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 dark:text-white">
            Ready to Create Your Professional Resume?
          </h2>
          <p className="text-xl font-winky text-gray-600 dark:text-gray-300 mb-8">
            Join thousands of professionals who trust ResumeGPT for their resume needs.
          </p>
          <Link to="/dashboard">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Start Building Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LandingPage