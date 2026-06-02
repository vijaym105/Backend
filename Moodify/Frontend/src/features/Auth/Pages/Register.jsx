import React, { useState } from 'react'
import '../Style/register.scss'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'

const Register = () => {

  const { loading, HandleRegister } = useAuth()
  const [email, setemail] = useState("")
  const [username, setusername] = useState("")
  const [pass, setpass] = useState(null)
  const navigate = useNavigate()

  async function dataHandler(dets) {
    dets.preventDefault

    const data = await HandleRegister(username)
    if(!data || loading){
      return(
        <h1>Loading...</h1>
      )
    }
    navigate('/')
  }

  return (
    <main>
      <div className="form-cont">
        <h1>Register</h1>
        <form onSubmit={dataHandler}>

          <input type="text" name='username' id='username'
            value={username}
            onChange={e => setusername (e.target.value)}
            placeholder='username' />
          <input type="text" name='email' id='email'
            value={email}
            onChange={e => setemail(e.target.value)}
            placeholder='email' />
          <input type="text" name='password' id='pass'
            value={pass}
            onChange={e => setpass(e.target.value)}
            placeholder='password' />

          <button type='submit'>Login</button>
        </form>
      </div>
    </main>
  )
}

export default Register