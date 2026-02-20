require("dotenv").config() 

const app = require("./src/app")

const db = require("./config/database")

db()


app.listen(3000, (req, res) => {
    console.log("sever is running on port 3000");
    
})