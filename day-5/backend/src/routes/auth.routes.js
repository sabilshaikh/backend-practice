const express = require("express");
const authRouter = express.Router();
const authControllers = require("../controllers/auth.controllers")
const identifyUsers = require("../middelwares/auth.middelware")

// register api

authRouter.post("/register", authControllers.registeController)

// login api

authRouter.post("/login", authControllers.loginController)

authRouter.get("/get-me",identifyUsers,authControllers.getMeController)

module.exports = authRouter