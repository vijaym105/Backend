const express = require('express') 
const post = express()
const postController  = require('../controller/post.controller')
const identifyUser = require('../middlewares/auth.middlewar')

const multer = require('multer')
const upload = multer({storage: multer.memoryStorage()})

/**
 * @route POST /api/post/
 * @description Create a post with caption and image 
 */
post.post('/', upload.single('image'), identifyUser ,postController.postController)

/**
 * @route GET /api/post/get
 * @description Used to fetch the created post
 */
post.get('/get', identifyUser ,postController.getPostController )

/**
 * @route GET /api/post/dets/postId
 * @description Gives details about specific post 
 */
post.get('/dets/:postId', identifyUser ,postController.getPostDetsController)

/**
 * @route /api/post/like/postId
 * @description likes a post on basis of postId provided in params
*/
post.post('/like/:postId', identifyUser, postController.postLikeController)



module.exports = post