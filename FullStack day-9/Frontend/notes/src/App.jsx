import React, { useState } from 'react'
import axiox from "axios"

const App = () => {
  const [notes, setnotes] = useState([
    {
      title: "test title 1",
      description: "test decription 1"
    },
    {
      title: "test title 2",
      description: "test decription 2"
    },
    {
      title: "test title 3",
      description: "test decription 3"
    },
  ])

  axiox.get("http://localhost:3000/notes")
  .then((res)=>{
    setnotes(res.data.notes)
  })
  return (
    <div>
      <div className="note">
      {notes.map(note => {
      return <div className="notes">
       <h1>{note.title}</h1>
        <p>{note.description}</p>
      </div>}
      )}
      
      </div>
    </div>
  )
}

export default App