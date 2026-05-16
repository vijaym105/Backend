import React from 'react'
import '../style/post.scss'
import '../../shared/button.scss'
import { useState, useRef } from 'react'
import { usePost } from '../hooks/usePost'
import { useNavigate } from 'react-router'

const CreateP = () => {
    const [caption, setCaption] = useState("")
    const ImginpRef = useRef(null)
    const navigate = useNavigate()

    const { loading, createPostHandler } = usePost()

    async function onSubmitHandler(e) {
        e.preventDefault()
        const file = ImginpRef.current.files[0]

        await createPostHandler(file, caption)
        navigate("/")
    }



    if (loading) {
        return <main><h1>Creating post...</h1></main>
    }
    return (
        <main className='new-post'>
            <div className="form-cont">
                <h1>Create Post</h1>
                <form onSubmit={onSubmitHandler}>

                    <label className='file-inp' htmlFor="file-upload">Select File</label>
                    <input ref={ImginpRef} hidden type="file" name='file' id='file-upload' />

                    <input value={caption} 
                    onChange={(e)=> {setCaption(e.target.value)}}
                    type="text" name='caption' id='caption' placeholder='caption' />
                    <button type='submit' className='btn'>Create Post</button>
                </form>
            </div>
        </main>
    )
}

export default CreateP