const express = require("express");
const userModel = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const authRouter = express.Router();

// register api

authRouter.post("/register", async (req , res) =>{
    const {userName , email , password , bio  } = req.body;

  if(!userName || !email || !password || !bio){
   return res.status(400).json({
        message : "all fields are rquired"
    })
  }

const isUserAlreadyExists = await userModel.findOne({
    $or:[
        {userName},
        {email}
    ]
})

if(isUserAlreadyExists){
    return res.status(409).json({
        message : "user already exists"
    })
}

const hash = await bcrypt.hash(password,10);

const user = await userModel.create({
    userName,
    email,
    password : hash,
    bio
})

const token = jwt.sign(
    {id : user._id},
    process.env.JWT_SECRET,
    {expiresIn : "1d"}
)

res.cookie("jwt_token",token)

res.status(201).json({
    message : "user register successfully",
    user : {
        userName : user.userName,
        email : user.email,
        bio : user.bio
    }
})

})

// login api

authRouter.post("/login", async (req , res) =>{
    const { userData , password} = req.body

   
    
    if(!userData || !password){
        return res.status(400).json({
            message : "all fields are required for login"
            
            
        })
    }

    const  isUserExists = await userModel.findOne({
        $or:[

            {email : userData},
           {userName : userData}
        ]
    })

  
    

    if(!isUserExists){
        return res.status(404).json({
            message : "user not found"
        })
    }

const checkPassword = await bcrypt.compare(password , isUserExists.password)

if(!checkPassword){
    return res.status(401).json({
        message : "wrong password"
    })
}

const token = jwt.sign(
    {id : isUserExists._id},
    process.env.JWT_SECRET,
    {expiresIn : "1d"}
)

res.cookie("jwt_token", token)

res.status(200).json({
    message : "user logged in successfully",

})

})

module.exports = authRouter