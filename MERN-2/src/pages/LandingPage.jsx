import Header from '@/components/custom/Header'
import React from 'react'

function LandingPage() {
  
  return (
    <div className="min-h-screen bg-background dark:bg-gray-900">
      <Header />
      <div className="max-w-screen-xl mx-auto p-4">
        <h1 className="text-4xl font-bold dark:text-white">Landing Page</h1>
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          Welcome to our AI Resume Builder. Create professional resumes in minutes!
        </p>
      </div>
    </div>

    
  )
}

export default LandingPage