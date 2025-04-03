import React from 'react'
import { Button } from './components/ui/button'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import Header from './components/custom/Header'
import { Toaster } from './components/ui/sonner'

function App() {
  const location = useLocation();
  const token = localStorage.getItem('token');

  // If there's no token and we're not on an auth page, redirect to sign in
  if (!token && !location.pathname.startsWith('/auth')) {
    return <Navigate to="/auth/signin" replace />;
  }

  // If there's a token and we're on an auth page, redirect to dashboard
  if (token && location.pathname.startsWith('/auth')) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <>
      <Header />
      <Outlet />
      <Toaster />
    </>
  )
}

export default App