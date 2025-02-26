import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RootLayout } from './layouts/RootLayout'
import { Home } from './pages/Home'
import { Assessment } from './pages/Assessment'
import { Results } from './pages/Results'
import { OrganizationProfileForm } from './components/OrganizationProfileForm'
import { useAssessmentStore } from './store/assessment'
import './styles/globals.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
    },
  },
})

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { organizationProfile } = useAssessmentStore();
  
  if (!organizationProfile) {
    return <Navigate to="/profile" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <RootLayout>
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
                <ProtectedRoute>
                  <Results />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </RootLayout>
      </Router>
    </QueryClientProvider>
  )
}

export default App