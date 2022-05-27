
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import ShortHome from './pages/ShortHome'

// main app component with React Query Provider
export default function App () {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <ShortHome />
    </QueryClientProvider>
  )
}
