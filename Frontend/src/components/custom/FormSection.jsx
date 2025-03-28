import React, { useContext, useState } from 'react'
import PersonalDetails from './FormSection/PersonalDetails'
import { Button } from '../ui/button'
import { ArrowLeft, ArrowRight, Home, LayoutGrid } from 'lucide-react'
import Summary from './FormSection/Summary';
import Experience from './FormSection/Experience';
import Education from './FormSection/Education';
import Skills from './FormSection/Skills';
import Achievement from './FormSection/Achievement';
import { Link, Navigate, useParams } from 'react-router-dom';
import ThemeColor from './ThemeColor';
import ATSScore from './FormSection/ATSScore';

function FormSection() {

  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(false)

  const { resumeId } = useParams();
  return (
    <div>
      <div className='flex justify-between items-center'>
        <div className='flex gap-2 items-center'>
          <Link to='/dashboard'>
            <Button>
              <Home />
            </Button>
          </Link>
          <ThemeColor />
        </div>
        <div className='flex gap-2'>
          {activeFormIndex > 1
            && <Button onClick={() => setActiveFormIndex(activeFormIndex - 1)} size="sm">
              <ArrowLeft />
            </Button>}
          <Button className="flex gap-2" size="sm"
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}

          >
            Next <ArrowRight />
          </Button>
        </div>
      </div>
      {/* personal details  */}
      {activeFormIndex == 1 ? <PersonalDetails enableNext={(v) => setEnableNext(v)} /> :
        activeFormIndex == 2 ? <Summary enableNext={(v) => setEnableNext(v)} /> :
          activeFormIndex == 3 ? <Experience enableNext={(v) => setEnableNext(v)} /> :
            activeFormIndex == 4 ? <Education enableNext={(v) => setEnableNext(v)} /> :
              activeFormIndex == 5 ? <Skills enableNext={(v) => setEnableNext(v)} /> :
                activeFormIndex == 6 ? <Achievement enableNext={(v) => setEnableNext(v)} /> :
                  activeFormIndex == 7 ? <ATSScore enableNext={(v) => setEnableNext(v)} /> :
                    activeFormIndex == 8 ? <Navigate to={`/my-resume/${resumeId}/view`} /> : null}


    </div>
  )
}

export default FormSection