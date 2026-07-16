const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    userName : {
        type : String,
        unique : [true , "username is already exists with the same name"],
        required : true
        
    },

    email : {
        type : String,
        unique : [true , "email is already exists with the same name"],
        required : true
    },

    password : {
        type : String ,
        required : true
    },

    bio : String ,

    // profilePicture : {
    //     type : String ,
    //     default : "this is demo profile "
    // }

})

const userModel = mongoose.model("insta_users",userSchema);


module.exports = userModel