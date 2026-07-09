const mongoose = require("mongoose")

function connectToDatabase(){
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("database connected successfully");
        
    })
}

module.exports = connectToDatabase