const express = require('express') 
const post = express()
const postController  = require('../controller/post.controller')
const multer = require('multer')
const upload = multer({storage: multer.memoryStorage()})

try{
post.post('/', upload.single('image'), postController.postController)
}catch(error){
    console.log(error)
}
module.exports = post