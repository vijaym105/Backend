import React, { useState } from 'react'
import '../../style/style.css'
import { Link } from 'react-router'
import axios from 'axios'

const Login = () => {
    const [username, setuserName] = useState("")
    const [password, setPassword] = useState("")

    async function HandleData(dets) {
        dets.preventDefault()

        axios.post('http://localhost:3000/api/auth/login',{
            username,
            password
        },{
            withCredentials:true
        }).then(res =>{
            console.log(res.data)
        })
    }
  return (
    <main>
        <div className="form-cont">
            <h1>Login</h1>
            <form onSubmit={HandleData}>
                <input type="text"
                onInput={(e)=>{setuserName(e.target.value)}}
                name='username' placeholder='Enter your name'/>

                <input type="password"
                onInput={(e)=>{setPassword(e.target.value)}}
                name='password' placeholder='Enter your password'/>
                <button type='submit'>Submit</button>
            </form>
            <p>Already have an account? <Link to="/register">register</Link></p>
        </div>
    </main>
  )
}

export default Login