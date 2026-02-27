const app = require('./src/app')

require('dotenv').config()
const db = require('./config/database')

app.listen(3000, (req,res) =>{
    console.log("Server is connected to port 3000.");
})

db()