const express = require('express')
const auth = express.Router()
const userModel = require('../models/user.model')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

auth.post('/register', async (req, res) => {
    try {
        
        const {name, email, password } = req.body
        console.log(req.body)
        
        const isEmailexist = await userModel.findOne({ email })

        if (isEmailexist) {
            return res.status(409).json({
                message: "Email already exists.",
                success: false
            })
        }

        const user = await userModel.create({
            name,
            email,
            password: crypto
                .createHash('md5')
                .update(password)
                .digest('hex')
        })
        console.log(name)
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )

        res.cookie("token", token)

        res.status(201).json({
            message: "User account created successfully",
            user,
            token
        })

    } catch (error) {
        console.log(req.body)
        res.status(500).json({
            message: "Something went wrong",
            success: false
        })
    }
})

auth.post('/login', async (req, res) => {
    const { email, password } = req.body

    const user = await userModel.findOne({ email })

    if (!user) {
        return res.status(404).json({
            message: "User not found",
            success: false
        })
    }

    // Hash the entered password
    const hashedPassword = crypto
        .createHash('md5')
        .update(password)
        .digest('hex')

    // Compare with DB password
    if (hashedPassword !== user.password) {
        return res.status(401).json({
            message: "Password invalid",
            success: false
        })
    }

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie("token", token)

    res.status(200).json({
        message: "User logged in successfully",
        success: true,
        token
    })
})

auth.get('/get', async(req,res) =>{
    const token = req.cookies.token
    if(!token){
        return res.status(401).json({
            message: "No token found"
        })
    }
    console.log(token)
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    console.log(decode.id)
    const user = await userModel.findById(decode.id)
    console.log(user)
    if(!user){
        return res.status(404).json({
            message: "No user found."
        })
    }
    res.status(200).json({
        message: "User object",
        name: user.name,
        email: user.email
    })

})
module.exports = auth