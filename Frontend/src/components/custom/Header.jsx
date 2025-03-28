import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { UserButton, useUser } from '@clerk/clerk-react'
import { Moon, Sun } from 'lucide-react'

function Header() {
      const { user, isSignedIn } = useUser()
      const [theme, setTheme] = useState('light')

      useEffect(() => {
            // Check for saved theme preference
            const savedTheme = localStorage.getItem('theme') || 'light'
            setTheme(savedTheme)
            document.documentElement.classList.toggle('dark', savedTheme === 'dark')
      }, [])

      const toggleTheme = () => {
            const newTheme = theme === 'light' ? 'dark' : 'light'
            setTheme(newTheme)
            localStorage.setItem('theme', newTheme)
            document.documentElement.classList.toggle('dark')
      }

      return (
            <div className='p-3 shadow-md dark:bg-gray-900 dark:text-white'>
                  <div className='max-w-screen-xl mx-auto flex items-center justify-between'>
                        <Link to={'/'}>
                              <img src="/ResumeGPTDark.png" alt="" className='dark:invert w-52' />
                        </Link>

                        <div className='flex items-center gap-5'>
                              <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={toggleTheme}
                                    className="relative h-9 w-9 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                              >
                                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                    <span className="sr-only">Toggle theme</span>
                              </Button>

                              {isSignedIn ?
                                    <div className='flex items-center gap-5'>
                                          <Link to={'/dashboard'}>
                                                <Button>Dashboard</Button>
                                          </Link>
                                          <UserButton />
                                    </div> :
                                    <Link to={'/auth/signin'}>
                                          <Button>Get Started</Button>
                                    </Link>}

                        </div>

                  </div>

            </div>
      )
}

export default Header