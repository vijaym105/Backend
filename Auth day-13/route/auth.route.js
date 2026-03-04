const express = require('express')
const userModel = require('../models/modles')
const jwt = require('jsonwebtoken')
const authRoute = express.Router()
const crypto = require('crypto')

authRoute.post('/register', async(req,res) => {
    const {name , email , password} = req.body

    const emailVer = await userModel.findOne({email})
    if(emailVer){
        return res.status(400).json({
            message: "Email already in use..."
        })
    }
    const hash = crypto.createHash("md5").update(password).digest("hex")
    const user = await userModel.create({
        name, email, password: hash
    })
    const token = jwt.sign({
        id: user._id,
        email: user.email
    },
    process.env.JWT_SECRET
)
    res.cookie("jwt_token", token)
    res.status(201).json({
        message: "User registered successfuly.",
        user,
        token
    })
     res.status(500).json({
        message: "Something went wrong."
    })
})

// post method for login

authRoute.post('/login', async(req, res) =>{
    console.log(req.cookies)

    const {email, password} = req.body

    const user  = await userModel.findOne({email})
    if(!user){
        return res.status(404).json({
            message: "Cannot found email."
        })
    }
    const isPass = user.password === crypto.createHash("md5").update(password).digest("hex") // Hashing -> converting normal text to cipher text using md5 alogirthm
    if(!isPass){
        return res.status(409).json({
            message: "Cannot match given password",
            success: false
        })
    }
    const token = jwt.sign({
        id: user._id,
        email: user.email
    },
     process.env.JWT_SECRET
)
    res.cookie("jwt_tokens", token)
    
    res.status(200).json({
        message: "User login successful✅",
        token,
        user
    })
})

module.exports = authRoute