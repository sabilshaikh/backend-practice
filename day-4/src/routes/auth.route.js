

const express = require("express")

const jwt = require("jsonwebtoken")


const authRouter = express.Router()

const userModel = require("../model/user.model")

authRouter.post("/register", async (req, res) =>{

    const {name , email , password} = req.body

    const isUserAlreadyExists = await userModel.findOne({email})


    

    if(isUserAlreadyExists){
        return res.status(409).json({
            message : "this email address is aready exist"
        })
    }

    const users = await userModel.create({
        name, 
        email ,
        password
    })


    const token = jwt.sign({
        id : users._id,

    },
process.env.jwt_secret
)





    res.status(201).json({
        message : "user registerd successfully",
        users
    })


})

module.exports = authRouter