const express = require("express");

const test = express()
test.use(express.json())
let userDets = []

// Post Method
test.post('/user' , (req,res) => {
    userDets.push(req.body)
    console.log(req.body);
    
})

// Get Method
test.get('/user', (req, res) => {
    res.send(userDets)
    
})

// Delete Method
test.delete('/user/:index', (req,res) => {
    delete userDets[req.params.index]
    res.status(200).json`(
    )`
})

test.patch('/user/:index' ,(req,res) => {
    userDets[req.params.index].name = req.body.name
    res.json("Patch was successfuly delivered")
})




module.exports = test