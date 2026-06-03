import React from 'react'
import { RouterProvider } from "react-router"
import { router } from "./AppRoutes"
import './features/Shared/styles/global.scss'
import { AuthProvider } from './features/auth/auth.context'

const App = () => {
  return (
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App