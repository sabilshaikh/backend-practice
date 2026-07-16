const express = require("express");
const authRouter = express.Router();
const authControllers = require("../controllers/auth.controllers")

// register api

authRouter.post("/register", authControllers.registeController)

// login api

authRouter.post("/login", authControllers.loginController)

module.exports = authRouter