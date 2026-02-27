const express = require("express")
const noteMode = require('/Cohort-Backend/FullStack day-9/Backend/models/notes.models')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(express.static('./public'))
const path = require('path')

app.post('/notes', async(req,res) => {
    try{
    const {title , description} = req.body;

    await noteMode.create({
        title , description
    })
    console.log(title, description)
    res.status(201).json({
        message: "Note created Successfuly.",
        success : true
    })

}catch(error){
    res.status(500).json({
        message: "Can't create notes",
        success : false
    })
}
})

app.get('/notes', async(req,res) =>{
    try{
    const note = await noteMode.find()
        res.status(200).json({
            message: "Data fetched successfuly.",
            success: true,
            note
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            messsage: "Something went wrong can't fetch data",
            success : false,
        })
    }
})

app.delete('/notes/:id', async(req,res) =>{
    try{
    const id = req.params.id
    await noteMode.findByIdAndDelete(id)
    res.status(200).json({
        message: "note deleted successfuly",
        success: true
    })
    if(!id){
        res.status(404).json({
            message: "Id is invalid",
            success:false
        })
    }
    }catch(error){
        console.log(error)
        res.status(500).json({
            message:"Cannot delete selected note",
            success: false
        })
    }
})

app.patch('/notes/:id', async(req,res) =>{
    try{
        const id = req.params.id
        const {title, description} = req.body

        const updNotes = await noteMode.findByIdAndUpdate(id,
            {title , description},
            {new : true}
        )
        if(!updNotes){
           return res.status(404).json({
                message: "Something went wrong , recheck.",
                success: false
            })
        }
        res.status(200).json({
            message: "Data patched successfully",
            success: true
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            message: "Server error can't update",
            success: false
        })
    }
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))

})


























// app.use(express.static("./public"))
// const path = require('path')

// //Method Create notes to db using post method and stored to noteModel
// app.post("/notes", async(req,res) => {
//     const {title , description} = req.body

//     const note = await noteMode.create({
//         title, description
//     })
//     res.status(201).json({
//         message: "Data send successfuly",
//         note
//     })
// })

// // creating get method to Read 
// app.get("/notes", async(req,res) =>{
//     const notes = await noteMode.find()

//     res.status(200).json({
//         message: "data fetched seccessfuly",
//         notes
//     })
// })

// //delete method using id of object
// app.delete("/notes/:id", async(req, res) => {
//     const id = req.params.id
//     const notes = await noteMode.findByIdAndDelete(id)

//     res.status(201).json({
//         message: "note deleted successfully"
        
//     })
// })

// app.patch('/notes/:id', async(req,res) => {
//     const id = req.params.id
//     const {description, title} = req.body
//      const des = await noteMode.findByIdAndUpdate(id, {description})
//      const tits = await noteMode.findByIdAndUpdate(id, {title})

//      res.status(200).json({
//         message: "Note is Updated .",
//         des , tits
//      })
// })

// app.get("*name", (req, res) => {
//     res.sendFile(path.join(__dirname, "public", "index.html"))
// })
// console.log(__dirname)




module.exports = app