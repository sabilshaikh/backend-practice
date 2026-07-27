
const postModel = require("../models/post.model");
const imgKit = require("../config/imageKit");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");
const likeModel = require("../models/like.model")
// const { post } = require("../app");

// create posts

async function createPostController(req, res) {
    try {

  
        if (!req.file) {
            return res.status(400).json({
                message: "Image is required",
            });
        }

       
        // const token = req.cookies.jwt_token;

        // if (!token) {
        //     return res.status(401).json({
        //         message: "Unauthorized",
        //     });
        // }


        // const decoded = jwt.verify(token, process.env.JWT_SECRET);

       
        const uploadedFile = await imgKit.files.upload({
            file: await toFile(
                Buffer.from(req.file.buffer),
                req.file.originalname
            ),
            fileName: req.file.originalname,
            folder: "posts",
        });


        const post = await postModel.create({
            caption: req.body.caption,
            imageUrl: uploadedFile.url,
            user: req.user.id,
        });

        return res.status(201).json({
            message: "Post created successfully",
            post,
        });

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            message: err.message,
        });
    }
}

// get posts
async function getPostController(req , res){

    if(!req.cookies.jwt_token){
        return res.status(401).json({
            message : "token is required"
        })
    }

//  const jwt_token = req.cookies.jwt_token;

//  let decoded;
 
// try{
//     decoded = jwt.verify(jwt_token , process.env.JWT_SECRET);

    
// }catch(err){
//     return res.status(401).json({
//         message : "unauthorized user"
//     })
// }

const postsData = await postModel.find({
    user : req.user.id
})

res.status(200).json({
    message : "post fetched successfully",
    postsData
})


}


// get posts of authorized person

async function getPostDetailsController(req, res) {

    // const token = req.cookies.jwt_token

    // if (!token) {
    //     return res.status(401).json({
    //         message: "UnAuthorized Access"
    //     })
    // }

    // let decoded

    // try {
    //     decoded = jwt.verify(token, process.env.JWT_SECRET)
    // } catch (err) {
    //     return res.status(401).json({
    //         message: "Invalid Token"
    //     })
    // }
    const userId = req.user.id
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    

    if (!post) {
        return res.status(404).json({
            message: "Post not found."
        })
    }

    const isValidUser = post.user.toString() === userId

    if (!isValidUser) {
        return res.status(403).json({
            message: "Forbidden Content."
        })
    }

    return res.status(200).json({
        message: "Post fetched  successfully.",
        post
    })

}


// like unlike 

async function likePostController(req, res) {

    const username = req.user.username
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if (!post) {
        return res.status(404).json({
            message: "Post not found."
        })
    }

    const like = await likeModel.create({
        post: postId,
        user: username
    })

    res.status(200).json({
        message: "Post liked successfully.",
        like
    })

}


async function unLikePostController(req, res) {
    const postId = req.params.postId
    const username = req.user.username

    const isLiked = await likeModel.findOne({
        post: postId,
        user: username
    })

    if (!isLiked) {
        return res.status(400).json({
            message: "Post didn't like"
        })
    }

    await likeModel.findOneAndDelete({ _id: isLiked._id })

    return res.status(200).json({
        message: "post un liked successfully."
    })
}


async function getFeedController(req, res) {

    const user = req.user

    const posts = await Promise.all((await postModel.find({}).populate("user").lean())
        .map(async (post) => {
            const isLiked = await likeModel.findOne({
                user: user.userName,
                post: post._id
            })

            post.isLiked = Boolean(isLiked)

            return post
        }))



    res.status(200).json({
        message: "posts fetched successfully.",
        posts
    })
}



module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController,
    likePostController,
    unLikePostController,
    getFeedController
};

