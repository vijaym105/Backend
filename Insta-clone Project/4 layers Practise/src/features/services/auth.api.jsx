import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api/auth',
    withCredentials:true
})

export async function login(username, password) {
    const response = await api.post('/login',{
        username,
        password
    })
    return response
}


export async function register(username, email, password) {
    const response = await api.post('/login',{
        username,
        email,
        password
    })
    return response
}

export async function getMe() {
    const response = await api.get('/getMe')

    return response
}