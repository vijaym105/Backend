const { Schema, model } = require("mongoose");


const noteScheme = new Schema({
    title: String,
    description: String
})

const nodeModel = model("notes", noteScheme)

module.exports = nodeModel
