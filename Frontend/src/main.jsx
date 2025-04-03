import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignInPage from './auth/SignInPage.jsx'
import SignUpPage from './auth/SignUpPage.jsx'
import LandingPage from './pages/LandingPage.jsx'
import Deshboard from './pages/Deshboard.jsx'
import EditResume from './pages/resume/[resumeId]/edit/EditResume.jsx'
import ViewResume from './pages/ViewResume.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/dashboard',
        element: <Deshboard />
      },
      {
        path: '/dashboard/resume/:resumeId/edit',
        element: <EditResume />
      }
    ]
  },
  {
    path: '/',
    element: <LandingPage />
  },
  {
    path: '/auth/signin',
    element: <SignInPage />
  },
  {
    path: '/auth/signup',
    element: <SignUpPage />
  },
  {
    path: '/my-resume/:resumeId/view',
    element: <ViewResume />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider 
      clientId="13025145795-eoa1e1hkdg81tk3jomt4eksp46krne6o.apps.googleusercontent.com"
      onScriptLoadError={() => console.error('Failed to load Google OAuth script')}
      onScriptLoadSuccess={() => console.log('Google OAuth script loaded successfully')}
      auto_select={false}
      cancel_on_tap_outside={false}
      context="signin"
      ux_mode="popup"
      redirect_uri={window.location.origin}
      scope="email profile"
    >
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>,
)
