const express = require("express")

const authRouter = express.Router();
const  authController = require("../controllers/auth.controller")
const authMiddleware = require("../middleware/auth.middleware")


// register Route
authRouter.post("/register",authController.registerController)

// login Route


authRouter.post("/login",authController.loginController)

// get-me Route

authRouter.get("/get-me",authMiddleware.authUser,authController.getMeController)

// logOut Route

authRouter.get("/logout",authController.logOutController)


module.exports = authRouter