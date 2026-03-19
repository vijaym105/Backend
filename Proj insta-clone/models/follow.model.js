const mongoose = require('mongoose')

const followSchema = new mongoose.Schema({
    following:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: [true, "User must follow someone."]
    },
    followers:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "User must have followers"]
    }
})

const followModel = mongoose.model("follow", followSchema)

modeule.exports = followModel