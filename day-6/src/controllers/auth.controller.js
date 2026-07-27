const userModel = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const redis = require("../config/cache")

// registerController

async function registerController(req, res) {
    
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "all fields are required",
    });
  }

  const isUserRegister = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserRegister) {
    return res.status(409).json({
      message: "user already register",
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hash,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },

  );

  
res.cookie("token", token)

return res.status(201).json({
    message : "user register successfully",
   user

})


}

// loginController

async function loginController(req , res) {

     const { email, password, username } = req.body;

    const user = await userModel.findOne({
        $or: [
            { email },
            { username }
        ]
    }).select("+password")

    if (!user) {
        return res.status(400).json({
            message: "Invalid credentials"
        })
    }


    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid credentials"
        })
    }

    const token = jwt.sign(
        {
            id: user._id,
            username: user.username
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    )

    console.log("Login token",token);
    

    res.cookie("token", token)

    return res.status(200).json({
        message: "User logged in successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })


    
}

// getMeController

async function getMeController(req ,res) {

  //  console.log(req.user.id);

   const userId = req.user.id;
   const user = await userModel.findById(userId)

   return res.status(200).json({
    message : "user fetched successfully",
    user
   })
   

    
}


// logOutController 

async function logOutController(req , res) {

    const token = req.cookies.token

    // console.log("log out token",token);
    
res.clearCookie("token")


    await redis.set(token,Date.now().toString(),"EX" , 60 * 60)

    return res.status(200).json({
      message : "user logout successfully"
    })




    
    
}


module.exports = {
    registerController,
    loginController,
    getMeController,
    logOutController

}