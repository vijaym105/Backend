import React, { useState } from 'react'
import { Link } from 'react-router'
import axios from 'axios'

const Register = () => {
const [username, setuserName] = useState("")
const [email, setEmail] = useState(null)
const [password, setPassword] = useState("")


async function handleData(e){
    e.preventDefault()
 
}
  return (
     <main>
        <div className="form-cont">
            <h1>Register</h1>
            <form onSubmit={handleData}>
                <input type="text"
                onInput={(e)=> {setuserName(e.target.value)}}
                name='username' placeholder='Enter your name'/>

                <input type="text" 
                onInput={(e)=> {setEmail(e.target.value)}}
                name='email' placeholder='Enter your email'/>

                <input type="password"
                onInput={(e)=> {setPassword(e.target.value)}}
                name='password' placeholder='Enter your password'/>
                <button type='submit'>Submit</button>

            </form>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
    </main>
  )
}

export default Register