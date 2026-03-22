const userModel = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
 async function registerController (req, res) {
    try{
    const {username, email, password, bio, profilePic} = req.body

    const isUserExist = await userModel.findOne({
        $or : [
           { username},
           { email}
        ]
    })
    if(isUserExist){
        return  res.status(409).json({
            message: isUserExist.email == email ? 
            "Email already in use" : "Username already in use"
        })
    }
    
    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password:hash,
        bio,
        profilePic
    })
    const token = jwt.sign({
        id: user._id , username: user.username
    }, process.env.JWT_SECRET)
        
    res.cookie("token",token)

    res.status(201).json({
        message:"User account created successfuly",
        success:true,
        user:{
            username:user.username,
            email:user.email,
            bio:user.bio,
            profilePic: user.profilePic
        }
    })
    if(!user){
    return res.status(404).json({
        message: "Something wrong from client side",
        success: false
    })
}
}
catch(error){
    console.log(error)
    res.status(500).json({
        message: "Problem from server side"
    })
}
}

async function loginController (req,res) {
    try{
    const {username, email, password} = req.body

    const user = await userModel.findOne({
        $or: [
            {username},
            {email}
        ]
    })
    if(!user){
        return res.status(404).json({
            message:"user not found"
        })
    }
   
    const isPassValid = await bcrypt.compare(password, user.password)
    
    if(!isPassValid){
        return res.status(401).json({
            message:"Incorrect password"
        })
    }
    const token = jwt.sign({
        id: user._id , username: user.username
    }, process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )
    res.cookie("token",token)

    res.status(200).json({
        message:"User loged in successfuly"
    })
}catch(error){
    console.log(error)
}
}

module.exports = {
    registerController,
    loginController
}