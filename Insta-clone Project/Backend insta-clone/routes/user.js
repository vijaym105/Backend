const express = require('express')
const identifyUser = require('../middlewares/auth.middlewar')
const userControl = require('../controller/user.controller')
const userFollow = express()

/**
 * @route POST api/follow/username
 * @description follow user
 * @access private
 */
userFollow.post('/follow/:username', identifyUser , userControl.userFollowController)

/**
 * @route POST api/unfollow/userid
 * @description unfollow user
 * @access private
 */
userFollow.post('/unfollow/:username', identifyUser , userControl.userUnfollowController)


module.exports = userFollow