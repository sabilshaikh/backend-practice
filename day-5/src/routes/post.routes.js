


const express = require("express");
const postRouter = express.Router();
const multer = require("multer");

const postController = require("../controllers/post.controllers");
const { post } = require("./auth.routes");

const upload = multer({
    storage: multer.memoryStorage(),
});

postRouter.post(
    "/",
    upload.single("image"),
    postController.createPostController
);


postRouter.get("/",postController.getPostController)


postRouter.get("/details/:postId",postController.getPostDetailsController)

module.exports = postRouter;