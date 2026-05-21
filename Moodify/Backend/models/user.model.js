const mongoose= require('mongoose')

const userSchema =  mongoose.Schema({
    username:{
        type:String,
        required: [true, "Username is required."],
        unique: [true, "username should be unique"]
    },
    email:{
        type:String,
        required: [true, "email is must."],
        unique: [true, "email should be unique"]
    },
    password:{
        type:String,
        required: [true, "Password is must."]
    }
})

const userModel = mongoose.model("user", userSchema)

module.exports = userModel