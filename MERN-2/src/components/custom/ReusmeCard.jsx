import React from 'react'
import { Link } from 'react-router-dom'

function ReusmeCard({ resume }) {
  return (
    <Link to={'/dashboard/resume/'+resume._id+"/edit"}>
      <div className='px-16 py-32 bg-gray-400 flex items-center justify-center rounded-lg hover:scale-105 hover:shadow-lg cursor-pointer border-black transition-all'>

      </div>
      <h2 className='mt-3 text-center text-gray-600 text-lg'>{resume.title}</h2>

    </Link>
  )
}

export default ReusmeCard