import {createBrowserRouter} from 'react-router';
import Register from '../../../Insta-clone Project/Frontend insta-clone/src/features/auth/pages/Register';
import Login from '../../../Insta-clone Project/Frontend insta-clone/src/features/auth/pages/Login';

export const router = createBrowserRouter([
    {
        path:'/',
        element: <h1>Home</h1>
    },
    {
        path:'/register',
        element:<Register />
    },
    {
        path:'/login',
        element:<Login />
    }
])