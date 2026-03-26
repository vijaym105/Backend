import { useContext } from "react";
import { AuthContext } from "../../auth.context";
import { login, register } from "../services/auth.api";


export const useAuth = ()=>{
    const context = useContext(AuthContext)

    const { user, setUser, loading , setloading} = context

    const handleLogin = async(username, password) =>{
        setloading(true)
        const response = await login(username, password)

        setUser(response)
        setloading(false)
    }

    const handleRegister = async(username, email, password) =>{
        setloading(true)
        const resp  = await register(username, email, password)
        
        setUser(resp)
        setloading(false)
    }

    return(
        user, loading, handleLogin, handleRegister
    )
}