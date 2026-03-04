const mongose = require('mongoose')

const userSchema = new mongose.Schema({
    name:String,
    email:{
        type: String,
        unique: [true, 'Email address already exist.']
    },
    password:String
})

const userModel = mongose.model('user-day14',userSchema)

module.exports = userModel