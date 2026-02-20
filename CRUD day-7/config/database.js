const mongoose = require("mongoose")

function toConnectdb(){
    mongoose.connect(process.env.MONGO_URI)
    .then(() =>{
        console.log("Database is connected");
    })
    console.log(process.env.MONGO_URI)
}

module.exports = toConnectdb