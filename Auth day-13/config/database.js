const moongose = require('mongoose')

function db(){
    moongose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Data base is connected")
    })
}

module.exports = db