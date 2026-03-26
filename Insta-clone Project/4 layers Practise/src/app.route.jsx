import { createBrowserRouter } from 'react-router'
import Register from './features/auth/Register'
import Login from './features/auth/Login'

export const Approutes = createBrowserRouter([
    {
        path: '/',
        element:'Home Page'
    },
    {
        path:'/register',
        element: <Register />
    },
    {
        path: '/login',
        element: <Login />
    } 
])