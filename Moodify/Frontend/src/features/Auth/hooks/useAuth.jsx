import { useContext } from 'react';
import { registerUser, loginUser, getMe, logOut } from '../Services/axios';
import { AuthContext } from '../AuthContext';

export const useAuth = () => {
    const resp = useContext(AuthContext)
    const { loading, setLoading, setuser, user } = resp

    const HandleRegister = async ({ username, email, password }) => {
        setLoading(true)
        try {
            const res = await registerUser(username, email, password)
            setuser(res.user)
        } catch (err) {
            console.log(err)
        }
        setLoading(false)

    }

    const HandleLogin = async ({ email, password }) => {
        setLoading(true)
        try {
            const data = await loginUser( email, password)
            setuser(data.user)
        } catch (err) {
            console.log(err)
        }
        setLoading(false)
    }

    const getDets = async () => {
        setLoading(true)
        try {
            const data = await getMe()
                setuser(data.user)
            
        } catch (err) {
            console.log(err)
        }
        setLoading(false)
    }

    const HandleLogout = async () => {
        setLoading(true)
        try {
            const data = await logOut();
            setuser(null)
        } catch (err) {
            console.log(err)
        }
        setLoading(false)
    }


    return {
    user,
    loading,
    HandleLogin,
    HandleLogout,
    HandleRegister,
    getDets
}

}