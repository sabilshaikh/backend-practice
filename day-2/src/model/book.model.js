const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
    title : String,
    author : String,
    genre : String,
    price : Number
})

const bookModel = mongoose.model("Books",bookSchema)


module.exports = bookModel;