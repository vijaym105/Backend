const express = require('express') 
const auth = express()
const controller = require('../controller/auth.controller')

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



module.exports = auth