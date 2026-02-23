const mongoose = require("mongoose")

function dataBase(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("dataBase connected✅")
    })
}

module.exports = dataBase
