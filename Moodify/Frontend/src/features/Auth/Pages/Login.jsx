import React, { useState } from 'react'
import '../Style/login.scss'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'
const Login = () => {

  const { user, loading, HandleLogin } = useAuth()
  const [email, setemail] = useState("")
  const [pass, setpass] = useState("")
  const navigate = useNavigate()

  async function dataHandler(e) {
    e.preventDefault

    const dets = await HandleLogin(email, pass)
    if(!dets || loading){
      return(
        <h2>Loading</h2>
      )
    }
    navigate('/')

  }

  return (
    <main>
      <div className="form-cont">
        <h1>Login</h1>
        <form onSubmit={dataHandler}>
          <input type="text" name='email' id='email'
            value={email}
            onChange={e => setemail( e.target.value )}
            placeholder='Email' />
          <input type="text" name='password' id='pass'
            value={pass}
            onChange={e => setpass(e.target.value )}
            placeholder='password' />
          <button type='submit'>Login</button>
        </form>
      </div>
    </main>
  )
}

export default Login