const mongoose = require('mongoose')

const followSchema = new mongoose.Schema({
    following:{
        type: String
    },
    followers:{
        type: String
    }},
    {
        timestamps: true
    }
)
followSchema.index({followers: 1, following: 1}, {unique:true})
const followModel = mongoose.model("follow", followSchema)

module.exports = followModel