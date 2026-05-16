import React from 'react'
import { useNavigate } from 'react-router'
const Nav = () => {
    const navigate = useNavigate()
  return (
    <div className='nav'>
        <h1>InstaRam</h1>
        <button onClick={()=> {navigate('/create-post')}} className='Create post-creation'>Create post</button>
    </div>
  )
}

export default Nav