const express = require("express");

const app = express();

let series = []; // array of object

app.use(express.json()); // this middleware

// Use to create resource
app.post("/games", (req, res) => {
  console.log(req.body);
  series.push(req.body);
  res.json({ message: "Game added" });
});

// a end-point to fetch resource on client-side
app.get('/games', (req, res) => {
    res.send(series)
})

// use to delete specific resource on basis index passed
app.delete('/games/:index' , (req, res) => {
     delete series[ req.params.index ]
     res.send("Deleted successfully")
     console.log(series);
     
})

//patch 
app.patch('/games/:index' , (req, res) => {
    series[req.params.index].description = req.body.description
    series[req.params.index].title = req.body.title
    res.send("Patch was sent ...")
})


module.exports = app;
