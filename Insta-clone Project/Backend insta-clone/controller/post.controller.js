const postModel = require('../models/post.model')
const imageKit = require('@imagekit/nodejs')
const { toFile } = require('@imagekit/nodejs')
const likeModel = require('../models/like.model')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const { post } = require('../routes/auth')
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

    console.log(req.user)
    console.log(req.user.id)
    const post = await postModel.create({
        caption: req.body.caption,
        imgFile: file.url,
        user: req.user.id
    })

    res.status(200).json({
        message: "Post created successfuly",
        post
    })
}

async function getPostController(req, res) {
    let id = req.user.id

    let posts = await postModel.find({
        user: id
    })

    res.status(200).json({
        message: "Post fetched successfuly",
        posts
    })

}

async function getPostDetsController(req, res) {

    const postId = req.params.postId
    const userId = req.user.id

    const post = await postModel.findById(postId)
    if (!post) {
        return res.status(404).json({
            message: "Post not found"
        })
    }
    const isValidUser = post.user.toString() === userId
    if (!isValidUser) {
        return res.status(403).json({
            message: "Forbidden access"
        })
    }

    res.status(200).json({
        message: "User Detail fetched successfuly",
        post
    })
}

async function postLikeController(req, res) {

    const user = req.user.username
    const postId = req.params.postId

    const post = await postModel.findById(postId)
    if (!post) {
        return res.status(404).json({
            message: "post not found"
        })
    }

    const likes = await likeModel.create({
        user: user,
        post: postId
    })
    res.status(201).json({
        message: `${user} liked successfuly.`,
        likes
    })
}
async function postUnLikeController(req, res){

    const user = req.user.username
    const postId = req.params.postId

    const isLiked = await likeModel.findOne({
        user: user,
        post: postId
    })

    if(!isLiked){
        return res.status(400).json({
            message: "Post not liked yet"
        })
    }

    await likeModel.findByIdAndDelete(isLiked._id)

    res.status(200).json({
        message: `${user} unliked post successfully`
    })
}

async function feedController(req, res) {

    const user = req.user

    const posts = await postModel
        .find()
        .sort({_id: - 1})
        .populate("user")
        .lean()

    const note = await Promise.all(
        posts.map(async (p) => {

            const isLiked = await likeModel.findOne({
                user: user.username,
                post: p._id

            })

            p.isLiked = Boolean(isLiked)
            return p
        })
    )

    res.status(200).json({
        message: "Data fetched successfuly",
        note
    })
}
module.exports = {
    postController,
    getPostController,
    getPostDetsController,
    postLikeController,
    postUnLikeController,
    feedController
}


