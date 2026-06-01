import React from 'react'
import FaceExpression from './features/expression/Component/FaceExpression'
import {RouteProvider} from 'react-router'
import { router } from './AppRoutes'

const App = () => {
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
    
  )
}

export default App