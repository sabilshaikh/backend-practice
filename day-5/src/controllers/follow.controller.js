
const followModel = require("../models/follow.model")
const userModel  = require("../models/user.model")

// follow controller

async function followUserContoller(req , res){

    const followeeName = req.params.username;
    const followerName = req.user.username;

    if(followerName === followeeName){
        return res.status(400).json({
            message : "you can't follow yourself"
        })
    }

    const isAlreadyFollowing = await followModel.findOne({
   
        follower : followerName,
        followee: followeeName
    })
    
    if(isAlreadyFollowing){
       return res.status(409).json({
            message : "already following this user"
        })
    }


        const isFolloweeExists= await userModel.findOne({
     userName : followeeName
    })
    
   
    

    
    if(!isFolloweeExists){
        return res.status(404).json({
            message : "the user your are trying to follow is not exists"
        })
    }
  



    





    

    const followRecord = await followModel.create({
        follower : followerName,
        followee : followeeName
    })
    

    res.status(201).json({
        message : `you are following a account ${followeeName}`,
        followRecord
    })

}


// unfollow controller


async function unfollowUserController(req , res){
   const  followerName = req.user.username;
   const followeeName = req.params.username;

    if(!followeeName){
        return res.status(400).json({
            message : "followee username is required"
        })
    }

    const isUserFollowing = await followModel.findOne({
        
follower : followerName,
followee : followeeName

    })

 
    

   if(!isUserFollowing){
    return res.status(404).json({
        message : "the user you are trying to unfollow is not exists"
    })
   }
    

   const unfollowedUser = await followModel.findByIdAndDelete(isUserFollowing._id);

   res.status(200).json({
    message : `you have unfollowed ${followeeName}`,
    unfollowedUser
   })


    // console.log(followerName,followeeName);

    
}

module.exports = {
     followUserContoller,
     unfollowUserController
}