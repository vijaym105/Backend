import React from 'react'
import { AuthProvider } from './auth.context' 
import { Approutes } from './app.route'
import './features/shared/global.scss'
const App = () => {
  return (
    <AuthProvider>
      <App routes={Approutes}/>
    </AuthProvider>
  )
}

export default App