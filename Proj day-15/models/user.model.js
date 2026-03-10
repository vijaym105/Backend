const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        unique:[true, "Username already exist"],
        required: ["Username require"]
    },
    email: {
        type: String,
        unique:[true, "Email already exist"],
        required: ["Email required"]
    },
    password: {
        type: String,
        required: ["Password required"]
    },
    bio: String,

    profilePic: {
        type:String,
        default: "https://ik.imagekit.io/shlgw7tps/def%20user.webp"
    }
})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel