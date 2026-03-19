const express = require('express') 
const post = express()
const postController  = require('../controller/post.controller')
const identifyUser = require('../middlewares/auth.middlewar')

const multer = require('multer')
const upload = multer({storage: multer.memoryStorage()})


post.post('/', upload.single('image'), identifyUser ,postController.postController)

post.get('/', identifyUser ,postController.getPostController )

post.get('/dets/:postId', identifyUser ,postController.getPostDetsController)

module.exports = post