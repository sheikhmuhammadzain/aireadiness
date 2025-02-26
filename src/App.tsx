import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RootLayout } from './layouts/RootLayout'
import { ErrorBoundary } from './components/ErrorBoundary'
import { LoadingSpinner } from './components/LoadingSpinner'
import { useAssessmentStore } from './store/assessment'
import { logger } from './lib/logger'
import './styles/globals.css'

// Lazy load components for better performance
const Home = React.lazy(() => import('./pages/Home').then(module => ({ default: module.Home })))
const Assessment = React.lazy(() => import('./pages/Assessment').then(module => ({ default: module.Assessment })))
const Results = React.lazy(() => import('./pages/Results').then(module => ({ default: module.Results })))
const BestPractices = React.lazy(() => import('./pages/BestPractices').then(module => ({ default: module.BestPractices })))
const Documentation = React.lazy(() => import('./pages/Documentation').then(module => ({ default: module.Documentation })))
const OrganizationProfileForm = React.lazy(() => 
  import('./components/OrganizationProfileForm').then(module => ({ default: module.OrganizationProfileForm }))
)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
      retry: 3,
      refetchOnWindowFocus: false,
      onError: (error) => {
        logger.error('Query error:', error as Error)
      }
    },
  },
})

interface ProtectedRouteProps {
  children: React.ReactNode
  requiresProfile?: boolean
  requiresAssessment?: boolean
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiresProfile = true,
  requiresAssessment = false,
}) => {
  const { organizationProfile, isComplete } = useAssessmentStore()
  const location = useLocation()

  if (requiresProfile && !organizationProfile) {
    logger.warn('Attempted to access protected route without profile', { path: location.pathname })
    return <Navigate to="/profile" replace state={{ from: location }} />
  }

  if (requiresAssessment && !isComplete) {
    logger.warn('Attempted to access results without completing assessment', { path: location.pathname })
    return <Navigate to="/assessment" replace />
  }

  return <>{children}</>
}

const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <LoadingSpinner size="lg" />
  </div>
)

function App() {
  React.useEffect(() => {
    logger.info('Application started')
  }, [])

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Router>
          <RootLayout>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<OrganizationProfileForm />} />
                <Route 
                  path="/assessment" 
                  element={
                    <ProtectedRoute>
                      <Assessment />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/results" 
                  element={
                    <ProtectedRoute requiresAssessment>
                      <Results />
                    </ProtectedRoute>
                  } 
                />
                <Route path="/best-practices" element={<BestPractices />} />
                <Route path="/documentation" element={<Documentation />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </RootLayout>
        </Router>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

export default App