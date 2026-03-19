const postModel = require('../models/post.model')
const imageKit = require('@imagekit/nodejs')
const { toFile } = require('@imagekit/nodejs')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const imgkit = new imageKit({
    private: process.env.IMAGEKIT_PRIVATE_KEY
})


async function postController(req, res) {
   
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
        user: req.user.user
    })
    
    res.status(200).json({
        message: "Post created successfuly",
        post
    })
}

async function getPostController(req, res) {



    let id = req.user.user
    
    let posts = await postModel.find({
        user: id
     })
       
    res.status(200).json({
        message:"Post fetched successfuly",
        posts
    })

}
async function getPostDetsController(req, res) {



    const postId = req.params.postId
    const userId = req.user.user

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