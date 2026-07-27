


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

postRouter.post("/like/:postId", identifyUsers, postController.likePostController)


postRouter.post("/unlike/:postId", identifyUsers, postController.unLikePostController)


postRouter.get("/feed" , identifyUsers , postController.getFeedController)




module.exports = postRouter;