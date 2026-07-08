const express = require("express")
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors())
const notesModel = require("./models/note.model")


// post request

app.post("/api/notes", async (req,res)=>{
    const {title , description} = req.body

   const notes = await notesModel.create({
        title,
        description
    })

    res.status(201).json({
        message : "note created successfully",
        notes
    })
})

// get request

app.get("/api/notes", async (req , res)=>{
     const notes = await notesModel.find()

     res.status(200).json({
        message : "notes fetched successfully",
        notes
     })
})


// patch request

app.patch("/api/notes/:id", async (req,res)=>{

    const id = req.params.id;
    const {description} = req.body;

    const notes = await notesModel.findByIdAndUpdate(id,{description})

    res.status(200).json({
        message : "note updated successfully",
        notes
    })


})


// delete request

app.delete("/api/notes/:id", async (req , res)=>{

    const id = req.params.id;

    const deletedNote = await notesModel.findByIdAndDelete(id);

    res.status(200).json({
        message : "note deleted successfully",
        deletedNote
    })

})

module.exports = app