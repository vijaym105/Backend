const express = require('express')
const userModel = require('../models/modles')
const jwt = require('jsonwebtoken')
const authRoute = express.Router()

authRoute.post('/register', async(req,res) => {
    const {name , email , password} = req.body

    const emailVer = await userModel.findOne({email})
    if(emailVer){
        return res.status(400).json({
            message: "Email already in use..."
        })
    }

    const user = await userModel.create({
        name, email, password
    })
    res.status(201).json({
        message: "User registered successfuly.",
        user,
        token
    })
        res.status(500).json({
        message: "Something went wrong."
    })
    const token = jwt.sign({
        id: user._id,
        email: user.email
    },
    process.env.JWT_SECRET
)
    res.cookie("jwt_token", token)
    
    
})

module.exports = authRoute