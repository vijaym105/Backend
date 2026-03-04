const app = require('./src/app')
const db = require('./config/database')
require('dotenv').config()

app.listen(3000, (req,res) =>{
    console.log("Server is running on port 3000");  
})

db()