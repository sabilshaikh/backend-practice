const express = require("express")

const followRouter = express.Router();
const identifyUsers = require("../middelwares/auth.middelware")
const followContoller = require("../controllers/follow.controller")


followRouter.post("/follow/:username",identifyUsers,followContoller.followUserContoller)
followRouter.post("/unfollow/:username",identifyUsers , followContoller.unfollowUserController)

module.exports = followRouter