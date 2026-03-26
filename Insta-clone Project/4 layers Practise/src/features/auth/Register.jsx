import React, { useState } from 'react'
import { Link } from 'react-router'
const Register = () => {
  const [Username, setUsername] = useState('')
  const [Email, setEmail] = useState('')
  const [password, setpassword] = useState('')

  function handleForm(e){
    e.preventDefault()


  }

  return (
    <main>
      <div onSubmit={handleForm} className="form-cont">
        <h1>Register</h1>
        <form>
          <input type="text"
          onInput={(e)=>{setUsername(e.target.value) }}
          name='username' placeholder='Enter your username'/>
  
          <input type="text"
          onInput={(e)=>{setEmail(e.target.value) }}
          name='email' placeholder='Enter your email'/>
  
          <input type="text"
          onInput={(e)=>{setpassword(e.target.value) }}
          name='password' placeholder='Enter your password'/>
        </form>
        <button className='pri-btn'>Submit</button>
        <div className='auth'>
        <p>Already have an acount ?</p><Link to={'/login'}>Sign up.</Link>
        </div>
      </div>
    </main>
  )
}

export default Register