import React, { useEffect, useState } from 'react'
import axiox from "axios"

const App = () => {
  const [notes, setnotes] = useState([])
  



function handleForm(e){
  e.preventDefault()
  const {title, description} = e.target.elements
  console.log(title.value, " | "+description.value);
  
  axiox.post("http://localhost:3000/notes",{
    title: title.value,
    description: description.value
  })
  .then(res => {
    console.log(res)
    cardNotes()
  })
  

}
function cardNotes(){
   axiox.get("http://localhost:3000/notes")
  .then(res => {
    setnotes(res.data.notes)
  })
}

function deleteCard(Cardid){
  axiox.delete("http://localhost:3000/notes/"+Cardid)
  .then(res => {
    console.log(res.data)
    cardNotes()
  })
}
useEffect(()=> {
 cardNotes()
},[])

function updTitle(id){
  let newTitle = prompt("Enter new title")
    axiox.patch("http://localhost:3000/notes/"+id, {
      title: newTitle
    })
    .then(res => {
      console.log(res.data)
      cardNotes()
    })
}

function updDescription(id){
  let newDes = prompt("Enter new description")
  axiox.patch("http://localhost:3000/notes/"+id,{
    description:newDes
  })
  .then(res=>{
    console.log(res)
    cardNotes()
  })
}
  return (
    <>
    <div className="form-hand">
      <form onSubmit={handleForm}>
     <input name='title' type="text" placeholder='title' />
     <input name='description' type="text" placeholder='description' />
     <button>Submit</button>
     </form>
     </div>
    <div className="note">
      {notes.map(dets => {
       return <div className="notes"> 
       <h1>{dets.title}</h1>
        <p>{dets.description}</p>
        <button onClick={()=>{deleteCard(dets._id)}}>delete</button>
        <button onClick={() =>{updTitle(dets._id)}} className='update'>Update title</button>
        <button onClick={() =>{updDescription(dets._id)}} className='update'>Update description</button>
        </div>
      })}
    </div>
    </>
  )
}

export default App