import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignInPage from './auth/SignInPage.jsx'
import LandingPage from './pages/LandingPage.jsx'
import Deshboard from './pages/Deshboard.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import EditResume from './pages/resume/[resumeId]/edit/EditResume.jsx'
import ViewResume from './pages/ViewResume.jsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key")
}

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
    path: '/auth/signin/sso-callback',
    element: <SignInPage />
  },
  {
    path: '/auth/signup',
    element: <SignInPage />
  },
  {
    path: '/my-resume/:resumeId/view',
    element: <ViewResume />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider 
      publishableKey={PUBLISHABLE_KEY}
      appearance={{
        baseTheme: undefined,
        variables: {
          colorBackground: '#ffffff',
          colorInputBackground: '#ffffff',
          colorAlphaShade: 'rgba(0, 0, 0, 0.08)',
        },
      }}
      routing={{
        signInUrl: '/auth/signin',
        signUpUrl: '/auth/signup',
        afterSignInUrl: '/dashboard',
        afterSignUpUrl: '/dashboard',
      }}
    >
      <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>,
)
