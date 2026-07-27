const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        unique : [true , "username is taken plz take a different username"],
        required : [true , "username is required"]
    },

    email : {
        type : String ,
        unique : [true , "email is taken plz take a different email"],
        required : [true , "email is required"]
    },

    password : {
        type : String ,
required : [true , "password is required"],
select : false
    }
})

const userModel  = mongoose.model("users" , userSchema)

module.exports = userModel