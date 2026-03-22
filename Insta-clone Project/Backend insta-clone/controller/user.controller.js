const followModel =require('../models/follow.model')

// api/follow/:username
async function userFollowController(req, res) {
    
    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    const followCollection = await followModel.create({
        followers : followerUsername,
        following: followeeUsername
    })

    const isFollow = followeeUsername === followerUsername
    if(isFollow){
        return res.status(400).json({
            message: "You cannot follow yourself."
        })
    }

    const isUserExist = await followModel.findOne({ Username:followeeUsername })
    if(isUserExist){
        return res.status(200).json({
            message: "Ayy user doesn't exist in database."
        })
    }

    const isAlreadyFollow = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })
    if(isAlreadyFollow){
        return res.status(200).json({
            message: "Brother you are already following him"
        })
    }
    res.status(201).json({
        message: `You are following ${followeeUsername}`,
        followCollection
    })
    
}

async function userUnfollowController(req, res) {
    const userFollower = req.user.username
    const userFollowing = req.params.username

    const isFollow = await followModel.findOne({
        followers: userFollower,
        following: userFollowing
    })

    if(!isFollow){
        return res.status(409).json({
            message: `User is not following ${userFollowing}`
        })
    }

    await followModel.findByIdAndDelete(isFollow._id)

    res.status(201).json({
        message: `You have unfollowed user ${userFollowing}`
    })
}
module.exports = {
    userFollowController,
    userUnfollowController
}