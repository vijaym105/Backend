const express = require('express') 
const auth = express()
const controller = require('../controller/auth.controller')
const identifyUser = require('../middlewares/auth.middlewar')

/**
 * @route POST /api/auth/register
 * @description Creates a new user in database requires username,email,password, bio
 */
auth.post('/register',controller.registerController)

/**
 * @route POST /api/auth/login
 * @description logins user by satisfying valid email and password
 */
auth.post('/login', controller.loginController )

/**
 * @route GET /api/auth/getMe
 * @description shows details of logined user
 */
auth.get('/getMe', identifyUser , controller.getMeController )


auth.post('/logout', (req, res) => {
    res.clearCookie('token')
    res.status(200).json({ message: "Logged out successfully" })
})
module.exports = auth