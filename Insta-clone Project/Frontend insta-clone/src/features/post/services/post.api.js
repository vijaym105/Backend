import axios from 'axios';

const api = axios.create(
    {
        baseURL: "http://localhost:3000",
        withCredentials: true
    }
)

export async function getFeed(){
    const resp = await api.get('/api/post/feed')
     console.log(resp)
    return resp.data
}