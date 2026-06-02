import axios from 'axios'

const app = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true
})


export async function registerUser({ useranme, email, password }) {
    const resp = await app.post('/api/auth/register', {
        useranme, email, password
    })
    return resp.data
}

export async function loginUser({ username, email, password }) {
    const resp = await app.post('/api/auth/login', {
        email, password
    })
    return resp.data
}


export async function getMe() {
    const resp = await app.get('/api/auth/get-me');
    return resp.data
}

export async function logOut() {
    const resp = await app.post('/api/auht/logout')
    return resp.data
}