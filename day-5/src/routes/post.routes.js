


const express = require("express");
const postRouter = express.Router();
const multer = require("multer");
const postController = require("../controllers/post.controllers");

const identifyUsers = require("../middelwares/auth.middelware")

const upload = multer({
    storage: multer.memoryStorage(),
});

postRouter.post(
    "/",
    upload.single("image"),
    identifyUsers,
    postController.createPostController
);


postRouter.get("/",identifyUsers,postController.getPostController)


postRouter.get("/details/:postId",identifyUsers,postController.getPostDetailsController)

module.exports = postRouter;