const app = require('./src/app');
const mongoose = require('mongoose')

async function toConnect(){
   let mon = mongoose.connect('mongodb+srv://vijaymalusarework_db_user:gJame2hBKV4tJiao@cohort-2.1c9mcdz.mongodb.net/')
    await mon
    console.log("Database connected");
    
}
toConnect()

app.listen(3000, (req, res)=>{
    console.log("server is running on port 3000");
    
})