const postModel = require('../models/post.model')
const imageKit  = require('@imagekit/nodejs')
const {toFile} = require('@imagekit/nodejs')
const imgkit = new imageKit({
    private: process.env.IMAGEKIT_PRIVATE_KEY
})


async function postController(req,res) {
    
    const file = await imgkit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer),'file'),
        fileName: Date.now() + '-' + req.file.originalname
    })
   res.status(200).json({
    message: "Image fetched successfully.",
    file,
    
   })

    if(!req.file){
       return res.status(400).json({
        message: "Upload a image"
       })
    }
}

module.exports = {postController}