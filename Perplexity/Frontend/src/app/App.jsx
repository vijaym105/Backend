import React from 'react'
import { RouterProvider } from 'react-router'
import { route } from './app.route.jsx'

const App = () => {
  return (
    <RouterProvider router={route} />
  )
}

export default App