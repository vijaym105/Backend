import React from 'react'
import { RouterProvider } from 'react-router'
import AppRouter from './AppRouter'
import { AuthProvider } from './features/auth/auth.context'


const App = () => {
  return (
    <AuthProvider>
    <AppRouter />
    </AuthProvider>
    
  )
}

export default App