const postModel = require('../models/post.model')
const imageKit = require('@imagekit/nodejs')
const { toFile } = require('@imagekit/nodejs')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const imgkit = new imageKit({
    private: process.env.IMAGEKIT_PRIVATE_KEY
})


async function postController(req, res) {
    let decoded = null
    try {
        console.log(req.body, req.file)

        const token = req.cookies.token

        if (!token) {
            return res.status(401).json({
                message: "Token is not provided, Unauthorized access."
            })
        }

        decoded = jwt.verify(token, process.env.JWT_SECRET)

    } catch (error) {
        console.log(error)
    }
    if (!req.file) {
        return res.status(400).json({
            message: "Upload a image"
        })
    }
    const file = await imgkit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: Date.now() + '-' + req.file.originalname,
        folder: "Cohort-2/insta-clone"
    })

    
    const post = await postModel.create({
        caption: req.body.caption,
        imgFile: file.url,
        user: decoded.user
    })
    
    res.status(200).json({
        message: "Post created successfuly",
        post
    })
}

async function getPostController(req, res) {

    const token = req.cookies.token
    console.log(token)
    let decoded = null;
    try{
        decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded)
    }catch(err){
        res.status(401).json({
            message: "Invalid token or Unauthorized"
        })
    }

    let id = decoded.user;
    
    let posts = await postModel.find({
        user: id
     })
       
    res.status(200).json({
        message:"Post fetched successfuly",
        posts
    })

}
async function getPostDetsController(req, res) {
    const token = req.cookies.token
    if(!token){
        return res.status(401).json({
            message: "Unauthorized token or action"
        })
    } 

    let decoded;
    try{
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    }catch(err){
        return res.status(404).json({
            message: "resource not found"
        })
    }

    const postId = req.params.postId
    const userId = decoded.user
    console.log("Decoded Id:"+ decoded.user)
    console.log("Post ID from params:", req.params.postId)
    console.log(mongoose.Types.ObjectId.isValid(postId))

    const post = await postModel.findById(postId)
    console.log("Post from DB:", post)
    if(!post){
        return res.status(404).json({
            message: "Post not found"
        })
    }
    const isValidUser = post.user.toString() === userId
    if(!isValidUser) {
        return res.status(403).json({
            message: "Forbidden access"
        })
    }

    res.status(200).json({
        message: "User Detail fetched successfuly",
        post
    })
}
module.exports = { postController,
    getPostController,
    getPostDetsController
 }