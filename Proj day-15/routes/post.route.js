const express = require('express') 
const post = express()
const postController  = require('../controller/post.controller')

const multer = require('multer')
const upload = multer({storage: multer.memoryStorage()})


post.post('/', upload.single('image'), postController.postController)

post.get('/', postController.getPostController )

module.exports = post