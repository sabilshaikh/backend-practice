         
         const jwt = require("jsonwebtoken")
         async function identifyUsers (req , res , next){

    
            const token = req.cookies.jwt_token;
    
            if (!token) {
                return res.status(401).json({
                    message: "Unauthorized",
                });
            }
    
    
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = decoded

            next()
    

}

module.exports = identifyUsers