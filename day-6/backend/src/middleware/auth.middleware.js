const jwt = require("jsonwebtoken")
const redis = require("../config/cache")

async function authUser(req , res , next){

    const token = req.cookies.token;

    // console.log("Token from cookie:", token);

    if(!token){
        return res.status(401).json({
            message : "unauthorized user , token not provided"
        })
    }


    const isTokenBlackListed = await redis.get(token);

    if(isTokenBlackListed){
        return res.status(401).json({
            message : "invalid token unauthorized user",
        })
    }


let decoded ;

try{
    decoded = jwt.verify(token,process.env.JWT_SECRET);
  
}catch(err){
    return res.status(401).json({
        message : "invalid token"
    })
}

req.user = decoded

  next()


}

module.exports = {
    authUser
}