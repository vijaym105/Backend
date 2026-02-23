const express = require("express")
const noteMode = require('/Cohort-Backend/FullStack day-9/Backend/models/notes.models')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())

//Method Create notes to db using post method and stored to noteModel
app.post("/notes", async(req,res) => {
    const {title , description} = req.body

    const note = await noteMode.create({
        title, description
    })
    res.status(201).json({
        message: "Data send successfuly",
        note
    })
})

// creating get method to Read 
app.get("/notes", async(req,res) =>{
    const notes = await noteMode.find()

    res.status(200).json({
        message: "data fetched seccessfuly",
        notes
    })
})

//delete method using id of object
app.delete("/notes/:id", async(req, res) => {
    const id = req.params.id
    const notes = await noteMode.findByIdAndDelete(id)

    res.status(201).json({
        message: "note deleted successfully"
        
    })
})

app.patch('/notes/:id', async(req,res) => {
    const id = req.params.id
    const {description} = req.body
     const notes = await noteMode.findByIdAndUpdate(id, {description})

     res.status(200).json({
        message: "Note is Updated .",
       
     })
})






module.exports = app