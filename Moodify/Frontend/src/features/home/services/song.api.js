import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000"
})

export async function getSongs({ mood }) {
    const response = await api.get("/api/song", { params: { mood } })
    return response.data
}
