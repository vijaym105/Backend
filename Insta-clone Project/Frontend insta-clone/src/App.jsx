import React from 'react'
import { RouterProvider } from 'react-router'
import AppRouter from './AppRouter'
import { AuthProvider } from './features/auth/auth.context'
import './style.scss'


const App = () => {
  return (
    <AuthProvider>
    <AppRouter />
    </AuthProvider>
    
  )
}

export default App