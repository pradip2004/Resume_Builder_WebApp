import React, { useContext, useState } from 'react'
import PersonalDetails from './FormSection/PersonalDetails'
import { Button } from '../ui/button'
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react'
import Summary from './FormSection/Summary';

function FormSection() {

  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(false)


  return (
    <div>
      <div className='flex justify-between items-center'>
        <Button variant="outline" size="sm" className="flex gap-2"><LayoutGrid />Theme</Button>
        <div className='flex gap-2'>
          {activeFormIndex > 1
            && <Button onClick={()=>setActiveFormIndex(activeFormIndex-1)} size="sm">
              <ArrowLeft />
            </Button>}
          <Button className="flex gap-2" size="sm"
            onClick={()=>setActiveFormIndex(activeFormIndex+1)}
            disabled={!enableNext}
          >
            Next <ArrowRight />
          </Button>
        </div>
      </div>
      {/* personal details  */}
      {activeFormIndex == 1 ? <PersonalDetails enableNext={(v)=>setEnableNext(v)}/> : null}
      {/* summary  */}
      {activeFormIndex == 2 ? <Summary enableNext={(v)=>setEnableNext(v)}/> : null}
      {/* Experience  */}

      {/* Educational Details  */}

      {/* Skills  */}
    </div>
  )
}

export default FormSection