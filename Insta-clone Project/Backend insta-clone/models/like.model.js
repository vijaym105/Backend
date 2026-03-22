const mongoose = require('mongoose')

const likeSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        require: [true, "post id required to like a post"]
    },
    user: {
        type: String,
        ref: 'users',
        required: [true, "username is required to like a post"]
    }
}, {
    timestamps: true
})

likeSchema.index({ post: 1, user: 1 }, { unique: true })

const likeModel = mongoose.model("likes", likeSchema)

module.exports = likeModel