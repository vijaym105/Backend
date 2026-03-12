const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    caption:{
        type:String,
        default: ""
    },
    imgFile:{
        type:String,
        required:[true, "image required for creating post."]
    },
    user:{
        ref: "users",
        type: mongoose.Schema.Types.ObjectId,
        required: [true,"user id is must"]
    }
})

const postModel = mongoose.model("posts",postSchema)

module.exports = postModel