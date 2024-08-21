import React from 'react'
import { Button } from './components/ui/button'
import { Navigate, Outlet } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import Header from './components/custom/Header'

function App() {
  const {user, isLoaded, isSignedIn} = useUser()

  if(!isSignedIn && isLoaded){
    return <Navigate to={'/auth/signin'} />
  }
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default App