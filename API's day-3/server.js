const express = require("express");

const app = express();

let series = []

app.use(express.json())

app.post('/series' , (req, res)=>{
    series.push(req.body)
    res.send("Data send ...")
})

app.get('/series' , (req, res) =>{
    res.send(series)
})

app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
})