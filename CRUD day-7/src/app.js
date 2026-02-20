const express = require("express")

const app = express()
const noteModel = require('/Cohort-Backend/CRUD day-7/model/notes.model')

app.use(express.json())
// Post method
app.post("/notes", async (req,res) =>{

    const {title , description} = req.body

    const  note = await noteModel.create({
        title , description
    })
    res.status(201).json({
        message: "Note created ",
        note
    })
})

app.get("/notes", async(req, res) => {
    const notes = await noteModel.find()

    res.status(200).json({
        message :"Data fetched successfuly",
        notes
    })
})

module.exports = app