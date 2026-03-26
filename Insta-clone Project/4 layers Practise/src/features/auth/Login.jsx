import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'

import '../styles/form.scss'

const Login = () => {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')

  const navigate = useNavigate()
  const {handleLogin,loading} = useAuth()

  async function handleForm(e){
    e.preventDefault()

    await handleLogin(email, password)

    navigate('/')

  }
  if(loading){
    return (<main>
      <h1>Loading......</h1>
    </main>)
  }

  return (
    <main>
      <div onSubmit={handleForm} className="form-cont">
        <h1>Login</h1>
        <form>
          <input type="text"
          onInput={(e)=>{setemail(e.target.value) }}
          name='email' placeholder='Enter your Email'/>
  
          <input type="text"
          onInput={(e)=>{setpassword(e.target.value) }}
          name='password' placeholder='Enter your password'/>
        </form>
        <button className='pri-btn'>Submit</button>
        <div className="auth">
        <p>Don't have an account ?</p><Link to="/register">Create One.</Link>
        </div>
      </div>
    </main>
  )
}

export default Login