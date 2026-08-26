import { configureStore } from '@reduxjs/toolkit';
import  authRed  from '../features/auth/services/auth.slice';

export const store = configureStore({
    reducer: {
        auth: authRed
    },
})