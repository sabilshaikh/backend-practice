const express = require("express")
const bookModel = require("./model/book.model")

const app = express();

app.use(express.json())

// post method 

app.post("/api/book", async (req,res)=>{

    const {title , author , genre , price} = req.body;

   const book = await bookModel.create({
        title,
        author,
        genre,
        price
    })

    res.status(201).json({
        message : "book created successfully",
        book
    })


    

})

// get method

app.get("/api/book", async (req,res)=>{
    
   const books = await bookModel.find()

   res.status(200).json({
    message : "data fetched successfully",
    books
   })
})

// patch method

app.patch("/api/book/:id", async (req,res)=>{
    const id = req.params.id;

    const {price} = req.body;

    const book = await bookModel.findByIdAndUpdate(id,{price})

    res.status(200).json({
        message : "price updated",
        book
    })


})

// delete method


app.delete("/api/book/:id", async (req,res)=>{
    const id = req.params.id

   const deletedBook = await  bookModel.findByIdAndDelete(id)

   res.status(200).json({
    message : "book deleted successfully",
    deletedBook
   })

})

module.exports = app