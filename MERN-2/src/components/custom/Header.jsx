import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { UserButton, useUser } from '@clerk/clerk-react'

function Header() {
      const { user, isSignedIn } = useUser()
      return (
            <div className='p-3 shadow-md '>
                  <div className='max-w-screen-xl mx-auto flex items-center justify-between'>
                        <img src="/logo.svg" alt="" />

                        {isSignedIn ? 
                        <div className='flex items-center gap-5'>
                              <Link to={'/dashboard'}>
                                    <Button>Dashboard</Button>
                              </Link>
                              <UserButton/>
                        </div> : 
                        <Link to={'/auth/signin'}>
                              <Button>Get Started</Button>
                        </Link>}

                  </div>

            </div>
      )
}

export default Header