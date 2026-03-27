import {BrowserRouter, Routes, Route,} from 'react-router'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'

const AppRouter = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element= {<h1>Hello, This is main page</h1>} />
            <Route path='/register'  element={<Register  />} />
            <Route path='/login'  element={<Login />} />
        </Routes>
    </BrowserRouter>
  )
}

export default AppRouter